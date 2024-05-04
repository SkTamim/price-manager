import { useEffect, useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { database } from "../firebase/FirebaseConfig";

export function useFetchData(url) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	function getData() {
		let dataArr = [];
		getDocs(query(collection(database, url)))
			.then((responce) => {
				responce.docs.map((item) => {
					dataArr.push(item.data());
				});
				setData(dataArr);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log("Getting error form use fetch data custom hook", err);
				setIsLoading(false);
				setIsError(true);
			});
	}
	useEffect(() => {
		getData();
	}, []);

	return [data, isLoading, isError];
}
