import { TableCell, TableRow } from "@mui/material";
import kodal from "../assets/images/kodal.webp";

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
			<TableCell align='center' sx={{ width: "150px", height: "150px" }}>
				<img
					src={kodal}
					alt='Product Image'
					style={{ border: "1px solid #34495E", borderRadius: "2px" }}
				/>
			</TableCell>
		</TableRow>
	));
};

export default ProductTableRow;
