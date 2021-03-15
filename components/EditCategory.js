import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import dashify from 'dashify';

const EditCategory = (props) => {
    const [content, setContent] = useState({
      name: undefined,
      description: undefined,
      parentCategory: undefined
    })
  
    useEffect(async () => {
      const { id } = props;
      if (id) {
        const res = await axios.get(`/api/category/level1/${id}`);
        const { name, description, parentCategory } = res.data;
        setContent({
          name,
          description,
          parentCategory
        })
      }
    }, [props.id])
  
    const [parentCategories, setParentCategories] = useState([]);
    useEffect(async () => {
      const res = await axios.get('/api/categories');    
      setParentCategories(res.data.categoriesData);
    }, []);
  
    const onChange = (e) => {
      const { value, name } = e.target;
      setContent(prevState => ({ ...prevState, [name]: value }));
    }
  
    const onSubmit = async (e) => {
      const { id } = props
      const { name, description, parentCategory } = content;        
      await axios.put(`/api/category/level1/${id}`, {
        slug: dashify(name) + '-' + dashify(parentCategory),
        name,
        description,
        parentCategory
      });
      window.location.reload();
    }
  
    const onDelete = async () => {
      const { id } = props;
      await axios.delete(`/api/category/level1/${id}`);
      window.location.reload();    
    }
  
    return (
      <div>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          value={content.name}
          onChange={onChange}
        />
        <label htmlFor="description"></label>
        <textarea
          name="description"
          value={content.description}
          onChange={onChange}
        />
        <label htmlFor="parentCategory"></label>
        <select name="parentCategory" onChange={onChange} value={content.parentCategory}>
          { parentCategories.map ( parentCategory => (
            <option key={parentCategory.id} value={parentCategory.name}>{parentCategory.name}</option>
          ))}        
        </select>
        <button
          type="button"
          onClick={onSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    );
  };

  export default EditCategory;