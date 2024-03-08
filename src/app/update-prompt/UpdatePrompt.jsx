import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

import uploadImage from "@/utils/uploadImage";

const UpdatePrompt = () => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
        image: null,
    });
    const [oldImage, setOldImage] = useState(null);
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    // console.log(promptId);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            if (!promptId) {
                return alert('Prompt not found');
            }

            let newPost = { ...post };
            // console.log('The new post is: ', newPost);

            if (newPost.image instanceof File) {
                const downloadURL = await uploadImage(newPost.image);
                newPost.image = downloadURL;
            }

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({ ...newPost, oldImage }),
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
                image: data.image,
            });
            // console.log("Data image is: ", data.image);
            setOldImage(data.image);
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