/* eslint-disable react/prop-types */
import { CameraAlt, CameraswitchOutlined } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

function CaptureImage({ getCapturedFile }) {
	const [open, setOpen] = useState(false);
	const [img, setImg] = useState(null);
	const webcamRef = useRef(null);

	const [cameraFace, setCameraFace] = useState("user");
	function flipCamera() {
		if (cameraFace == "user") {
			setCameraFace("environment");
		} else {
			setCameraFace("user");
		}
	}

	const videoConstraints = {
		width: 150,
		height: 150,
		facingMode: { exact: cameraFace },
	};

	const capture = () => {
		setImg(webcamRef.current.getScreenshot());
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	function imgOkey() {
		capture();

		getCapturedFile(webcamRef.current.getScreenshot());
		handleClose();
	}
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
				onClick={handleClickOpen}
			>
				Capture
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
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
