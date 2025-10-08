import type React from 'react';
import style from './styles.module.css'
import { HistoryIcon, HouseIcon, Settings, Sun } from 'lucide-react';

type HeadingProps = {
    children: React.ReactNode;
}

export function Heading({ children }: HeadingProps) {

return(
    <>

    <header className={style.heading}>{children}</header>
    <div className={style.navbar}>
        <HouseIcon className='iconNavbar'/>
        <HistoryIcon className='iconNavbar'/>
        <Settings className='iconNavbar'/>
        <Sun className='iconNavbar'/>

    </div>
    </>
)


}