/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebase/FirebaseConfig";

function SearchBar({ getSearchedData, isSearched }) {
	const [searchValue, setSearchValue] = useState("");

	function searchOnChengeHandler(e) {
		setSearchValue(e.target.value);
		if (e.target.value == "") {
			isSearched(false);
		} else {
			searchItem(e.target.value);
			searchSubmit();
		}
	}

	function searchSubmit(e) {
		e && e.preventDefault();
		isSearched(true);
	}

	// function searchItem(searchVal) {}
	async function searchItem(searchVal) {
		const q = query(collection(database, "products"));
		const querySnapshot = await getDocs(q);
		let data = [];
		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		let sharched = data.filter((item) => {
			return item.name.includes(searchVal);
		});

		getSearchedData(sharched);
		console.log(sharched);
	}

	return (
		<Stack
			direction='row'
			sx={{ py: 3, justifyContent: "center" }}
			component='form'
			onSubmit={searchSubmit}
		>
			<TextField
				fullWidth
				placeholder='Search products...'
				className='font_bn'
				sx={{ maxWidth: "800px" }}
				value={searchValue}
				onChange={searchOnChengeHandler}
			/>
			<Button variant='contained' sx={{ p: 0 }} type='submit'>
				<Search sx={{ width: "30px", height: "30px" }} />
			</Button>
		</Stack>
	);
}

export default SearchBar;
