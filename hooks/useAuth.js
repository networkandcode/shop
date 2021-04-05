import {
    useState,
    useEffect,
    useContext,
    createContext
   } from 'react';
import { auth, db } from '../utils/firebase';

// create a context for the current user
const authContext = createContext({ userAuthData: {}, userDoc: {} });
// use a provider to pass the current user down the component tree
const { Provider } = authContext;

export const AuthProvider = ({children}) => {
    const auth = useAuthProvider();    
    return <Provider value={auth}>{children}</Provider>;
}

// Consumer
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
    const [userAuthData, setUserAuthData] = useState({})
    const [userDoc, setUserDoc] = useState({});    
    const [categories, setCategories] = useState([]);

    const createUser = async(user) => {
        return await db
         .collection('users')
         .doc(user.uid)
         .set(user)
         .then(() => {
          setUserDoc(user);
          return user;
         })
         .catch((error) => {
          return { error };
         });
    };
    const updateUserDoc = async() => {
        console.log(userDoc);        
        return await db
         .collection('users')
         .doc(userAuthData.uid)
         .set(userDoc, {merge: true})
         .then(() => {
          setUserDoc(user);
          return user;
         })
         .catch((error) => {
          return { error };
         });
    };
    const signUp = async(email, password) => {
        return await auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                auth.currentUser.sendEmailVerification();                                
                setUserAuthData({...userAuthData, ...response.user});
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
                getUserAdditionalData(response.user);
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };
    const signOut = async() => {
        return auth.signOut().then(() => setUserAuthData({}));
    };
    const handleAuthStateChanged = (user) => {
        setUserAuthData(user);
        if (user) {
         getUserAdditionalData(user);
        }
    };    
    const updateProfile = async(data) => {
        return await db
         .collection('users')
         .doc(userAuthData.uid)
         .set(data, {merge: true})
         .then(() => {
            setUserDoc({...userDoc, ...data});            
            return 'Profile updated in database';
         })
         .catch((error) => {
          return { error };
         });
    };
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);    
    useEffect(() => {
        if (userAuthData?.uid) {
          // Subscribe to user document on mount
          const unsubscribe = db
            .collection('users')
            .doc(userAuthData.uid)
            .onSnapshot((doc) => setUserDoc(doc.data()));
      return () => unsubscribe();
        }
      }, []);
    const sendPasswordResetEmail = async(email) => {
        return await auth.sendPasswordResetEmail(email).then((response) => {            
            return "Password reset link sent";
        }).catch(error => {            
            return { error };
        });
    };
    const getUserAdditionalData = async(userAuthData) => {
        return await db
         .collection('users')
         .doc(userAuthData.uid)
         .get()
         .then((userData) => {
          if (userData.data()) {
           setUserDoc(userData.data());
          }
         });
    };
    const getCategories = async() => {
        if(categories.length === 0){
            const categoriesRef = db.collection('categories');
            const snapshot = await categoriesRef.get();
            var listOfCategories = [];
            if(!snapshot.empty){
                snapshot.forEach(doc => {
                    if(doc.data().name){
                        listOfCategories = [...listOfCategories, doc.data().name];
                    }       
                });
                listOfCategories.sort();                
                setCategories(listOfCategories);
            }
        }
    };
      
    return {
        userAuthData,
        userDoc,
        signUp,
        sendPasswordResetEmail,
        updateProfile,
        signIn,
        signOut,
        getCategories,
        categories               
    };
};