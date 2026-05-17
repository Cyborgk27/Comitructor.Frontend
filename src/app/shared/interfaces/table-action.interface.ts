export interface TableAction {
  label: string;
  icon: string;
  class: string;
  callback: (item: any) => void;
}
