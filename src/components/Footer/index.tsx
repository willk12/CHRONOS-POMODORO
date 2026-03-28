

import style from './styles.module.css'
import { RouterLink } from '../RouterLink'

export function Footer() {

return(
    <footer className={style.footer}>
       <RouterLink  href="/about-pomodoro/"> Entenda como funciona a técnica de pomodoro 🍎</RouterLink>
       <RouterLink  href="">Chronos pomodoro &copy; {new Date().getFullYear()} - Feito com 💚</RouterLink>
    </footer>
)


}