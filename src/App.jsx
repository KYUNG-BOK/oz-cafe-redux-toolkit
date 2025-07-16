import { useSelector } from 'react-redux'
import './App.scss'
import Header from './components/Header'
import Menu from './components/Menu'
import { Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'

function App() {
  const menu = useSelector(state => state.menu)
  const cart = useSelector(state => state.cart)

  console.log(cart)

  return (
    <div>
      <Header />
      <main>
        <Routes>
          {/* 이제 props로 상태 전달 안 함 */}
          <Route path='/' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
