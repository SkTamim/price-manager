import { Typography } from "@mui/material";
import ProductsTable from "../components/ProductsTable";

function Products() {
	return (
		<>
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
		</>
	);
}

export default Products;
