'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const filteredPosts = (searchText) => {
    const regex = new RegExp(searchText.replace('#', ''), "i");
    const filtered = posts.filter((post) =>
      regex.test(post.prompt) ||
      regex.test(post.creator.username) ||
      (post.tag && post.tag.split(' ').some(tag => regex.test(tag)))
    );
    return filtered;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for tags, users, or prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-full max-w-full p-2 mt-4 text-base rounded-md bg-transparent outline-none text-center ring-2 ring-[#a8dadc] ring-opacity-20"
        />
      </form>

      <PromptCardList
        data={filteredPosts(searchText)}
        handleTagClick={(tag) => {
          setSearchText(tag)
        }}
      />
    </section>
  )
}

export default Feed;