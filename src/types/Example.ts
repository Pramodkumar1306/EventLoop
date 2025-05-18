import { Task } from './Task';

export interface ExampleStep {
  callStack?: Task[];
  webAPIs?: Task[];
  callbackQueue?: Task[];
  explanation: string;
}

export interface Example {
  title: string;
  code: string;
  description: string;
  highlightLines?: number[];
  steps: ExampleStep[];
}