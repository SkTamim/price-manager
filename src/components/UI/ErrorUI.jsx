import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Button, Typography } from "@mui/material";

function ErrorUI() {
	function reloadPage() {
		window.location.reload();
	}
	return (
		<Typography
			variant='h5'
			component='p'
			color='error'
			sx={{
				textAlign: "center",
			}}
		>
			<span
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				Something went wrong...
				<SentimentVeryDissatisfiedIcon />
			</span>
			Please try again.
			<Button
				variant='outlined'
				color='primary'
				sx={{ p: 0, px: 1, ml: 1 }}
				onClick={reloadPage}
			>
				Reload
			</Button>
		</Typography>
	);
}

export default ErrorUI;
