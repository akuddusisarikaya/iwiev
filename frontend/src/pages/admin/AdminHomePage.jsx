import * as React from "react"
import "../../App.css"
import { useNavigate } from "react-router-dom"

export default function AdminHomePage(){
    const nav = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        nav(-1);
    }
    return(
        <>
        <h4>AdminHomePage</h4>
        <button onClick={handleLogout}>Çıkış yap</button>
        </>
    )
}