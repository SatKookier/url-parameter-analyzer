
export interface QueryParam {
  key: string;
  value: string;
  explanation?: string;
}

export interface ParsedUrlInfo {
  protocol: string;
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  params: QueryParam[];
}
