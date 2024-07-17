import { useReducer, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	Alert,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
} from "@mui/material";

import AddImageInput from "./AddImageInput";
import { submitForm } from "./SubmitForm";

// INITIAL FORM STATE
const INITIAL_STATE = {
	name: "",
	buyingPrice: "",
	sellingPrice: "",
	buyingPoint: "",
	image: null,
};

// FORM REDUCER FUNCTON
function formReducer(state, action) {
	switch (action.type) {
		case "CHENGE_INPUT":
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case "AAD_IMAGE":
			return {
				...state,
				image: action.payload.image,
			};
		case "RESET_INPUT":
			return INITIAL_STATE;

		default:
			return state;
	}
}

function AddProductForm() {
	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
	const [formError, setFormError] = useState({});

	// FORM INPUT HANDLER FUNCTION
	function handleChenge(e) {
		dispatch({
			type: "CHENGE_INPUT",
			payload: {
				name: e.target.name,
				value: e.target.value,
			},
		});
		setFormError({
			...formError,
			[e.target.name]: e.target.value <= 0,
		});
	}

	// RESET FORM FUCNTION
	function resetForm() {
		dispatch({ type: "RESET_INPUT" });
	}

	// Form is not filled properly dialog box ========
	const [formErrorOpen, setformErrorOpen] = useState(false);
	const openFormErrorModal = () => {
		setformErrorOpen(true);
	};
	const closeFormErrorModal = () => {
		setformErrorOpen(false);
	};
	// End =============================================

	// WHEN TO RESET IMAGE DATA STATE
	const [resetImage, setResetImage] = useState(false);
	// GETTING IMAGE DATA FUNCTION
	function getImage(img) {
		dispatch({
			type: "AAD_IMAGE",
			payload: {
				image: img,
			},
		});
	}

	// SUBMIT FORM SECTION
	const [btnLoading, setBtnLoading] = useState(false);
	const [submitModalOpen, setsubmitModalOpen] = useState(false);
	const [success, setSuccess] = useState(false);

	// SUBMIT FORM FUNCTION
	function submitFormData(e) {
		e.preventDefault();
		setBtnLoading(true);

		// CHECKIGN AND SETTING FORM DATA ERROR
		let nameErr = state.name.length <= 0;
		let bPriceErr = state.buyingPrice.length <= 0;
		let sPriceErr = state.sellingPrice.length <= 0;
		let bPointErr = state.buyingPoint.length <= 0;
		setFormError({
			name: nameErr,
			buyingPrice: bPriceErr,
			sellingPrice: sPriceErr,
			buyingPoint: bPointErr,
		});

		if (nameErr || bPriceErr || sPriceErr || bPointErr) {
			// IF ERROR THEN GIVE FEEDBACK
			openFormErrorModal();
			setBtnLoading(false);
		} else {
			// IF FORM IS OKEY THEN ADD CURRENT DATE TO THE DATA AND SUBMIT THE FORM
			let date = new Date();
			date = date.toLocaleDateString('en-IN');
			submitForm({ ...state, date: date }, isSuccess);
		}
	}

	// IF DATA ADDED SUCCESSFULLY THEN RESET FORM AND GIVE THE USER FEEDBACK, IF NOT THEN GIVE FEEDBACK FOR RESUBMIT
	const isSuccess = (isSubmitted) => {
		setSuccess(isSubmitted);
		setBtnLoading(!isSubmitted);

		if (isSubmitted === true) {
			resetForm();
			setResetImage(true);
			submitFeedback();
		} else {
			submitFeedback();
		}
	};

	// GIVE FEEDBACK FUCNTION
	function submitFeedback() {
		handleSubmitClickOpen();
		setBtnLoading(false);
	}

	const handleSubmitClickOpen = () => {
		setsubmitModalOpen(true);
	};

	const submitModalClose = () => {
		setsubmitModalOpen(false);
	};

	return (
		<>
			<Container
				maxWidth='md'
				component='form'
				onSubmit={(e) => {
					submitFormData(e);
				}}
				sx={{
					padding: {
						xs: 0,
						sm: 2,
					},
				}}
			>
				<TextField
					id='product-name'
					label='Product Name'
					name='name'
					variant='outlined'
					fullWidth
					sx={{ mt: 2 }}
					onChange={handleChenge}
					value={state.name}
					error={formError.name}
					helperText={formError.name && "Please type a name"}
				/>
				<TextField
					id='buying-price'
					label='Buying Price (₹)'
					name='buyingPrice'
					variant='outlined'
					fullWidth
					sx={{ mt: 2 }}
					onChange={handleChenge}
					value={state.buyingPrice}
					error={formError.buyingPrice}
					helperText={formError.buyingPrice && "Please give a buying price"}
				/>
				<TextField
					id='selling-price'
					label='Selling Price (₹)'
					name='sellingPrice'
					variant='outlined'
					fullWidth
					sx={{ mt: 2 }}
					onChange={handleChenge}
					value={state.sellingPrice}
					error={formError.sellingPrice}
					helperText={formError.sellingPrice && "Please give a selling price"}
				/>
				<TextField
					id='buying-point'
					label='Buying Point'
					name='buyingPoint'
					variant='outlined'
					fullWidth
					sx={{ mt: 2 }}
					onChange={handleChenge}
					value={state.buyingPoint}
					error={formError.buyingPoint}
					helperText={formError.buyingPoint && "Please give a buying point"}
				/>

				<AddImageInput getImage={getImage} resetImg={resetImage} />
				<LoadingButton
					variant='contained'
					size='lg'
					type='submit'
					sx={{
						mt: 2,
						width: "100%",
						py: 1,
						fontSize: "18px",
						backgroundColor: "#55AAFF",
						color: " #22313f",
						"&:hover": {
							backgroundColor: "#0F87FF",
						},
					}}
					endIcon={<SendIcon />}
					loading={btnLoading}
					loadingPosition='end'
				>
					Submit
				</LoadingButton>
			</Container>

			{/* FORM IS NOT FILLED PROPERLY ERROR DIALOG BOX */}
			<Dialog open={formErrorOpen} onClose={closeFormErrorModal}>
				<DialogContent
					sx={{
						p: 0,
						width: {
							sm: "400px",
						},
					}}
				>
					<Alert severity='error' sx={{ justifyContent: "center" }}>
						Please fill the fiels properly.
					</Alert>
				</DialogContent>
				<DialogActions sx={{ p: 0 }}>
					<Button
						onClick={closeFormErrorModal}
						autoFocus
						fullWidth
						color='success'
					>
						Okey
					</Button>
				</DialogActions>
			</Dialog>

			{/* FORM SUBMITTED DIALOG BOX */}
			<Dialog open={submitModalOpen} onClose={submitModalClose}>
				<DialogContent
					sx={{
						p: 0,
						minWidth: {
							sm: "400px",
						},
					}}
				>
					{success ? (
						<Alert severity='success' sx={{ justifyContent: "center" }}>
							Your form is submitted successfully
						</Alert>
					) : (
						<Alert severity='error' sx={{ justifyContent: "center" }}>
							Unfortunately, Your form is not submitted, Please resubmit.
						</Alert>
					)}
				</DialogContent>
				<DialogActions sx={{ p: 0 }}>
					<Button
						onClick={submitModalClose}
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

export default AddProductForm;
