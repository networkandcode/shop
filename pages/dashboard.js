import { useRequireAuth } from '../hooks/useRequireAuth';

const DashBoardPage = () => {
    const auth = useRequireAuth();
    if (!auth.user) {
        return (
            <>
            You are not logged in
            </>
        )
    } else{
        return (
            <div>            
                <p>
                {`You are logged in with ${auth.user.email}`}
                </p>
                <button onClick={() => auth.signOut()}>Signout</button>
            </div>
        );
    }
};
export default DashBoardPage;