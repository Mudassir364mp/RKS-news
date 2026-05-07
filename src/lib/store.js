// lib/store.js

export const getItems = (key) => {
  if (typeof window === 'undefined') return [];
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

export const setItem = (key, items) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(items));
  }
};

export const addItem = (key, item) => {
  const items = getItems(key);
  const newItem = {
    ...item,
    id: Date.now().toString(),
  };
  setItem(key, [...items, newItem]);
  return newItem;
};

export const updateItem = (key, id, updateData) => {
  const items = getItems(key);
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updateData };
    setItem(key, items);
    return items[index];
  }
  return null;
};

export const deleteItem = (key, id) => {
  const items = getItems(key);
  const newItems = items.filter((item) => item.id !== id);
  setItem(key, newItems);
};

// Aliases for clear code
export const categoryStore = {
  getAll: () => getItems('rks_categories'),
  getById: (id) => getItems('rks_categories').find(c => c.id === id),
  getBySlug: (slug) => getItems('rks_categories').find(c => c.slug === slug),
  add: (data) => addItem('rks_categories', data),
  update: (id, data) => updateItem('rks_categories', id, data),
  delete: (id) => deleteItem('rks_categories', id),
};

export const articleStore = {
  getAll: () => getItems('rks_articles').sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
  getById: (id) => getItems('rks_articles').find(a => a.id === id),
  getBySlug: (slug) => getItems('rks_articles').find(a => a.slug === slug),
  getByCategory: (categoryId) => getItems('rks_articles').filter(a => a.categoryId === categoryId).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
  getBreaking: () => getItems('rks_articles').filter(a => a.isBreaking).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
  getTopViewed: () => [...getItems('rks_articles')].sort((a, b) => (b.views || 0) - (a.views || 0)),
  add: (data) => addItem('rks_articles', { ...data, publishedAt: new Date().toISOString(), views: 0 }),
  update: (id, data) => updateItem('rks_articles', id, data),
  delete: (id) => deleteItem('rks_articles', id),
  incrementViews: (id) => {
    const article = articleStore.getById(id);
    if (article) updateItem('rks_articles', id, { views: (article.views || 0) + 1 });
  }
};

export const breakingNewsStore = {
  getAll: () => getItems('rks_breaking'),
  updateAll: (items) => setItem('rks_breaking', items),
};

export const adStore = {
  getAll: () => getItems('rks_ads'),
  getActive: () => getItems('rks_ads').filter(ad => ad.active),
  getByPosition: (position) => getItems('rks_ads').filter(ad => ad.position === position && ad.active),
  updateAll: (items) => setItem('rks_ads', items),
};
