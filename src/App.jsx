import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PriceHistory from "./pages/PriceHistory.jsx";

function App() {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/price-history' element={<PriceHistory />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
