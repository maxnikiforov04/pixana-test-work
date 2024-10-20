import {create} from "zustand";
import {v4 as uuid} from 'uuid';
import {Actions, MicroTask, State, Task} from "./zustand.model"
import {createJSONStorage, persist} from "zustand/middleware";

export const useTaskStore = create<State & Actions>()(persist(
    (set) => ({
        tasks: [],
        addTask: (title: string) => set((state) => ({
            tasks: [
                ...state.tasks,
                { id: uuid(), title, isComplete: false, microTasks: [] },
            ]
        })),
        addMicroTask: (taskId: string, name: string) =>
            set((state) => {
                const newMicroTask: MicroTask = {
                    id: uuid(),
                    name,
                    isComplete: false,
                };

                const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
                if (taskIndex === -1) return {}; // Return state unchanged if task not found

                const updatedTask = {
                    ...state.tasks[taskIndex],
                    microTasks: [...state.tasks[taskIndex].microTasks, newMicroTask],
                };

                const updatedTasks = [
                    ...state.tasks.slice(0, taskIndex),
                    updatedTask,
                    ...state.tasks.slice(taskIndex + 1),
                ];

                return { tasks: updatedTasks };
            }),
        removeMicroTask: (taskId: string, microTaskId: string) =>
            set((state) => {
                const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
                if (taskIndex === -1) return {};

                const updatedTask = {
                    ...state.tasks[taskIndex],
                    microTasks: state.tasks[taskIndex].microTasks.filter(
                        (microTask) => microTask.id !== microTaskId
                    ),
                };

                const updatedTasks = [
                    ...state.tasks.slice(0, taskIndex),
                    updatedTask,
                    ...state.tasks.slice(taskIndex + 1),
                ];

                return { tasks: updatedTasks };
            }),
        removeTask: (id: string) => set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id),
        })),
        changeComplete: (taskId: string, microTaskId?: string) => set((state) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

            if (taskIndex === -1) {
                return state;
            }
            const updatedTasks = [...state.tasks];
            if (microTaskId) {
                const microTaskIndex = state.tasks[taskIndex].microTasks.findIndex(microTask => microTask.id === microTaskId);
                updatedTasks[taskIndex].microTasks[microTaskIndex] = {
                    ...updatedTasks[taskIndex].microTasks[microTaskIndex],
                    isComplete: !updatedTasks[taskIndex].microTasks[microTaskIndex].isComplete
                };
                return { tasks: updatedTasks };
            } else {
                updatedTasks[taskIndex] = {
                    ...updatedTasks[taskIndex],
                    isComplete: !updatedTasks[taskIndex].isComplete,
                };
                return { tasks: updatedTasks };
            }
        }),
        updateTask: (taskId: string, updatedFields: Partial<Task>) =>
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedFields } : task
                ),
            })),
        updateMicroTask: (taskId: string, microTaskId: string, updatedFields: Partial<MicroTask>) =>
            set((state) => ({
                tasks: state.tasks.map((task) => {
                    if (task.id !== taskId) return task;

                    const updatedMicroTasks = task.microTasks.map((microTask) =>
                        microTask.id === microTaskId
                            ? { ...microTask, ...updatedFields }
                            : microTask
                    );

                    return { ...task, microTasks: updatedMicroTasks };
                }),
            })),
    }),
    {
        name: 'task-storage',
        storage: createJSONStorage(() => localStorage),
    }
));
