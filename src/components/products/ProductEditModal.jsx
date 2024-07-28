/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";

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
} from "@mui/material";

import { database } from "../../firebase/FirebaseConfig";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import InputField from "../form/InputField";
import UnitSelectBox from "../form/UnitSelectBox";
import Loading from "../UI/Loading";
import { updateProduct } from "./UpdateProduct";

export default function AlertDialog({
	openEditModal,
	targetEditId,
	handleEditModalClose,
	isUpdated,
	clickedEditButtonRowRef,
}) {
	// EDITED DATA STATES
	const [editedData, setEditedData] = useState(null);
	const [editFormError, setEditFormError] = useState({});

	// GETTING EDIT DATA USING PRODUCT ID
	async function getDocument(id) {
		const q = query(
			collection(database, "companies/sk-hardwares/products"),
			where("id", "==", Number(id))
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setEditedData({
				...doc.data(),
				date: new Date().toLocaleDateString("en-IN"),
			});
		});
	}
	useEffect(() => {
		getDocument(targetEditId);
	}, [targetEditId]);

	// EDIT DATA FORM FEEDBACK STATES
	const [editDataSaving, setEditDataSaving] = useState(false);
	const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
	const [editSuccess, setEditSuccess] = useState({
		status: false,
		message: "Not yet submitted",
	});

	// SAVE AND UPDATE EDITED DTATA TO THE FIRBASE FUNCTION
	function saveEdit() {
		setEditDataSaving(true);

		updateProduct(editedData).then((result) => {
			if (result.status) {
				setEditSuccess(result);
				handleEditModalClose();
				setFeedbackModalOpen(true);
				isUpdated(editedData);
			} else {
				setEditSuccess(result);
				setFeedbackModalOpen(true);
			}
			setEditDataSaving(false);
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
	const [deletedAlert, setDeletedAlert] = useState(false);

	useEffect(() => {
		if (deleteSuccess) {
			clickedEditButtonRowRef.current.style.display = "none";
			setDeleteProductModalOpen(false);
			handleEditModalClose();
			setDeletedAlert(true);
			setTimeout(() => {
				setDeletedAlert(false);
			}, 2000);
		}
	}, [deleteSuccess, handleEditModalClose, clickedEditButtonRowRef]);

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
							<InputField
								id='serial'
								label='ID No (not editable)'
								readOnly
								value={editedData.id ? editedData.id : ""}
								sx={{ mt: 2 }}
							/>

							<InputField
								id='date'
								name='date'
								sx={{ mt: 2, width: "100%" }}
								label='Date (not editable)'
								value={editedData.date}
								readOnly
							/>
							<InputField
								id='product-name'
								label='Product Name*'
								sx={{ mt: 2 }}
								value={editedData.name}
								onChange={inputChengeHandler}
								name='name'
								error={editFormError.name}
							/>

							<InputField
								id='buying-price'
								label='Buying Price (₹)*'
								sx={{ mt: 2 }}
								value={editedData.buyingPrice}
								onChange={inputChengeHandler}
								name='buyingPrice'
								error={editFormError.buyingPrice}
							/>
							<UnitSelectBox
								sx={{ width: "100%", mt: 2 }}
								labelId='edit-buy-unit'
								name='buyingUnit'
								value={editedData.buyingUnit}
								onChange={inputChengeHandler}
							/>
							<InputField
								id='selling-price'
								label='Selling Price (₹)*'
								sx={{ mt: 2 }}
								value={editedData.sellingPrice}
								onChange={inputChengeHandler}
								name='sellingPrice'
								error={editFormError.sellingPrice}
							/>
							<UnitSelectBox
								sx={{ width: "100%", mt: 2 }}
								labelId='edit-sell-unit'
								name='sellingUnit'
								value={editedData.sellingUnit}
								onChange={inputChengeHandler}
							/>
							<InputField
								id='buying-point'
								label='Buying Point*'
								sx={{ mt: 2 }}
								value={editedData.buyingPoint}
								onChange={inputChengeHandler}
								name='buyingPoint'
								error={editFormError.buyingPoint}
							/>
							<InputField
								id='price-info'
								label='Price Info'
								sx={{ mt: 2 }}
								value={editedData.priceInfo}
								onChange={inputChengeHandler}
								name='priceInfo'
								error={editFormError.priceInfo}
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

					{deleteError && (
						<h3 style={{ textAlign: "center" }}>
							Something went wrong,Porduct was not deleted.
							<br />
							Try Again...
						</h3>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteProductModalOpen(false)}>No</Button>
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							deleteItem(
								"companies/sk-hardwares/products",
								Number(targetEditId)
							);
						}}
						autoFocus
					>
						{!deleteError && "Yes"}
						{deleteError && "Re-try"}
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
