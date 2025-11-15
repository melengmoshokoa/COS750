import { supabase } from '../config/database.js';

export const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('storyboard_users')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error) throw error;
  return data;
};
