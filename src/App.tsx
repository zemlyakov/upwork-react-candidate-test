import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DynamicForm from './components/DynamicForm';
import { getTableFields } from './lib/getTableFields';
import { submitForm } from './lib/submitForm';
import type { TableField } from './types/api';
import type { FormValue } from './types/form';

import './App.css';

function App() {
  const [tableFields, setTableFields] = useState<Array<TableField>>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const tableFieldsResp = await getTableFields();
        setTableFields(tableFieldsResp);
      } catch (err) {
        setError((err as Error).message);
      }
    })();
  }, []);

  const handleSubmit = async (f: FormValue) => {
    try {
      await submitForm(f);
    } catch (err) {
      setError((err as Error)?.message ?? 'Something went wrong');
    }
  };

  const handleAlertClose = () => {
    setError(undefined);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DynamicForm
        fields={tableFields}
        onSubmit={handleSubmit}
        onError={setError}
      />
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          severity="error"
          sx={{ width: '100%' }}
          onClose={handleAlertClose}
        >
          {error}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}

export default App;
