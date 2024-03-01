import Feed from "@/components/Feed";

const App = () => {
    return (
        <section className="w-full flex justify-center items-center flex-col">
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-center">Find &amp; Share
                <br />
                <span className="bg-gradient-to-r from-[#eea689]  to-[#eb8b65] bg-clip-text text-transparent text-center">AI-curated prompts</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl max-w-2xl text-center">Promptalley is a community-driven platform where users can discover, share, and collaborate on creative prompts for various writing and brainstorming purposes. Explore a diverse range of prompts contributed by our community and unleash your creativity today!</p>

            <Feed />
        </section>
    )
}

export default App;