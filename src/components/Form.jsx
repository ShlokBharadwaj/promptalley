import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex flex-col justify-center items-center">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl">
        <span className="bg-gradient-to-r from-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent text-center">
          {type} Post
        </span>
      </h1>
      <p className="mt-5 text-lg  sm:text-xl text-center max-w-md">
        {type} a post to share with the community. You can include a prompt and a tag to help others find your post.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-full flex flex-col justify-center items-center text-center mt-5 rounded-xl shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5"
      >
        <label>
          <span className="font-satoshi font-semibold text-base">
            Your Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="w-full max-w-full h-32 p-2 mt-4 text-base rounded-md bg-transparent resize-none outline-none text-center ring-2 ring-[#a8dadc] ring-opacity-20"
            placeholder="What's on your mind?"
            required
          />

        </label>
        <label className="mt-2">
          <span className="font-satoshi font-semibold text-base">
            Tag
            <span className="text-xs text-gray-500 ml-2">(#web #lifestyle)</span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...tag, tag: e.target.value })}
            className="w-full max-w-full h-32 p-2 mt-4 text-base rounded-md bg-transparent resize-none outline-none text-center ring-2 ring-[#a8dadc] ring-opacity-20"
            placeholder="What's on your mind?"
            required
          />

        </label>
      </form>
    </section>
  )
}

export default Form;