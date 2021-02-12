import React from 'react';
import { Link } from "react-router-dom";
import AuthOptions from '../auth/AuthOptions';

export function Header() {
    return (
        <header id="header">
            <div>
                <Link to="/"><h1 className="title">MERN auth todo app</h1></Link>
                <AuthOptions/>
            </div>
        </header>
    );
  }