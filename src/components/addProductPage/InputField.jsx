/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';

function InputField(props) {
	const { id, label, accessKey, handleChenge, state, formError, sx, type } =
		props;

	return (
		<TextField
			id={id}
			label={label}
			name={accessKey}
			onChange={handleChenge}
			value={state[accessKey]}
			error={formError && formError[accessKey]}
			helperText={
				formError &&
				formError[accessKey] &&
				`Please enter a proper ${accessKey}`
			}
			sx={sx}
			type={type ? type : "text"}
			variant='outlined'
		/>
	);
}

export default InputField;
