import './App.css';
import Login from './components/login.component.js' ;
import { Route, Routes, Link  } from 'react-router-dom' ;
import  React  from 'react' ;
import "bootstrap/dist/css/bootstrap.min.css" ;
import SignUp from './components/signup.component';
import MyAccount from './components/myaccount.component';
import ChangePassword from './components/changepassword.component';
import './assets/tailwind.css'
import Products from './components/products.component';
import ProductDetails from './components/productdetails.component';
import MyWishList from './components/wishlish.component';
import Orders from './components/orders.component';
import OrderDetails from './components/orderdetails.component';
import Cart from './components/shoppingcart.component'
import CartService from './services/cart.service';


function App() {

  const [user, setUser] = React.useState(null)
  const [accessToken, setAccessToken] = React.useState('')

  async function login(data) {
    console.log(data)
    setUser(data.user)
    setAccessToken(data.accessToken)
    CartService.emptyCart()
  }

  async function logout() {
    CartService.emptyCart()
    setUser(null);
  }

  return (
    <div className="App">


        <nav className="navbar navbar-expand navbar-light bg-light d-flex">
          <a href="/" className="navbar-brand">
            Hunky-Dory
          </a>

          <div className='navbar-nav mr-auto'>
          { 
              user && (
                  <li className="nav-item">
                   <Link to="/products">
                   <a className="nav-link">Products</a>
                   </Link>
                  </li> 
              )
            }    
          </div>


          <div className="navbar-nav ml-auto justify-content-end">      
          {
            user?
            <li className="navbar-item" >
                <Link to="/myorders">
                  <a className="nav-link">
                  <img src="data:image/png;base64,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" title='My Orders' className='small-logo'/>
                  </a>
                </Link>
              </li>              
              :null
          }    

          {
            user?
            <li className="navbar-item" >
            <Link to="/mywishlist">
              <a className="nav-link">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAhFBMVEX///8AAAAYGBiqqqqtra2cnJyzs7Pt7e04ODjExMRvb2/4+PjV1dXp6en09PT8/PyEhIRBQUG+vr7e3t6ioqLa2tqXl5dNTU1qamrQ0NB3d3cTExNkZGQvLy+5ubmAgIAlJSWOjo5aWloLCwuRkZFOTk40NDQoKChcXFxFRUUdHR09PT3jQAS4AAAHK0lEQVR4nO2d60LyMAxAx92BMEBQuaggqB/6/u/3gYK0tF2TrutSzPm7DXPcrWvTNEl+yabjdiMG2uldlhRm/FaLiWVaTHf2VLUBmqdpAd911dE70XL27VYduiNzR9951YE7c+/k26g67ALMHHw7VQddCAfheC/oAxO0b6/qkAuCFn6uOuKC3GGFh1VHXBD0y1hsUW5azRhYi8IvWOEP4WD05VERbSHmV+zBdeHgMoIrA/FNeoM9mIUjgIUxsHAEsDAGFo4AFsbAwhHAwhhYOAJYGAMLRwALY2DhCGBhDCwcASyMgYUjgIUxsHAEsDAGFo4AFsaAEZ61hq1btxi9Ekg4Xf38BYNylt63ijKB/TvDCN//7tbUbW7VvLCBKAcRHgv7aYJa+/HV/3glwuJ+I2XrrTff2oqGcCoFpSR0+cxQtacEhxDeSjG1LzfvPAo3SAi/SDEpCY43HoXt2ZN8hksQnkkxKfewfAEUw/6YDvKU/hT22ylb7/z5ftljDiIsPqY152DiTbhPRFiY/DLWbfaUWb/rAGIO1JY+TtfbmbKqb9uFeQac3iTg19K0MWlSSCLn72EMLBwBLIyBhSOAhTGwcASwMAYWjgAWxsDCEcDCGFg4AlgYAwtHAAtjYOEIYGEMLBwBoYSn61F9t4WNd5VKIOFTMcihKYwUh3shzjDCo9/d/uk29/GlXuvalD4AQYTFLA5Nno1bzoPpYrEQQnggBapu/6w54VZSN4RwW4pTSZZzLQaKDvebEMJyrUDl5nt1FIaksKiIpSkfsAc7ZeIp5TOdE9PcMiiEoNGPAaCwnJak5PE8uAq7vdXPudv4/xhQWH4K9y43rx19N9hwj6xOP4B/zkNfS+JdqtaS7DsKu9VL3r80vlx9wcKC0kI5wa6P6Xd8vCea+4bQ0mXGCbil9XtRf2iT5ZoOvkuHeAsDb0tn20Mq3o0pu3fQeOyiGFYzIwj1edjra67myIjxe7gQLHztsPC1w8LXDgtfOyx87bAwFQaz5nr+uFw+zifjPnBRuGn75fWnM2TXbRhGNmgKz4byBN3N68Ta+zWbb2ryQV1dtzdB4ayh7dZ/yJ063tQPBdwr1wY9YXO9iC+jcroyHnTZpUxNOK0bQ98z197M2WPeMR/yv4mYsHWBPs1JvltYjlmLe5MS7gFqCShDl4CJvA9CzxQl4QFoDLIrHwTrID4/4wkJD3Jv3zPSjPx7+/6yMSFh8Pqp7+crFOpbq5160+kII6q9fJyM4b611fEQMsKpMVQNi8H3MagST8dxDirC2cYYqdb4cIUih3fapISx9bg+B1LFKxADtHCntKy0DBt8bYEvpPGIE+6tDy2akb1UjgttU5BeucMIT0976YdL9/T0gIR9Vi8ys0QIWwbE9y0eY7Nhbq++MjAd65k+XFhMW9EtZZ17iqxF0EItGdtyTGoZKNstiVq2h12oJWO/fKUt2VoNthVGfVZcy6XjKTHN+hmrXhMSti9ab6RuqYfKq8mamJZ/TYdbx3zrKbk0GuEuVFgOSdlsrYmX37HsmteGZwd+LYnXtNrYml3+8AVdzS9WIvzpMgVAl0+W229ofWaFancckjvhbel/x710zQ7LXWxLQcN/OriywHwtzbqL2mhtytdtjkx/ZGhvWpr70T2zIvI97JxRj+WNiPA6lPALEWF054UrEyLCwVoet0SEE1wXnjsZFeFA34dLMr2WHovM5/FMRjjQB2JGR3hrDNIjh4FiKsJBvh96hISTZfm+35kAZISnxji9kZESLr89/dP1SEfYY2F9LcSGSxO/659oOPYyERIut9/j1PFISNh5Yj2E31wtSsLJV2m+55nzpITLa32cu4lJCXtcEERG6IijJZzg671AEPOmiQn3jEEXQBr7IyZsHcNwQO5Ipybs/za+GCghJ2wfa8ZxuTgUPeHk3afv5+W4JUHhHjCNGEJdGcYjKOyx/bFQh7UoCvv7UtQM45EU9vVy0g1b0hTGZU+b0CaWEBX2MbymT6ShKlzc2JA4RFa4aP6lKVGKrnCxc2xMDCMsXODJpXn/nqAs7Gxcz0mjIS3s+D5e5KWF0RZ2Gjf+yJ11QFzYYcjpKX+WBXVh9JeEbf1iMQeumiJ1NgbgSZgHbLn3Uo7kYlJ8RV0EY2DV0cyY1KiirX0tEWp6hZa6du1mFfBIKqBwZKgJNAaApUuB/Vz6RF+ZcKnKeoDPDdCFCPH13kmI5Q0mDOm9VUvmagmXfq8HKGy/98CFecsawAICWRb+G0vDegv9nSAJQznA48xtWCN8yxqyg3E5MJBHTmcmslB1hQ8u1MIHxucNujB3mAnaGpAlwDv6vGrNShs2sgmqxeoLZdamDW31GgffA5100grKZAys/CbSU43R/7W4yC5Tfa7cd2+8+1u+ifxJW06VDWq8/jHfc+Pwr/iepu+6LskVI4dc43bVQQRl+Md8k8Stj/U/aJx9AhhYBC8AAAAASUVORK5CYII=" title='My Wishlist' className='small-logo'/>
              </a>
            </Link>
          </li>              
          :null 
          }

          {
            user?
            <li className="navbar-item" >
                <Link to="/cart">
                  <a className="nav-link">
                  <img src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=170667a&w=0&h=kEh5VLsTHukWc7xf2BvUs8ssqS_d7vkK0-xU3MDpO7s=" title='My Shopping Cart' className='small-logo'/>
                  </a>
                </Link>
              </li>              
              :null
          } 

          {
            user?
            <li className="navbar-item" >
            <Link to="/changepassword">
              <a className="nav-link">
                <img src="https://static.thenounproject.com/png/250130-200.png" title='Change Password' className='small-logo'/>
              </a>
            </Link>
          </li>              
          :null
            
          }

          {
            user?
            <li className="navbar-item" >
                <Link to="/myaccount">
                  <a className="nav-link">
                  <img src="https://www.kindpng.com/picc/m/9-93976_my-account-hover-comments-icon-hd-png-download.png" title='My Account' className='small-logo'/>
                  </a>
                </Link>
              </li>              
              :null
          } 

          { 
            user ? (
            <li className="navbar-item" >
              <Link to="/login">
                <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                  <img className='small-logo' src='https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-logout-icon-png-image_4233257.jpg' title='Logout'></img>
                </a>
              </Link>
            </li>
              ) : (           
            <li className="navbar-item" >
            <Link to="/login">
              <img src="https://iconarchive.com/download/i86056/graphicloads/100-flat-2/inside-logout.ico" title='Login' className='small-logo'/>
            </Link>
            </li>
            )
          }
          </div>

        </nav>   

        <div className="container mt-3">
          <Routes>

            <Route path="/" element={<Login login={login}/>}
            />

            <Route path="/login" element={<Login login={login}/>}
            />

            <Route path='/signup' element={<SignUp/>}
            />

            <Route path='/myaccount' element={<MyAccount token={accessToken}/>}
            />

            <Route path='/changepassword' element={<ChangePassword token={accessToken}/>}
            />

            <Route path='/products' element={<Products token={accessToken}/>}
            />

            <Route path='/product/:pid' element={<ProductDetails token={accessToken}/>} 
            />

            <Route path='/mywishlist' element={<MyWishList token={accessToken}/>}
            />

            <Route path='/myorders' element={<Orders token={accessToken}/>}
            />

            <Route path='/orderdetails/:oid' element={<OrderDetails token={accessToken}/>}
            />

            <Route path='/cart' element={<Cart/>}
            />

          </Routes> 
        </div> 
      
    </div>
  );
}

export default App;

