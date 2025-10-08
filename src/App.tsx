
import { Container } from './components/Container/index';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';

import './styles/theme.css';
import './styles/global.css';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';

export function App() {
  console.log('ola');

  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <form action="" className='form'>
          <div className="formRow">
            <DefaultInput type='number' />
          </div>
          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="formRow">
            <p>Ciclos</p>
            <p>0 0 0 0 0 0</p>
          </div>
          <div className="formRow">
            <button type='submit' className='startButton'>Começar</button>
          </div>
        </form>
      </Container>
    </>
  );
}
