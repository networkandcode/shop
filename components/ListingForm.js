import ItemAttributes from '../components/ItemAttributes';
import ItemVarAttributes from '../components/ItemVarAttributes';
import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';

import {
    Button,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import firebase from 'firebase';
import 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const ListingForm = (props) => {
    const inputEl = useRef(null);
    const router = useRouter();
    const state = useAuth();

    const [listing, setListing] = useState(props.listing);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
      message: '',
      error: ''
    })
    const [categories, setCategories] = useState([])

    const onChange = e => {
      const {name, value} = e.target;
      setListing({...listing, [name]: value });
      setLoading(false);
      setStatus({
        message: '',
        error: ''
      });
    }

    const onChangeAttributes = attributes => {
        setListing({...listing, attributes});
        setLoading(false);
        setStatus({
            message: '',
            error: ''
        });
    }

    const onChangeVarAttributes = varAttributes => {
        setListing({...listing, varAttributes});
        setLoading(false);
        setStatus({
            message: '',
            error: ''
        });
    }

    const onChgImg = (e) => {
        e.preventDefault();
        setListing({...listing, imgFile: e.target.files[0]});
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        // clear status and show waiting
        setStatus({});
        setLoading(true);

        // upload image to storage
        const storageRef = firebase.storage().ref();
        var imgURL;
        if(listing.imgFile){
            const fileRef = storageRef.child(`${listing.category}/${listing.name}/${listing.imgFile.name}`);
            imgURL = await fileRef.put(listing.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        }
        addListingToDB(imgURL);
    }

    const addListingToDB = async(imgURL) => {
        if (imgURL){
            var operation;
            var record = {...listing, imgURL};

            if(props.isNewListing) {
                operation = 'insert';
            } else{
                operation = 'update';
            }

            await axios.post("/api/db", { operation, record, table: 'listings' })
                .then(res => {
                    if(res.data.error){
                        setStatus({ ...status, ['error']: res.data.error });
                    } else{
                        setStatus({ ...status, ['message']: res.data.message });
                        if(operation === 'insert'){
                            record = { ...record, id: res.data.id };
                            state.insertListing(record);
                            setListing({});
                        } else if(operation === 'update'){
                            state.updateListing(record);
                        }
                    }
                });
        }
        setLoading(false);
    }

    useEffect(() => {
      if(!state.userAuthData){
        router.push('/signin');
      } else{
          var temp = [];
          console.log(state);
          state.categories.forEach(i => {
              temp.push(i);
          });
          setCategories([...temp]);
      }
    },[state, router]);

    return (
        <Container
          maxWidth="xs"
        >
          <br/>
          <Link href="/add">
            <a>
              <Button color="primary" variant="outlined">
                Add Listing
              </Button>
            </a>
          </Link>
          {' '}
          <Link href="/addcategory">
            <a>
              <Button color="disabled" variant="outlined">
                Add Category
              </Button>
            </a>
          </Link>
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="contactPerson"
              id="contactPerson"
              InputLabelProps={{
                shrink: true,
              }}
              label="Contact Person"
              margin="normal"
              name="contactPerson"
              onChange={onChange}
              placeholder="Name of the Contact Person"
              required
              value={listing.contactPerson || ''}
              variant="outlined"
              fullWidth
            />
            <TextField
              autoComplete="description"
              fullWidth
              helperText=""
              id="description"
              InputLabelProps={{
                shrink: true,
              }}
              label="Description of the Listing"
              margin="normal"
              multiline
              name="description"
              onChange={onChange}
              placeholder="Description of the Listing"
              value={listing.description || ''}
              variant="outlined"
            />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="categoriesLabel">Categories</InputLabel>
            <Select
              id="categoriesSelect"
              labelId="categoriesLabel"
              multiple
              name="categories"
              onChange={onChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </div>
              )}
              size = {categories.length}
              value={listing.categories || []}
            >
              {categories && categories.map( (category, idx) => (
                <MenuItem key={category.id} value={category.name}>
                  <ListItemText primary={category.name.split('/').join(' >> ')}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
              <InputLabel id="businessTypeLabel">Business Type</InputLabel>
              <Select
                id="businessTypeSelect"
                labelId="businessTypeLabel"
                name="businessType"
                onChange={onChange}
                required
                value={listing.businessType || ''}
              >
                {['Contactor', 'Manufacturer', 'Supplier'].map (businessType => (
                    <MenuItem
                        key={businessType}
                        value={businessType}
                    >
                        { businessType }
                    </MenuItem>
                ))}
              </Select>
            </FormControl>

            {listing.categories && <ListingAttributes listing={listing} onChangeAttributes={onChangeAttributes}/>}
            <TextField
              autoComplete="companyName"
              fullWidth
              helperText=""
              id="companyName"
              InputLabelProps={{
                shrink: true,
              }}
              label="Company Name"
              margin="normal"
              name="companyName"
              onChange={onChange}
              placeholder="Name of the Company"
              value={listing.companyName || ''}
              variant="outlined"
            />
            <TextField
              autoComplete="contactNumber"
              fullWidth
              helperText="Contact Phone Number"
              id="contactNumber"
              InputLabelProps={{
                shrink: true,
              }}
              label="Contact Phone Number"
              margin="normal"
              name="contactNumber"
              onChange={onChange}
              placeholder="Contact Phone Number"
              type="number"
              value={listing.contactNumber || ''}
              variant="outlined"
            />
            <small>
              Upload Image <br/>
            </small>
            <input
              accept="image/png, image/jpeg"
              label="Upload Image"
              onChange={onChgImg}
              placeholder="Upload Image"
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

export default ListingForm;
