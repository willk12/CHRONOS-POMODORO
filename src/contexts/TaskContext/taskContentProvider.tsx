import { useEffect, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./taskContent";


type TaskContextProviderProps = {
    children: React.ReactNode;
}

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
    const [state, setState] = useState(initialTaskState)
   

  
    useEffect(() => {
        console.log(state);
        
    }, [state])
    
    return (
        <TaskContext.Provider value={{state, setState}}>
            {children}
        </TaskContext.Provider>
    )
}