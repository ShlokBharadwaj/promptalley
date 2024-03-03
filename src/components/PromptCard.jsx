'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from 'react';
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {

  const [copy, setCopy] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopy(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <div className="flex-1 break-inside-avoid rounded-lg bg-clip-padding shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-6 md:w-[360px] w-full h-fit text-center">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col justify-start items-start">
            <h3 className="font-satoshi font-semibold">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-400">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div
          className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex items-center justify-center cursor-pointer m-auto"
          onClick={handleCopy}
        >
          <FontAwesomeIcon
            icon={copy ? faCheck : faCopy}
            size="sm"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-start">{prompt.prompt}</p>
      <p
        className="font-inter text-sm bg-gradient-to-r from-[#eea689]  to-[#eb8b65] bg-clip-text text-transparent text-start"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag.split(' ').map(tag => tag.startsWith('#') ? tag : '#' + tag).join(' ')}
      </p>

      {session?.user.id === prompt.creator._id && pathName === '/profile' && (
        <div className="flex justify-between items-center mt-5">
          <button
            className="font-inter text-sm text-gray-400 hover:text-gray-600"
            onClick={() => handleEdit(prompt)}
          >
            Edit
          </button>
          <button
            className="font-inter text-sm text-red-400 hover:text-red-600"
            onClick={() => handleDelete(prompt.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default PromptCard;