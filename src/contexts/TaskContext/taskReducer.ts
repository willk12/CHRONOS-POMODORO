import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionsTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionsTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionsTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              interruptedDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionsTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              completedDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionsTypes.RESET_TASK: {
      return { ...initialTaskState };
    }
    case TaskActionsTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload,
        formattedSecondsRemaining: formatSecondsToMinutes(action.payload),
      };
    }
    case TaskActionsTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: {...action.payload},
      };
    }

    default:
      return state;
  }
}
