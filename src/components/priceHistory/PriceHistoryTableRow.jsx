import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell, TableRow, IconButton } from "@mui/material";

const ProductTableRow = () => {
	const rows = [1];

	return rows.map(() => (
		<TableRow
			key={"01"}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell align='center' sx={{ fontWeight: "bold" }}>
				01/05/2024
			</TableCell>

			<TableCell align='center' className='font_bn'>
				1.6 KG কোদাল
			</TableCell>
			<TableCell align='center'>220</TableCell>
			<TableCell align='center'>350</TableCell>
			<TableCell align='center'>Shiyakhala</TableCell>
			<TableCell align='center'>
				<IconButton aria-label='delete' color='error' title='Delete Row'>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	));
};

export default ProductTableRow;
