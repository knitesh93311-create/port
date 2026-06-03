import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');

  if (!fileUrl) {
    return new NextResponse('URL parameter is required', { status: 400 });
  }

  try {
    let targetUrl = fileUrl;
    // Handle relative URLs (e.g. /resume.pdf)
    if (fileUrl.startsWith('/')) {
      const origin = new URL(request.url).origin;
      targetUrl = `${origin}${fileUrl}`;
    }

    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from remote URL: ${response.statusText}`);
    }

    const fileBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/pdf';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="Nitesh_Kumar_Resume.pdf"',
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Error proxying download:', error);
    // Fallback: redirect to original URL if fetching fails
    return NextResponse.redirect(new URL(fileUrl, request.url));
  }
}
