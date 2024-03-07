import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
    image: null,
  });

  const uploadImage = async () => {
    const storageRef = ref(storage, `images/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, post.image);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
          console.error('An error occurred while uploading the image:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      let newPost = { ...post };

      if (post.image) {
        const downloadURL = await uploadImage();
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