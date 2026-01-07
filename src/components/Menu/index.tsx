import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import style from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';

    return storageTheme ;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      return newTheme;
      
    });

    

  }

  return (
    <div className={style.menu}>
      <nav>
        <a
          href='#'
          className={style.menuLink}
          aria-label='Ir para a Home'
          title='Ir para a Home'
        >
          <HouseIcon />
        </a>

        <a
          href='#'
          className={style.menuLink}
          aria-label='Ir para o Histórico'
          title='Ir para o Histórico'
        >
          <HistoryIcon />
        </a>

        <a
          href='#'
          className={style.menuLink}
          aria-label='Ir para as Configurações'
          title='Ir para as Configurações'
        >
          <SettingsIcon />
        </a>

        <a
          href='#'
          className={style.menuLink}
          aria-label='Alternar tema claro/escuro'
          title='Alternar tema claro/escuro'
          onClick={handleThemeChange}
        >
          {nextThemeIcon[theme]}
        </a>
      </nav>
    </div>
  );
}
