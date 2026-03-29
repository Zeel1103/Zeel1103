import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY; // ✅ public key for client

export async function transcribeAudio(blob: Blob): Promise<string | null> {
  if (!API_KEY) {
    console.error("❌ AssemblyAI API key is missing.");
    return null;
  }

  try {
    console.log("🎙️ Uploading audio...");

    // Step 1: Upload the audio
    const uploadRes = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      blob,
      {
        headers: {
          authorization: API_KEY,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    const audioUrl: string = uploadRes.data.upload_url;

    // Step 2: Request transcription
    const transcriptRes = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: audioUrl },
      {
        headers: {
          authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const transcriptId: string = transcriptRes.data.id;

    // Step 3: Poll until transcription is complete
    for (let retries = 0; retries < 30; retries++) {
      const pollingRes = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: {
            authorization: API_KEY,
          },
        }
      );

      const status = pollingRes.data.status;

      if (status === "completed") {
        return pollingRes.data.text;
      }

      if (status === "error") {
        console.error("❌ Transcription error:", pollingRes.data.error);
        return null;
      }

      await new Promise((r) => setTimeout(r, 3000));
    }

    console.warn("⏰ Transcription timed out after 30 attempts.");
    return null;
  } catch (err) {
    console.error("❌ Transcription failed:", err);
    return null;
  }
}
