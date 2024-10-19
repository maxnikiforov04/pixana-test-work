import {create} from "zustand";
import { v4 as uuid } from 'uuid';
import {Actions, MicroTask, State, Task} from "./zustand.model"

export const useTaskStore = create<State & Actions>()(set=>({
    tasks:[],
    addTask:(title:string,description?:string,) => set((state)=>({
        tasks:[
            ...state.tasks,
            {id:uuid(),title,description,isComplete:false,microTasks:[]},
        ]
    })),
    addMicroTask:(task:Task,title:string,description?:string)=>{
        const newMicroTask: MicroTask = {
            id: uuid(),
            title,
            description: description || "",
            isComplete: false,
        };
        task.microTasks.push(newMicroTask);
    },
    removeMicroTask:(task:Task,microTaskId:string)=>{
        task.microTasks = task.microTasks.filter(microTask=>microTask.id !== microTaskId);
    },
    removeTask:(id:string)=>set((state)=>({
        tasks:state.tasks.filter(task=>task.id !== id),
    })),
}))