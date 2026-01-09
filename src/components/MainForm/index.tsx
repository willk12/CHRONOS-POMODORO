import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";


export function MainForm() {

    const [TaskName, setTaskName] = useState('');
    function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(TaskName);
    }
  return (
    <form action="" className='form' onSubmit={handleCreateNewTask}>
          <div className="formRow">
            <DefaultInput type='text' id='meuInput' labeltext='Qualquer coisa' title='titulo' value={TaskName} onChange={(e) => setTaskName(e.target.value)}  />
          </div>
          <div className="formRow">
            <p>proximo intervalo é de 25min.</p>
          </div>
          <div className="formRow">
            <Cycles />
          </div>
          <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon />} color='green' />
            <DefaultButton icon={<StopCircleIcon />} color='red' />
          </div>
        </form>
  );
}