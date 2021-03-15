import { useEffect, useState } from 'react';
import axios from 'axios';
import dashify from 'dashify';
import AddCircle from '@material-ui/icons/AddCircle';
import { TextField, IconButton } from '@material-ui/core';
import useRouter from 'next/router';

const AddProduct = () => {
  const router = useRouter();
  const [content, setContent] = useState({
    name: undefined,
    brands: []
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { id } = router.query;
    const { name } = content;
    const res = await axios.put(`/api/product/${ id }`, { name, slug: dashify(name)});
    window.location.reload();
  }
  return (
    <div>            
      <TextField
        type="text"
        name="name"
        value={content.name}
        onChange={onChange}
        placeholder="Add a product"
      />      
      <IconButton onClick={onSubmit} color="primary"><AddCircle/></IconButton>      
    </div>
  );
};

export default AddProduct;