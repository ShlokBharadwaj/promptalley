import React from 'react';
import PromptCard from "./PromptCard";

const Profiles = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-center">
        <span className="bg-gradient-to-r from-[#52b788] to-[#95d5b2] bg-clip-text text-transparent text-center">
          {name}
        </span>
        's Profile
      </h1>
      <p className="mt-5 text-lg sm:text-xl max-w-2xl">{desc}</p>
      <div className="mt-16 space-y-6 py-8 sm:columns-2 xl:columns-3 sm:gap-6 items-center justify-center">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profiles;