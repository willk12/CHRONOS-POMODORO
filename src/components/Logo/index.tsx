
import { TimerIcon } from 'lucide-react';
import style from './styles.module.css'



export function Logo(){

return <div className={style.logo}>

    <a href="/" className={style.logoLink}>
        <TimerIcon  />
        <span>Chronos</span>    
    </a>

    </div>;
   
 


}