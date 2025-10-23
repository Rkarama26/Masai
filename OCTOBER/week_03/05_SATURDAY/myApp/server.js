import express from "express";
import bodyParser from "body-parser";
import { generateRecipeUsingGemini } from "./geminiService.js";
import { generateRecipeUsingOllama } from "./ollamaService.js";
import { generateRecipePDF } from "./pdfGenerator.js";

const app = express();
app.use(bodyParser.json());

app.post("/generate-recipe", async (req, res) => {
  try {
    const { ingredients, model } = req.body; // model: "ollama" or "gemini"

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide a list of ingredients." });
    }

    let recipeText;

    if (model === "ollama") {
      console.log(" Using Ollama local model...");
      recipeText = await generateRecipeUsingOllama(ingredients);
    } else {
      console.log("Using Gemini API...");
      recipeText = await generateRecipeUsingGemini(ingredients);
    }

    const pdfBuffer = await generateRecipePDF(recipeText);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=recipe.pdf",
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log(" Server running on port 3000"));
