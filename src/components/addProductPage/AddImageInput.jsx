/* eslint-disable react/prop-types */
import { Button, Stack, styled, ButtonGroup } from "@mui/material";
import Input from "@mui/joy/Input";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import CaptureImage from "./CaptureImage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

	function file(e) {
		setUploadFile(e.target.files[0]);
		setImgFileName(e.target.files[0].name);
	}

	function getCapturedFile(file) {
		setUploadFile(file);
		setImgFileName(file);
	}

	useEffect(() => {
		getImage(uploadFile);
	}, [uploadFile]);

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
					<VisuallyHiddenInput type='file' onChange={file} accept='image/*' />
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
				value={resetImg ? imgFileName : ""}
				endDecorator={
					resetImg && imgFileName && <CheckCircleIcon sx={{ color: "green" }} />
				}
			/>
		</Stack>
	);
}

export default AddImageInput;
