export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API klíč není nastaven na serveru.' });

  const { history } = req.body;
  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'Chybí history.' });
  }

  const SYSTEM_PROMPT = `Jsi AI asistent. Odpovídáš jasně, stručně a věcně. Nepoužíváš metafory ani stylizovaný jazyk. Tvým cílem je co nejpřesnější a nejpraktičtější pomoc uživateli';

  // Převod historie z Gemini formátu na OpenAI/Groq formát
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.parts[0].text
    }))
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 1000,
        temperature: 0.9
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || 'Žádná odpověď.';
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
