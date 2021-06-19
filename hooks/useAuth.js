import axios from 'axios';
import {
    useEffect,
    useState,
    useContext,
    createContext,
    React
} from 'react';
import dbDelete from '../utils/dbDelete';
import dbFetch from '../utils/dbFetch';
import { auth, storage } from '../utils/firebase';
import firebase from 'firebase';

const hdbCredential = {
    password: process.env.NEXT_PUBLIC_HDB_PASSWORD,
    schema: process.env.NEXT_PUBLIC_HDB_SCHEMA,
    url: process.env.NEXT_PUBLIC_HDB_URL,
    username: process.env.NEXT_PUBLIC_HDB_USERNAME
}
const { password, schema, url, username } = hdbCredential;

const authContext = createContext({ userAuthData: {} });
const { Provider } = authContext;
export const AuthProvider = ({children}) => {
    const auth = useAuthProvider();
    return <Provider value={auth}>{children}</Provider>;
}
export const useAuth = () => {
    return useContext(authContext);
};
const useAuthProvider = () => {
    const [ userAuthData, setUserAuthData] = useState({})
    const [ categories, setCategories ] = useState([])
    const [ items, setItems ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ favs, setFavs ] = useState([]);

    useEffect(() => {
        var cartItemsV = items.map(item => {
            const { id } = item;
            if(localStorage.getItem(id) > 0){
                return {...item, qty: localStorage.getItem(id)};
            };
        },[]);
        setCartItems(cartItemsV);
    },[ items ]);

    const updateCartItems = () => {
        var cartItemsV = items.map(item => {
            const { id } = item;
            if(localStorage.getItem(id) > 0){
                return {...item, qty: localStorage.getItem(id)};
            };
        },[]);
        setCartItems(cartItemsV);
    };
    const updateFavs = (id, fav) => {
        if(id && fav){
            if(!favs.includes(id)){
                const tempAdd = [...favs, id];
                setFavs([...favs, id]);
                localStorage.setItem('favs', JSON.stringify(tempAdd));
            };
        } else if(id && !fav){
          if(favs.includes(id)){
              var temp = [...favs];
              const idx = temp.indexOf(id);
              if(idx !== -1){
                  temp.splice(idx, 1);
                  setFavs(temp);
                  localStorage.setItem('favs', JSON.stringify(temp));
              }
          }
      }
    }

    useEffect(() => {
        var totalPriceV = 0;
        cartItems.map(item => {
            if(item){
                totalPriceV += item.qty * item.price
            }
            setTotalPrice(totalPriceV);
            localStorage.setItem('totalPrice', totalPriceV);
        });
    },[ cartItems ]);
    useEffect(() => {
        setFavs(JSON.parse(localStorage.getItem('favs')) || []);
    },[]);

    const signIn = async({ email, password }) => {
        return await auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUserAuthData({...userAuthData, ...response.user});
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };

    const signOut = async() => {
        return auth.signOut().then(() => setUserAuthData({}));
    };

    const addItem = async(record) => {
        const { id } = record;
        if(id){
            var temp = [...items];
            temp.forEach((i, idx) => {
                if(i.id === id){
                    temp[idx] = record;
                }
            });
            setItems([...temp]);
        } else{
            setItems([...items, record]);
        }
    };

    const addCategory = async(record) => {
        setCategories([...categories, data]);
    };

    const deleteCategory = async(id) => {
        await dbDelete(id, 'categories')
            .then(result => {
                if(!result.error) {
                    var temp = [];
                    categories.forEach(i => {
                        if(i.id !== id) {
                            temp.push(i);
                        }
                    });
                    setCategories(temp);
                }
                return result;
            }).catch(error => {
                return error;
            });
    }

    const deleteItem = async(id) => {
        var temp = [];
        items.forEach(i => {
            if(i.id !== id) {
                temp.push(i);
            }
        });
        setItems(temp);
    }

    const handleAuthStateChanged = (user) => {
        setUserAuthData(user);
    };


    const fetchCategories = async() => {
        return await dbFetch('categories')
            .then(result => {
                if(!result.error) {
                    setCategories(result);
                }
            })
            .catch( error => console.log(error) );
    }

    const fetchItems = async() => {
        return await dbFetch('items')
            .then(result => {
                if(!result.error) {
                    setItems(result);
                }
            })
            .catch( error => console.log(error) );
    }

    useEffect(() => {
        fetchCategories();
        fetchItems();
    },[]);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);

    return {
        addCategory,
        addItem,
        cartItems,
        categories,
        deleteCategory,
        deleteItem,
        favs,
        items,
        signIn,
        signOut,
        totalPrice,
        updateCartItems,
        updateFavs,
        userAuthData
    };
};
