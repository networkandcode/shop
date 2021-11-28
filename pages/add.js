import ItemForm from '../components/ItemForm';
import { useAuth } from '../hooks/useAuth';
import router from 'next/router';

const Add = () => {
  const auth = useAuth();
  if(auth.userAuthData && (auth.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN)){
    return <ItemForm isNewItem={true} item={{}}/>;
  }
  return <div style={{ padding: `100px`, textAlign: `center` }}>Page doesn't exist</div>;
}

export default Add