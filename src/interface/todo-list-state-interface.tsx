export interface todoListTypes {
  id: number;
  contents: string;
  isCompleted: boolean;
  categoryId: number;
}

export interface categoryTypes {
  id: number;
  name: string;
  isChecked: boolean;
}
