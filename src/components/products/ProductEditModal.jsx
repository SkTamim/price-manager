/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import Loading from "../UI/Loading";

export default function AlertDialog({ handleClose, open, editData }) {
	const [editedData, setEditedData] = useState(null);

	useEffect(() => {
		if (editData) {
			setEditedData({
				name: editData.name,
				buyingPrice: editData.buyingPrice,
				sellingPrice: editData.sellingPrice,
				buyingPoint: editData.buyingPoint,
			});
		}
	}, [editData]);

	function saveEdit() {
		console.log(editedData);
		handleClose();
	}
	function inputChengeHandler(e) {
		setEditedData({ ...editedData, [e.target.name]: e.target.value });
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle textTransform='uppercase'>Edit Product</DialogTitle>

			<DialogContent
				sx={{
					width: {
						xs: "80vw",
						sm: "400px",
						md: "600px",
					},
				}}
			>
				{!editedData && (
					<Box sx={{ width: "100%", textAlign: "center" }}>
						<Loading />
					</Box>
				)}
				{editedData && (
					<form style={{ width: "100%" }}>
						<TextField
							id='serial'
							label='Serial No. (not editable)'
							variant='outlined'
							fullWidth
							readOnly
							value={editData.id ? editData.id : ""}
							sx={{ mt: 2 }}
						/>

						<TextField
							id='date'
							name='date'
							sx={{ mt: 2, width: "100%" }}
							label='Date (not editable)'
							value={editData.date ? editData.date : ""}
							readOnly
						/>
						<TextField
							id='product-name'
							label='Product Name'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
							value={editedData.name}
							onChange={inputChengeHandler}
							name='name'
						/>
						<TextField
							id='buying-price'
							label='Buying Price (₹)'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
							value={editedData.buyingPrice}
							onChange={inputChengeHandler}
							name='buyingPrice'
						/>
						<TextField
							id='selling-price'
							label='Selling Price (₹)'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
							value={editedData.sellingPrice}
							onChange={inputChengeHandler}
							name='sellingPrice'
						/>
						<TextField
							id='buying-point'
							label='Buying Point'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
							value={editedData.buyingPoint}
							onChange={inputChengeHandler}
							name='buyingPoint'
						/>
					</form>
				)}
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose}>Cencel</Button>
				<Button onClick={saveEdit} autoFocus>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
