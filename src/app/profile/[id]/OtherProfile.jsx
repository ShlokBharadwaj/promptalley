import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Profile from "@/components/Profile";

const OtherProfile = () => {

    // const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState('');

    const pathName = usePathname();
    console.log('pathName:', pathName);
    const userId = pathName.split('/').pop();
    console.log('userId:', userId);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            console.log('data:', data);

            if (data.length > 0) {
                setUserName(data[0].creator.username);
            }

            setPosts(data);
        }

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s profile page. Here you can view their prompts.`}
            data={posts}
        />
    )
}

export default OtherProfile;