import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult, ChatMessage } from '../types';
import { servicesData } from '../data/services';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert rich service data into text-only context for the AI
const getContextFromData = (): string => {
  const servicesContext = servicesData.map(service => {
    return `
Service: ${service.title}
Description: ${service.shortDescription}
Full Details: ${service.fullDescription}
Benefits: ${service.benefits.join(', ')}
Use Cases: ${service.useCases.join(', ')}
Pricing: ${service.pricing.map(p => `${p.name} (${p.price} ${p.period}): ${p.description}`).join('; ')}
FAQs: ${service.faq ? service.faq.map(f => `Q: ${f.question} A: ${f.answer}`).join(' | ') : 'N/A'}
    `.trim();
  }).join('\n\n');

  return `
You are the AITHRA AI Assistant, a sophisticated virtual agent for a high-performance automation agency.
Your goal is to help users understand our services, qualify leads, and guide them to book a consultation.

CORE DATA:
${servicesContext}

GENERAL INFO:
- Agency Name: Aithra Automation
- Location: Delhi, India
- Contact: info.aithra@gmail.com
- Process: 1. Audit & Strategy, 2. Build & Integrate, 3. Launch & Scale.

GUIDELINES:
- Tone: Futuristic, professional, concise, helpful.
- If asked about pricing, mention the starting prices but emphasize that we offer custom enterprise solutions.
- If the user seems interested, encourage them to click "Book Consultation" or "Get Free Audit".
- Keep responses under 3-4 sentences unless explaining a technical concept.
- Do not make up services we do not offer. We focus on AI Chatbots, Workflow Automation, Predictive Analytics, AI Development, Data Integration, and Voice Agents.
  `.trim();
};

export const generateBusinessAudit = async (businessDescription: string): Promise<AuditResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this business description: "${businessDescription}". 
      Provide a brief analysis of potential inefficiencies and 3 specific AI automation suggestions to improve their workflow or revenue.
      Return the result as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "A 1-2 sentence analysis of the business type and potential bottlenecks." },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING, description: "A concrete automation idea." },
              description: "List of 3 distinct suggestions."
            }
          },
          required: ["analysis", "suggestions"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AuditResult;
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    throw error;
  }
};

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const systemInstruction = getContextFromData();

    // Transform local message history to Gemini SDK format
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I am processing that request but received no output.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I am currently experiencing high network traffic. Please try again in a moment.";
  }
};