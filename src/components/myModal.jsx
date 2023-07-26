import {Box, Modal, TextField, Typography} from "@mui/material";
import {useState} from "react";

export default function MyModal(props) {

    const [editMode, setEditMode] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [newValues, setNewValues] = useState({});

    const onEdit = () => {
        setEditMode(false)
        alert((JSON.stringify(newValues).slice(1,-1)).replaceAll(",", `          `))
    }

    const onSubmit = () => {
        setEditMode(true)
    }
    const onChangeItem = (value, key) => {
        const temp = {...newValues, [key]: value};
        setNewValues(temp)
    }


    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {
                        editMode?
                            <>
                                <TextField
                                    id="age"
                                    label="age"
                                    onChange={e=> onChangeItem(e.target.value, 'age')}
                                    defaultValue={props.modalData.age}
                                    variant="outlined"
                                />
                                <TextField
                                    id="visits"
                                    label="visits"
                                    onChange={e=> onChangeItem(e.target.value, 'visits')}
                                    defaultValue={props.modalData.visits}
                                    variant="outlined"
                                />
                                <TextField
                                    id="progress"
                                    label="progress"
                                    onChange={e=> onChangeItem(e.target.value, 'progress')}
                                    defaultValue={props.modalData.progress}
                                    variant="outlined"
                                />
                                <TextField
                                    id="status"
                                    label="status"
                                    onChange={e=> onChangeItem(e.target.value, 'status')}
                                    defaultValue={props.modalData.status}
                                    variant="outlined"
                                />
                            </>
                            :<>
                                <p>age: {props.modalData.age}</p>
                                <p>visits: {props.modalData.visits}</p>
                                <p>progress: {props.modalData.progress}</p>
                                <p>status: {props.modalData.status}</p>
                            </>
                    }
                    <button className="bg-gray" onClick={editMode? onEdit :onSubmit}>{editMode? "submit" :"edit"}</button>
                </Typography>
            </Box>
        </Modal>
    )
}