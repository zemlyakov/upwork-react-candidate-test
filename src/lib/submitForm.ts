import type { FormValue } from '../types/form';

export async function submitForm(f: FormValue) {
  const resp = await fetch('http://13.231.17.170:8080/test/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(f),
  });
  if (!resp.ok) {
    throw new Error('Something went wrong');
  }
  return resp;
}
