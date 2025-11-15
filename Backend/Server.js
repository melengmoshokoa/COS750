import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Helper: Calculate level from XP
const calculateLevel = (xp) => Math.floor(xp / 200) + 1;

// ============================================
// ROUTES
// ============================================

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Factory Method Adventures API 🚀',
    endpoints: {
      health: '/health',
      users: '/api/users/:userId',
      stories: '/api/users/:userId/stories',
      badges: '/api/users/:userId/badges',
      leaderboard: '/api/leaderboard'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get or create user
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    let { data: user, error } = await supabase
      .from('storyboard_users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      const { data: newUser } = await supabase
        .from('storyboard_users')
        .insert([{ user_id: userId, xp: 0, level: 1 }])
        .select()
        .single();
      user = newUser;
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update XP
app.patch('/api/users/:userId/xp', async (req, res) => {
  try {
    const { userId } = req.params;
    const { xp } = req.body;
    const level = calculateLevel(xp);

    const { data, error } = await supabase
      .from('storyboard_users')
      .update({ xp, level })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get completed stories
app.get('/api/users/:userId/stories', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('storyboard_user_stories')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Complete story
app.post('/api/users/:userId/stories', async (req, res) => {
  try {
    const { userId } = req.params;
    const { storyType, currentScene } = req.body;

    const { data, error } = await supabase
      .from('storyboard_user_stories')
      .insert([{ 
        user_id: userId, 
        story_type: storyType, 
        current_scene: currentScene || 0 
      }])
      .select()
      .single();

    if (error && error.code === '23505') {
      return res.json({ success: true, message: 'Already completed' });
    }
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get badges
app.get('/api/users/:userId/badges', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('storyboard_user_badges')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Award badge
app.post('/api/users/:userId/badges', async (req, res) => {
  try {
    const { userId } = req.params;
    const { badgeKey, badgeName, xpAwarded } = req.body;

    const { data, error } = await supabase
      .from('storyboard_user_badges')
      .insert([{ 
        user_id: userId, 
        badge_key: badgeKey, 
        badge_name: badgeName, 
        xp_awarded: xpAwarded 
      }])
      .select()
      .single();

    if (error && error.code === '23505') {
      return res.json({ success: true, message: 'Badge already earned' });
    }
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const { data, error } = await supabase
      .from('storyboard_users')
      .select('user_id, xp, level')
      .order('xp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// Complete story
app.post('/api/users/:userId/stories', async (req, res) => {
  try {
    const { userId } = req.params;
    const { storyType, currentScene } = req.body;

    const { data, error } = await supabase
      .from('storyboard_user_stories')
      .insert([{ 
        user_id: userId, 
        story_type: storyType, 
        current_scene: currentScene || 0 
      }])
      .select()
      .single();

    if (error && error.code === '23505') {
      return res.json({ success: true, message: 'Already completed' });
    }
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get badges
app.get('/api/users/:userId/badges', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('storyboard_user_badges')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Award badge
app.post('/api/users/:userId/badges', async (req, res) => {
  try {
    const { userId } = req.params;
    const { badgeKey, badgeName, xpAwarded } = req.body;

    const { data, error } = await supabase
      .from('storyboard_user_badges')
      .insert([{ 
        user_id: userId, 
        badge_key: badgeKey, 
        badge_name: badgeName, 
        xp_awarded: xpAwarded 
      }])
      .select()
      .single();

    if (error && error.code === '23505') {
      return res.json({ success: true, message: 'Badge already earned' });
    }
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const { data, error } = await supabase
      .from('storyboard_users')
      .select('user_id, xp, level')
      .order('xp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Factory Method Adventures API`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
});
