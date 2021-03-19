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
import dashify from "dashify";

const EditCategory = (props) => {
    const [category, setCategory] = useState({...props.category, ['slug']: dashify(props.category.name)});    
    const onChangeEdit = (e) => {
        const {name, value} = e.target;
        setCategory({
            ...category,
            [name]: value
        })
    }
    useEffect(()=>{
        setCategory({...props.category, ['slug']: dashify(props.category.name)});
    },[props.category]);   
    return(
        <>
            <TextField name="name" value={category.name} onChange={onChangeEdit}/>
            {/*
            <Link href={`/admin/categories/sub-${props.id}`}><a><Launch/></a></Link>
            */}
            <Save onClick={() => props.saveCategory(category)}/>
            <DeleteForever onClick={() => props.deleteCategory(category)}/>
        </>
    );
}

const Categories = () => {
    // router
    const router = useRouter();
    const { id, l1, c } = router.query;
    
    // state
    const [ newCategories, setNewCategories ] = useState("");    
    const [click, setClick] = useState(false);
    const [ loading, setLoading ] = useState('');    
    const [categories, setCategories] = useState([]);

    // handlers
    const onChangeAdd = (e) => {
        setLoading('');        
        setNewCategories(e.target.value);
    };    
    const addCategory = async() => {
        if(newCategories.trim() !== ""){
            newCategories.trim().split(',').map( i => {
                if(i.trim() !== ""){
                    const name = i.trim();
                    const newCategory = {
                        name: name
                    };
                    if( categories.some( category => ( dashify(category.name) === dashify(newCategory.name) ) )) {
                        setLoading(`Duplicate entry...${newCategory.name}`);                        
                    } else {
                        setLoading('Adding...');                                                      
                        setCategories(prevState => ([...prevState, newCategory]));                     
                    }
                }
            })            
            setClick(!click);    
        }
    }
    const saveCategory = async(category) => {
        setLoading('Saving...');
        if(category.name.trim() !== ""){
            setCategories(prevState => {
                var copy = [ ...prevState ];
                copy.map((i, idx) => {
                    if (dashify(i.name) === category.slug) {
                        i.name = category.name;
                    }
                })
                return copy;
            })        
            setClick(!click);        
        }else{
            setLoading('Empty text...');
        }        
    }
    const deleteCategory = async(category) => {
        setLoading('Deleting...');        
        await axios.delete(`/api/categories/l2/${id}?c=${c}`, {data: category});              
        setCategories(prevState => {
            var copyCategories = [...prevState];                    
            copyCategories.map( (i, idx) => {
                if(i.name === category.name){                    
                    copyCategories.splice(idx, 1);
                }
            })            
            return copyCategories;
        });        
        setClick(!click);        
    }
    
    // refresh
    useEffect(async() => {              
        if (id) {    
            setLoading('Loading...');
            if(categories.length === 0){
                const res = await axios.get(`/api/categories/l2/${id}?c=${c}`);                                                  
                if(res.data.categories) {
                    setCategories(res.data.categories)
                }
            }else{                           
                setNewCategories("");                
                await axios.put(`/api/categories/l2/${id}?c=${c}&o=add`, {categories: categories});
            }
            setLoading('');
        }        
    }, [id, click]);
    
    // jsx
    return (
        <Container>
            <small>
                <Link href="/admin/categories"><a>Categories</a></Link>/
                <Link href={`/admin/categories/${id}`}><a>{ l1 }</a></Link>/
                { c }
            </small>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextField multiline label="Add categories" placeholder="Separated by comma" name="categories" value={ newCategories } onChange={ onChangeAdd }/>
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