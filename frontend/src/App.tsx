import { useEffect, useState, MouseEvent, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import { MilkProduct, CartProduct } from './types';
import Search from './components/Search';
import Filter from './components/Filter';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Pagination from './components/Pagination';

function App() {
  const [milks, setMilks] = useState<MilkProduct[]>([]);
  const [searchResults, setSearchResults] = useState<MilkProduct[]>([]);
  const [filterResults, setFilterResults] = useState<MilkProduct[]>([]);
  const [searchFilterResults, setSearchFilterResults] = useState<MilkProduct[]>([]);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [cart, setCart] = useState<CartProduct[]>(sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')!) : []);
  const [cartSum, setCartSum] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const numPerPage: number = 15;

  const arrowRef = useRef<HTMLSpanElement>(null);
  const filterRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const getData = () => {
      axios.get('http://localhost:3001/')
      .then(res => {
        setMilks(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
    }
    getData();
  }, [])

  useEffect(() => {
    if (searchActive && filterActive) {
      return setSearchFilterResults(searchResults.filter(searchEl => filterResults.some(filterEl => searchEl === filterEl)));
    }
  }, [searchResults, filterResults])

  useEffect(() => {
    setCartSum(cart.reduce((acc, obj) => acc + obj.quantity, 0));
  }, [cart])

  useEffect(() => {
    headerRef.current!.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [pageNum])

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  const closeFilterDropdown = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.className.includes('search') && !target.className.includes('filter') && !target.className.includes('down') && arrowRef.current) {
      arrowRef.current!.innerHTML = 'arrow_drop_down';
      filterRef.current!.classList.add('hide');
    }
  }

  return (
    <div className="App" onClick={closeFilterDropdown}>
      <Routes>
        <Route path='/' element={
          <>
            <Header cartSum={cartSum} headerRef={headerRef}/>
            <section className='searchFilterFeatures'>
              <Search milks={milks} setSearchActive={setSearchActive} searchResults={searchResults} setSearchResults={setSearchResults}/>
              <Filter milks={milks} setFilterActive={setFilterActive} filterResults={filterResults} setFilterResults={setFilterResults} arrowRef={arrowRef} filterRef={filterRef}/>
            </section>
            {!filterActive && !searchActive && 
              <section>
                <p className='productNum'>{milks.length} products</p>
                <ProductGrid milkProducts={milks.slice(pageNum*numPerPage-numPerPage, pageNum*numPerPage)}/>
                <Pagination pageNum={pageNum} setPageNum={setPageNum} maxPageNum={Math.ceil(milks.length/numPerPage)}/>
              </section>
            }
            {filterActive && !searchActive && 
              <section>
                <p className='productNum'>{filterResults.length} products</p>
                <ProductGrid milkProducts={filterResults}/>
                <Pagination pageNum={pageNum} setPageNum={setPageNum} maxPageNum={Math.ceil(filterResults.length/numPerPage)}/>
              </section>
            }
            {searchActive && !filterActive && 
              <section>
                <p className='productNum'>{searchResults.length} products</p>
                <ProductGrid milkProducts={searchResults}/>
                <Pagination pageNum={pageNum} setPageNum={setPageNum} maxPageNum={Math.ceil(searchResults.length/numPerPage)}/>
              </section>
            }
            {searchActive && filterActive && 
              <section>
                <p className='productNum'>{searchFilterResults.length} products</p>
                <ProductGrid milkProducts={searchFilterResults}/>
                <Pagination pageNum={pageNum} setPageNum={setPageNum} maxPageNum={Math.ceil(searchFilterResults.length/numPerPage)}/>
              </section>
            }
          </>
        } />
        <Route path='/:productId' element={
          <>
            <Header cartSum={cartSum} headerRef={headerRef}/>
            <ProductPage milks={milks} cart={cart} setCart={setCart}/>
          </>
        } />
        <Route path='/cart' element={
          <>
            <Header cartSum={cartSum} headerRef={headerRef}/>
            <Cart cart={cart} setCart={setCart} cartSum={cartSum}/>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
