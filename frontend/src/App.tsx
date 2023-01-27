import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import MilkProduct from './types';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [milks, setMilks] = useState<MilkProduct[]>([]);
  const [displayedMilks, setDisplayedMilks] = useState<MilkProduct[]>([]);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<boolean>(false);

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
    localStorage.clear();
    getData();
  }, [])

  return (
    <div className="App">
      <Header />
      <section className='searchFilterFeatures'>
        <Search milks={milks} displayedMilks={displayedMilks} setDisplayedMilks={setDisplayedMilks} setSearchActive={setSearchActive} filterActive={filterActive}/>
        <Filter milks={milks} displayedMilks={displayedMilks} setDisplayedMilks={setDisplayedMilks} searchActive={searchActive} filterActive={filterActive} setFilterActive={setFilterActive}/>
      </section>
      <p className='productNum'>{searchActive || filterActive ? displayedMilks.length : milks.length} products</p>
      <ProductGrid milkProducts={searchActive || filterActive ? displayedMilks : milks}/>
    </div>
  );
}

export default App;
