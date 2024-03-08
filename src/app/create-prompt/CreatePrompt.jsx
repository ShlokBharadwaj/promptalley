import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

import uploadImage from "@/utils/uploadImage";

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
    image: null,
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let newPost = { ...post };

      if (post.image) {
        const downloadURL = await uploadImage(post.image);
        newPost.image = downloadURL;
      }

      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          image: newPost.image,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default CreatePrompt;