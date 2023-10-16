import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { TableField } from '../types/api.ts';

const DynamicField = ({ Field, Type, Null }: TableField) => {
  const required = Null === 'NO';
  if (Type === 'int') {
    return <TextField name={Field} label={Field} required={required} />;
  }
  if (/^varchar\(\d{1,3}\)/.test(Type)) {
    return <TextField name={Field} label={Field} required={required} />;
  }
  if (/^decimal\(\d{1,3},\d{1,3}\)/.test(Type)) {
    return <TextField name={Field} label={Field} required={required} type="number" />;
  }
  if (Type === 'tinyint') {
    return (
      <FormControlLabel
        name={Field}
        required={required}
        control={<Checkbox />}
        label={Field}
      />
    );
  }
  if (Type === 'date') {
    return <DatePicker label={Field} />;
  }
  if (Type === 'datetime') {
    return <DateTimePicker label={Field} />;
  }
  return null;
};

export default DynamicField;
