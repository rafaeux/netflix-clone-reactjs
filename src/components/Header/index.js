import React from "react";
import './style.css';

const Header = ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/450px-Netflix_2014_logo.svg.png?20140810085105" alt="Logo da Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg" alt="Logo da Netflix" />
                </a>
            </div>
        </header>
    );
}

export default Header;
