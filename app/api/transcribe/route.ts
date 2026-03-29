import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    console.log('🎤 Transcription API hit');

    const data = await req.formData();
    const file = data.get('file') as Blob;
    if (!file) {
      console.error('❌ No audio file received');
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('✅ Received audio file size:', buffer.length);

    // ✅ Upload audio to AssemblyAI
    const uploadRes = await axios.post(
      'https://api.assemblyai.com/v2/upload',
      buffer,
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY || '',
          'content-type': 'application/octet-stream',
        },
        maxBodyLength: Infinity,
      }
    );

    const audioUrl = uploadRes.data.upload_url;
    console.log('✅ Uploaded to AssemblyAI:', audioUrl);

    // ✅ Request transcription
    const transcribeRes = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      { audio_url: audioUrl },
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY || '',
          'content-type': 'application/json',
        },
      }
    );

    const transcriptId = transcribeRes.data.id;
    console.log('📝 Transcript request created:', transcriptId);

    // ✅ Poll until transcription is completed
    let transcriptText = '';
    let status = 'queued';
    while (status === 'queued' || status === 'processing') {
      await new Promise((res) => setTimeout(res, 3000)); // wait 3s between polls

      const statusRes = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY || '',
          },
        }
      );

      status = statusRes.data.status;
      console.log('🔄 Polling status:', status);

      if (status === 'completed') {
        transcriptText = statusRes.data.text;
        console.log('✅ Transcription complete:', transcriptText);
        break;
      }

      if (status === 'error') {
        console.error('❌ AssemblyAI Error:', statusRes.data.error);
        return NextResponse.json(
          { error: statusRes.data.error || 'Transcription failed' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ text: transcriptText });
  } catch (err: any) {
    console.error('💥 Transcribe Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
