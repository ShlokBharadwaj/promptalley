import { storage } from "@/utils/firebase";
import { ref, deleteObject } from "firebase/storage";

const deleteImage = async (imageURL) => {
    const storageRef = ref(storage, imageURL);

    return deleteObject(storageRef)
        .then(() => {
            console.log('Image deleted successfully');
        })
        .catch((error) => {
            console.error('An error occurred while deleting the image:', error);
        });
};

export default deleteImage;