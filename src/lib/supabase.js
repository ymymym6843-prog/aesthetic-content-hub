// MariaDB API client (migrated from Supabase SDK)
// Same function signatures — no component changes needed

const API_BASE = '/api/db';

// Fetch all posts with images for a clinic
export async function fetchPosts(clinicId) {
  const res = await fetch(`${API_BASE}/posts?clinic_id=${clinicId}`);
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Fetch week strategies
export async function fetchWeekStrategies(clinicId) {
  const res = await fetch(`${API_BASE}/strategies?clinic_id=${clinicId}`);
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Fetch clinic info with directors
export async function fetchClinic(clinicId) {
  const res = await fetch(`${API_BASE}/clinics/${clinicId}`);
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Upload image to server
export async function uploadImage(file, filePath) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', filePath);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error((await res.json()).error);
  const data = await res.json();
  return data.publicUrl;
}

// Create a new post
export async function createPost(post) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Update a post
export async function updatePost(id, updates) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Delete a post
export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error((await res.json()).error);
}

// Add image to a post
export async function addPostImage(postId, imageUrl, slideIndex, altText) {
  const res = await fetch(`${API_BASE}/post-images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_id: postId, image_url: imageUrl, slide_index: slideIndex, alt_text: altText }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Delete a post image
export async function deletePostImage(imageId) {
  const res = await fetch(`${API_BASE}/post-images/${imageId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error((await res.json()).error);
}

// Create a new week strategy
export async function createWeekStrategy(strategy) {
  const res = await fetch(`${API_BASE}/strategies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(strategy),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Update publish checklist on a post
export async function updatePublishChecklist(postId, checklist) {
  const res = await fetch(`${API_BASE}/posts/${postId}/checklist`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checklist }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Update post status
export async function updatePostStatus(postId, status) {
  const res = await fetch(`${API_BASE}/posts/${postId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

// Default clinic ID
export const DEFAULT_CLINIC_ID = '00000000-0000-0000-0000-000000000001';
