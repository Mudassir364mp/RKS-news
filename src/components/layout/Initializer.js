'use client';
import { useEffect } from 'react';
import { initializeData } from '@/lib/data';

export default function Initializer() {
  useEffect(() => {
    initializeData();
    
    // Apply theme on load
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return null;
}
