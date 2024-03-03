import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if (session?.user.id) {
            fetchPosts();
        }

    }, []);

    const handleEdit = (prompt) => {
        router.push(`/update-prompt?id=${prompt._id}`);
    }

    const handleDelete = async (prompt) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${prompt._id.toString()}`, {
                    method: 'DELETE',
                });

                setPosts(posts.filter((post) => post._id !== prompt._id));
            } catch (error) {
                console.error('An error occured while trying to delete the post.', error);
            }
        }
    }

    return (
        <Profile
            name="John Doe"
            desc="I'm a software engineer. I love to code and learn new things. I'm also a fan of open source."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default UserProfile;