'use client'
import {ReactNode, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Modal} from "@mui/material";
import {MainTaskForm} from "@widgets/task-form";

const drawerWidth = 240;

interface Props {
    window?: () => Window;
    children:ReactNode
}
export function HomeLayout(props: Props) {
    const { children } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Box sx={{ display: 'flex', fontSize:34,fontWeight: 'medium'}}>
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{fontSize:20,display:"flex",justifyContent:"center",justifyItems:"center",alignItems:"center"}}>
                        Создать задачу
                        <Box display="flex" justifyContent="center" alignItems="center"
                             width="3rem" height="3rem" borderRadius="100%" bgcolor="green" ml="1rem"
                             sx={{cursor: 'pointer'}}
                             onClick={()=>{handleOpen()}}
                        >
                            <AddIcon sx={{fontSize:24}}/>
                        </Box>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, width:400}}>
                        <MainTaskForm/>
                    </Box>
                </Modal>
            </Box>

        </Box>
    );
}
