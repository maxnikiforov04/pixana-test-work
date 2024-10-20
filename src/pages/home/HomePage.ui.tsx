'use client'
import { useState } from "react";
import { HomeLayout } from "@widgets/home-layout";
import { useTaskStore } from "@shared/lib/zustand";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Box from "@mui/material/Box";
import { v4 as uuid } from 'uuid';
import { EditTaskForm, MainTaskForm } from "@widgets/task-form";
import { Button, Modal } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from "@mui/material/Typography";

export default function Home() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        fontSize: 20,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [editOpen, setEditOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [editMicroTaskOpen, setEditMicroTaskOpen] = useState(false);
    const [currentMicroTaskId, setCurrentMicroTaskId] = useState('');

    const tasks = useTaskStore(state => state.tasks);
    const changeCompleted = useTaskStore(state => state.changeComplete);
    const removeTask = useTaskStore(state => state.removeTask);
    const removeMicroTask = useTaskStore(state => state.removeMicroTask);

    return (
        <HomeLayout>
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView>
                    {tasks && tasks.map((task) => (
                        <TreeItem itemId={task.id} key={task.id} label={
                            <Box onClick={(event) => {
                                event.stopPropagation();
                            }}
                                 display="flex" alignItems="center" justifyContent="space-between"
                                 sx={{ width: "100%" }}>
                                <Box>
                                    <Typography sx={{ fontSize: 20 }}>
                                        {task.isComplete ? (
                                            <Typography style={{ textDecoration: 'line-through' }} sx={{ fontSize: 20 }}>
                                                {task.title}
                                            </Typography>
                                        ) : (
                                            <Typography sx={{ fontSize: 20 }}>
                                                {task.title}
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button
                                        size="small"
                                        sx={{ ml: 1 }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setCurrentTaskId(task.id);
                                            setEditOpen(true);
                                        }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        size="medium"
                                        sx={{ ml: 1 }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            removeTask(task.id);
                                        }}
                                    >
                                        <DeleteIcon fontSize="medium" />
                                    </Button>
                                    <Button
                                        size="medium"
                                        sx={{ ml: 1 }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            changeCompleted(task.id);
                                        }}
                                    >
                                        <CheckCircleIcon fontSize="medium" />
                                    </Button>
                                </Box>
                                <Modal
                                    open={editOpen}
                                    onClose={() => setEditOpen(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    disableEnforceFocus
                                >
                                    <Box sx={{ ...style, width: 400 }}>
                                        <EditTaskForm taskId={currentTaskId} />
                                    </Box>
                                </Modal>
                            </Box>
                        }>
                            {task.microTasks.map((item) => (
                                <TreeItem key={item.id} itemId={item.id} label={
                                    <Box display="flex" alignItems="center"
                                         justifyContent="space-between" sx={{ width: "100%" }}
                                         onClick={(event) => event.stopPropagation()}
                                    >
                                        <Box>
                                            {item.isComplete ? (
                                                <Typography style={{ textDecoration: 'line-through' }} sx={{ fontSize: 20 }}>
                                                    {item.name}
                                                </Typography>
                                            ) : (
                                                <Typography sx={{ fontSize: 20 }}>
                                                    {item.name}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box>
                                            <Button
                                                size="small"
                                                sx={{ ml: 1 }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setCurrentMicroTaskId(item.id);
                                                    setEditMicroTaskOpen(true);
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{ ml: 1 }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    removeMicroTask(task.id, item.id);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{ ml: 1 }}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    changeCompleted(task.id, item.id);
                                                }}
                                            >
                                                <CheckCircleIcon fontSize="small" />
                                            </Button>
                                        </Box>
                                        <Modal
                                            open={editMicroTaskOpen && currentMicroTaskId === item.id}
                                            onClose={() => setEditMicroTaskOpen(false)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            disableEnforceFocus
                                        >
                                            <Box sx={{ ...style, width: 600 }}>
                                                <EditTaskForm taskId={task.id} microTaskId={currentMicroTaskId} />
                                            </Box>
                                        </Modal>
                                    </Box>
                                } />
                            ))}
                            <TreeItem style={{ background: '#3f50b5', color: "white" }} itemId={uuid()} label={
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ fontSize: 20 }}>
                                        Создать подзадачу
                                    </Typography>
                                </Box>
                            } onClick={() => {
                                setCurrentTaskId(task.id);
                                handleOpen();
                            }} />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{ ...style, width: 400 }}>
                                    <MainTaskForm taskId={currentTaskId} />
                                </Box>
                            </Modal>
                        </TreeItem>
                    ))}
                </SimpleTreeView>
            </Box>
        </HomeLayout>
    );
}
