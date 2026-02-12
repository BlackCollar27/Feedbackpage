import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Business, Feedback } from '../types';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-6b2adf01`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
};

export const api = {
  // Business
  async getBusiness(businessId: string) {
    const response = await fetch(`${API_BASE}/business/${businessId}`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    if (!response.ok) throw new Error('Failed to fetch business');
    return response.json();
  },

  async updateBusiness(businessId: string, data: any) {
    const response = await fetch(`${API_BASE}/business/${businessId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update business');
    return response.json();
  },

  // Locations
  async getLocations() {
    const response = await fetch(`${API_BASE}/locations`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    if (!response.ok) throw new Error('Failed to fetch locations');
    return response.json();
  },

  async getLocation(locationId: string) {
    const response = await fetch(`${API_BASE}/locations/${locationId}`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    if (!response.ok) throw new Error('Failed to fetch location');
    return response.json();
  },

  async createLocation(data: any) {
    const response = await fetch(`${API_BASE}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create location');
    return response.json();
  },

  async updateLocation(locationId: string, data: any) {
    const response = await fetch(`${API_BASE}/locations/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update location');
    return response.json();
  },

  async deleteLocation(locationId: string) {
    const response = await fetch(`${API_BASE}/locations/${locationId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    if (!response.ok) throw new Error('Failed to delete location');
    return response.json();
  },

  // Feedback
  async submitFeedback(data: {
    businessId: string;
    rating: number;
    name?: string;
    email?: string;
    comment: string;
    type: 'feedback' | 'suggestion';
  }): Promise<Feedback | null> {
    try {
      const response = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      const feedback = await response.json();
      return {
        ...feedback,
        createdAt: new Date(feedback.createdAt)
      };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return null;
    }
  },

  async getFeedback(businessId: string): Promise<Feedback[]> {
    try {
      const response = await fetch(`${API_BASE}/business/${businessId}/feedback`, { headers });
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return [];
    }
  },

  // Initialize demo data
  async initDemo(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/init-demo`, {
        method: 'POST',
        headers
      });
      return response.ok;
    } catch (error) {
      console.error('Error initializing demo:', error);
      return false;
    }
  },

  // Submit opt-in for newsletter/rewards
  async submitOptIn(data: {
    businessId: string;
    name: string;
    email: string;
    phone: string;
  }): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/opt-in`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit opt-in');
      return true;
    } catch (error) {
      console.error('Error submitting opt-in:', error);
      return false;
    }
  },

  // Get opt-ins for a business
  async getOptIns(businessId: string) {
    try {
      const response = await fetch(`${API_BASE}/business/${businessId}/opt-ins`, { headers });
      if (!response.ok) throw new Error('Failed to fetch opt-ins');
      const data = await response.json();
      return data.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt).toISOString()
      }));
    } catch (error) {
      console.error('Error fetching opt-ins:', error);
      return [];
    }
  }
};