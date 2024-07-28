import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { isEqual } from 'lodash';
import { v4 } from 'uuid';

import { database } from '../../firebase/FirebaseConfig';

// UPDATE DATA FUNCTION
export const updateProduct = async (updatedData) => {
	// FETCHING DATA FROM FIREBASE
	let feedback = getDocument(updatedData.id).then((result) => {
		// CREATING TWO NEW OBJECT FORM UPDATED DATA AND PREVIOUS DATA WITHOUT DATE FOR COMPARISON. BECAUSE DATE WILL BE CHANGED WITH UPDATE EVERY TIME
		const newData = { ...updatedData, date: "" };
		const oldData = { ...result, date: "" };

		let compare = isEqual(newData, oldData);
		if (compare) {
			return {
				status: false,
				message:
					"Entred data is same as previous. If you want to update please change what you want to change",
			};
		} else {
			// ADDING PERVIOUS DATA TO THE History
			addHistory(result);

			// IF DATA CHENGED THEN, UPDATING THE DATA
			try {
				updateDoc(
					doc(
						database,
						"companies/sk-hardwares/products",
						String(updatedData.id)
					),
					updatedData
				);
				return { status: true, message: "Data updated succesfully!" };
			} catch (err) {
				console.log(err, "from updated product");
				return {
					status: false,
					message:
						"Something went wrong, data not updated...Please try again...",
				};
			}
		}
	});

	feedback.then((r) => {
		feedback = r;
	});

	return feedback;
};

// Add main data to History page before updating the data
async function addHistory(oldData) {
	delete oldData.image;
	await addDoc(
		collection(
			database,
			`companies/sk-hardwares/histories/${oldData.id}/history-items`
		),
		{
			...oldData,
			timestamp: serverTimestamp(),
			id: v4(),
		}
	);
}

async function getDocument(id) {
	const q = query(
		collection(database, "companies/sk-hardwares/products"),
		where("id", "==", Number(id))
	);
	const querySnapshot = await getDocs(q);
	let data;
	querySnapshot.forEach((doc) => {
		data = doc.data();
	});
	return data;
}
