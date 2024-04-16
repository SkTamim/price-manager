import {
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import { database, storage } from "../../firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Compressor from "compressorjs";
import { v4 } from "uuid";

const databaseReference = collection(database, "products");

export function submitForm(data, isSuccess) {
	let mainData;

	// Add data to firebase
	const addData = async (dataObject) => {
		await setDoc(doc(database, "products", dataObject.id), dataObject);

		//Send Success massege
		isSuccess(true);
	};

	// Add image to firebase storage function_
	const addImage = (image) => {
		const filePathRef = ref(storage, `products/${image.name}${v4()}`);
		uploadBytes(filePathRef, image).then(() => {
			console.log("image uploaded");

			// Getting image url form firebase strage and adding the url to the main data Object and Send data finally 🤩
			getDownloadURL(ref(storage, filePathRef))
				.then((url) => {
					// Add data to firestore
					mainData = { ...mainData, image: url };
					addData(mainData);
				})
				.catch((error) => {
					console.log("Getting error form getDownloadURL function " + error);
					isSuccess(false);
				});
		});
	};

	function getLastDataID() {
		const initialQuery = query(
			databaseReference,
			orderBy("id", "desc"),
			limit(1)
		);

		getDocs(initialQuery)
			.then((response) => {
				if (!response.empty) {
					let currentDataId = +response.docs[0].data().id + 1;
					currentDataId = String(currentDataId);
					let checkZero =
						currentDataId.includes(0) || currentDataId.length >= 2;
					if (!checkZero) {
						currentDataId = "0" + currentDataId;
					}

					mainData = { ...data, id: currentDataId };
					if (data.image) {
						if (data.image.name) {
							// Compress the image=============
							new Compressor(data.image, {
								quality: 0,
								resize: "cover",
								width: "150px",
								height: "150px",
								success(compressedImg) {
									// Add Compressed Image to firebase storage
									addImage(compressedImg);
								},
								error(err) {
									console.log("Getting error form Compressor Class " + err);
									isSuccess(false);
								},
							});
						} else {
							mainData = { ...data, id: currentDataId };
							addData(mainData);
						}
					} else {
						mainData = { ...data, id: currentDataId };
						addData(mainData);
					}
				} else {
					mainData = { ...data, id: "01" };

					if (data.image.name) {
						// Compress the image=============
						new Compressor(data.image, {
							quality: 0,
							resize: "cover",
							width: "150px",
							height: "150px",
							success(compressedImg) {
								// Add Compressed Image to firebase storage
								addImage(compressedImg);
							},
							error(err) {
								console.log("Getting error form Compressor Class " + err);
								isSuccess(false);
							},
						});
					} else {
						addData(mainData);
					}
				}
			})
			.catch((err) => {
				console.log("Getting error form getLastId function" + err);
				isSuccess(false);
			});
	}
	getLastDataID();
}
