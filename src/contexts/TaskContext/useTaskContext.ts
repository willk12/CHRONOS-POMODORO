import { useContext } from "react";
import { TaskContext } from "./taskContent";

export function useTaskContext() {
    return useContext(TaskContext);
}