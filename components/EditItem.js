import ItemForm from './ItemForm';
import { Dialog } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { useState } from 'react';

const EditItem = (props) => {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const [ item, setItem ] = useState(props.item);

    const editItem = (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
    }
    const onDialogClose = (e) => {
        e.preventDefault();
        setIsDialogOpen(false);
    }

    return(
        <>
            <Edit color="disabled" onClick={editItem}/>
            <Dialog open={isDialogOpen} onClose={onDialogClose}>
                <Close onClick={onDialogClose}/>
                <ItemForm item={item}/>
                <br/>
            </Dialog>
        </>
    );
}

export default EditItem;
