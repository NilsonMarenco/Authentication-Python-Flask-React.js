import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Privated = () => {

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token")
    const logout = () => {
        sessionStorage.setItem("token", "")
        navigate("/login")
    }

    return (
        <>
            {token ? (<div>
                <p>Token Exist</p>
                <button onClick={logout}>Logout</button>
            </div>) : (<div>
                <p>Token Not Exist</p>
                <button onClick={() => navigate("/login")}>Ir Al Login</button>
            </div>)}



        </>
    )



}