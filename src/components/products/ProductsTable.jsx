/* eslint-disable react/prop-types */
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import ProductTableRow from "../products/ProductTableRow";
import SearchedProductTableRow from "../search/SearchedProductTableRow";

const ProductsTable = ({ sharchedData, isSearched }) => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 900 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>ID No.</TableCell>
						<TableCell align='center'>Product Name</TableCell>
						<TableCell align='center'>Buying Price (₹)</TableCell>
						<TableCell align='center'>Selling Price (₹)</TableCell>
						<TableCell align='center'>Buying Point </TableCell>
						<TableCell align='center'>Date </TableCell>
						<TableCell align='center'>Product Image</TableCell>
						<TableCell align='right'>Action Tab </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{!isSearched && <ProductTableRow />}
					{isSearched && (
						<SearchedProductTableRow searchedData={sharchedData} />
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductsTable;
