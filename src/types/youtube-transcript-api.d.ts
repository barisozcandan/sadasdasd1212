declare module 'youtube-transcript-api' {
  interface TranscriptItem {
    text: string;
    duration: number;
    offset: number;
  }

  export default {
    fetchTranscript(videoId: string): Promise<TranscriptItem[]>;
  };
} 