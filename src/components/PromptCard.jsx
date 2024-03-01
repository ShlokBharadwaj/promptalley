'use client';

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import React from 'react';

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
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
      </div>
    </div>
  )
}

export default PromptCard;