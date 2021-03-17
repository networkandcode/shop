import { useEffect, useState } from 'react';
import axios from 'axios';
import dashify from 'dashify';
import AddCategory from '../../../components/AddCategory';
import { Save, DeleteForever, Launch} from '@material-ui/icons';
import { TextField, Grid, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

const EditCategory = (props) => {  
  const [content, setContent] = useState({
    name: "",
    description: ""
  })
  const [click, setClick] = useState(false);
  useEffect(async () => {
    const { id } = props;
    if (id) {
      const res = await axios.get(`/api/categories/${id}`);
      const { name, description } = res.data;
      setContent({
        name,
        description
      })
    }
  }, [props.id, click])

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  const onSubmit = async (e) => {
    const { id } = props
    const { name, description } = content;    
    await axios.put(`/api/categories/${id}`, {
      slug: dashify(name),
      name,
      description,
    });
    setClick(!click);
  }

  const onDelete = async () => {
    const { id } = props;
    await axios.delete(`/api/categories/${id}`);
    window.location.reload();
  }

  return (    
        <Grid item xs={12} sm={4}>          
          <TextField
          type="text"
          name="name"
          value={content.name}
          onChange={onChange}
          />          
          <Link href={`/admin/categories/${props.id}`}>
            <a><Launch fontSize="small" color="primary"/></a>
          </Link>
          <Save fontSize="small" onClick={onSubmit} color="action"/>
          <DeleteForever fontSize="small" onClick={onDelete} color="error"/>
        </Grid>      
  );
};

const List = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  useEffect(async () => {
    const res = await axios.get('/api/categories');    
    setCategories(res.data.categoriesData);
  }, []);

  return (
    <Container>
      <small>Categories</small>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <AddCategory/>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <Grid container spacing={2}>
      {categories.map(category => (        
            <EditCategory key={category.id} slug={category.slug} id={category.id}/>
      ))}
      </Grid>
    </Container>
  );
};

export default List;