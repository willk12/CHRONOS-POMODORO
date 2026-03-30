import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import {  useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { useEffect } from "react";

export function Settings() {
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);
  
  const { state, dispatch} = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = []

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);
    
    
    
  if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)){
    formErrors.push('Digite apenas números para todos os campos')
   
  }

  if(workTime < 1 || workTime > 99){
    formErrors.push('O tempo de foco deve ser entre 1 e 99 minutos')
  }
  
  if(shortBreakTime < 1 || shortBreakTime > 30){
    formErrors.push('O tempo de descanso curto deve ser entre 1 e 30 minutos')
  }
  
  if(longBreakTime < 1 || longBreakTime > 60){
    formErrors.push('O tempo de descanso longo deve ser entre 1 e 60 minutos')
  }
  

  if(formErrors.length > 0){
    formErrors.forEach(error => {
      showMessage.error(error);
    });
    return;
  }

 dispatch({
  type: TaskActionsTypes.CHANGE_SETTINGS,
  payload: {
    workTime,
    shortBreakTime,
    longBreakTime
  }
 });

 showMessage.success('Configurações salvas com sucesso!');
  

    
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p>Modifique as Configurações para tempo de foco, descanso curto e descanso longo</p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSubmit} action='' className="form">
          <div className="formRow">
            <DefaultInput id='workTime' labeltext="Foco" ref={workTimeInputRef} defaultValue={state.config.workTime} type="number" />
          </div>
          <div className="formRow">
            <DefaultInput id='shortBreakTime' labeltext="Descanso Curto" ref={shortBreakTimeInputRef} defaultValue={state.config.shortBreakTime} type="number" />
          </div>
          <div className="formRow">
            <DefaultInput id='longBreakTime' labeltext="Descanso Longo" ref={longBreakTimeInputRef} defaultValue={state.config.longBreakTime} type="number" />
          </div>
          <div className="formRow">
            <DefaultButton icon={<SaveIcon />} aria-label="Salvar Configurações" title="Salvar" color="green" />
          </div>

        </form>
      </Container>
    </MainTemplate>
  )
}