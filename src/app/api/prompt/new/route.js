import { connectToDatabase } from '@/utils/database';
import Prompt from "@/models/prompt";

export const POST = async (req, res) => {
    const { prompt, tag, userId, image } = await req.json();

    try {
        await connectToDatabase();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            image,
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create prompt", { status: 500 });
    }
};