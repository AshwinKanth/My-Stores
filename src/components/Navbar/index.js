import { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../Context/AppContext';

import { CiSearch } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";



import "./index.css"

class Navbar extends Component {
    state = { isToggle: false}

    onClickToggle = () => {
        this.setState(prevState => ({ isToggle: !prevState.isToggle }))
    }
    renderCartItemsCount = () => (
        <AppContext.Consumer>
            {value => {
                const { cartList } = value
                const cartItemsCount = cartList.length

                return (
                    <>
                        {cartItemsCount > 0 ? (
                            <span className="cart-count-badge">{cartList.length}</span>
                        ) : null}
                    </>
                )
            }}
        </AppContext.Consumer>
    )


    render() {
        const { isToggle } = this.state
        const {searchInput} = this.props

        const onChangeSearchInput = event =>{
            const {changeSearchInput} = this.props
            changeSearchInput(event.target.value)
        }

        const onEnterSearchInput = event => {
            const {enterSearchInput} = this.props
            if (event.key === 'Enter') {
              enterSearchInput()
            }
          }
    
        return (
            <div className='header-container'>
                <nav className='nav-lg-container'>
                    <Link to="/" className="homeLink">
                        <div className='logo-container'>
                            <img src='https://res.cloudinary.com/dq1ktqbtb/image/upload/v1719391422/MyStore_Logo_vuiu2c.png' alt='' className='navLogo' />
                            <h1 className='logoHeading'>My <span className='spanLogo'>Store</span></h1>
                        </div>
                    </Link>
                    <div className='search-container'>
                        <CiSearch size={25} />
                        <input onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput} className='searchInput' type='search' placeholder='Search for Products, Brands and More...' />
                    </div>
                    <div className='icons-container'>
                        <Link to='/login' className='homelink'>
                        <div className='login-icon-container'>
                            <RiAccountCircleLine size={20} color='#000' />
                            <p className='loginText'>Login</p>
                        </div>
                        </Link>
                        <Link to='/favourite' className='homelink'>
                        <li className='navitem'><GrFavorite size={20} className='icon' /></li>
                        </Link>
                        <Link to="/cart" className="homeLink">
                            <BsCart3 size={20} className='icon navitem' />
                            {this.renderCartItemsCount()}
                        </Link>
                    </div>
                </nav>
                <nav className='nav-sm-container'>
                    <div className='nav-smItems-container'>
                        <div className='menu-logo-container'>
                            <GiHamburgerMenu size={30} onClick={this.onClickToggle} />
                            <Link to="/" className="homeLink">
                                <div className='sm-logo-container'>
                                    <img src='https://res.cloudinary.com/dq1ktqbtb/image/upload/v1719391422/MyStore_Logo_vuiu2c.png' alt='' className='navLogo' />
                                    <h1 className='logoHeading'>My <span className='spanLogo'>Store</span></h1>
                                </div>
                            </Link>
                        </div>
                        <div className='icons-container'>
                            <Link to="/favourite" className='homelink'>
                            <GrFavorite size={25} className='icon' />
                            </Link>
                            <Link to="/cart" className="homeLink">
                                <BsCart3 size={25} className='icon' />
                                {this.renderCartItemsCount()}
                            </Link>
                            <Link to='/login' className='homelink'>
                            <RiAccountCircleLine size={25} className='icon' />
                            </Link>
                        </div>
                    </div>
                    <div className='sm-search-container'>
                        <CiSearch size={25} />
                        <input onChange={onChangeSearchInput} onKeyDown={onEnterSearchInput} value={searchInput} className='searchInput' type='search' placeholder='Search for Products, Brands and More...' />
                    </div>
                    {isToggle ? (
                        <div className='menu-container'>
                            <div className='sm-navItems-container'>
                                <div className='sm-login-icon-container'>
                                <Link to='/login' className='homelink'>
                                    <div className='sm_login-container'>
                                        <RiAccountCircleLine className='smAccountIcon' />
                                        <p className='sm-loginText'>Login</p>
                                    </div>
                                    </Link>
                                    <FaAngleRight size={25} onClick={this.onClickToggle} className='smAccountIcon' />
                                </div>
                                <Link to='/login' className='homelink'>
                                <div className='menuItem-container'>
                                    <RiAccountCircleLine size={20} color='#000'/>
                                    <p className='menuItem'>My Account</p>
                                </div>
                                </Link>
                                <Link to='/favourite' className='homelink'>
                                <div className='menuItem-container'>
                                    <GrFavorite size={20} color='#000' />
                                    <p className='menuItem'>My Favourites</p>
                                </div>
                                </Link>
                                <div className='menuItem-container'>
                                    <BiSolidOffer size={20} />
                                    <p className='menuItem'>Offer Zone</p>
                                </div>
                                <div className='menuItem-container'>
                                    <Link to="/cart" className='homeLink'>
                                        <BsCart3 size={20} />
                                        <p className='menuItem'>My Cart {this.renderCartItemsCount()}</p>
                                    </Link>
                                </div>
                                <div className='menuItem-container'>
                                    <FaBoxOpen size={20} />
                                    <p className='menuItem'>My Orders</p>
                                </div>
                                <div className='menuItem-container'>
                                    <FaHeadphones size={20} />
                                    <p className='menuItem'>Help Center</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </nav>
            </div>
        )
    }
}



export default Navbar