import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './taskContent';
import { taskReducer } from './taskReducer';
import { timerWorkerManager } from '../../workes/TimerWorkerManager';
import { TaskActionsTypes } from './taskActions';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = timerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;
    console.log(countDownSeconds);

    if (countDownSeconds <= 0) {
      dispatch({
            type: TaskActionsTypes.COMPLETE_TASK,
          
        })
      worker.terminate();
    }else{
        dispatch({
            type: TaskActionsTypes.COUNT_DOWN,
            payload: countDownSeconds
        })
    }
  });

  useEffect(() => {
    console.log(state);
    if (!state.activeTask) {
      console.log('terminando worker por falta de active task');
      worker.terminate();
    }
    worker.postMessage(state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
