import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

const UpdatePrompt = () => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
        image: null,
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    // console.log(promptId);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            return alert('Prompt not found');
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            // const text = await res.text();
            // console.log("The text data is: ", text);
            // if (!res.ok) {
            //     console.log('Failed to fetch prompt', res.status);
            //     return;
            // }
            const data = await res.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        if (promptId) {
            fetchPosts();
        }
    }, [promptId])

    return (
        <div>
            <Form
                type="Update"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </div>
    )
}

export default UpdatePrompt;