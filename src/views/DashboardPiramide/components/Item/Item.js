import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import {linkOpen, normal, linkOpenMenu, arrowdown, arrowup} from '../Item/style.module.scss';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Item = ({to, svg, text, submenu ,open}) => {
  const [subopen, Setsubopen] = useState(false)
  return (
    <>
    <NavLink to={to} className={open ? linkOpen : normal } onClick={()=>submenu ? Setsubopen(!subopen) : null} >
      <div>
        {svg}
      </div>
      <div >
      {open ? <p style={{position:"absolute", left:90}}>{text}</p> : null}
      </div>
      {open ? <div>
      {submenu ? <ArrowRightIcon className={subopen ? arrowdown : arrowup}/> : null}
      </div> : null}
      
    </NavLink>
    <div>
    {submenu && open && subopen ? 
    submenu.map((item,index) => {
      return (
        <NavLink to={item.to} className={subopen ? linkOpenMenu : normal}>
          <ul className={open ? linkOpenMenu : normal}>
          {subopen ? <li style={{fontSize: 12}}>{item.text}</li> : null}
          </ul>
        </NavLink>
      )
    })
    : null}
    </div>
    </>
  );
};

export default Item;