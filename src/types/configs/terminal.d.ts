export interface TerminalData {
  id: string;
  title: string;
  type: string;
  content?: JSX.Element | string;
  children?: TerminalData[];
}
