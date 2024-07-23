import Compressor from 'compressorjs';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { v4 } from 'uuid';

import {
  database,
  storage,
} from '../../firebase/FirebaseConfig';

const databaseReference = collection(
	database,
	"companies/sk-hardwares/products"
);

export function submitForm(data, isSuccess) {
	let mainData;

	// Add data to firebase
	const addData = async (dataObject) => {
		try {
			await setDoc(
				doc(database, "companies/sk-hardwares/products", String(dataObject.id)),
				dataObject
			);
		} catch (error) {
			isSuccess(false);
			throw new Error(
				"Data not submitted, getting error from addData function : \n" + error
			);
		}

		//Send Success massege
		isSuccess(true);
	};

	// Add image to firebase storage function_
	const addImage = (image) => {
		const filePathRef = ref(
			storage,
			`/companies/sk-hardwares/products/${image.name}${v4()}`
		);
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

	// GETTING LAST ID OF PRODUCT FUNCTION
	function getLastDataID() {
		const initialQuery = query(
			databaseReference,
			orderBy("id", "desc"),
			limit(1)
		);

		getDocs(initialQuery)
			.then((response) => {
				// IF DATABASE IS NOT EMPTY THEN TINCRIMENT THE 1 TO THE LAST ID AND SET DATA
				if (!response.empty) {
					const currentDataId = response.docs[0].data().id + 1;
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
							addData(mainData);
						}
					} else {
						addData(mainData);
					}
				} else {
					// IF DATABASE IS EMPTY THEN SET THE ID 01 AND SUBMIT THE DATA
					mainData = { ...data, id: 1 };

					// IF THERE IS IMAGE AVAILABE THEN ADD THE IMAGE TO THE DATA
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
						// IF THERE IS IMAGE NOT AVAILABE THEN ADD THE DATA
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
