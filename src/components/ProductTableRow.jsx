import { Button, Stack, TableCell, TableRow } from "@mui/material";
import dummyProductImg from "../assets/images/product.png";
import { Edit, History } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ProductEditModal from "./ProductEditModal";
import { Link } from "react-router-dom";

//Firebase
import { app } from "../firebase";
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";

const db = getFirestore(app);
const q = query(collection(db, "products"));

const ProductTableRow = () => {
	const [data, setData] = useState([]);
	const [editData, setEditData] = useState(null);

	async function getData() {
		const querySnapshot = await getDocs(q);
		let dataArr = [];
		querySnapshot.forEach((doc) => {
			dataArr.push(doc.data());
		});
		setData(dataArr);
	}

	async function getDocument(id) {
		const q = query(collection(db, "products"), where("id", "==", id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setEditData(doc.data());
		});
	}

	useEffect(() => {
		getData();
	}, []);

	// Edit modal state and event handlers
	const [open, setOpen] = useState(false);
	const handleEditModalOpen = (id) => {
		setOpen(true);
		getDocument(id);
	};
	const handleEditModalClose = () => {
		setOpen(false);
	};

	return (
		<>
			{data &&
				data.map((product) => (
					<TableRow
						key={product.id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<TableCell component='th' scope='row' sx={{ fontWeight: "bold" }}>
							{product.id}
						</TableCell>
						<TableCell align='center' sx={{ width: "150px", height: "150px" }}>
							<img
								src={product.img || dummyProductImg}
								alt='Product Image'
								style={{ border: "1px solid #34495E", borderRadius: "2px" }}
							/>
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
				handleClose={handleEditModalClose}
				open={open}
				editData={editData}
			/>
		</>
	);
};

export default ProductTableRow;
