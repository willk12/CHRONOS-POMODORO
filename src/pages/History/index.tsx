import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;

  useEffect(() => {
    if (!confirmClearHistory) return;

   
      
      setConfirmClearHistory(false);
      

    dispatch({ type: TaskActionsTypes.RESET_TASK });
    
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    
      return () => showMessage.dismiss();
    
  }, []);



  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  function handleResetHistory() {
   showMessage.dismiss();
   showMessage.confirm('tem certeza que deseja apagar todo o histórico?', (confirmation) => {
   setConfirmClearHistory(confirmation);
    
    
   })


    
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='apagar todo o histórico'
              title='apagar histórico'
              onClick={handleResetHistory}
            />
          </span>)}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks({ field: 'name' })}
                  className={styles.thSort}
                >
                  Tarefa ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'duration' })}
                  className={styles.thSort}
                >
                  Duração ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'startDate' })}
                  className={styles.thSort}
                >
                  Data ↕
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {sortTasksOptions.tasks.map(task => {
                const taskTypeDictionary = {
                  workTime: 'Foco',
                  shortBreakTime: 'Descanso curto',
                  longBreakTime: 'Descanso longo',
                };

                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center' , padding: '20px 0'}}>Ainda não existem tarefas registradas.</p>
        )}
      </Container>
    </MainTemplate>
  );
}
