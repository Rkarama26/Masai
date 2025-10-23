import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateRecipeUsingGemini(ingredients) {
    const prompt = `
You are a master chef. Create a complete recipe using the following ingredients: ${ingredients.join(", ")}.

Include the following sections clearly:
1. A creative recipe title.
2. Ingredient list with proper quantity measurements.
3. Step-by-step preparation instructions (minimum 5 steps).
4. Optionally: Include nutritional information (Calories, Protein, Fat, Carbs).

Format neatly with section headings like "Title", "Ingredients", "Steps", "Nutrition".
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            temperature: 0.5,
        });

        // Extract the generated recipe text
        const recipeText = response.output_text || response.text || 
            response.candidates?.[0]?.content?.parts?.[0]?.text || 
            "No recipe generated.";

        return recipeText;

    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new Error("Failed to generate recipe using Gemini API");
    }
}
