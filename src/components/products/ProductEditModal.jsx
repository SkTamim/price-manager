/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	Alert,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

import { useDeleteItem } from "../../hooks/useDeleteItem";
import Loading from "../UI/Loading";
import { updateProduct } from "./UpdateProduct";

export default function AlertDialog({
	handleEditModalClose,
	openEditModal,
	editData,
	clickedRowRef,
	isUpdated,
}) {
	// EDITED DATA STATES
	const [editedData, setEditedData] = useState(null);
	const [editFormError, setEditFormError] = useState({});

	// EDIT DATA FORM FEEDBACK STATES
	const [editDataSaving, setEditDataSaving] = useState(false);
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
	const [editSuccess, setEditSuccess] = useState({
		status: false,
		message: "Not yet submitted",
	});

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

	// SAVE AND UPDATE EDITED DTATA TO THE FIRBASE FUNCTION
	function saveEdit() {
		setEditDataSaving(true);

		updateProduct(editedData).then((result) => {
			if (result.status) {
				setEditSuccess(result);
				handleEditModalClose();
				setFeedbackModalOpen(true);
			} else {
				setEditSuccess(result);
				setFeedbackModalOpen(true);
			}
			setEditDataSaving(false);
			isUpdated(editedData);
		});
	}

	// EDIT FORM INPUT AND ERROR HANDLER FUNCTION
	function inputChengeHandler(e) {
		setEditedData({ ...editedData, [e.target.name]: e.target.value });
		setEditFormError({
			...editFormError,
			[e.target.name]: e.target.value <= 0,
		});
	}

	// FEEDBACK MODAL CLOSE FUNCTION
	function closeFeedbackModal() {
		setFeedbackModalOpen(false);
	}

	// DELETE PRODUCT FUNCTION
	const [deleteItem, deleteSuccess, deleteError] = useDeleteItem();
	const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
	const [deleteProductId, setDeleteProductId] = useState(null);
	const [deletedAlert, setDeletedAlert] = useState(false);

	function deletePorduct() {
		deleteProductId && deleteItem("products", deleteProductId);
	}
	useEffect(() => {
		if (deleteSuccess) {
			clickedRowRef.current.style.display = "none";
			setDeleteProductModalOpen(false);
			handleEditModalClose();
			setDeletedAlert(true);
			setTimeout(() => {
				setDeletedAlert(false);
			}, 2000);
		}
	}, [deleteSuccess]);

	return (
		<>
			<Dialog open={openEditModal} onClose={handleEditModalClose}>
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

				<DialogActions sx={{ justifyContent: "space-between" }}>
					<Button
						variant='outlined'
						color='error'
						onClick={() => {
							setDeleteProductModalOpen(true);
							setDeleteProductId(editData.id);
						}}
					>
						Delete Product
					</Button>
					<div>
						<Button onClick={handleEditModalClose}>Cencel</Button>
						<LoadingButton
							onClick={saveEdit}
							endIcon={<SaveIcon />}
							loading={editDataSaving}
							loadingPosition='end'
							variant='contained'
							autoFocus
						>
							<span>Save</span>
						</LoadingButton>
					</div>
				</DialogActions>
			</Dialog>

			{/* EDIT SUCCESFULL OR NOT DIALOG BOX */}
			<Dialog open={feedbackModalOpen} onClose={closeFeedbackModal}>
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
						onClick={closeFeedbackModal}
						autoFocus
						fullWidth
						color='success'
					>
						Okey
					</Button>
				</DialogActions>
			</Dialog>

			{/* DELETE PRODUCT OR NOT CONFIRM BOX */}
			<Dialog
				open={deleteProductModalOpen}
				onClose={() => setDeleteProductModalOpen(false)}
			>
				<DialogContent>
					{!deleteError && (
						<h3>Are you sure you want to delete this product.</h3>
					)}

					{deleteError && <h3>Something went wrong,Porduct was not deleted</h3>}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteProductModalOpen(false)}>No</Button>
					<Button
						variant='contained'
						color='error'
						onClick={deletePorduct}
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>

			{/* PRODUCT DELETED ALERT */}
			{deletedAlert && (
				<tr style={{ position: "fixed", top: "30px" }}>
					<Alert component='td' variant='filled' severity='success'>
						The Product was deleted Succesfully
					</Alert>
				</tr>
			)}
		</>
	);
}
