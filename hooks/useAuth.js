import {
    useEffect,
    useState,
    useContext,
    createContext
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
    const [userAuthData, setUserAuthData] = useState({})

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
        const { name, description, category, price } = item;
        const dbData = { name, description, category, price, imgURL }
        return await db
         .collection('items')
         .add(dbData)
         .then(() => {                    
            return 'Item added to database, and Images uploaded to storage';
         })
         .catch((error) => {
            return { error };
         });
    };
    const deleteItem = async(id) => {
        db.collection("items").doc(id).delete().then(() => {
            return 'Item deleted from database';
        }).catch((error) => {
           return { error };
        });
    }
    const handleAuthStateChanged = (user) => {
        setUserAuthData(user);      
    };
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);
    return {
        addItem,
        deleteItem,
        signIn,
        signOut,
        userAuthData
    };
};
