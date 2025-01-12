import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // URL'den video ID'sini çıkar
    const videoId = url.split('v=')[1]?.split('&')[0];
    
    if (!videoId) {
      return NextResponse.json(
        { error: 'Geçersiz YouTube URL\'si' },
        { status: 400 }
      );
    }

    // Transkripti al
    const transcriptList = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Transkripti birleştir
    const transcriptText = transcriptList
      .map(item => item.text)
      .join('\n');

    return NextResponse.json({ transcript: transcriptText });
  } catch (error) {
    console.error('Transkript alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Transkript alınamadı' },
      { status: 500 }
    );
  }
} 