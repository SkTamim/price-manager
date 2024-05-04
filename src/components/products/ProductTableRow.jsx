/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

import { Edit, History } from "@mui/icons-material";
import { Box, Button, Stack, TableCell, TableRow } from "@mui/material";

import dummyProductImg from "../../assets/images/product.png";
import { database } from "../../firebase/FirebaseConfig";
import { useFetchData } from "../../hooks/useFetchData";
import ProductEditModal from "../products/ProductEditModal";
import ErrorUI from "../UI/ErrorUI";
import Loading from "../UI/Loading";

const ProductTableRow = ({ searchedData, isSearched }) => {
	const [data, setData] = useState([]);

	// FEDTCHIGN DATA FORM FIREBASE USING CUSTOM HOOK
	const [newData, isLoading, isError] = useFetchData("products");

	useEffect(() => {
		if (isSearched) {
			setData(searchedData);
			return;
		}
		setData(newData);
	}, [isSearched, searchedData, newData]);

	// EDIT PRODUCT MODAL FETCH DATA, STATE AND EVENT HANDLERS
	const [editData, setEditData] = useState(null);

	const [openEditModal, setOpenEditModal] = useState(false);
	const handleEditModalOpen = (id) => {
		setOpenEditModal(true);
		getDocument(id);
	};
	const handleEditModalClose = () => {
		setOpenEditModal(false);
	};
	// GETTING EDIT DATA USING PRODUCT ID
	async function getDocument(id) {
		const q = query(collection(database, "products"), where("id", "==", id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setEditData(doc.data());
		});
	}

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
				data.map((product) => (
					<TableRow
						key={product.id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<TableCell component='th' scope='row' sx={{ fontWeight: "bold" }}>
							{product.id}
						</TableCell>

						<TableCell
							align='center'
							className='font_bn'
							sx={{ fontWeight: "bold" }}
						>
							{product.name}
						</TableCell>
						<TableCell align='center'>{product.buyingPrice}</TableCell>
						<TableCell align='center'>{product.sellingPrice}</TableCell>
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
									onClick={() => {
										handleEditModalOpen(product.id);
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
									to='/price-history'
								>
									History
								</Button>
							</Stack>
						</TableCell>
					</TableRow>
				))}

			<ProductEditModal
				handleEditModalClose={handleEditModalClose}
				openEditModal={openEditModal}
				editData={editData}
			/>
		</>
	);
};

export default ProductTableRow;
