import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const incomingData = await req.formData();
    
    const provider = incomingData.get('provider') as string;
    if (!provider) {
      return NextResponse.json({ error: 'Missing provider' }, { status: 400 });
    }

    const file = incomingData.get('fileToUpload') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // YENİDEN YAPIlandırma: Next.js form data objesi bazen Node.js fetch ile aktarılırken 
    // boundary hatası verebiliyor. Bu yüzden sıfırdan oluşturuyoruz.
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', file);
    
    if (provider === 'litterbox') {
      const time = incomingData.get('time') as string || '12h';
      formData.append('time', time);
    }

    const endpoint = provider === 'litterbox' 
      ? 'https://litterbox.catbox.moe/resources/internals/api.php' 
      : 'https://catbox.moe/user/api.php';

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Catbox/Litterbox upload error:', response.status, errorText);
      return NextResponse.json({ error: `Upload failed: ${response.status} ${errorText}` }, { status: 500 });
    }

    const url = await response.text();
    return NextResponse.json({ url: url.trim() });
    
  } catch (error: any) {
    console.error('Upload route error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
