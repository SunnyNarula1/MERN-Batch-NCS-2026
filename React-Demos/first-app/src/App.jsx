import Header from "./Header"
import Footer from "./Footer"
import Products from "./Products"
import User from "./User"
import Form from "./Form"
import ProductCatalog from "./ProductCatalog"
function App() {
  const num = 10
  const price = 2000
  const productlist = ['Laptop', "Camera", "Mobile", "Playstation", "Tablet"]
  return (
    <div>
      {/* <Header />
      <h1 className="text-center">Welcome to React</h1>
      <Products quantity={num} price={price} productlist={productlist} />

      <Footer /> */}
      {/* <User /> */}
      {/* <Form /> */}
      <ProductCatalog />
    </div>
  )
}

export default App