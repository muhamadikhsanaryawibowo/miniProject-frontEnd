import { Route, Routes } from 'react-router-dom'
import OrderProduct from './pages/OrderProduct'
import './index.css'
import TransactionHistory from './pages/TransactionHistory'
import TransactionDetails from './pages/TransactionDetails'
import Checkout from './pages/Checkout'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import CategoryList from './pages/CategoryList'
import AddCategory from './pages/AddCategory'
import EditCategory from './pages/EditCategory'
import CategoryDetails from './pages/CategoryDetails'


function App() {

  return (
    <>
      <Routes>
        {/* Add routes here */}
        <Route path='/' element= {<OrderProduct/>}/>
        <Route path='/checkout' element= {<Checkout/>}/>
        
        <Route path='/transaction' element= {<TransactionHistory/>}/>
        <Route path='/transaction/:id' element= {<TransactionDetails/>}/>
        
        <Route path='/product' element= {<ProductList/>}/>
        <Route path='/product/:id' element= {<ProductDetails/>}/>
        <Route path='/product/add' element= {<AddProduct/>}/>
        <Route path='/product/:id/edit' element= {<EditProduct/>}/>

        <Route path='/category' element= {<CategoryList/>}/>
        <Route path='/category/:id' element= {<CategoryDetails/>}/>
        <Route path='/category/add' element= {<AddCategory/>}/>
        <Route path='/category/:id/edit' element= {<EditCategory/>}/>

      </Routes>
    </>
  )
}

export default App
