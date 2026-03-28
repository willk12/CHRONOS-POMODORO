
import { TimerIcon } from 'lucide-react';
import style from './styles.module.css'
import { RouterLink } from '../RouterLink';



export function Logo(){

return <div className={style.logo}>

    <RouterLink href="/" className={style.logoLink}>
        <TimerIcon  />
        <span>Chronos</span>    
    </RouterLink>

    </div>;
   
 


}
