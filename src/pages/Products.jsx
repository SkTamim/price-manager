import { useState } from "react";

import { Typography } from "@mui/material";

import ProductsTable from "../components/products/ProductsTable";
import SearchBar from "../components/search/SearchBar";

function Products() {
	// FOR SEARCH FUNCTIONALITY
	const [searchedItems, setSearchedItems] = useState([]);
	const [searched, setSearched] = useState(false);

	function getSearchedData(data) {
		setSearchedItems(data);
	}
	function isSearched(isSearched) {
		setSearched(isSearched);
	}
	return (
		<>
			<SearchBar getSearchedData={getSearchedData} isSearched={isSearched} />
			<Typography
				component='h1'
				variant='h4'
				align='center'
				textTransform='uppercase'
				fontWeight='bold'
				marginBottom='20px'
			>
				Products
			</Typography>

			<ProductsTable sharchedData={searchedItems} isSearched={searched} />
		</>
	);
}

export default Products;
