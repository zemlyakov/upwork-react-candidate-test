import type { GetTableFieldsResponse, TableField } from '../types/api.ts';

export async function getTableFields(): Promise<Array<TableField>> {
  let respData: GetTableFieldsResponse;
  try {
    const resp = await fetch(
      'http://13.231.17.170:8080/getTableFields?tablename=tbtax',
    );
    respData = await resp.json();
  } catch (err) {
    throw new Error((err as Error)?.message ?? 'Something went wrong');
  }

  if (
    respData?.metadata?.status?.toLowerCase() !== 'ok' ||
    !Array.isArray(respData.data) ||
    respData.data.length === 0
  ) {
    throw new Error(respData?.metadata?.msg ?? 'Something went wrong');
  }

  return respData.data;
}
