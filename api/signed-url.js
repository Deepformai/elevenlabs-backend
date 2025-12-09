export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${process.env.AGENT_ID}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("ElevenLabs error:", text);
      return res.status(500).json({ error: "Failed to get signed URL" });
    }

    const data = await response.json();

    res.status(200).json({ signedUrl: data.signedUrl });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
