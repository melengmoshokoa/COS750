// src/services/apiService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

// User API
export const userAPI = {
  async getUser(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return handleResponse(response);
  },

  async updateXP(userId, xp) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/xp`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ xp })
    });
    return handleResponse(response);
  }
};

// Story API
export const storyAPI = {
  async getCompletedStories(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/stories`);
    return handleResponse(response);
  },

  async completeStory(userId, storyType, currentScene = 0) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storyType, currentScene })
    });
    return handleResponse(response);
  }
};

// Badge API
export const badgeAPI = {
  async getBadges(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/badges`);
    return handleResponse(response);
  },

  async awardBadge(userId, badgeKey, badgeName, xpAwarded) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/badges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ badgeKey, badgeName, xpAwarded })
    });
    return handleResponse(response);
  }
};

export default { user: userAPI, story: storyAPI, badge: badgeAPI };
