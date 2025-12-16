import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { prompt} = await req.json();

    try {
        const result = await chatSession.sendMessage(prompt);
        const AIResp = result.response.text();
        return NextResponse.json({result: AIResp});
    } catch (error) {
        console.error(error);
        
        // Handle rate limit errors
        if (error.status === 429) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please wait a minute and try again. You've hit the free tier limit for Gemini API." },
                { status: 429 }
            );
        }
        
        return NextResponse.json(
            { error: error.message || "An error occurred while processing your request" },
            { status: 500 }
        );
    }
}