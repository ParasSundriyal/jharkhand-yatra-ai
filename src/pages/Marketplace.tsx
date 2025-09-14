import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Heart,
  Star,
  Search,
  Filter,
  Home,
  Calendar,
  Mountain,
  Camera,
  Gift,
  Truck,
  MapPin
} from "lucide-react";
import tribalCrafts from "@/assets/tribal-crafts.jpg";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Traditional Bamboo Basket Set",
      category: "handicrafts",
      price: 850,
      originalPrice: 1200,
      rating: 4.8,
      reviews: 23,
      image: tribalCrafts,
      seller: "Ranchi Tribal Crafts",
      location: "Ranchi",
      description: "Handwoven bamboo baskets by Santhal artisans",
      inStock: true,
      delivery: "5-7 days"
    },
    {
      id: 2,
      name: "Dokra Metal Art Horse",
      category: "handicrafts",
      price: 1200,
      originalPrice: 1500,
      rating: 4.9,
      reviews: 18,
      image: "/api/placeholder/300/300",
      seller: "Heritage Arts Jharkhand",
      location: "Khunti",
      description: "Ancient lost-wax casting technique artwork",
      inStock: true,
      delivery: "3-5 days"
    },
    {
      id: 3,
      name: "Tribal Village Homestay",
      category: "homestays",
      price: 2500,
      originalPrice: null,
      rating: 4.7,
      reviews: 42,
      image: "/api/placeholder/300/300",
      seller: "Munda Village Community",
      location: "Netarhat",
      description: "Authentic tribal experience with organic meals",
      inStock: true,
      delivery: "Book for tomorrow"
    },
    {
      id: 4,
      name: "Sarhul Festival Experience",
      category: "events",
      price: 1800,
      originalPrice: 2200,
      rating: 4.6,
      reviews: 15,
      image: "/api/placeholder/300/300",
      seller: "Cultural Heritage Tours",
      location: "Multiple Villages",
      description: "Participate in spring harvest festival celebrations",
      inStock: true,
      delivery: "Seasonal availability"
    },
    {
      id: 5,
      name: "Betla Wildlife Photography Tour",
      category: "ecotourism",
      price: 3500,
      originalPrice: 4000,
      rating: 4.9,
      reviews: 31,
      image: "/api/placeholder/300/300",
      seller: "Eco Adventures Jharkhand",
      location: "Betla National Park",
      description: "Guided wildlife photography with expert naturalists",
      inStock: true,
      delivery: "Book 3 days ahead"
    },
    {
      id: 6,
      name: "Handwoven Tribal Saree",
      category: "handicrafts",
      price: 2200,
      originalPrice: 2800,
      rating: 4.8,
      reviews: 27,
      image: "/api/placeholder/300/300",
      seller: "Women's Weaving Collective",
      location: "Chaibasa",
      description: "Pure cotton saree with traditional tribal motifs",
      inStock: false,
      delivery: "15-20 days"
    }
  ];

  const categories = [
    { value: "all", label: "All Products", icon: ShoppingBag },
    { value: "handicrafts", label: "Handicrafts", icon: Gift },
    { value: "homestays", label: "Homestays", icon: Home },
    { value: "events", label: "Cultural Events", icon: Calendar },
    { value: "ecotourism", label: "Eco Tourism", icon: Mountain }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceRange === "all" || 
      (priceRange === "under-1000" && product.price < 1000) ||
      (priceRange === "1000-2500" && product.price >= 1000 && product.price <= 2500) ||
      (priceRange === "above-2500" && product.price > 2500);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const addToCart = (productId: number) => {
    console.log("Added to cart:", productId);
  };

  const toggleWishlist = (productId: number) => {
    console.log("Toggle wishlist:", productId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Jharkhand Marketplace</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic tribal handicrafts, unique homestays, cultural events, and eco-tourism experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.value)}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                      <SelectItem value="1000-2500">₹1,000 - ₹2,500</SelectItem>
                      <SelectItem value="above-2500">Above ₹2,500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Featured Seller */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Seller</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto flex items-center justify-center">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ranchi Tribal Crafts</h3>
                    <p className="text-sm text-muted-foreground">Authentic handmade products</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-muted-foreground">(156 reviews)</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Products</h2>
                <p className="text-muted-foreground">{filteredProducts.length} items found</p>
              </div>
              <Select defaultValue="popular">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <div className="h-48 bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-1">
                      {product.originalPrice && (
                        <Badge className="bg-red-500 text-white">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="bg-gray-500 text-white">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>

                    {/* Seller Info */}
                    <div className="text-sm">
                      <p className="font-medium">{product.seller}</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {product.location}
                      </p>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{product.delivery}</span>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-hero hover:opacity-90"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product.id)}
                      >
                        {product.inStock ? (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        ) : (
                          "Out of Stock"
                        )}
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;