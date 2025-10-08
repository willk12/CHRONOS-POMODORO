
import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import style from './styles.module.css'



export function Menu(){

return <div className={style.menu}>

    <nav>
        <a href="/" className={style.menuLink}>
        <HouseIcon  />
           
    </a>
   
        <a href="/" className={style.menuLink}>
        < HistoryIcon />
           
    </a>
    
        <a href="/" className={style.menuLink}>
        <SettingsIcon  />
           
    </a>
    
        <a href="/" className={style.menuLink}>
        <SunIcon  />
           
    </a>
    </nav>

    </div>;
   
 


}