export interface GetTableFieldsResponse {
  metadata: GetTableFieldsResponseMeta;
  data: Array<TableField>;
}

export interface GetTableFieldsResponseMeta {
  msg: string;
  status: string;
}

export interface TableField {
  Field: string;
  Type: TableFieldType;
  Null: 'YES' | 'NO';
}

type TableFieldType =
  | 'int'
  | `varchar(${number})`
  | `decimal(${number},${number})`
  | 'tinyint'
  | 'datetime'
  | 'date';
