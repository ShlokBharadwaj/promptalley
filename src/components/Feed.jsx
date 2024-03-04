'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {

  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchPosts, setSearchPosts] = useState(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setSearchPosts(data);
    }

    fetchPosts();
  }, []);

  const filteredPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((post) =>
      regex.test(post.prompt) ||
      regex.test(post.creator.username) ||
      (post.tags && post.tags.match(/#\S+|\S+/g).some(tag => regex.test(tag.startsWith('#') ? tag : '#' + tag)))
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(setTimeout(() => {
      setSearchPosts(filteredPosts(e.target.value));
    }, 500));
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchPosts(filteredPosts(tag));
  };

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
        data={searchPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed;