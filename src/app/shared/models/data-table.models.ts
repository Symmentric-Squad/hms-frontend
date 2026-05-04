export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'tag' | 'badge';
  tagColors?: {
    [key: string]: { bg: string; text: string };
  };
  width?: string;
}

export interface TableAction {
  id: string;
  label: string;
  icon?: string;
  type?: 'primary' | 'danger' | 'secondary';
  actionColor: 'red' | 'blue' | 'gray' | 'black' | 'green'
}

export interface RowActionEvent {
  action: string;
  rowData: any;
}
