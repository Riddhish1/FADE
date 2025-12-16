import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";


export async function POST(req) {
    const {prompt} = await req.json();

    try {
        const result = await GenAiCode.sendMessage(prompt);
        const resp = result.response.text();
        return NextResponse.json(JSON.parse(resp));
        
    } catch (error) {
        console.log(error);
        
        // Handle rate limit errors
        if (error.status === 429) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please wait a minute and try again. You've hit the free tier limit for Gemini API." },
                { status: 429 }
            );
        }
        
        return NextResponse.json(
            { error: error.message || "An error occurred while generating code" },
            { status: 500 }
        );
    }
}