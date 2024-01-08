import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Home, Products, AboutUS, ContactUS, Login, Signup, ProductDetail, Footer, Cart, ForgotPassword, PlaceOrder } from './components/';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/products' Component={Products}>
            {/* param can be search value or category */}
            <Route path='/products/:param' Component={Products} />
          </Route>
          <Route path='/productDetail/:productID' Component={ProductDetail} />
          <Route path='/cart' Component={Cart} />
          <Route path='/cart/placeOrder/:id' Component={PlaceOrder} />
          <Route path='/aboutus' Component={AboutUS} />
          <Route path='/contactus' Component={ContactUS} />
          <Route path='/login' Component={Login} />
          <Route path='/forgotPassword' Component={ForgotPassword} />
          <Route path='/signup' Component={Signup} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
