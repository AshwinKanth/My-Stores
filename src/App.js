import { Component } from 'react';
import Home from './components/Home'
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Favourites from "./components/Favourites"
import ProductCategoryItems from './components/ProductCategoryItems';
// import ProductImagesCarousal from './components/ProductImagesCarousal';
import NotFound from './components/NotFound';
import { Route, Switch, Redirect } from "react-router-dom";
import AppContext from './Context/AppContext';


class App extends Component {
  state = { cartList: [], favouriteList: [] }

  addCartItems = (product) => {
    const { cartList } = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === productObject.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({ cartList: updatedCartList })
    }
  }

  addFavouriteItem = (product) => {
    const { favouriteList } = this.state
    const productObject = favouriteList.find(
      eachFavItem => eachFavItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        favouriteList: prevState.favouriteList.map(eachFavItem => {
          if (eachFavItem.id === productObject.id) {
            const updatedQuantity = eachFavItem.quantity + product.quantity
            return { ...eachFavItem, quantity: updatedQuantity }
          }
          return eachFavItem
        }),
      }))
    } else {
      const updatedCartList = [...favouriteList, product]
      this.setState({ favouriteList: updatedCartList })
    }
  }

  removeCartItem = (id) => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter(eachitem => eachitem.id !== id)
    this.setState({ cartList: updatedCartList })
  }

  removeFavouriteItem = (id) => {
    const { favouriteList } = this.state
    const updatedFavList = favouriteList.filter(eachitem => eachitem.id !== id)
    this.setState({ favouriteList: updatedFavList })
  }


  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.quantity + 1
          return { ...eachItem, quantity: updatedQuantity }
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const { cartList } = this.state
    const productObject = cartList.find(eachItem => eachItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updatedQuantity = eachItem.quantity - 1
            return { ...eachItem, quantity: updatedQuantity }
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const { cartList, favouriteList } = this.state
    return (
      <AppContext.Provider
        value={{
          cartList, addCartItems: this.addCartItems, removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems, incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity, favouriteList, removeFavouriteItem: this.removeFavouriteItem,
          addFavouriteItem: this.addFavouriteItem
        }}
      >
        <div>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={CreateAccount} />
            <Route exact path='/' component={Home} />
            <Route exact path='/products/:id' component={ProductDetails} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/favourite' component={Favourites} />
            <Route exact path='/products/category/:slug' component={ProductCategoryItems} />
            {/* <Route path="/products/:id" component={ProductImagesCarousal}/> */}
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </AppContext.Provider>
    )
  }
}



export default App