import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
            {data.map((prompt) => (
                <PromptCard
                    key={prompt._id}
                    prompt={prompt}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

export default PromptCardList;