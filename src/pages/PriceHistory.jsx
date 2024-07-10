import { Link, Outlet } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Container, Stack, Typography } from "@mui/material";

const PriceHistory = () => {
	return (
		<>
			<Container maxWidth='xl' sx={{ py: 2 }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<Button
						variant='outlined'
						startIcon={<ArrowBackIosIcon />}
						sx={{
							color: "#34495E",
							borderColor: "#34495E !important",
							borderRadius: "40px",
						}}
						component={Link}
						to='/products'
					>
						Back
					</Button>
					<Typography
						component='h1'
						variant='h4'
						align='center'
						textTransform='uppercase'
						fontWeight='bold'
						sx={{
							fontSize: {
								xs: "20px",
								sm: "30px",
							},
						}}
					>
						Price History
					</Typography>
				</Stack>

				<Outlet />
			</Container>
		</>
	);
};

export default PriceHistory;
