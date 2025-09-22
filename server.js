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
      systemInstruction: "PROMPT",
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
