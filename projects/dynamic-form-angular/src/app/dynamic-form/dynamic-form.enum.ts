export interface Field {
  fieldtype: string;
  name: string;
  group: string;
  validator?: string[];
  condition?: string;
  rules?: Rule[];
  selectList?: string[];
}

export interface Rule {
  field: string;
  operator: string;
  value: any;
}
