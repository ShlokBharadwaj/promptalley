import { connectToDatabase } from '@/utils/database';
import Prompt from "@/models/prompt";
import User from "@/models/user";

export const GET = async (request) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({}).populate({
            path: 'creator',
        });

        const response = new Response(JSON.stringify(prompts), {
            status: 200,
        });

        const url = new URL(request.url);
        url.searchParams.set("t", Date.now());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());

        return response;

    } catch (error) {
        return new Response("Failed to fetch prompts", {
            status: 500,
        })
    }
}