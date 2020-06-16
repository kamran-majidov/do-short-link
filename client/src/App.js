import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import {Loader} from "./components/Loader";

import 'materialize-css';
import Footer from "./components/Footer";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider
            value={{token, login, logout, userId, isAuthenticated}}
        >
            <BrowserRouter>
                {isAuthenticated && <Navbar/>}
                <main className="container">
                    {routes}
                </main>
                <Footer/>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}

export default App;
