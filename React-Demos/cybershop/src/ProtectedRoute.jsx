import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const apiURL = import.meta.env.VITE_USER_API_URL
    useEffect(() => {
        fetch(`${apiURL}/isauthenticated`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(data => setIsAuthenticated(data.isAuthenticated))
            .catch(err => setIsAuthenticated(false))
    }, [])

    if (isAuthenticated == null) {
        return <div></div>
    } else {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    }

}