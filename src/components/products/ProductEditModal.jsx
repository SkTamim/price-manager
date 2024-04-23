/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, TextField } from "@mui/material";
import Loading from "../UI/Loading";
import { updateProduct } from "./UpdateProduct";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

export default function AlertDialog({ handleClose, open, editData }) {
	const [editedData, setEditedData] = useState(null);
	const [editSuccess, setEditSuccess] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);

	function handleSuccessClose() {
		setSuccessOpen(false);
	}

	useEffect(() => {
		if (editData) {
			setEditedData({
				id: editData.id,
				name: editData.name,
				buyingPrice: editData.buyingPrice,
				sellingPrice: editData.sellingPrice,
				buyingPoint: editData.buyingPoint,
			});
		}
	}, [editData]);

	function saveEdit() {
		setEditSuccess(true);
		const isSuccess = updateProduct(editedData);

		isSuccess
			.then((r) => {
				setEditSuccess(!r);
				handleClose();
				setSuccessOpen(true);
			})
			.catch((err) => {
				console.log(err);
				setEditSuccess(false);
				setSuccessOpen(true);
			});
	}

	function inputChengeHandler(e) {
		setEditedData({ ...editedData, [e.target.name]: e.target.value });
	}

	return (
		<>
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
								label='ID No. (not editable)'
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
					<LoadingButton
						onClick={saveEdit}
						endIcon={<SaveIcon />}
						loading={editSuccess}
						loadingPosition='end'
						variant='outlined'
						autoFocus
					>
						<span>Save</span>
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* EDIT SUCCESFULL DIALOG BOX */}
			<Dialog open={successOpen} onClose={handleSuccessClose}>
				<DialogContent
					sx={{
						p: 0,
						minWidth: {
							sm: "400px",
						},
					}}
				>
					<Alert severity='success' sx={{ justifyContent: "center" }}>
						Product updated successfully
					</Alert>
				</DialogContent>
				<DialogActions sx={{ p: 0 }}>
					<Button
						onClick={handleSuccessClose}
						autoFocus
						fullWidth
						color='success'
					>
						Okey
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
