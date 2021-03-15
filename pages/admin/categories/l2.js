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
            <TextField name="name" value={props.category.name} onChange={onChange} required/>
            <Link href={`/admin/categories/sub-${props.id}`}><a><Launch/></a></Link>
            <Save onClick={() => props.saveCategory(category)}/>
            <DeleteForever onClick={() => props.deleteCategory(category)}/>
        </>
    );
}

const Categories = () => {
    // router
    const router = useRouter();
    console.log(router.query);        
    const { id, c } = router.query;    
    
    // state
    const [ newCategory, setNewCategory ] = useState({
        name: ''
    });
    const [click, setClick] = useState(false);
    const [ loading, setLoading ] = useState('');
    const [categoryName, setCategoryName] = useState(c);
    const [categories, setCategories] = useState([]);

    // handlers
    const onChange = (e) => {
        setLoading('');
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    }    
    const addCategory = async(e) => {
        if(newCategory.name.trim() !== ""){    
            if( categories.some( category => ( category.name === newCategory.name ) )) {
                setLoading('Duplicate entry...');
            } else {
                setLoading('Adding...');        
                await axios.put(`/api/categories/l2?id=${id}&c=${c}`, newCategory);
                setCategories([...categories, newCategory]);                
                setNewCategory({ name: '' });
                setClick(!click);                
            }               
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
        setCategories(prevState => {
            const idx = prevState.indexOf(category)
            prevState.splice(idx, 1);
            return prevState;
        });
        console.log(categories);
        setClick(!click);
    }
    
    // refresh
    useEffect(async() => {              
        if (id) {    
            setLoading('Loading...');
            if(categories.length === 0){
                const res = await axios.get(`/api/categories/l2?id=${id}&c=${c}`);
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
                    <TextField name="name" value={ newCategory.name } onChange={ onChange } required/>
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