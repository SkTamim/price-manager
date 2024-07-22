import { Typography } from '@mui/material';

function DataNotFound() {
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
				{"Data not found! :( "}
			</span>
		</Typography>
	);
}

export default DataNotFound;
