import { useEffect, useState } from 'react';
import axios from 'axios';
import dashify from 'dashify';
import AddCircle from '@material-ui/icons/AddCircle';
import { TextField, Select, MenuItem, FormControl, Card, CardContent, CardActions, Grid } from '@material-ui/core';

const AddCategoryL1 = () => {
  const [content, setContent] = useState({
    name: "",
    parentCategoryId: ""
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onClick = async () => {
    const { name, parentCategoryId } = content;
    console.log(content);    
    const res = await axios.put('/api/categories/l1', { name, parentCategoryId });
    window.location.reload();
  }
  const [ categoryNames, setCategoryNames ] = useState([]);
  useEffect(async()=>{
    console.log('rendering');
    const res = await axios.get('/api/categories'); 
    const cNames = res.data.categoriesData.map( category => ( { id: category.id, name: category.name } ));
    setCategoryNames(cNames);
  }, []);
    
  return (
      <Grid item xs={12} sm={4}>
      
        <FormControl>        
        <label htmlFor="name"></label>
        <TextField
          name="name"
          value={content.name}
          onChange={onChange}
          placeholder="Add a category"
        />            
        <Select name="parentCategoryId" value={content.parentCategoryId} placeholder="Parent category" onChange={onChange}>
          {categoryNames.map(categoryName=>(
            <MenuItem value={categoryName.id}>{categoryName.name}</MenuItem>
          ))}          
        </Select>        
        </FormControl>      
        <AddCircle onClick={onClick}/>
      </Grid>
  );
};

export default AddCategoryL1;