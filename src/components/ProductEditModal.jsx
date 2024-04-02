/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AlertDialog({ handleClose, open }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle textTransform='uppercase'>Edit Product</DialogTitle>
				<DialogContent
					sx={{
						width: "600px",
					}}
				>
					<form style={{ width: "100%" }}>
						<TextField
							id='serial'
							label='Serial No. (not editable)'
							variant='outlined'
							fullWidth
							readOnly
							value='01'
							sx={{ mt: 2 }}
						/>

						<DatePicker
							sx={{ mt: 2, width: "100%" }}
							label='Date (not editable)'
							defaultValue={dayjs(new Date())}
							format='DD/MM/YYYY'
							readOnly
						/>
						<TextField
							id='product-name'
							label='Product Name'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
						/>
						<TextField
							id='buying-price'
							label='Buying Price (₹)'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
						/>
						<TextField
							id='selling-price'
							label='Selling Price (₹)'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
						/>
						<TextField
							id='buying-point'
							label='Buying Point'
							variant='outlined'
							fullWidth
							sx={{ mt: 2 }}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cencel</Button>
					<Button onClick={handleClose} autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</LocalizationProvider>
	);
}
