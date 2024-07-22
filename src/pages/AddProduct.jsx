import { Typography } from '@mui/material';

import AddProductForm from '../components/addProduct/AddProductForm';

function AddProduct() {
	return (
		<>
			<Typography
				component='h1'
				variant='h4'
				align='center'
				textTransform='uppercase'
				fontWeight='bold'
				marginY={2}
			>
				Add Product
			</Typography>
			<AddProductForm />
		</>
	);
}

export default AddProduct;
