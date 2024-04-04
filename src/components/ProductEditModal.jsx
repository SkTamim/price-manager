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

export default function AlertDialog({ handleClose, open, editData }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle textTransform='uppercase'>Edit Product</DialogTitle>
				{editData && (
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
								value={editData.id ? editData.id : ""}
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
								value={editData.name ? editData.name : ""}
							/>
							<TextField
								id='buying-price'
								label='Buying Price (₹)'
								variant='outlined'
								fullWidth
								sx={{ mt: 2 }}
								value={editData.buyingPrice ? editData.buyingPrice : ""}
							/>
							<TextField
								id='selling-price'
								label='Selling Price (₹)'
								variant='outlined'
								fullWidth
								sx={{ mt: 2 }}
								value={editData.sellingPrice ? editData.sellingPrice : ""}
							/>
							<TextField
								id='buying-point'
								label='Buying Point'
								variant='outlined'
								fullWidth
								sx={{ mt: 2 }}
								value={editData.buyingPoint ? editData.buyingPoint : ""}
							/>
						</form>
					</DialogContent>
				)}
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
