const Status = ({ status }) => {
    return (
        <>
            { status.isLoading && (
                <p style={{color: "orange"}}>Please wait...</p>
            )}
            { status.message && (
                <p style={{color: "green"}}>{status.message}</p>
            )}
            {status.error && (
                <p style={{color: "red"}}>{status.error}</p>
            )}
        </>
    );
}

export default Status;