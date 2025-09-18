import { Camera, Upload, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhotoGallery from "@/components/PhotoGallery";
import { useAuth } from "@/contexts/AuthContext";

const Gallery = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <Camera className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading">
              Photo Gallery
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto font-body">
              Explore stunning photographs of Jharkhand's natural beauty, cultural heritage, and hidden gems captured by fellow travelers
            </p>
            
            {user && (
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Upload className="h-5 w-5 mr-2" />
                Upload Photo
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Photos</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  Curated by experts
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Liked</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,342</div>
                <p className="text-xs text-muted-foreground">
                  Hundru Falls sunrise
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Photos Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 font-heading">Featured Photos</h2>
            <p className="text-muted-foreground max-w-2xl">
              Our curated selection of the most stunning photographs showcasing Jharkhand's beauty
            </p>
          </div>
          
          <PhotoGallery 
            featuredOnly={true} 
            limit={6} 
            showFilter={false}
            className="mb-12"
          />
        </div>
      </section>

      {/* All Photos Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 font-heading">All Photos</h2>
            <p className="text-muted-foreground max-w-2xl">
              Browse through all the amazing photographs shared by our community
            </p>
          </div>
          
          <PhotoGallery showFilter={true} />
        </div>
      </section>

      {/* Call to Action */}
      {!user && (
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Share Your Jharkhand Experience</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our community and share your beautiful photographs of Jharkhand's landscapes, culture, and hidden gems
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Sign Up to Upload
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;