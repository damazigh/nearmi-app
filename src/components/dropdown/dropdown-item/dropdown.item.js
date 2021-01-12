import React from 'react';
import './dropdown.item.css';
function DropdownItem(props) {
  const handleClick = (e) => {
    e.preventDefault();
    if (props.goToMenu) {
      props.setActiveMenu(props.goToMenu);
    }
    if (props.onClick) {
      props.onClick();
    }
  };
  const render = () => {
    if (props.byPassWrapper) {
      return (
        <div className="menu-item" onClick={handleClick}>
          {props.children}
        </div>
      );
    } else {
      return (
        <a href="/#" className="menu-item" onClick={handleClick}>
          {props.leftIcon && (
            <span
              className={
                props.leftIconClass ? props.leftIconClass : 'left-icon'
              }
            >
              {props.leftIcon}
            </span>
          )}
          <span className="item-text">{props.children}</span>
          {props.rightIcon && (
            <span
              className={`icon-right ${
                props.rightIconClass ? props.rightIconClass : ''
              }`}
            >
              {props.rightIcon}
            </span>
          )}
        </a>
      );
    }
  };
  return render();
}
export default DropdownItem;
