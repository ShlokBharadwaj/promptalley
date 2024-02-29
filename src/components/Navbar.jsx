'use client';

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, [])

  const renderProviderButtons = () => (
    providers && (
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            type="button"
            onClick={() => {
              signIn(provider.id)
              setShowSignInDropdown((prev) => !prev);
            }}
            className="block px-4 py-2 text-sm capitalize text-gray-700 hover:text-gray-500"
          >
            Sign In with {provider.name}
          </button>
        ))}
      </div>
    )
  );

  return (
    <nav className="flex justify-between items-center w-full mb-0 pt-0">
      <Link
        href={"/"}
        className="flex justify-center items-center gap-2 ml-[-14%] sm:ml-0"
      >
        <Image
          src={"/assets/images/promptalley-logos_white.png"}
          width={160}
          height={160}
          className="bg-contain w-full sm:w-44 h-full sm:h-44 -my-8"
          alt="PromptAlley Logo"
        >
        </Image>
      </Link>

      {/* Desktop */}
      <div className="hidden sm:flex">
        {session?.user ? (
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
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Picture"
              >
              </Image>
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSignInDropdown((prev) => !prev)}
              className="text-white font-semibold hover:text-gray-300 text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm flex"
            >
              Sign In
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {showSignInDropdown && renderProviderButtons()}
          </div>
        )
        }
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <FontAwesomeIcon
              icon={faBars}
              className="text-white text-2xl"
              onClick={() => { setToggleDropdown((prev) => !prev) }}
            />

            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[175px] flex flex-col gap-2 justify-end items-end">
                <Link
                  href={"/profile"}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => { setToggleDropdown(false) }}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => { setToggleDropdown(false) }}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                >Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSignInDropdown((prev) => !prev)}
              className="text-white font-semibold hover:text-gray-300 text-center items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm flex"
            >
              Sign In
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {showSignInDropdown && renderProviderButtons()}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;