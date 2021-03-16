import { useEffect, useState } from 'react';
import axios from 'axios';
import dashify from 'dashify';
import AddCircle from '@material-ui/icons/AddCircle';
import { TextField, IconButton } from '@material-ui/core';

const AddCategory = () => {
  const [newCategories, setNewCategories] = useState("");
  const onChangeAdd = (e) => {
    setNewCategories(e.target.value);
  }
  const addCategory = () => {
    if(newCategories){
      newCategories.trim().split(',').map( async(i) => {
        if(i.trim() !== ""){
          const name = i.trim();
          await axios.post('/api/categories', { name, slug: dashify(name) });
        }        
      })
      window.location.reload();
    }
  }
  return (
    <div>      
      <TextField
        multiline
        label="Add categories"
        placeholder="Separated by comma"
        name="newCategories"
        value={newCategories}
        onChange={onChangeAdd}        
      />      
      <AddCircle color="primary" onClick={addCategory}/>
    </div>
  );
};

export default AddCategory;