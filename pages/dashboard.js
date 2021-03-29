import { useRequireAuth } from '../hooks/useRequireAuth';

const DashBoardPage = () => {
    const auth = useRequireAuth();
    if (!auth.userAuthData) {
        return (
            <>
            You are not logged in
            </>
        )
    } else{
        return (
            <div>            
                <p>
                {`You are logged in with ${auth.userAuthData.email}`}
                </p>
                <button onClick={() => auth.signOut()}>Signout</button>
            </div>
        );
    }
};
export default DashBoardPage;