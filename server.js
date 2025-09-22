const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
const ai = new GoogleGenAI({
  apiKey: "AIzaSyBZRlFIik6ToV8Q4Q_3wl9efYtGfUPShcc",
});

app.post("/ai", async (req, res) => {
  const { prompt } = req.body;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Here is the propmpt -- ${prompt}`,
    config: {
      systemInstruction: "You are a supportive mental health companion. Always respond with kindness, empathy, and encouragement. Keep your answers short (2–4 sentences max). Offer simple, practical suggestions for improving the user’s mood, like breathing exercises, journaling, stretching, or talking to a friend. Never give medical, legal, or crisis advice. If the user expresses self-harm or crisis, encourage them to reach out to a trusted friend, family member, or professional.",
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });
//   console.log(`Gemini Response: ${response.text}`);
  res.json({ response: response.text });
});

app.listen(PORT, () => {
  console.log(`Server running at at http://localhost:${PORT}`);
});
