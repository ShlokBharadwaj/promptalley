import Link from "next/link";

import cloudinary from "@/utils/cloudinary";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', promptalley_preset); // Replace with your Cloudinary upload preset
      formData.append('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.secure_url; // Get the secure URL of the uploaded image
      // Store the imageUrl in your post data before submitting the form
      setPost({ ...post, imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  return (
    <section className="w-full max-w-full flex flex-col justify-center items-center text-center">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl">
        <span className="bg-gradient-to-r from-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent">
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
            Tag&nbsp;
            <span className="text-xs text-gray-500 ml-2">(#web #lifestyle)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="w-full max-w-full p-2 mt-4 text-base rounded-md bg-transparent outline-none text-center ring-2 ring-[#a8dadc] ring-opacity-20"
            placeholder="Add a tag to your post without the # symbol. Separate tags with a space."
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="w-full max-w-full p-2 mt-4 text-base rounded-md bg-transparent outline-none text-center ring-2 ring-[#a8dadc] ring-opacity-20"
            // required
          />
        </label>
        <div className="flex justify-end items-center mx-3 mb-5 gap-4 mt-4">
          <Link href={"/"}
            className="text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="w-24 h-10 text-white bg-gradient-to-r from-[#457b9d] to-[#a8dadc] rounded-md hover:from-[#a8dadc] hover:to-[#457b9d] focus:outline-none focus:ring-2 focus:ring-[#a8dadc] focus:ring-opacity-50 transition duration-300 ease-in-out focus:scale-95 hover:scale-105"
          >{submitting ? `${type}...` : type}</button>
        </div>
      </form>
    </section>
  )
}

export default Form;