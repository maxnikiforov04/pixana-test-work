'use client'
import { z } from 'zod';
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTaskStore} from "@shared/lib/zustand";
import {MainFormSchema} from "../../entities/zod";
import Typography from "@mui/material/Typography";

interface TaskFormProps {
    taskId?:string
}

export function MainTaskForm({taskId}: TaskFormProps) {
    type FormData = z.infer<typeof MainFormSchema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(MainFormSchema),
        defaultValues: {
            title: '',
        },
    });
    const createTask = useTaskStore(state => state.addTask)
    const addMicroTask = useTaskStore(state => state.addMicroTask)
    const onSubmit = (data: FormData) => {
        console.log(taskId);
        if (taskId){
            addMicroTask(taskId,data.title)
            console.log(data.title)
        }else{
            createTask(data.title)
            console.log("моча")
        }
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box>
                <TextField {...register("title")}
                           label="Название" id="name"
                           fullWidth={true}
                           error={!!errors.title}
                           helperText={errors.title?.message}
                />
            </Box>
            <Box display="flex" justifyContent="right" mt="3rem">
                <Button variant="contained" type="submit">
                    <Typography sx={{fontSize:20}}>
                        Создать
                    </Typography>
                </Button>
            </Box>
        </form>
    )
}