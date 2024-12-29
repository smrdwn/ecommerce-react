import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';

import {Outlet, Link} from "react-router";
import { handleSignOut } from '../../utils/firebase/firebase.utils';

import CrwnLogo from '../../assets/crown.svg?react';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    
    return ( 
    <> 
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className='logo' />
            </Link>

            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className='nav-link' onClick={handleSignOut}>SIGNOUT</span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                )}
                <CartIcon />
            </div>
        </div>
        < Outlet /> 
     </>
     );
};

export default Navigation;