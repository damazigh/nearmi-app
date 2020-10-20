import React, { useState } from 'react';
import './navitem.css'
function NavItem(props) {
    const [open, setOpen] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setOpen(!open);
        if (props.onClick) {
            props.onClick(e);
        }
    }

    return (
        <span className="nav-item">
            <span onClick={handleClick}>{props.icon}</span>
            {open && props.children}
        </span>
    );
}
export default NavItem;