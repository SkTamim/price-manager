/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { Edit, History } from "@mui/icons-material";
import { Box, Button, Stack, TableCell, TableRow } from "@mui/material";

import dummyProductImg from "../../assets/images/product.png";
import { useFetchData } from "../../hooks/useFetchData";
import ProductEditModal from "../products/ProductEditModal";
import DataNotFound from "../UI/DataNotFound";
import ErrorUI from "../UI/ErrorUI";
import Loading from "../UI/Loading";

const ProductTableRow = ({ searchedData, isSearched }) => {
	const [data, setData] = useState([]);

	// FETCHIGN DATA FORM FIREBASE USING CUSTOM HOOK
	const [newData, isLoading, isError] = useFetchData(
		"companies/sk-hardwares/products"
	);

	// EDIT PRODUCT MODAL FETCH DATA, STATE AND EVENT HANDLERS
	const [targetEditId, setTargetEditId] = useState(null);
	const [openEditModal, setOpenEditModal] = useState(false);

	const handleEditModalClose = () => {
		setOpenEditModal(false);
	};

	// DATA UPDATED RE RENDER
	const clickedEditButtonRowRef = useRef(null);
	function isUpdated(updatedData) {
		const index = clickedEditButtonRowRef.current.getAttribute("index");
		data[index] = updatedData;
	}

	// SEARCH FUNCTIONALITY
	useEffect(() => {
		if (isSearched) {
			setData(searchedData);
			return;
		}
		setData(newData);
	}, [isSearched, searchedData, newData]);

	const searchedDataZero = isSearched && data.length <= 0;

	return (
		<>
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
				data.map((product, index) => (
					<TableRow
						id={product.id}
						key={product.id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						index={index}
					>
						<TableCell component='th' scope='row' sx={{ fontWeight: "bold" }}>
							{index + 1}
						</TableCell>

						<TableCell
							align='center'
							className='font_bn'
							sx={{ fontWeight: "bold" }}
						>
							{product.name}
						</TableCell>
						<TableCell align='center' sx={{ position: "relative" }}>
							{product.buyingPrice} / {product.buyingUnit}
							<div
								style={{
									position: "absolute",
									left: "20%",
									bottom: "20px",
									width: "max-content",
								}}
							>
								{product.priceInfo && <strong>Additional Price Info : </strong>}
								{product.priceInfo && product.priceInfo}
							</div>
						</TableCell>
						<TableCell align='center'>
							{product.sellingPrice} / {product.sellingUnit}
						</TableCell>

						<TableCell align='center'>{product.buyingPoint}</TableCell>
						<TableCell align='center'>{product.date}</TableCell>
						<TableCell align='center' sx={{ width: "150px", height: "150px" }}>
							<img
								src={product.image || dummyProductImg}
								alt='Product Image'
								style={{ border: "1px solid #34495E", borderRadius: "2px" }}
							/>
						</TableCell>
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
									onClick={(e) => {
										setOpenEditModal(true);
										setTargetEditId(e.target.closest("tr").id);
										clickedEditButtonRowRef.current = e.target.closest("tr");
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
									component={Link}
									to={`/price-history/${product.id}`}
								>
									History
								</Button>
							</Stack>
						</TableCell>
					</TableRow>
				))}

			{searchedDataZero && (
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
						<DataNotFound />
					</TableCell>
				</Box>
			)}

			<ProductEditModal
				handleEditModalClose={handleEditModalClose}
				openEditModal={openEditModal}
				isUpdated={isUpdated}
				targetEditId={targetEditId}
				clickedEditButtonRowRef={clickedEditButtonRowRef}
			/>
		</>
	);
};

export default ProductTableRow;
