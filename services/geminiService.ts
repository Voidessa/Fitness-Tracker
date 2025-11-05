
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getGeminiResponse = async (prompt: string): Promise<number> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        const number = parseInt(text.trim().match(/\d+/)?.[0] || '0', 10);
        
        if (isNaN(number)) {
            throw new Error("Failed to parse a valid number from Gemini response.");
        }
        
        return number;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from Gemini API.");
    }
};


export const getCalorieInfo = async (foodDescription: string): Promise<number> => {
    const prompt = `You are a calorie estimation expert. Analyze the following food description and provide only a single integer representing the estimated total calories. Do not include any other text, units, or explanations. Food: "${foodDescription}"`;
    return getGeminiResponse(prompt);
};

export const getWorkoutCalories = async (workoutDescription: string): Promise<number> => {
    const prompt = `You are a fitness expert. Analyze the following workout description and provide only a single integer representing the estimated total calories burned. Assume an average person's weight and intensity. Do not include any other text, units, or explanations. Workout: "${workoutDescription}"`;
    return getGeminiResponse(prompt);
};
