import ToggleTheme from './ToggleTheme';
import { useAuth } from '../hooks/useAuth';

import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Radio,
  RadioGroup,
  Typography,
  Button
} from '@material-ui/core';

import {
  Favorite,
  Instagram,
  LocationOn,
  Phone,
  PowerSettingsNew,
  Search,
  ShoppingCart,
  SupervisorAccount,
  WhatsApp,
  YouTube
} from '@material-ui/icons';

import { Alert } from '@material-ui/lab';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {
  const auth = useAuth();
  const router = useRouter();

  const [linkColor, setLinkColor] = useState({});
  const [ s, setS ] = useState('');
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ searchCategory, setSearchCategory ] = useState('shop');

  const handleLinks = (linkName) => {
    setLinkColor({[linkName]: "hotpink"})
  }

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setS(value);
  }

  const handleCheck = e => {
    e.preventDefault();
    setIsChecked(!isChecked);
  }

  const changeSearchCategory = e => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchCategory(e.target.value);
  }

  useEffect(() => {
    if(s.trim() !== ''){
      const path = `/search?l=${isChecked ? 'or' : 'and'}&s=${s.trim()}&sc=${searchCategory}`
      router.push(path);
    } else {
        router.push(router.route);
    }
  },[isChecked, s, searchCategory])

  return (
    <AppBar style={{ backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR}`, padding: `0.5px`}}>

        <Grid
          container
          justify="flex-end"
          spacing={1}
          style={{ color: `${auth.themeBgColor}` }}
        >

           { process.env.NEXT_PUBLIC_ALERT_MESSAGE && (
            <Grid item xs={12}>
                <Alert severity="info">{ process.env.NEXT_PUBLIC_ALERT_MESSAGE }</Alert>
            </Grid>
          )}

          {process.env.NEXT_PUBLIC_COMPANY_LOGO_URL && (
            <Grid item>
              <div onClick={() => {handleLinks('home')}}>
              <Link href="/"><a>
                  <img
                    src={process.env.NEXT_PUBLIC_COMPANY_LOGO_URL}
                    style={{backgroundColor: `${linkColor['home'] || process.env.NEXT_PUBLIC_THEME_COLOR}`, borderRadius: `50%`}}
                    alt="Logo"
                    width={25}
                    height={25}
                  />
              </a></Link>
              </div>
            </Grid>
          )}

          <Grid item>
            <Search onClick={() => {setIsDialogOpen(true)}} style={{color: `${auth.themeBgColor}`, borderRadius: `50%`}}/>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
              <DialogContent>
              <InputBase
                autoComplete="s"
                id="s"
                label="Search Items / Listings..."
                name="s"
                onChange={onChange}
                autoFocus
                placeholder="Search Items / Listings..."
                style={{ padding: `3px 3px`, width: `500px` }}
                value={s || ''}
                variant="outlined"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheck}
                    color="primary"
                  />
                }
                label="OR Search"
              />
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="searchCategory"
                    defaultValue="shop"
                    name="radio-buttons-group"
                    onChange={changeSearchCategory}
                    row
                    value={searchCategory}
                  >
                    <FormControlLabel value="shop" control={<Radio />} label="Shop" />
                    <FormControlLabel value="directory" control={<Radio />} label="Directory" />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
            </Dialog>
          </Grid>

          <Grid item>
            <ToggleTheme/>
          </Grid>

            { auth.userAuthData
              ? (
                <>
                  <Grid item>
                    <Link href="/f"><a><Favorite
                      onClick={()=>{handleLinks('favorites')}}
                      style={{
                        backgroundColor:`${linkColor['favorites'] || 'inherit'}`,
                        borderRadius: `50%`
                      }}
                    /></a></Link>
                    <small> { auth.favs.length > 0 && auth.favs.length } </small>
                  </Grid>

                  <Grid item>
                    <Link href="/cart"><a><ShoppingCart
                      onClick={()=>{handleLinks('cart')}}
                      style={{
                        backgroundColor: `${linkColor['cart'] || 'inherit'}`,
                        borderRadius: `50%`
                      }}/>
                    </a></Link>
                    <small> { auth.totalPrice > 0 && (auth.totalPrice > 1000 ? `${auth.totalPrice/1000}K` : `${auth.totalPrice}`) } </small>
                  </Grid>

                  <Grid item>
                    <PowerSettingsNew  onClick={() => auth.signOut()}/>
                  </Grid>

                  { auth.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN &&
                    <Grid item>
                      <Link href="/add">
                        <a>
                          <SupervisorAccount/>
                        </a>
                      </Link>
                    </Grid>
                  }
                </>
              ) : (
                <Grid item>
                  <Link href="/signin"><a>
                    <PowerSettingsNew/>
                  </a></Link>
                </Grid>
              )
            }
        </Grid>
    </AppBar>
)};

export default Header;
