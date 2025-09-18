import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Heart, MapPin, User, Filter, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Photo {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  category: string;
  likes_count: number;
  is_featured: boolean;
  created_at: string;
  profiles?: {
    full_name: string | null;
    username: string | null;
  } | null;
  [key: string]: any; // Allow additional properties from Supabase
}

interface PhotoGalleryProps {
  limit?: number;
  showFilter?: boolean;
  featuredOnly?: boolean;
  className?: string;
}

const PhotoGallery = ({ 
  limit, 
  showFilter = true, 
  featuredOnly = false, 
  className = "" 
}: PhotoGalleryProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'nature', 'cultural', 'wildlife', 'architecture', 'festival', 'adventure'];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nature': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cultural': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'wildlife': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'architecture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'festival': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'adventure': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('photos')
        .select(`
          *,
          profiles(full_name, username)
        `)
        .order('created_at', { ascending: false });

      if (featuredOnly) {
        query = query.eq('is_featured', true);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setPhotos((data as unknown as Photo[]) || []);
      setFilteredPhotos((data as unknown as Photo[]) || []);
    } catch (err) {
      console.error('Photos fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [limit, featuredOnly]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === selectedCategory));
    }
  }, [selectedCategory, photos]);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`border-destructive ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-destructive mb-2">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchPhotos}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          {featuredOnly ? 'Featured Photos' : 'Photo Gallery'}
        </CardTitle>
        {showFilter && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-8">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Photos Found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? 'No photos have been uploaded yet.'
                : `No ${selectedCategory} photos found.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg bg-muted aspect-square"
              >
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                
                {/* Featured Badge */}
                {photo.is_featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                    <p className="text-sm text-white/80 mb-2 line-clamp-2">
                      {photo.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="h-3 w-3" />
                        {photo.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(photo.category)}>
                          {photo.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs">
                          <Heart className="h-3 w-3" />
                          {photo.likes_count}
                        </div>
                      </div>
                    </div>
                    
                    {photo.profiles && (
                      <div className="flex items-center gap-1 text-xs mt-2 text-white/60">
                        <User className="h-3 w-3" />
                        {photo.profiles?.full_name || photo.profiles?.username || 'Anonymous'}
                        <span className="ml-2">
                          {format(new Date(photo.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoGallery;