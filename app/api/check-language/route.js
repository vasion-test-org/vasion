import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale');
  const path = searchParams.get('path');

  if (!locale || !path) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    // Here you would implement your actual logic to check if the page exists
    // This could involve checking your CMS, database, or file system
    // For now, we'll use a simple example that checks if the path contains certain keywords
    // that we know don't exist in certain languages
    
    const unavailablePaths = {
      fr: ['/products', '/solutions'], // Example paths that don't exist in French
      de: ['/about', '/contact']      // Example paths that don't exist in German
    };

    const exists = !unavailablePaths[locale]?.some(unavailablePath => 
      path.startsWith(unavailablePath)
    );

    return NextResponse.json({ exists });
  } catch (error) {
    console.error('Error checking language availability:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 