import { Button, Stack, TableCell, TableRow } from "@mui/material";
import kodal from "../assets/kodal.webp";
import { Edit, History } from "@mui/icons-material";

const ProductTableRow = () => {
	const rows = [1];

	return rows.map((row) => (
		<TableRow
			key={row.name}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell component='th' scope='row' sx={{ fontWeight: "bold" }}>
				01.
			</TableCell>
			<TableCell align='center' sx={{ width: "150px", height: "150px" }}>
				<img
					src={kodal}
					alt='Product Image'
					style={{ border: "1px solid #34495E", borderRadius: "2px" }}
				/>
			</TableCell>
			<TableCell align='center' className='font_bn' sx={{ fontWeight: "bold" }}>
				১.৬ কেজি কোদাল
			</TableCell>
			<TableCell align='center'>220</TableCell>
			<TableCell align='center'>350</TableCell>
			<TableCell align='center'>Shiyakhala</TableCell>
			<TableCell align='center'>01/05/2024</TableCell>
			<TableCell align='right' sx={{ paddingRight: 0 }}>
				<Stack spacing={1}>
					<Button
						variant='contained'
						endIcon={<Edit />}
						sx={{
							backgroundColor: "#55AAFF",
							color: " #22313f",
							"&:hover": {
								backgroundColor: "#0F87FF",
							},
						}}
					>
						Edit
					</Button>
					<Button
						variant='outlined'
						endIcon={<History />}
						sx={{
							color: "#34495E",
							borderColor: "#34495E",
						}}
					>
						History
					</Button>
				</Stack>
			</TableCell>
		</TableRow>
	));
};

export default ProductTableRow;
