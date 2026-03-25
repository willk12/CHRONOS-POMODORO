import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './taskContent';
import { taskReducer } from './taskReducer';
import { timerWorkerManager } from '../../workes/TimerWorkerManager';
import { TaskActionsTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);
    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);


    const worker = timerWorkerManager.getInstance();

    worker.onmessage(e => {
        const countDownSeconds = e.data;


        if (countDownSeconds <= 0) {

            if (playBeepRef.current) {
                console.log('tocando beep');
                playBeepRef.current();
                playBeepRef.current = null;
            }

            dispatch({
                type: TaskActionsTypes.COMPLETE_TASK,

            })
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionsTypes.COUNT_DOWN,
                payload: countDownSeconds
            })
        }
    });

    useEffect(() => {

        if (!state.activeTask) {

            worker.terminate();
        }


        worker.postMessage(state);
    }, [worker, state]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            console.log('carregando beep');
            playBeepRef.current = loadBeep();
        } else {
            console.log('limpando beep');
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
