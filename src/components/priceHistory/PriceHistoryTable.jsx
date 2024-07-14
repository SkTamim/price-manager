import {
  useEffect,
  useState,
} from 'react';

import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { database } from '../../firebase/FirebaseConfig';
import PriceHistoryTableRow from './PriceHistoryTableRow';

const PriceHistoryTable = () => {
	const [currentPriceRow, setCurrentPriceRow] = useState(null);
	let { id } = useParams();

	// FETCH CURRENT PRICE ROW
	async function fetchCurrent() {
		const q = query(collection(database, "products"), where("id", "==", id));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setCurrentPriceRow(doc.data());
		});
	}
	useEffect(() => {
		fetchCurrent();
	}, []);

	return (
		<TableContainer>
			<Table sx={{ minWidth: 900 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Date </TableCell>
						<TableCell align='center'>Product Name</TableCell>
						<TableCell align='center'>Buying Price (₹)</TableCell>
						<TableCell align='center'>Selling Price (₹)</TableCell>
						<TableCell align='center'>Buying Point </TableCell>
						<TableCell align='center'> </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{currentPriceRow ? (
						<TableRow
							key='current-price'
							id={currentPriceRow.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell align='center' sx={{ fontWeight: "bold" }}>
								{currentPriceRow.date}
							</TableCell>

							<TableCell align='center' className='font_bn'>
								{currentPriceRow.name}
							</TableCell>
							<TableCell align='center'>
								{currentPriceRow.buyingPrice}
							</TableCell>
							<TableCell align='center'>
								{currentPriceRow.sellingPrice}
							</TableCell>
							<TableCell align='center'>
								{currentPriceRow.buyingPoint}
							</TableCell>
							<TableCell align='center'>
								<Typography
									fontWeight='700'
									textTransform='uppercase'
									color='whitesmoke'
									bgcolor='green'
									borderRadius={1}
								>
									Current
								</Typography>
							</TableCell>
						</TableRow>
					) : (
						<TableRow>
							<TableCell colSpan={6} align='center'>
								Loading current price.....
							</TableCell>
						</TableRow>
					)}

					<PriceHistoryTableRow />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PriceHistoryTable;
