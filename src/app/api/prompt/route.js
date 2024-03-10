import { connectToDatabase } from '@/utils/database';
import Prompt from "@/models/prompt";

export const GET = async (req, res) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({}).populate("creator");

        // Set the Cache-Control header to no-store in the response, to prevent caching.
        res.setHeader('Cache-Control', 'no-store');

        return new Response(JSON.stringify(prompts), {
            status: 200,
        })
    } catch (error) {
        return new Response("Failed to fetch prompts", {
            status: 500,
        })
    }
}