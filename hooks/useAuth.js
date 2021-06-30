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
    const [ attributes, setAttributes ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ items, setItems ] = useState([])
    const [ varAttributes, setVarAttributes ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ favs, setFavs ] = useState([]);

    const updateCartItems = async(record) => {
      console.log(record);
         if(cartItems.some(i => i.hash === record.hash)){
             console.log('some');
             var temp = [...cartItems];
             for(var j=0; j<temp.length; j++) {
                 if(temp[j].hash === record.hash) {
                     console.log('hash_match');
                     if(record.cartAttributes.qty === 0) {
                         temp.splice(j, 1);
                         const dataObject = {
                           operation: 'delete',
                           hash_values: [ record.hash ],
                           table: 'cart_items'
                         };
                         await axios.post('/api/cart', dataObject);

                     } else{

                         console.log('update');
                         temp[j] = record;
                         const dataObject = {
                           operation: 'update',
                           records: [ record ],
                           table: 'cart_items'
                         };
                         await axios.post('/api/cart', dataObject);

                     }
                     setCartItems([...temp]);
                     console.log([...temp]);
                     break;
                 }
             }
         } else if(record.cartAttributes.qty !== 0) {
             console.log('not 0', record);
             const dataObject = { operation: 'insert', records: [ record ], table: 'cart_items' };
             await axios.post('/api/cart', dataObject);
             setCartItems([...cartItems, record]);
         }
    };

    const updateFavs = async(id, fav) => {
        if(id && fav) {
            // add item id to favorites
            if(!favs.includes(id)) {
                const temp = [...favs, id];
                console.log('ding');
                setFavs(temp);
                const record = { id: userAuthData.uid, favorites: temp };
                await axios.post('/api/db', { operation: 'upsert', record, table: 'favorites' });
            };
          // remove item id from favorites
        } else if(id && !fav) {
          if(favs.includes(id)) {
              var temp = [...favs];
              const idx = temp.indexOf(id);
              if(idx !== -1) {
                  temp.splice(idx, 1);
                  console.log('dong');
                  setFavs(temp);
                  const record = { id: userAuthData.uid, favorites: temp };
                  await axios.post('/api/db', {
                      operation: 'upsert',
                      record,
                      table: 'favorites'
                  });
              }
          }
        }
    }

    useEffect(() => {

        var temp = 0;
        cartItems.map(item => {
            const qty = item.cartAttributes.qty;
            const price = item.price;
            if(qty && price) {
                temp += qty * item.price
            }
        });
        console.log('price', temp);
        setTotalPrice(temp);

    },[ cartItems ]);

    const signUp = async(email, password) => {
        return await auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                auth.currentUser.sendEmailVerification(); 
                setUserAuthData({
                    ...userAuthData,
                    email: response.user.email,
                    emailVerified: response.user.emailVerified
                });
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };

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

    const insertItem = async(record) => {
        setItems([...items, record]);
    };

    const updateItem = async(record) => {
        var temp = [...items];
        temp.forEach((i, idx) => {
            if(i.id === record.id) {
                temp[idx] = record;
            }
        });
        setItems([...temp]);
    };

    const addCategory = async(record) => {
        setCategories([...categories, record]);
    };

    const deleteCategory = async(id) => {
        var temp = [];
        categories.forEach(i => {
            if(i.id !== id) {
                temp.push(i);
            }
        });
        setCategories(temp);
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

    const fetchAttributes = async() => {
        await dbFetch('attributes')
            .then(result => {
                if(!result.error) {
                    setAttributes(result);
                }
            }).catch( error => console.log(error) );
    }

    const fetchCartItems = async() => {
        const dataObject = {
          get_attributes: [ '*' ],
          operation: 'search_by_value',
          search_attribute: 'email',
          search_value: userAuthData.email,
          table: 'cart_items'
        }

        await axios.post('/api/cart', dataObject).then(result => {
            if(!result.error) {
                setCartItems(result.data.cartItems);
            }
        }).catch( error => console.log('error', error) );
    }

    const fetchFavorites = async() => {
        await axios.post('/api/favorites', {
            get_attributes: [ 'favorites' ],
            operation: 'search_by_hash',
            record: { id: userAuthData.uid },
            table: 'favorites'
        }).then(result => {
            if(!result.error) {
                setFavs(result.data.favorites);
            }
        }).catch( error => console.log('error', error) );
    }

    const fetchVarAttributes = async() => {
        await dbFetch('variable_attributes')
            .then(result => {
                if(!result.error) {
                    setVarAttributes(result);
                }
            })
            .catch( error => console.log(error) );
    }

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

    // global data fetched by read_only_user via client
    useEffect(() => {
        fetchCategories();
        fetchItems();
    },[]);

    // global data fetched by super_user via server
    useEffect(() => {
        fetchAttributes();
        fetchVarAttributes();
    }, []);

    // private data fetched by super_user via server
    useEffect(() => {
        if(userAuthData && userAuthData.uid) {
            fetchCartItems();
            fetchFavorites();
        }
    }, [ userAuthData ]);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);

    return {
        addCategory,
        insertItem,
        attributes,
        cartItems,
        categories,
        deleteCategory,
        deleteItem,
        favs,
        items,
        signIn,
        signOut,
        signUp,
        totalPrice,
        updateCartItems,
        updateFavs,
        updateItem,
        userAuthData,
        varAttributes
    };
};
