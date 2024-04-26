/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
	Alert,
	Box,
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Loading from "../UI/Loading";
import { updateProduct } from "./UpdateProduct";

export default function AlertDialog({ handleClose, open, editData }) {
	const [editedData, setEditedData] = useState(null);
	const [editFormError, setEditFormError] = useState({});

	const [editDataSaving, setEditDataSaving] = useState(false);
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
	const [editSuccess, setEditSuccess] = useState({
		status: false,
		message: "Not yet submitted",
	});

	function handleSuccessClose() {
		setFeedbackModalOpen(false);
	}

	useEffect(() => {
		if (editData) {
			// SETTING SAVED DATA IN DATABASE IN THE FORM
			setEditedData({
				id: editData.id,
				name: editData.name,
				buyingPrice: editData.buyingPrice,
				sellingPrice: editData.sellingPrice,
				buyingPoint: editData.buyingPoint,
			});

			// HANDLE FORM ERROR
			setEditFormError({
				name: editData.name.length <= 0,
				buyingPrice: editData.buyingPrice.length <= 0,
				sellingPrice: editData.sellingPrice.length <= 0,
				buyingPoint: editData.buyingPoint.length <= 0,
			});
		}
	}, [editData]);

	function saveEdit() {
		setEditDataSaving(true);
		updateProduct(editedData).then((result) => {
			if (result.status) {
				setEditSuccess(result);
				handleClose();
				setFeedbackModalOpen(true);
			} else {
				setEditSuccess(result);
				setFeedbackModalOpen(true);
			}
			setEditDataSaving(false);
		});
	}

	function inputChengeHandler(e) {
		setEditedData({ ...editedData, [e.target.name]: e.target.value });
		setEditFormError({
			...editFormError,
			[e.target.name]: e.target.value <= 0,
		});
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
								value={new Date().toLocaleDateString()}
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
								error={editFormError.name}
								helperText={
									editFormError.name && "Product name should not be empty"
								}
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
								error={editFormError.buyingPrice}
								helperText={
									editFormError.buyingPrice &&
									"Buying price should not be empty"
								}
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
								error={editFormError.sellingPrice}
								helperText={
									editFormError.sellingPrice &&
									"Selling price should not be empty"
								}
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
								error={editFormError.buyingPoint}
								helperText={
									editFormError.buyingPoint &&
									"Buying point should not be empty"
								}
							/>
						</form>
					)}
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose}>Cencel</Button>
					<LoadingButton
						onClick={saveEdit}
						endIcon={<SaveIcon />}
						loading={editDataSaving}
						loadingPosition='end'
						variant='outlined'
						autoFocus
					>
						<span>Save</span>
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* EDIT SUCCESFULL DIALOG BOX */}
			<Dialog open={feedbackModalOpen} onClose={handleSuccessClose}>
				<DialogContent
					sx={{
						p: 0,
						minWidth: {
							sm: "400px",
						},
					}}
				>
					{editSuccess.status ? (
						<Alert
							severity='success'
							sx={{ justifyContent: "center", alignItems: "center" }}
						>
							<h4>Form Submitted</h4>
							{editSuccess.message}
						</Alert>
					) : (
						<Alert
							severity='error'
							sx={{ justifyContent: "center", alignItems: "center" }}
						>
							<h3>Form was not Submitted</h3>
							{editSuccess.message}
						</Alert>
					)}
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
