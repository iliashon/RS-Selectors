export enum EResStatus {
  er401 = 401,
  er404 = 404,
}

export interface IresponseStatusFetch {
  status: number;
  statusText: string;
  ok: boolean;
  json: () => object;
}

export interface IDataLevels {
  answer: string;
  examples: string[];
  hint: string;
  html: string;
  selectorName: string;
  syntax: string;
  title: string;
  state: boolean;
  htmlMarkup: string;
  titleTask: string;
  help: string;
}
