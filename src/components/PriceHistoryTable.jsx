import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import PriceHistoryTableRow from "./PriceHistoryTableRow";

const PriceHistoryTable = () => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 900 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Date </TableCell>
						<TableCell align='center'>Product Name</TableCell>
						<TableCell align='center'>Buying Price (₹)</TableCell>
						<TableCell align='center'>Selling Price (₹)</TableCell>
						<TableCell align='center'>Buying Point </TableCell>
						<TableCell align='center'>Product Image</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<PriceHistoryTableRow />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PriceHistoryTable;
