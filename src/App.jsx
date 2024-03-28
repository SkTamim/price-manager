import { Container, Typography } from "@mui/material";

import SearchBar from "./components/SearchBar";

function App() {
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
				>
					Products
				</Typography>
			</Container>
		</>
	);
}

export default App;
