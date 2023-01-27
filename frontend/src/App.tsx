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
    getData()
  }, [])

  return (
    <div className="App">
      <Header />
      <section className='searchFilterFeatures'>
        <Search milks={milks} setDisplayedMilks={setDisplayedMilks} setFilterActive={setFilterActive}/>
        <Filter />
      </section>
      <p className='productNum'>{filterActive ? displayedMilks.length : milks.length} products</p>
      <ProductGrid milkProducts={filterActive ? displayedMilks : milks}/>
    </div>
  );
}

export default App;
