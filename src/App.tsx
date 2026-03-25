import './styles/theme.css';
import './styles/global.css';
import { Home } from './pages/Home';
import { TaskContextProvider } from './contexts/TaskContext/taskContentProvider';
import { MessageContainer } from './components/MessageContainer';



export function App() {
  return (
    <TaskContextProvider>

      <MessageContainer >
        <Home />
      </MessageContainer>
    </TaskContextProvider>

  );
}
