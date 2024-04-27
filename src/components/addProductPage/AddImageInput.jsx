import { useEffect, useRef, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Input from "@mui/joy/Input";
/* eslint-disable react/prop-types */
import { Button, ButtonGroup, Stack, styled } from "@mui/material";

import CaptureImage from "./CaptureImage";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});
function AddImageInput({ getImage, resetImg }) {
	const [uploadFile, setUploadFile] = useState(null);
	const [imgFileName, setImgFileName] = useState("");

	// RESET IMAGE UPLOAD FIELT
	const fileInputRef = useRef();
	function resetImage() {
		if (resetImg) {
			setUploadFile(null);
			setImgFileName("");
			fileInputRef.current.value = null;
		}
	}
	useEffect(() => {
		resetImage();
	}, [resetImg]);

	// UPLOAD IMAGE FILE FUNCTION
	function file(e) {
		setUploadFile(e.target.files[0]);
		setImgFileName(e.target.files[0].name);
	}

	// GET CAPTURED IMAGE AND SET FILE FUNCTION
	function getCapturedFile(file) {
		setUploadFile(file);
		setImgFileName(file);
	}

	useEffect(() => {
		getImage(uploadFile);
	}, [uploadFile, getImage]);

	return (
		<Stack
			sx={{
				flexDirection: {
					xs: "coloumn",
					sm: "row",
				},
			}}
		>
			<ButtonGroup variant='contained' sx={{ mt: 2 }}>
				<Button
					component='label'
					variant='contained'
					startIcon={<CloudUploadIcon />}
					sx={{
						flexGrow: 1,
						backgroundColor: "#55AAFF",
						color: " #22313f",
						"&:hover": {
							backgroundColor: "#0F87FF",
						},
					}}
				>
					Upload file
					<VisuallyHiddenInput
						type='file'
						onChange={file}
						accept='image/*'
						ref={fileInputRef}
					/>
				</Button>
				<CaptureImage getCapturedFile={getCapturedFile} />
			</ButtonGroup>
			<Input
				placeholder='Product Image'
				disabled
				sx={{
					backgroundColor: "transparent",
					height: "60px",
					borderColor: "#B3C8CF !important",
					mt: {
						sx: 0,
						sm: 2,
					},
					width: {
						sx: "100%",
						sm: "69.3%",
					},
				}}
				value={imgFileName}
				endDecorator={
					imgFileName && <CheckCircleIcon sx={{ color: "green" }} />
				}
			/>
		</Stack>
	);
}

export default AddImageInput;
