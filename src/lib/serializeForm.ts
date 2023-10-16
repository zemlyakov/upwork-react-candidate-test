import type { FieldValue, FormValue } from '../types/form';

export function serializeForm(f: HTMLFormElement): FormValue {
  const formData = new FormData(f);
  const data: Array<FieldValue> = [];
  formData.forEach((value, key) =>
    data.push({
      Field: key,
      Value: value as string,
    }),
  );
  return {
    data,
  };
}
