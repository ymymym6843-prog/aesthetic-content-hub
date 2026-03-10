import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tqbbkxadeqlnwnbqwikk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYmJreGFkZXFsbnduYnF3aWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzY0NDUsImV4cCI6MjA4ODcxMjQ0NX0.3bYLNflnB1kL6IoMPGd-mlYx11SOSX0AJtEMTMEHIpQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all posts with images for a clinic
export async function fetchPosts(clinicId) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      post_images (id, image_url, slide_index, alt_text)
    `)
    .eq('clinic_id', clinicId)
    .order('week')
    .order('sort_order');

  if (error) throw error;
  return data;
}

// Fetch week strategies
export async function fetchWeekStrategies(clinicId) {
  const { data, error } = await supabase
    .from('week_strategies')
    .select('*')
    .eq('clinic_id', clinicId)
    .order('week');

  if (error) throw error;
  return data;
}

// Fetch clinic info with directors
export async function fetchClinic(clinicId) {
  const { data, error } = await supabase
    .from('clinics')
    .select(`
      *,
      directors (id, name, role, specialty, experience_years, photo_url)
    `)
    .eq('id', clinicId)
    .single();

  if (error) throw error;
  return data;
}

// Upload image to Supabase Storage
export async function uploadImage(file, path) {
  const { data, error } = await supabase.storage
    .from('post-images')
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('post-images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// Create a new post
export async function createPost(post) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update a post
export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a post
export async function deletePost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Add image to a post
export async function addPostImage(postId, imageUrl, slideIndex, altText) {
  const { data, error } = await supabase
    .from('post_images')
    .insert({ post_id: postId, image_url: imageUrl, slide_index: slideIndex, alt_text: altText })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a post image
export async function deletePostImage(imageId) {
  const { error } = await supabase
    .from('post_images')
    .delete()
    .eq('id', imageId);

  if (error) throw error;
}

// Create a new week strategy
export async function createWeekStrategy(strategy) {
  const { data, error } = await supabase
    .from('week_strategies')
    .insert(strategy)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update publish checklist on a post
export async function updatePublishChecklist(postId, checklist) {
  const { data, error } = await supabase
    .from('posts')
    .update({ publish_checklist: checklist })
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update post status
export async function updatePostStatus(postId, status) {
  const { data, error } = await supabase
    .from('posts')
    .update({ status })
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Default clinic ID
export const DEFAULT_CLINIC_ID = '00000000-0000-0000-0000-000000000001';
