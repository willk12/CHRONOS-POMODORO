import type React from 'react';
import style from './styles.module.css'


type HeadingProps = {
    children: React.ReactNode;
}

export function Heading({ children }: HeadingProps) {

return(
    <>

    <header className={style.heading}>{children}</header>
   
    </>
)


}