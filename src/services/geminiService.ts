import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const fetchDNAFact = async (basePair: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the significance of the ${basePair} base pair connection in DNA structure. Keep it scientific yet engaging, under 60 words. Use markdown for highlighting key terms.`,
    });
    
    return response.text || "The fundamental building block of life, connecting sequences that define every living organism.";
  } catch (error) {
    console.error("Error fetching DNA fact:", error);
    return "The fundamental building block of life, connecting sequences that define every living organism.";
  }
};
