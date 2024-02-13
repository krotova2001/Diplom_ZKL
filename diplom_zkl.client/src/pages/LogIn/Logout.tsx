import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Logout() {
    const { setAuth } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('persistent');
        setAuth(false)
        navigate('/');
    }, [setAuth, navigate])

    return (
        <div>Выйти</div>
    )
}

export default Logout
