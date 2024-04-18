import { Typography } from "@mui/material";
import ProductsTable from "../components/products/ProductsTable";
import SearchBar from "../components/search/SearchBar";
import { useState } from "react";

function Products() {
	const [searchedItems, setSearchedItems] = useState([]);
	const [searched, setSearched] = useState(false);

	console.log(searchedItems);
	function getSearchedData(data) {
		setSearchedItems(data);
	}
	function isSearched(isSearched) {
		setSearched(isSearched);
		console.log(isSearched);
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
