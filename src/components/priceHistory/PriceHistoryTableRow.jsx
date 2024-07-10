import { useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";

import { useFetchData } from "../../hooks/useFetchData";
import ErrorUI from "../UI/ErrorUI";
import Loading from "../UI/Loading";
import NothingToShow from "../UI/NothingToShow";

const ProductTableRow = () => {
	let { id } = useParams();
	const [data, isLoading, isError] = useFetchData(`products/${id}/history`);

	return (
		<>
			{!isError && !isLoading && data.length <= 0 && (
				<Box
					sx={{
						width: "100%",
						height: "400px",
						position: "relative",
					}}
					component='tr'
				>
					<TableCell
						sx={{
							position: "absolute",
							top: "50%",
							transform: "translate(-50%, -50%)",
							left: {
								xs: "17%",
								sm: "30%",
								md: "50%",
							},
						}}
					>
						<NothingToShow />
					</TableCell>
				</Box>
			)}
			{isError && !isLoading && (
				<Box
					sx={{
						width: "100%",
						height: "400px",
						position: "relative",
					}}
					component='tr'
				>
					<TableCell
						sx={{
							position: "absolute",
							top: "50%",
							transform: "translate(-50%, -50%)",
							left: {
								xs: "17%",
								sm: "30%",
								md: "50%",
							},
						}}
					>
						<ErrorUI />
					</TableCell>
				</Box>
			)}
			{isLoading && !isError && (
				<Box
					sx={{
						width: "100%",
						height: "400px",
						position: "relative",
					}}
					component='tr'
				>
					<TableCell
						sx={{
							position: "absolute",
							top: "50%",
							transform: "translate(-50%, -50%)",
							left: {
								xs: "17%",
								sm: "30%",
								md: "50%",
							},
						}}
					>
						<Loading size={100} thickness={1} />
					</TableCell>
				</Box>
			)}

			{!isLoading &&
				!isError &&
				data.map((item) => (
					<TableRow
						key={item.id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<TableCell align='center' sx={{ fontWeight: "bold" }}>
							{item.date}
						</TableCell>

						<TableCell align='center' className='font_bn'>
							{item.name}
						</TableCell>
						<TableCell align='center'>{item.buyingPrice}</TableCell>
						<TableCell align='center'>{item.sellingPrice}</TableCell>
						<TableCell align='center'>{item.buyingPoint}</TableCell>
						<TableCell align='center'>
							<IconButton aria-label='delete' color='error' title='Delete Row'>
								<DeleteIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				))}
		</>
	);
};

export default ProductTableRow;
