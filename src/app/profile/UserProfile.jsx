import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const UserProfile = () => {

    const handleEdit = () => {
    }

    const handleDelete = async () => {
    }

    return (
        <Profile
            name="John Doe"
            desc="I'm a software engineer. I love to code and learn new things. I'm also a fan of open source."
            data={[]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default UserProfile;