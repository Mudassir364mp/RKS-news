import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

const getFilePath = (fileName) => path.join(DATA_DIR, fileName);

export const readData = (fileName) => {
  try {
    const filePath = getFilePath(fileName);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
};

export const writeData = (fileName, data) => {
  try {
    const filePath = getFilePath(fileName);
    // Ensure the data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
};

// Helpers for specific collections
export const getArticles = () => {
  return readData('articles.json').sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

export const saveArticles = (articles) => {
  return writeData('articles.json', articles);
};

export const getCategories = () => {
  return readData('categories.json');
};

export const saveCategories = (categories) => {
  return writeData('categories.json', categories);
};

export const getBreakingNews = () => {
  return readData('breaking.json');
};

export const saveBreakingNews = (news) => {
  return writeData('breaking.json', news);
};

export const getAds = () => {
  return readData('ads.json');
};

export const saveAds = (ads) => {
  return writeData('ads.json', ads);
};
