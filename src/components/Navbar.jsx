'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full mb-0 pt-0">
      <Link
        href={"/"}
        className="flex justify-center items-center gap-2"
      >
        <Image
          src={"/assets/images/promptalley-logos_white.png"}
          width={160}
          height={160}
          className="bg-contain w-44 h-44 -my-8"
        >
        </Image>
      </Link>
    </nav>
  )
}

export default Navbar;