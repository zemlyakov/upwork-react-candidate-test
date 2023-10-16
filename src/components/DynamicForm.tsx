import { Button, Stack } from '@mui/material';
import DynamicField from './DynamicField';
import type { TableField } from '../types/api';
import { useRef } from 'react';
import type { FormValue } from '../types/form';
import { serializeForm } from '../lib/serializeForm.ts';

type DynamicFormProps = {
  fields: Array<TableField>;
  onSubmit: (f: FormValue) => void;
  onError: (err: string) => void;
};

const DynamicForm = ({ fields, onSubmit, onError }: DynamicFormProps) => {
  const requiredFields = fields.filter((f) => f.Null === 'NO');
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = () => {
    if (!ref.current) {
      return;
    }
    const formValue = serializeForm(ref.current);
    const isValid = requiredFields.every((rf) =>
      formValue.data.some((fv) => fv.Field === rf.Field && fv.Value),
    );
    if (!isValid) {
      onError('Required fields are missing');
    }
    onSubmit(serializeForm(ref.current));
  };
  return (
    <Stack component="form" spacing={2} maxWidth={800} ref={ref}>
      {fields.map((f, i) => (
        <DynamicField {...f} key={i} /> /*safe to use index as a key here*/
      ))}
      <Button
        variant="text"
        sx={{
          width: 200,
          alignSelf: 'center',
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default DynamicForm;
