import { Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import ProductsTable from "../components/ProductsTable";

const Home = () => {
	return (
		<>
			<SearchBar />
			<Container maxWidth='xl' sx={{ py: 2 }}>
				<Typography
					component='h1'
					variant='h4'
					align='center'
					textTransform='uppercase'
					fontWeight='bold'
					marginBottom='20px'
				>
					Products
				</Typography>
				<ProductsTable />
			</Container>
		</>
	);
};

export default Home;
