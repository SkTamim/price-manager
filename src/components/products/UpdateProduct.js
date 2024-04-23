import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/FirebaseConfig";

// Add data to firebase
export const updateProduct = async (data) => {
	await updateDoc(doc(database, "products", data.id), data);
	return true;
};
