import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Always use process.env.API_KEY directly as a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (userHistory: string[], allProducts: Product[]): Promise<string[]> => {
  try {
    const prompt = `
    Analyze the user's tech setup based on their browsing history (IDs: ${userHistory.join(', ')}).
    
    Catalog: ${JSON.stringify(allProducts.map(p => ({ id: p.id, name: p.name, category: p.category, description: p.description })))}
    
    CRITICAL LOGIC: 
    1. PRIORITIZE ECOSYSTEMS: If they view an iPhone, recommend MacBooks, Apple Watches, or iPads. 
    2. COMPATIBILITY: If they view a laptop, suggest peripherals (Printers, Mini PCs, or high-end Headphones).
    3. UPGRADE PATH: If they view older tech, suggest current flagships in the same category.
    4. VARIETY: Ensure suggestions span at least 2 categories if possible.

    Return ONLY a JSON array of 3 product ID strings.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonStr = response.text?.trim() || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Recommendation error:", error);
    return [];
  }
};

export const getChatbotResponse = async (userMessage: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are Nexin Assistant. Help users with product queries, elite hardware specs, and order help. 
        Context: ${context}. Keep it professional, friendly, and concise. Your brand is Nexin.`,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. How can I help you otherwise?";
  } catch (error) {
    console.error("Chatbot error:", error);
    return "The assistant is currently offline. Please try again later.";
  }
};

export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 2) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 5 relevant product search suggestions for the query: "${query}" in an elite tech e-commerce context.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    const jsonStr = response.text?.trim() || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    return [];
  }
};