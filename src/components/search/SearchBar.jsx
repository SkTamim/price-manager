import "bootstrap/dist/css/bootstrap.css";

/* eslint-disable react/prop-types */
import { useState } from "react";

import { collection, getDocs, query } from "firebase/firestore";

import { Checkbox, Stack, TextField } from "@mui/material";

import { database } from "../../firebase/FirebaseConfig";
import SearchWithBengali from "./SearchWithBengali";

function SearchBar({ getSearchedData, isSearched }) {
	const [searchValue, setSearchValue] = useState("");
	const [bengaliCheck, setBengaliCheck] = useState(false);

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
			sx={{
				py: 3,
				justifyContent: "center",
				flexDirection: "row",
			}}
			component='form'
			onSubmit={searchSubmit}
		>
			{bengaliCheck ? (
				<SearchWithBengali
					getSearchedData={getSearchedData}
					isSearched={isSearched}
				/>
			) : (
				<TextField
					fullWidth
					placeholder='Search products...'
					className='font_bn'
					sx={{ maxWidth: "800px", borderRight: "none" }}
					value={searchValue}
					onChange={searchOnChengeHandler}
				/>
			)}

			<label
				style={{
					border: "1px solid #949191a1",
					borderRadius: "3px",
					width: "65px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
					userSelect: "none",
				}}
				htmlFor='bengaliCheck'
			>
				<Checkbox
					sx={{ p: 0 }}
					id='bengaliCheck'
					checked={bengaliCheck}
					onChange={() => {
						setBengaliCheck((prev) => !prev);
					}}
				/>
				<p
					style={{
						fontSize: "12px",
						color: "rgba(0, 0, 0, 0.4)",
						textAlign: "center",
						padding: 0,
						margin: 0,
						lineHeight: "1",
					}}
				>
					Bengali Transcript
				</p>
			</label>
		</Stack>
	);
}

export default SearchBar;
