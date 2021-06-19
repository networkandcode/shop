import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';
import { db } from '../utils/firebase';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Add = () => {
    const router = useRouter();
    const auth = useAuth();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
      message: '',
      error: ''
    })
    const [categories, setCategories] = useState([]);

    const onChange = e => {
      const {name, value} = e.target;
      setItem({...item, [name]: value });
      setLoading(false);
      setStatus({
        message: '',
        error: ''
      });
    }
    const onChgImg = (e) => {
        e.preventDefault();
        setItem({...item, imgFile: e.target.files[0]});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        // clear status and show waiting
        setStatus({});
        setLoading(true);
        // upload image to storage
        const storageRef = firebase.storage().ref();
        var imgPath = `${item.category}/${item.imgFile.name}`;
        if(item.parentCategory){
            imgPath = item.parentCategory + '/' + imgPath;
        }
        const fileRef = storageRef.child(imgPath);
        const imgURL = await fileRef.put(item.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        console.log(imgURL);
        addCategoryToDB(imgURL);
    }

    const addCategoryToDB = async(imgURL) => {
        if (imgURL){
            var { name, parentCategory } = item;
            if ( parentCategory ) {
                name = parentCategory + '/' + name;
            }
            const record = {name, imgURL};

            await axios.post("/api/db", { operation: 'insert', record, table: 'categories' })
                .then(result => {
                    if(result.data.error){
                        setStatus({ ...status, ['error']: result.data.error });
                    } else{
                        setStatus({ ...status, ['message']: result.data.message });
                        auth.addCategory(record);
                    }
                });
        }
        setLoading(false);
        setItem({});
    }

    useEffect(() => {
      if(!auth.userAuthData){
        router.push('/signin');
      } else{
          setCategories(auth.categories);
      }
    },[auth, router]);

    return (

        <Container maxWidth="xs">
          <br/>
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="name"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              label="Name of the Category"
              margin="normal"
              name="name"
              onChange={onChange}
              placeholder="Name of the Category"
              required
              value={item.name || ''}
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="categoryLabel">Parent category</InputLabel>
              <Select
                id="categorySelect"
                labelId="categoryLabel"
                name="parentCategory"
                onChange={onChange}
                value={item.parentCategory || ''}
              >
                {categories.map (category => (
                    <MenuItem key={category.id} value={category.name}>
                        {category.name.split('/').join(' >> ')}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <small>
              Upload Image <br/>
            </small>
            <input
              accept="image/png, image/jpeg"
              label="Upload Image"
              onChange={onChgImg}
              placeholder="Upload Image"
              required
              type="file"
            />
            <br/>
            <Status loading={loading} status={status}/>
            <br/>
            <Button
                color="primary"
                fullWidth
                margin="normal"
                type="submit"
                variant="contained"
            >
              Save
            </Button>
          </form>
        </Container>
      )
}

export default Add
