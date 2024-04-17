export interface notesType {
  title: string;
  desc: string;
  date: string;
  isTodo: boolean;
  done?: boolean;
}

export interface userType {
  id: string;
  name: string;
  password: string;
  desc?: string;
  notes: notesType[];
}
