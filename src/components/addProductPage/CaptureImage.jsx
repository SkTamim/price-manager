import { useRef, useState } from "react";

import Webcam from "react-webcam";

/* eslint-disable react/prop-types */
import { CameraAlt, CameraswitchOutlined } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

function CaptureImage({ getCapturedFile }) {
	const [img, setImg] = useState(null);

	// SETTING WEBCAM FOR CAPTURE IMAGE
	const webcamRef = useRef(null);
	const videoConstraints = {
		width: 150,
		height: 150,
		facingMode: { exact: cameraFace },
	};

	// FLIP CAMEAR FUNCTIONALITY
	const [cameraFace, setCameraFace] = useState("user");
	function flipCamera() {
		if (cameraFace == "user") {
			setCameraFace("environment");
		} else {
			setCameraFace("user");
		}
	}

	// CAPTURE IMAGE AND SET THE IMAGE TO THE STATE
	const capture = () => {
		setImg(webcamRef.current.getScreenshot());
	};
	function imgOkey() {
		capture();

		getCapturedFile(webcamRef.current.getScreenshot());
		cameraModalClose();
	}

	// CAMERA MODAL
	const [openCameraModal, setOpenCameraModal] = useState(false);

	const handleOpenCameraModal = () => {
		setOpenCameraModal(true);
	};
	const cameraModalClose = () => {
		setOpenCameraModal(false);
	};

	return (
		<>
			<Button
				component='label'
				variant='contained'
				endIcon={<CameraAlt />}
				sx={{
					flexGrow: 1,
					backgroundColor: "#55AAFF",
					color: " #22313f",
					"&:hover": {
						backgroundColor: "#0F87FF",
					},
				}}
				onClick={handleOpenCameraModal}
			>
				Capture
			</Button>
			<Dialog
				open={openCameraModal}
				onClose={cameraModalClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Capture product Image</DialogTitle>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Webcam
						audio={false}
						height={150}
						ref={webcamRef}
						screenshotFormat='image/jpeg'
						mirrored
						screenshotQuality='1'
						width={150}
						videoConstraints={videoConstraints}
					/>
					<Button
						variant='outlined'
						color='primary'
						sx={{ mt: 2 }}
						onClick={flipCamera}
					>
						Flip Camera
						<CameraswitchOutlined sx={{ ml: 1 }} />
					</Button>
					{img && (
						<img
							src={img}
							alt='Camera Image'
							style={{ width: "150px", height: "150px", marginTop: "10px" }}
						/>
					)}
				</DialogContent>
				<DialogActions sx={{ justifyContent: "center" }}>
					<Button onClick={capture}>{img ? "Re-Capture" : "Capture"}</Button>
					<Button onClick={imgOkey} autoFocus>
						Okey
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default CaptureImage;
