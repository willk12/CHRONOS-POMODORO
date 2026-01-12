import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function MainForm() {
const {setState} = useTaskContext()

const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    if(taskNameInput.current === null) return;
    
    const taskName = taskNameInput.current.value.trim();

    if(!taskName) {
      alert('Por favor, insira um nome para a tarefa.');
      return;
    };

    const newTask : TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      duration: 1,
      type: 'workTime'
    };

    const secondsRemaining =newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: 1,
        secondsRemaining,
        formattedSecondsRemaining: '00:00',
        tasks: [...prevState.tasks, newTask],
      }
    })

    console.log(taskName);
    
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
          // value={TaskName}
          // onChange={e => setTaskName(e.target.value)}
        />
      </div>
      <div className='formRow'>
        <p>proximo intervalo é de 25min.</p>
      </div>
      <div className='formRow'>
        <Cycles />
      </div>
      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} color='green' />
        <DefaultButton icon={<StopCircleIcon />} color='red' />
      </div>
    </form>
  );
}
