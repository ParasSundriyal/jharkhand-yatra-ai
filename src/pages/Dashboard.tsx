import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from '@/hooks/useUserRoles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoleSelector } from '@/components/RoleSelector';
import { Navigate, Link } from 'react-router-dom';
import { 
  Car, 
  Store, 
  Hotel, 
  MapPin, 
  Plus,
  BarChart3,
  Settings,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { roles, loading: rolesLoading, hasRole } = useUserRoles();

  if (authLoading || rolesLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const renderProviderDashboard = () => {
    const sections = [];

    if (hasRole('transport_provider')) {
      sections.push(
        <Card key="transport">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Transport Services
            </CardTitle>
            <CardDescription>
              Manage your transportation offerings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Active Services</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold flex items-center justify-center gap-1">
                  <Star className="h-4 w-4" />
                  0.0
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
              <Button size="sm" variant="outline">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (hasRole('shop_owner')) {
      sections.push(
        <Card key="shop">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Shop Items
            </CardTitle>
            <CardDescription>
              Manage your product listings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Products Listed</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button size="sm" variant="outline">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (hasRole('tour_guide')) {
      sections.push(
        <Card key="tour">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Tour Packages
            </CardTitle>
            <CardDescription>
              Manage your tour offerings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Active Packages</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Bookings</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Package
              </Button>
              <Button size="sm" variant="outline">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (hasRole('hotel_owner')) {
      sections.push(
        <Card key="hotel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              Accommodation
            </CardTitle>
            <CardDescription>
              Manage your property listings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Properties</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Bookings</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Button size="sm" variant="outline">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return sections;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.email}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Current Roles */}
      {roles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Roles</CardTitle>
            <CardDescription>
              Currently active roles on your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge key={role.id} variant="outline" className="text-sm">
                  {role.role.replace('_', ' ').toUpperCase()}
                  {role.is_verified && ' ✓'}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Provider Dashboards */}
      {roles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderProviderDashboard()}
        </div>
      )}

      {/* Tourist Dashboard */}
      {(hasRole('tourist') || roles.length === 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Explore</CardTitle>
              <CardDescription>Discover amazing places</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/maps">View Maps</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>Browse photos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/gallery">View Gallery</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
              <CardDescription>Find local services</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/marketplace">Browse Services</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Add More Roles</CardTitle>
          <CardDescription>
            Expand your capabilities on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoleSelector />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;