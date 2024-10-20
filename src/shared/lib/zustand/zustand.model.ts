export type MicroTask = {
    id: string;
    name: string
    isComplete: boolean
}

export type Task ={
    id: string;
    title: string;
    isComplete: boolean;
    microTasks: MicroTask[];
}

export type State ={
    tasks: Task[];
}

export type Actions = {
    addTask: (title:string) => void;
    changeComplete: (taskId:string,microTaskId?:string) => void;
    addMicroTask: (taskId:string,name:string,) => void;
    removeMicroTask: (taskId:string, microTaskId: string) => void;
    updateTask: (taskId:string,updatedFields:Partial<Task>) => void;
    updateMicroTask: (taskId:string,microTaskId:string,updatedFields:Partial<MicroTask>) => void;
    removeTask: (id: string) => void;
}