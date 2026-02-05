import { NextResponse } from 'next/server';

import { getStoryblokApi } from '@/lib/storyblok';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');

  if (!slug || !locale) {
    return NextResponse.json({ error: 'Missing slug or locale parameter' }, { status: 400 });
  }

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      language: locale,
      version: 'published',
    });

    return NextResponse.json({
      exists: !!data.story,
      story: data.story || null,
    });
  } catch (error) {
    console.error('Error checking page existence:', error);
    return NextResponse.json({
      error: error.message,
      exists: false,
    });
  }
}
