import React, { useState } from "react";
import PRODUCTS from "./products";
import logo from "./public/logo.png";

const API_URL = "/api";

function App() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [order, setOrder] = useState({ product: "", contact: "" });

  const sendToAI = async (msg) => {
    setChat([...chat, { from: "user", text: msg }]);
    const res = await fetch(`${API_URL}/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    setChat([...chat, { from: "user", text: msg }, { from: "ai", text: data.reply }]);
  };

  const sendOrder = async () => {
    await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    alert("Заказ отправлен менеджеру!");
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh", padding: 20 }}>
      <img src={logo} alt="logo" style={{ width: 80, borderRadius: 20 }} />
      <h1 style={{ color: "#2e2e2e" }}>spor3s</h1>
      <h2>Меню</h2>
      <ul>
        {PRODUCTS.map((p) => (
          <li key={p.name} style={{ marginBottom: 10 }}>
            <b>{p.name}</b> — {p.price}
            <br />
            <small>{p.desc}</small>
            <br />
            <button onClick={() => setOrder({ ...order, product: p.name })}>Заказать</button>
          </li>
        ))}
      </ul>
      <h2>Чат с ИИ</h2>
      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 100, background: "#fff" }}>
        {chat.map((m, i) => (
          <div key={i} style={{ textAlign: m.from === "user" ? "right" : "left" }}>
            <b>{m.from === "user" ? "Вы" : "spor3s-бот"}:</b> {m.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={() => { sendToAI(input); setInput(""); }}>Отправить</button>
      <h2>Оформить заказ</h2>
      <input placeholder="Ваш Telegram" value={order.contact} onChange={e => setOrder({ ...order, contact: e.target.value })} />
      <button onClick={sendOrder}>Отправить заказ</button>
    </div>
  );
}

export default App;
