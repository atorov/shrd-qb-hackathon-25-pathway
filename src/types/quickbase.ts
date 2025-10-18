// import { ReactNode } from "react";

export type QbTable = {
  id: string;
  name: string;
  description: string;
  singleRecordName: number;
  pluralRecordName: number;
  defaultSortFieldId: number;
  // ---
  created: string;
  updated: string;
  alias: string;
  nextRecordId: number;
  nextFieldId: number;
  defaultSortOrder: string;
  keyFieldId: number;
  sizeLimit: number;
  spaceUsed: number;
  spaceRemaining: number;
};

export type PossibleValues =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>;

type QbTableDetailsDataElementValue = Record<'value', PossibleValues>;

export type QbTableDetailsDataItem = Record<
  string,
  QbTableDetailsDataElementValue
>;

type QbTableDetailsFieldItem = {
  id: string;
  label: string;
  type: string; // TODO: should be enum-like
};

type QbTableMetadata = {
  numFields: number;
  numRecords: number;
  skip: number;
  totalRecords: number;
};

export type QbTableDetails = {
  data: QbTableDetailsDataItem[];
  fields: QbTableDetailsFieldItem[];
  metadata: QbTableMetadata;
};

export type QbTablesDetails = Record<QbTable['id'], QbTableDetails>;
