export default async function handler(req, res) {
  const { product, contact } = req.body;
  const botToken = process.env.BOT_TOKEN;
  const chatId = "@web3grow";

  const text = `Новый заказ:\n${product}\nКонтакт: ${contact}`;
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  res.status(200).json({ ok: true });
}