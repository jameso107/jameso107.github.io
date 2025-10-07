// api/chatkit/session.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Your default workflow ID (replace if you make new workflows later)
    const workflowId = "wf_68e47e5c71908190928c78b581c5f80e09d39885479042d2";

    const r = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // set this in Vercel
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: "anonymous", // optional user/device identifier
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).send(text);
    }

    const { client_secret } = await r.json();
    res.status(200).json({ client_secret });
  } catch (err: any) {
    res.status(500).send(err?.message || "Server error");
  }
}
