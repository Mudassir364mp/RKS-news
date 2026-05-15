import { saveArticles, saveCategories, saveBreakingNews, saveAds } from '@/lib/db';
import { initialArticles, initialCategories, initialBreakingNews, initialAds } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await saveCategories(initialCategories);
    await saveArticles(initialArticles);
    await saveBreakingNews(initialBreakingNews);
    await saveAds(initialAds);

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
