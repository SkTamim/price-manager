import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import ProductTableRow from "../products/ProductTableRow";

const ProductsTable = () => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 900 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>SL No.</TableCell>
						<TableCell align='center'>Product Image</TableCell>
						<TableCell align='center'>Product Name</TableCell>
						<TableCell align='center'>Buying Price (₹)</TableCell>
						<TableCell align='center'>Selling Price (₹)</TableCell>
						<TableCell align='center'>Buying Point </TableCell>
						<TableCell align='center'>Date </TableCell>
						<TableCell align='right'>Action Tab </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<ProductTableRow />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductsTable;
