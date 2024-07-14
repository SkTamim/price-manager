import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';

import { useDeleteItem } from '../../hooks/useDeleteItem';
import { useFetchData } from '../../hooks/useFetchData';
import ErrorUI from '../UI/ErrorUI';
import Loading from '../UI/Loading';
import NothingToShow from '../UI/NothingToShow';

const PriceHistoryTableRow = () => {
	let { id } = useParams();
	const [data, isLoading, isError] = useFetchData(`products/${id}/history`);
	const [historyData, setHistoryData] = useState([]);

	useEffect(() => {
		setHistoryData(data);
	}, [data]);

	// DELETE HISTORY ROW FUNCTIONALITY
	const clickedHistoryRowRef = useRef(null);

	const [deleteHistoryItem, deleteHistorySuccess, deleteHistoryError] =
		useDeleteItem();
	const [deleteHistoryModalOpen, setDeleteHistoryModalOpen] = useState(false);
	const [deletedHistoryAlert, setDeletedHistoryAlert] = useState(false);
	const [deleteHistoryId, setDeleteHistoryId] = useState(null);

	function deleteHistory(deleteId) {
		deleteHistoryItem(`products/${id}/history`, deleteId);
		setDeleteHistoryModalOpen(false);
	}
	useEffect(() => {
		if (deleteHistorySuccess) {
			clickedHistoryRowRef.current.style.display = "none";
			setDeleteHistoryModalOpen(false);

			updateHistoryList();

			setDeletedHistoryAlert(true);
			setTimeout(() => {
				setDeletedHistoryAlert(false);
			}, 2000);
		}

		function updateHistoryList() {
			let mainData = historyData;
			const deletedData = mainData.findIndex(
				(dObj) => dObj.id == deleteHistoryId
			);

			delete mainData[deletedData];
			mainData = mainData.filter((n) => n != null);
			setHistoryData(mainData);
		}
	}, [deleteHistorySuccess, deleteHistoryId]);

	return (
		<>
			{!isError && !isLoading && historyData.length <= 0 && (
				<Box
					sx={{
						width: "100%",
						height: "400px",
						position: "relative",
					}}
					component='tr'
				>
					<TableCell
						sx={{
							position: "absolute",
							top: "50%",
							transform: "translate(-50%, -50%)",
							left: {
								xs: "17%",
								sm: "30%",
								md: "50%",
							},
						}}
					>
						<NothingToShow />
					</TableCell>
				</Box>
			)}
			{isError && !isLoading && (
				<Box
					sx={{
						width: "100%",
						height: "400px",
						position: "relative",
					}}
					component='tr'
				>
					<TableCell
						sx={{
							position: "absolute",
							top: "50%",
							transform: "translate(-50%, -50%)",
							left: {
								xs: "17%",
								sm: "30%",
								md: "50%",
							},
						}}
					>
						<ErrorUI />
					</TableCell>
				</Box>
			)}
			{isLoading && !isError && (
				<Box
					sx={{
						width: "100%",
						height: "400px",
						position: "relative",
					}}
					component='tr'
				>
					<TableCell
						sx={{
							position: "absolute",
							top: "50%",
							transform: "translate(-50%, -50%)",
							left: {
								xs: "17%",
								sm: "30%",
								md: "50%",
							},
						}}
					>
						<Loading size={100} thickness={1} />
					</TableCell>
				</Box>
			)}

			{!isLoading &&
				!isError &&
				historyData.map((item) => (
					<TableRow
						key={item.id}
						id={item.id}
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<TableCell align='center' sx={{ fontWeight: "bold" }}>
							{item.date}
						</TableCell>

						<TableCell align='center' className='font_bn'>
							{item.name}
						</TableCell>
						<TableCell align='center'>{item.buyingPrice}</TableCell>
						<TableCell align='center'>{item.sellingPrice}</TableCell>
						<TableCell align='center'>{item.buyingPoint}</TableCell>
						<TableCell align='center'>
							<IconButton
								aria-label='delete'
								color='error'
								title='Delete Row'
								onClick={(e) => {
									setDeleteHistoryModalOpen(true);
									clickedHistoryRowRef.current = e.target.closest("tr");
								}}
							>
								<DeleteIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				))}

			{/* DELETE HISTORY OR NOT CONFIRM BOX */}
			<Dialog
				open={deleteHistoryModalOpen}
				onClose={() => setDeleteHistoryModalOpen(false)}
			>
				<DialogContent>
					{!deleteHistoryError && (
						<h3>Are you sure you want to delete this product history?</h3>
					)}

					{deleteHistoryError && (
						<h3>Something went wrong,Porduct history was not deleted</h3>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteHistoryModalOpen(false)}>No</Button>
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							deleteHistory(clickedHistoryRowRef.current.id);
							setDeleteHistoryId(clickedHistoryRowRef.current.id);
						}}
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>

			{/* HISTORY DELETED ALERT */}
			{deletedHistoryAlert && (
				<tr style={{ position: "fixed", top: "30px" }}>
					<Alert component='td' variant='filled' severity='success'>
						The Product was deleted Succesfully
					</Alert>
				</tr>
			)}
		</>
	);
};

export default PriceHistoryTableRow;
