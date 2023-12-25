import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const DatePickerComponent = (props) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker 
          id={props.id} 
          onChange={(value) => props?.onChange(props.name, value)}
          onBlur={props?.onBlur}
          name={props.name}
          value={props.value || null}
          onError={() => props.error}
        />
      </LocalizationProvider>
    );
}

DatePickerComponent.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  error: PropTypes.bool
};

export default DatePickerComponent;