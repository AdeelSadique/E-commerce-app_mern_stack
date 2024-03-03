import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Home, Products, AboutUS, ContactUS, Login, Signup, ProductDetail, Footer, Cart, ForgotPassword, PlaceOrder } from './components/';
import UserDashboard from './components/user/UserDashboard';
import MyOrders from './components/MyOrders';
import MyOrderDetails from './components/MyOrderDetails';
import ChangePassword from './components/user/ChangePassword';
import AdminDashboard from './components/admin/AdminDashboard';

import { Provider, useDispatch } from 'react-redux';
import Auth from './components/Auth';
import PageNotFound from './components/PageNotFound';
import AdminProfile from './components/admin/Profile';
import Orders from './components/admin/Orders';
import Stock from './components/admin/Stock';
import Payment from './components/admin/Payment';
import ManageProducts from './components/admin/Products';
import Analytics from './components/admin/Analytics';
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/auth' Component={Auth} />
          <Route path='*' Component={PageNotFound} />
          {/* Admin routes */}
          <Route path='/admin/dashboard' Component={AdminDashboard} />
          <Route path='/admin/dashboard/orders' Component={Orders} />
          <Route path='/admin/dashboard/orders/analytics' Component={Analytics} />
          <Route path='/admin/profile' Component={AdminProfile} />
          <Route path='/admin/dashboard/stock' Component={Stock} />
          <Route path='/admin/dashboard/payment' Component={Payment} />
          <Route path='/admin/dashboard/products' Component={ManageProducts} />
          {/* Admin routes */}
          <Route path='/user/dashboard' Component={UserDashboard}>
            <Route path='/user/dashboard/changePassword' Component={ChangePassword} />
          </Route>
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
          <Route path='/myOrders' Component={MyOrders}></Route>
          <Route path='/orderDetails/:orderId' Component={MyOrderDetails} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
