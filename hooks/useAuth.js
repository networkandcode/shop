import firebase from 'firebase';
import {
    useEffect,
    useState,
    useContext,
    createContext,
    React
} from 'react';
import { auth, db, storage } from '../utils/firebase';

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
    const addItem = async(item, imgURL) => {
        const { id, category, description, name, price } = item
        var dbData = { name, description: description || '', category, price}
        if(imgURL){
            dbData = {...dbData, imgURL};
        }
        if(id){
            return await db
                .collection('items')
                .doc(id)
                .set(dbData, {merge: true})
                .then(() => {
                    var temp = [...items];
                    temp.forEach((i, idx) => {
                        if(i.id === id){
                            temp[idx] = dbData;
                        }
                    });
                    setItems([...temp]);
                    return 'Item saved to database';
                 }).catch((error) => {
                    return { error };
                 });
        } else{
            return await db
                .collection('items')
                .add(dbData)
                .then(() => {
                    setItems([...items, item]);
                    return 'Item added to database, and Image uploaded to storage';
                })
                .catch((error) => {
                    return { error };
                });
        }
    };
    const addCategory = async(item, imgURL) => {
        //if(!item.parentCategory){
            var { name, parentCategory } = item;
            if(parentCategory){
                name = parentCategory + '/' + name;
            }
            const dbData = { name, imgURL }
            return await db
             .collection('categories')
             .add(dbData)
             .then(() => {
                setCategories([...categories, dbData])
                return 'Category added to database, and Image uploaded to storage';
             })
             .catch((error) => {
                return { error };
             });
    };

    const deleteItem = async(item) => {
        db.collection("items").doc(item.id).delete().then(() => {
            setItems(prevState => {
                var copyItems = [...prevState];
                copyItems.map( (i, idx) => {
                    if(i.name === item.name){
                        copyItems.splice(idx, 1);
                    }
                })
                return copyItems;
            });
            return 'Item deleted from database';
        }).catch((error) => {
           return { error };
        });
    }
    const deleteCategory = async(id) => {
        db.collection("categories").doc(id).delete().then(() => {
            return 'Category deleted from database';
        }).catch((error) => {
           return { error };
        });
    }
    const handleAuthStateChanged = (user) => {
        setUserAuthData(user);
    };
    useEffect(() => {
        const fetchCategories = async() => {
            const categoriesCollection = await db.collection("categories").orderBy("name").get()
            setCategories( categoriesCollection.docs.map(doc => ({...doc.data(), id: doc.id})) )
            const itemsCollection = await db.collection("items").orderBy("name").get()
            setItems( itemsCollection.docs.map(doc => ({...doc.data(), id: doc.id})) )
        }
        fetchCategories()
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
