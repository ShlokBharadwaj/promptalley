'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    console.log("Posts are: ", posts);
    setFilteredPosts(
      posts.filter(post =>
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))) ||
        (post.user && post.user.toLowerCase().includes(searchText.toLowerCase())) ||
        (post.prompt && post.prompt.toLowerCase().includes(searchText.toLowerCase()))
      )
    );
  }, [searchText, posts]);

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
        data={filteredPosts}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  )
}

export default Feed;