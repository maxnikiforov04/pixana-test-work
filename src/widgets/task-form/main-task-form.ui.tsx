'use client'
import { z } from 'zod';
import Box from "@mui/material/Box";
import {Button, FormHelperText, TextField} from "@mui/material";
import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    title:z.string()
        .min(1,'Title is required')
        .max(30,'Too many letters'),
    description:z.string()
        .max(200,'Too many letters'),
});

export function MainTaskForm() {
    type FormData = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: ''
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data.title);
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)} >
            <Box>
                <TextField {...register("title")}
                           label="Название" id="name"
                           style={{width:'60%'}}
                           error={!!errors.title}
                           helperText={errors.title?.message}
                />
            </Box>
            <Box mt="3rem" >
                <TextField {...register('description')}
                           variant="standard" label="Описание"
                           id="description" aria-describedby="desc"
                           fullWidth={true}
                           error={!!errors.description}
                           helperText={errors.description?.message}
                />
                <FormHelperText id="my-helper-text">Описание заметки</FormHelperText>
            </Box>
            <Box display="flex" justifyContent="right" mt="3rem">
                <Button variant="contained" type="submit">Создать</Button>
            </Box>
        </form>
    )
}