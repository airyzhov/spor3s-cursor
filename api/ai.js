export default async function handler(req, res) {
  const { message } = req.body;
  const HF_TOKEN = process.env.HF_TOKEN;
  const model = "tiiuae/falcon-7b-instruct";

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: message })
    }
  );
  const data = await response.json();
  const reply = data[0]?.generated_text || "Извините, не могу ответить сейчас.";
  res.status(200).json({ reply });
}