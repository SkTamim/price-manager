import {
	TextField,
	Container,
	Button,
	Alert,
	Dialog,
	DialogActions,
	DialogContent,
} from "@mui/material";
import AddImageInput from "./AddImageInput";
import { useReducer, useState } from "react";
import { submitForm } from "./SubmitForm";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

const INITIAL_STATE = {
	name: "",
	buyingPrice: "",
	sellingPrice: "",
	buyingPoint: "",
	image: null,
};

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
	// Form is not filled properly dialog box =====
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// End ===================

	const [btnLoading, setBtnLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const [submitOpen, setSubmitOpen] = useState(false);
	const handleSubmitClickOpen = () => {
		setSubmitOpen(true);
	};

	const handleSubmitClose = () => {
		setSubmitOpen(false);
	};

	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
	const [formError, setFormError] = useState({});

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

	function resetForm() {
		dispatch({ type: "RESET_INPUT" });
	}

	const [resetImage, setResetImage] = useState(false);
	function getImage(img) {
		dispatch({
			type: "AAD_IMAGE",
			payload: {
				image: img,
			},
		});
	}
	function submitFormData(e) {
		e.preventDefault();
		setBtnLoading(true);
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
			handleClickOpen();
			setBtnLoading(false);
		} else {
			let date = new Date();
			date = date.toLocaleDateString();
			submitForm({ ...state, date: date }, isSuccess);
			setResetImage(true);
		}
	}
	const isSuccess = (isSubmitted) => {
		setSuccess(isSubmitted);
		console.log(isSubmitted);
		setBtnLoading(!isSubmitted);
		if (isSubmitted === true) {
			resetForm();
			setResetImage(false);
			submitFeedback();
		} else {
			submitFeedback();
		}
	};

	function submitFeedback() {
		handleSubmitClickOpen();
		setBtnLoading(false);
	}

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
			<Dialog open={open} onClose={handleClose}>
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
					<Button onClick={handleClose} autoFocus fullWidth color='success'>
						Okey
					</Button>
				</DialogActions>
			</Dialog>

			{/* FORM SUBMITTED DIALOG BOX */}
			<Dialog open={submitOpen} onClose={handleSubmitClose}>
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
						onClick={handleSubmitClose}
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
