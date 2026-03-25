import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';


export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Por favor, insira um nome para a tarefa.');
      return;
    }

    showMessage.success('Tarefa criada com sucesso!');

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };



    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });

    
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!');
  }
  return (
    <form action='' className='form' onSubmit={handleCreateNewTask}>
      <div className='formRow'>
        <DefaultInput
          ref={taskNameInput}
          type='text'
          id='meuInput'
          labeltext='Qualquer coisa'
          title='titulo'
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            icon={<PlayCircleIcon />}
            color='green'
            type='submit'
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            key='start-task'
          />
        ) : (
          <DefaultButton
            icon={<StopCircleIcon />}
            color='red'
            type='button'
            aria-label='Parar tarefa'
            title='Parar tarefa'
            onClick={handleInterruptTask}
            key='stop-task'
          />
        )}
      </div>
    </form>
  );
}
