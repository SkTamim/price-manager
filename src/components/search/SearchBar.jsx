import { useState } from 'react';

import {
  collection,
  getDocs,
  query,
} from 'firebase/firestore';

/* eslint-disable react/prop-types */
import { Search } from '@mui/icons-material';
import {
  Button,
  Stack,
  TextField,
} from '@mui/material';

import { database } from '../../firebase/FirebaseConfig';

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

	async function searchItem(searchVal) {
		// GETTING DATA FORM FIREBASE
		const q = query(collection(database, "companies/sk-hardwares/products"));
		const querySnapshot = await getDocs(q);
		let data = [];
		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		// FILTERING DATA BASED OF THE SEARCH
		let sharched = data.filter((item) => {
			const regex = new RegExp(searchVal, "gi");
			return item.name.match(regex);
		});

		// SENDING SEARCHED ITEMS
		getSearchedData(sharched);
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
