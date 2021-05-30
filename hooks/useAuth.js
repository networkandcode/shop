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

    useEffect(() => {
        var totalPriceV = 0;
        cartItems.map(item => {
            if(item){
                totalPriceV += item.qty * item.price
            }
            setTotalPrice(totalPriceV);
            console.log(totalPriceV);
            localStorage.setItem('totalPrice', totalPriceV);
        });
    },[ cartItems ]);

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
        const { name, description, category, price } = item
        const dbData = { name, description: description || '', category, price, imgURL }
        return await db
         .collection('items')
         .add(dbData)
         .then(() => {
            setItems([...items, item]);
            return 'Item added to database, and Images uploaded to storage';
         })
         .catch((error) => {
            return { error };
         });
    };
    const addCategory = async(item, imgURL) => {
        const { name } = item;
        const dbData = { name, imgURL }
        return await db
         .collection('categories')
         .add(dbData)
         .then(() => {
            setCategories([...categories, dbData])
            return 'Category added to database, and Images uploaded to storage';
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
        items,
        signIn,
        signOut,
        totalPrice,
        updateCartItems,
        userAuthData
    };
};
