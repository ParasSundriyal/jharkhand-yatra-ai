import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type AppRole = 'tourist' | 'transport_provider' | 'shop_owner' | 'hotel_owner' | 'tour_guide' | 'admin';

interface UserRole {
  id: string;
  role: AppRole;
  is_verified: boolean;
  created_at: string;
}

export const useUserRoles = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRoles();
    } else {
      setRoles([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setRoles(data || []);
    } catch (error) {
      console.error('Error fetching user roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRole = async (role: AppRole) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role
        });

      if (error) throw error;
      await fetchUserRoles();
    } catch (error) {
      console.error('Error adding role:', error);
      throw error;
    }
  };

  const hasRole = (role: AppRole) => {
    return roles.some(r => r.role === role);
  };

  const isVerified = (role: AppRole) => {
    return roles.find(r => r.role === role)?.is_verified || false;
  };

  return {
    roles,
    loading,
    addRole,
    hasRole,
    isVerified,
    refetch: fetchUserRoles
  };
};