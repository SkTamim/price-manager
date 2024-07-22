import {
  useCallback,
  useReducer,
  useState,
} from 'react';

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';

import AddImageInput from './AddImageInput';
import InputField from './InputField';
import UnitSelectBox from './UnitSelectBox';

// INITIAL FORM STATE
const INITIAL_STATE = {
	name: "",
	buyingPrice: "",
	sellingPrice: "",
	buyingUnit: "pic",
	sellingUnit: "pic",
	buyingPoint: "",
	priceInfo: "",
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
	const getImage = useCallback((img) => {
		dispatch({
			type: "AAD_IMAGE",
			payload: {
				image: img,
			},
		});
	}, []);

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
			date = date.toLocaleDateString("en-IN");
			// submitForm({ ...state, date: date }, isSuccess);
			console.log({ ...state, date: date });
			isSuccess(true);
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
			{/* MAIN ADD PRODUCT FORM */}
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
				<InputField
					id='product-name'
					label='Product Name*'
					accessKey='name'
					handleChenge={handleChenge}
					state={state}
					formError={formError}
					sx={{ width: "100%" }}
				/>

				<Stack direction='row' mt={2}>
					<InputField
						id='buying-price'
						label='Buying Price (₹)*'
						accessKey='buyingPrice'
						type='number'
						sx={{ width: "70%" }}
						handleChenge={handleChenge}
						state={state}
						formError={formError}
					/>
					<UnitSelectBox
						sx={{ width: "30%" }}
						labelId='buying-unit'
						accessKey='buyingUnit'
						state={state}
						handleChenge={handleChenge}
					/>
				</Stack>
				<Stack direction='row' mt={2}>
					<InputField
						id='selling-price'
						label='Selling Price (₹)*'
						accessKey='sellingPrice'
						sx={{ width: "70%" }}
						type='number'
						handleChenge={handleChenge}
						state={state}
						formError={formError}
					/>
					<UnitSelectBox
						sx={{ width: "30%" }}
						labelId='selling-unit'
						accessKey='sellingUnit'
						state={state}
						handleChenge={handleChenge}
					/>
				</Stack>
				<InputField
					id='buying-point'
					label='Buying Point*'
					accessKey='buyingPoint'
					sx={{ mt: 2, width: "100%" }}
					handleChenge={handleChenge}
					state={state}
					formError={formError}
				/>
				<InputField
					id='price-info'
					label='Price Info (Optional)'
					accessKey='priceInfo'
					sx={{ mt: 2, width: "100%" }}
					handleChenge={handleChenge}
					state={state}
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
