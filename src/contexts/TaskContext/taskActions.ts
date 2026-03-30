import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export enum TaskActionsTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_TASK = 'RESET_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS'
}

export type TaskActionsWithPayload = |{
  type: TaskActionsTypes.START_TASK;
  payload: TaskModel;
}|{
  type: TaskActionsTypes.COUNT_DOWN;
  payload: number;
}|{
  type: TaskActionsTypes.CHANGE_SETTINGS;
  payload: TaskStateModel['config'];
};

export type TaskActionsWithoutPayload =
  | { type: TaskActionsTypes.RESET_TASK }
  | {type: TaskActionsTypes.INTERRUPT_TASK}
  | {type: TaskActionsTypes.COMPLETE_TASK};


export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
