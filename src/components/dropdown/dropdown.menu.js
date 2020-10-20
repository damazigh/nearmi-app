import React, { useRef, useEffect } from 'react';
import DropdownItem from './dropdown-item/dropdown.item';
import './dropdown.menu.css';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { CSSTransition } from 'react-transition-group';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

function DropdownMenu(props) {
  const dropdownRef = useRef(null);
  useEffect(() => {
    props.setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 17);
  }, []);

  return (
    <div
      className="dropdown"
      style={{ height: props.menuHeight }}
      ref={dropdownRef}
    >
      {props.children}
    </div>
  );
}
export function DropdownMenuMain(props) {
  function calcHeight(el) {
    const height = el.offsetHeight + 17;
    props.setMenuHeight(height);
  }
  return (
    <CSSTransition
      in={props.activeMenu === 'main'}
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
      unmountOnExit
    >
      <div>{props.children}</div>
    </CSSTransition>
  );
}
export function DropdownSubMenu(props) {
  return (
    <CSSTransition
      in={props.activeMenu === props.id}
      timeout={500}
      classNames="menu-secondary"
      unmountOnExit
    >
      <div className="menu">
        <DropdownItem
          leftIconClass="left-icon-secondary"
          setActiveMenu={props.setActiveMenu}
          goToMenu="main"
          leftIcon={<ChevronRight />}
          byPassWrapper={true}
        >
          <span className="flex pointer">
            <ArrowBackIcon className="little-right" />
            {props.title}
          </span>
        </DropdownItem>
        <hr className="divider" />
        {props.children}
      </div>
    </CSSTransition>
  );
}
export default DropdownMenu;
