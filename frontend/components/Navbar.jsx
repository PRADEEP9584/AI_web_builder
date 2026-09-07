import React from 'react';
import {navbarStyles as s} from "../assets/dummyStyles";
import {Logo} from "../assets/ui"; 


const Navbar=()=>{
    return(
        <nav className={s.root}>
            <div className={s.container}>
                <Logo/>
                <div></div>
            </div>
        </nav>
    )
}

export default Navbar;