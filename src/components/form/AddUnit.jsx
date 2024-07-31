/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
} from "@mui/material";

import { database } from "../../firebase/FirebaseConfig";

function AddUnit({ openModal, closeAddUnitModal, isAddUnitSuccess }) {
	const [unitValues, setUnitValues] = useState([]);

	// GET UNIT VALUES FORM DATABASE
	async function getSelets() {
		const docRef = doc(database, "companies", "sk-hardwares");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUnitValues(docSnap.data()["unit-selects"]);
		} else {
			console.log("Menu Items not found , Error in getSelects");
		}
	}
	useEffect(() => {
		getSelets();
	}, []);

	// ADD NEW UNIT VALUE TO DATABASE
	const [newUnit, setNewUnit] = useState("");
	const [newUnitError, setNewUnitError] = useState(false);
	function addNewUnit() {
		if (unitValues.includes(newUnit)) {
			setNewUnitError(true);
			return;
		}
		if (newUnit.length < 1) {
			setNewUnitError(true);
			return;
		}
		const withNewData = [...unitValues, newUnit];
		try {
			setDoc(doc(database, "companies", "sk-hardwares"), {
				["unit-selects"]: withNewData,
			});
			isAddUnitSuccess(true);
			setNewUnit("");
			closeAddUnitModal();
		} catch (error) {
			console.log(error + "form add new unit");
			setNewUnitError(true);
		}
	}
	return (
		<Dialog open={openModal} onClose={closeAddUnitModal}>
			<DialogContent
				sx={{
					p: 0,
					minWidth: {
						sm: "400px",
					},
				}}
			>
				<TextField
					sx={{ width: "100%" }}
					placeholder='Enter Unit name'
					inputProps={{
						style: {
							padding: "6px 10px",
						},
					}}
					variant='outlined'
					value={newUnit}
					onChange={(e) => {
						setNewUnit(e.target.value);
						setNewUnitError(false);
					}}
					error={newUnitError}
					helperText={newUnitError && `New Unit not added, Please retry...`}
				/>
			</DialogContent>
			<DialogActions sx={{ p: 0 }}>
				<Button onClick={addNewUnit} autoFocus fullWidth variant='contained'>
					Add Unit
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddUnit;
