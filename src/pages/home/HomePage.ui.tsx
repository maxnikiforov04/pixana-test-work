'use client'
import {HomeLayout} from "@widgets/home-layout";
import {useTaskStore} from "@shared/lib/zustand";


export default function Home() {
    const tasks = useTaskStore(state => state.tasks);
    console.log(tasks);
    return(
        <HomeLayout>
            <div>
                {tasks && tasks.map((task) =>(
                    <div key={task.id}>{task.title}</div>
                ))}
            </div>
        </HomeLayout>
    )
}
