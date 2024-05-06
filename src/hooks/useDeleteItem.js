import { useState } from "react";

import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

import { database } from "../firebase/FirebaseConfig";

export function useDeleteItem() {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	function deleteItem(url, id) {
		const q = query(collection(database, url), where("id", "==", id));
		getDocs(q)
			.then((responce) => {
				if (responce.empty == true) {
					setError(true);
				}
				responce.forEach((document) => {
					console.log(document.id);
					deleteDoc(doc(database, url, document.id))
						.then(() => setSuccess(true))
						.catch(() => setError(true));
				});
			})
			.catch(() => {
				setError(true);
			});
	}

	return [deleteItem, success, error];
}
