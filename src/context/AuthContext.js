import { createContext, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        return axios.get('http://localhost:5000/user')
            .then(response => {
                const user = response.data.find(u => u.username === username && u.password === password);
                if (user) {
                    setUser(user);
                    return true;
                } else {
                    return false;
                }
            })
            .catch(error => {
                console.error('Error fetching users', error);
                return false;
            });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

