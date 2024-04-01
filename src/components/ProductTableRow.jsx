import { TableCell, TableRow } from "@mui/material";

const ProductTableRow = () => {
	function createData(name, calories, fat, carbs, protein) {
		return { name, calories, fat, carbs, protein };
	}
	const rows = [
		createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
		createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
		createData("Eclair", 262, 16.0, 24, 6.0),
		createData("Cupcake", 305, 3.7, 67, 4.3),
		createData("Gingerbread", 356, 16.0, 49, 3.9),
	];

	return rows.map((row) => (
		<TableRow
			key={row.name}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell component='th' scope='row'>
				01.
			</TableCell>
			<TableCell align='center'>{row.calories}</TableCell>
			<TableCell align='center'>{row.fat}</TableCell>
			<TableCell align='center'>{row.carbs}</TableCell>
			<TableCell align='center'>{row.protein}</TableCell>
			<TableCell align='center'>{row.carbs}</TableCell>
			<TableCell align='center'>{row.protein}</TableCell>
		</TableRow>
	));
};

export default ProductTableRow;
