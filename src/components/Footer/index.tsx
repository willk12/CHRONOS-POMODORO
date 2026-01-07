
import style from './styles.module.css'

export function Footer() {

return(
    <footer className={style.footer}>
       <a href=""> Entenda como funciona a técnica de pomodoro 🍎</a>
       <a href="">Chronos pomodoro &copy; {new Date().getFullYear()} - Feito com 💚</a>
    </footer>
)


}