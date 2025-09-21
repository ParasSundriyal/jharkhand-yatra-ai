import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserRoles } from '@/hooks/useUserRoles';
import { useToast } from '@/hooks/use-toast';
import { 
  Car, 
  Store, 
  Hotel, 
  MapPin, 
  User,
  Shield,
  CheckCircle,
  Clock
} from 'lucide-react';

const roleConfig = {
  tourist: {
    icon: User,
    title: 'Tourist',
    description: 'Explore and discover amazing places in Jharkhand',
    color: 'bg-blue-500'
  },
  transport_provider: {
    icon: Car,
    title: 'Transport Provider',
    description: 'Offer transportation services to tourists',
    color: 'bg-green-500'
  },
  shop_owner: {
    icon: Store,
    title: 'Shop Owner',
    description: 'Sell local products and handicrafts',
    color: 'bg-purple-500'
  },
  hotel_owner: {
    icon: Hotel,
    title: 'Hotel Owner',
    description: 'Provide accommodation services',
    color: 'bg-orange-500'
  },
  tour_guide: {
    icon: MapPin,
    title: 'Tour Guide',
    description: 'Lead tourists on memorable adventures',
    color: 'bg-teal-500'
  },
  admin: {
    icon: Shield,
    title: 'Administrator',
    description: 'Manage platform operations',
    color: 'bg-red-500'
  }
};

export const RoleSelector: React.FC = () => {
  const { roles, addRole, hasRole, isVerified, loading } = useUserRoles();
  const { toast } = useToast();
  const [adding, setAdding] = useState<string | null>(null);

  const handleAddRole = async (role: keyof typeof roleConfig) => {
    if (hasRole(role)) return;
    
    setAdding(role);
    try {
      await addRole(role);
      toast({
        title: "Role Added Successfully",
        description: `You are now registered as a ${roleConfig[role].title}`,
      });
    } catch (error) {
      toast({
        title: "Error Adding Role",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setAdding(null);
    }
  };

  if (loading) {
    return <div className="text-center">Loading your roles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Role</h2>
        <p className="text-muted-foreground">
          Select the roles that best describe how you want to participate in our platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(roleConfig).map(([roleKey, config]) => {
          const role = roleKey as keyof typeof roleConfig;
          const Icon = config.icon;
          const userHasRole = hasRole(role);
          const verified = isVerified(role);

          return (
            <Card key={role} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${config.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {userHasRole && (
                    <Badge 
                      variant={verified ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {verified ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          Pending
                        </>
                      )}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{config.title}</CardTitle>
                <CardDescription className="text-sm">
                  {config.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  onClick={() => handleAddRole(role)}
                  disabled={userHasRole || adding === role || role === 'admin'}
                  className="w-full"
                  variant={userHasRole ? "secondary" : "default"}
                >
                  {adding === role ? (
                    "Adding..."
                  ) : userHasRole ? (
                    "Active"
                  ) : role === 'admin' ? (
                    "Contact Admin"
                  ) : (
                    "Select Role"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {roles.length > 0 && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Your Active Roles:</h3>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <Badge key={role.id} variant="outline">
                {roleConfig[role.role as keyof typeof roleConfig]?.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};