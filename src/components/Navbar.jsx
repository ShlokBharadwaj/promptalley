'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setProviders();
  }, [])

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

      {/* Desktop */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href={"/create-prompt"}
              className="text-white font-semibold hover:text-gray-300 text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm"
            >Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="text-white font-semibold hover:text-gray-300 text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm"
            >Sign Out
            </button>
            <Link
              href={"/profile"}
            >
              <Image
                src={"/assets/images/promptalley-logos.jpeg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Picture"
              >
              </Image>
            </Link>
          </div>
        ) :
          <>
            {providers && Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="text-white font-semibold hover:text-gray-300 text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm"
                >Sign In with {provider.name}
                </button>
              </div>
            ))
            }
          </>
        }
      </div>

      {/* Mobile */}
      <div></div>
    </nav>
  )
}

export default Navbar;