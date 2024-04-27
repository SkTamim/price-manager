import { Button, Container, Stack, Typography } from "@mui/material";
import PriceHistoryTable from "../components/priceHistory/PriceHistoryTable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

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
				<Typography
					component='h4'
					variant='h5'
					align='center'
					textTransform='uppercase'
					fontWeight='bold'
					className='font_bn'
					marginTop='20px'
				>
					1.6 KG কোদাল
				</Typography>

				<PriceHistoryTable />
			</Container>
		</>
	);
};

export default PriceHistory;
