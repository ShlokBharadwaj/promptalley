import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = () => {

    const { data: session } = useSession();

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

    const handleEdit = () => {
    }

    const handleDelete = async () => {
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