export type MicroTask = {
    id: string;
    title: string
    description: string
    isComplete: boolean
}

export type Task ={
    id: string;
    title: string;
    description?: string;
    isComplete: boolean;
    microTasks: MicroTask[];
}

export type State ={
    tasks: Task[];
}

export type Actions = {
    addTask: (title:string,description?:string) => void;
    addMicroTask: (task:Task,title:string,description?:string) => void;
    removeMicroTask: (task: Task, microTaskId: string) => void;
    removeTask: (id: string) => void;
}