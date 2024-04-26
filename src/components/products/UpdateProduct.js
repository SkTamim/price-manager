import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
	addDoc,
} from "firebase/firestore";
import { database } from "../../firebase/FirebaseConfig";
import { isEqual } from "lodash";

// UPDATE DATA FUNCTION
export const updateProduct = async (data) => {
	// FETCHING DATA FROM FIREBASE AND COMPARING TO THE SUBMITTED DATA
	let feedback = getDocument(data.id).then((result) => {
		const newData = {
			buyingPoint: result.buyingPoint,
			buyingPrice: result.buyingPrice,
			id: result.id,
			name: result.name,
			sellingPrice: result.sellingPrice,
		};

		let compare = isEqual(newData, data);
		if (compare) {
			return {
				status: false,
				message:
					"Entred data is same as previous. If you want to update please change what you want to change",
			};
		} else {
			addHistory(result);

			// IF DATA CHENGED THEN, UPDATING THE DATA
			updateDoc(doc(database, "products", data.id), {
				...data,
				date: new Date().toLocaleDateString(),
			});

			return { status: true, message: "Data updated succesfully" };
		}
	});

	feedback.then((r) => {
		feedback = r;
	});

	return feedback;
};

// Add main data to History page before updating the data
async function addHistory(data) {
	delete data.image;
	await addDoc(collection(database, `products/${data.id}/history`), data);
}

async function getDocument(id) {
	const q = query(collection(database, "products"), where("id", "==", id));
	const querySnapshot = await getDocs(q);
	let data;
	querySnapshot.forEach((doc) => {
		data = doc.data();
	});
	return data;
}
