import { TextField, Container, Grid, Accordion, AccordionSummary, AccordionDetails, Card, CardActionArea, CardContent, CardActions, CardMedia, FormControl } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import db from '../utils/db';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = ({ categoriesData }) => {
    const [ newCategory, setNewCategory ] = useState({
        name: "",
        products: "",
        services: ""
    });
    const [ submit, setSubmit ] = useState(false);
    const onChange = (e) => {         
        setNewCategory({...newCategory, [e.target.name] : e.target.value});
        console.log(newCategory);        
    }
    const addNewCategory = async() => {        
        const res = await axios.post('/api/newCategory', newCategory);
        setNewCategory({
            name: "",
            products: "",
            services: ""
        });
        setSubmit( !submit );
    }
    useEffect(() => {
        console.log('rendering');
    }, [ submit ]);
    return(
        <Container>
            <h1>Categories</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardActionArea>                                
                            <CardMedia
                                component="img"
                                alt="category"
                                height="200"
                                image={`https://source.unsplash.com/featured/?category`}
                                title="category"
                            />                 
                        </CardActionArea>
                        <CardContent>
                            <FormControl fullWidth>
                                <TextField label="Add a category" placeholder="Add a category" name="name" value={ newCategory.name } onChange={ onChange } />                              
                                <TextField label="Add products" placeholder="Separated by comma" name="products" value={ newCategory.products } onChange={ onChange } />                                                                  
                                <TextField label="Add services" placeholder="Separated by comma" name="services" value={ newCategory.services } onChange={ onChange } />                           
                            </FormControl>
                        </CardContent>                        
                        <CardActions>
                            <Save onClick={addNewCategory}/>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>            
            <Grid container spacing={2}>
                { categoriesData.map( ( {id, name, slug, created, products} ) => (
                    <Grid item key={id} xs={12} sm={4}>
                        <Card>
                            <CardActionArea>                                
                                <CardMedia
                                  component="img"
                                  alt={slug}
                                  height="200"
                                  image={`https://source.unsplash.com/featured/?${slug}`}
                                  title={name}
                                />
                                <TextField value={name}/>                                                         
                            </CardActionArea>
                            <CardActions>
                                <Link href="/"><a>Products</a></Link>
                                <Link href="/"><a>Services</a></Link>
                                <Link href="/"><a>Categories</a></Link>
                            </CardActions>                            
                        </Card>                        
                    </Grid>          
                ))}
            </Grid>
        </Container>
    );
}   

export const getStaticProps = async () => {
    const categories = await db.collection('categories').orderBy('created', 'desc').get();    
    const categoriesData = categories.docs.map(category => ({
        id: category.id,
        ...category.data()
    }))
    return {
        props: {
            categoriesData,
            revalidate: 1
        }
    }
}

export default Categories