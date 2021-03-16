import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
    Container,
    Grid,
    TextField    
} from '@material-ui/core';
import { 
    AddCircle, 
    Launch, 
    Save, 
    DeleteForever 
} from '@material-ui/icons';
import {
    Alert
} from '@material-ui/lab';
import axios from 'axios';
import dashify from 'dashify';

const EditCategory = (props) => {
    const [category, setCategory] = useState(props.category);    
    const onChange = (e) => {
        const {name, value} = e.target;
        setCategory({
            ...category,
            [name]: value
        })
    }
    useEffect(()=>{
    },[props.category]);   
    return(
        <>
            <TextField name="name" value={category.name} onChange={onChange} required/>
            <Link href={`/admin/categories/l2/${props.id}?c=${category.name}`}><a><Launch/></a></Link>
            <Save onClick={() => props.saveCategory(category)}/>
            <DeleteForever onClick={() => props.deleteCategory(category)}/>
        </>
    );
}

const Categories = () => {
    // router
    const router = useRouter();        
    const id = router.query.slug;
    console.log(id);
    
    // state
    const [ newCategories, setNewCategories ] = useState("");
    const [click, setClick] = useState(false);
    const [ loading, setLoading ] = useState('');
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    // handlers
    const onChangeAdd = (e) => {
        setLoading('');        
        setNewCategories(e.target.value);
    }    
    const addCategory = () => {
        if(newCategories.trim() !== ""){
            newCategories.trim().split(',').map( async(i) => {
              if(i.trim() !== ""){
                const name = i.trim();
                const newCategory = {
                    name: name
                };
                if( categories.some( category => ( dashify(category.name) === dashify(newCategory.name) ) )) {
                    setLoading(`Duplicate entry...${newCategory.name}`);
                }
                else{
                    setLoading('Adding...');   
                    await axios.put(`/api/category/${id}`, newCategory);
                    setCategories(prevState => ([...prevState, newCategory]));
                }
                
              }        
            })
            setNewCategories("");
            setClick(!click);
        }
    }
    const saveCategory = async(category) => {
        setLoading('Saving...');       
        await axios.put(`/api/categories/${id}`, { ...category, level: 'l1' });
        setClick(!click);        
    }
    const deleteCategory = async(category) => {
        setLoading('Deleting...');        
        await axios.delete(`/api/categories/${id}`, {data: category});
        //const idx = categories.indexOf(category);
        //setCategories([...categories.slice(0, idx), ...categories.slice(idx + 1)])
        setCategories(prevState => {
            const idx = prevState.indexOf(category)
            prevState.splice(idx, 1);
            return prevState;
        });        
        setClick(!click);
    }
    
    // refresh
    useEffect(async() => {              
        if (id ) {    
            setLoading('Loading...');
            if(categories.length === 0){
                const res = await axios.get(`/api/categories/${id}`);
                setCategoryName(res.data.name);            
                console.log(res.data.categories);         
                if(res.data.categories) {
                    setCategories(res.data.categories)
                }
            }
            setLoading('');   
        }        
    }, [router, click]);
    
    // jsx
    return (
        <Container>
            <h1><Link href="/admin/categories"><a>Categories</a></Link>/{ categoryName }</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextField multiline label="Add categories" placeholder="Separated by comma" name="name" value={ newCategories } onChange={ onChangeAdd }/>
                    <AddCircle onClick={ addCategory }/>
                </Grid>
            </Grid>
            <br/>{loading && <Alert severity="info">{loading}</Alert>}<br/><br/>
            <Grid container spacing={2}>
                {categories.map((category, idx) => (
                    <Grid key={idx + 1} item xs={12} sm={3}>
                        <EditCategory id={id} category={category} saveCategory={saveCategory} deleteCategory={deleteCategory}/>
                    </Grid>
                ))}
                
            </Grid>
        </Container>
    );
}

export default Categories;