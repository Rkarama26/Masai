import ollama from "ollama";

export async function generateRecipeUsingOllama(ingredients) {
  const prompt = `
You are a creative chef. Using the following ingredients: ${ingredients.join(", ")}

Generate:
1. A creative name/title for the dish.
2. A list of ingredients with realistic quantity measurements.
3. Step-by-step preparation instructions (at least 5 steps).

Keep the output concise, structured, and well-formatted.
  `;

  try {
    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [{ role: "user", content: prompt }],
    });

    const recipeText = response.message?.content || "No recipe generated.";
    return recipeText;

  } catch (error) {
    console.error("Ollama Error:", error.message);
    throw new Error("Failed to generate recipe using Ollama");
  }
}
