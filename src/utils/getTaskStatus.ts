import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
    if (task.interruptedDate) {
        return 'Interrompida';
    }
    if (task.completeDate) {
        return 'Concluída';
    }

    if(task.id === activeTask?.id) {
        return 'Em progresso';
    }
    
    return 'Abandonada';
}