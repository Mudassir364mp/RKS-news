import { getArticles } from '@/lib/db';

export async function GET(request, { params }) {
  const { slug } = await params;
  const articles = getArticles();
  
  const article = articles.find(a => a.slug === slug);
  
  if (!article) {
    return Response.json({ error: 'Article not found' }, { status: 404 });
  }

  return Response.json(article, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
