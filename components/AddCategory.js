import { useEffect, useState } from 'react';
import axios from 'axios';
import dashify from 'dashify';
import AddCircle from '@material-ui/icons/AddCircle';
import { TextField, IconButton } from '@material-ui/core';

const AddCategory = () => {
  const [content, setContent] = useState({
    name: "",
    description: ""    
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { name, description } = content;
    if(name) {
      console.log(name)
      const res = await axios.post('/api/category', { name, slug: dashify(name), description });
      window.location.reload();
    }
  }
  return (
    <div>      
      <label htmlFor="name"></label>
      <TextField
        type="text"
        name="name"
        value={content.name}
        onChange={onChange}
        placeholder="Add a category"
      />      
      <AddCircle color="primary" onClick={onSubmit}/>
    </div>
  );
};

export default AddCategory;