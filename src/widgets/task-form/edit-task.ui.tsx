'use client'
import { z } from 'zod';
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";
import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTaskStore} from "@shared/lib/zustand";
import Typography from "@mui/material/Typography";
import {MainFormSchema} from "../../entities/zod";

interface EditTaskProps {
    taskId:string
    microTaskId?:string
}

export function EditTaskForm({taskId,microTaskId}: EditTaskProps) {
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
    const updateTask = useTaskStore(state => state.updateTask)
    const updateMicroTask = useTaskStore(state => state.updateMicroTask)
    const closeEditForm = useTaskStore((state) => state.closeEditForm);
    const onSubmit = (data: FormData) => {
        console.log(taskId);
        if (microTaskId){
            updateMicroTask(taskId,microTaskId,{name:data.title})
        }else {
            updateTask(taskId,{title:data.title});

        }
        closeEditForm()
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
                        Редактировать
                    </Typography>
                </Button>
            </Box>
        </form>
    )
}