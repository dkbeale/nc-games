import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ "username": "jessjelly", "avatar_url": "someurl", "name": "test user"});

    return <UserContext.Provider value={{ user, setUser }}>
        { children }
    </UserContext.Provider>
}

export default UserProvider;