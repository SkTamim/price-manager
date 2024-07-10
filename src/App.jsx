import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container } from "@mui/material";

import PriceHistoryTable from "./components/priceHistory/PriceHistoryTable.jsx";
import Navbar from "./layout/Navbar";
import AddProduct from "./pages/AddProduct.jsx";
import Home from "./pages/Home.jsx";
import PriceHistory from "./pages/PriceHistory.jsx";
import Products from "./pages/Products.jsx";

function App() {
	return (
		<BrowserRouter basename='/'>
			<Navbar />
			<Container maxWidth='xl' sx={{ py: 2 }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
					<Route path='/add-product' element={<AddProduct />} />
					<Route path='/price-history' element={<PriceHistory />}>
						<Route path=':id' element={<PriceHistoryTable />} />
					</Route>
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
