import { useEffect, useState, MouseEvent, useRef } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import MilkProduct from './types';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [milks, setMilks] = useState<MilkProduct[]>([]);
  const [searchResults, setSearchResults] = useState<MilkProduct[]>([]);
  const [filterResults, setFilterResults] = useState<MilkProduct[]>([]);
  const [searchFilterResults, setSearchFilterResults] = useState<MilkProduct[]>([]);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const filterRef = useRef<HTMLElement>(null);

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

  const closeFilterDropdown = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.className.includes('search') && !target.className.includes('filter') && !target.className.includes('down')) {
      ((e.currentTarget.children[1].lastChild as HTMLElement).firstChild?.lastChild! as HTMLElement).innerHTML = 'arrow_drop_down';
      (e.currentTarget.children[1].lastChild as HTMLElement).children[1].classList.add('hide');
    }
  }

  return (
    <div className="App" onClick={closeFilterDropdown}>
      <Header />
      <section className='searchFilterFeatures'>
        <Search milks={milks} setSearchActive={setSearchActive} searchResults={searchResults} setSearchResults={setSearchResults} />
        <Filter milks={milks} setFilterActive={setFilterActive} filterResults={filterResults} setFilterResults={setFilterResults} />
      </section>
      {!filterActive && !searchActive && 
        <section>
          <p className='productNum'>{milks.length} products</p>
          <ProductGrid milkProducts={milks}/>
        </section>
      }
      {filterActive && !searchActive && 
        <section>
          <p className='productNum'>{filterResults.length} products</p>
          <ProductGrid milkProducts={filterResults}/>
        </section>
      }
      {searchActive && !filterActive && 
        <section>
          <p className='productNum'>{searchResults.length} products</p>
          <ProductGrid milkProducts={searchResults}/>
        </section>
      }
      {searchActive && filterActive && 
        <section>
          <p className='productNum'>{searchFilterResults.length} products</p>
          <ProductGrid milkProducts={searchFilterResults}/>
        </section>
      }
    </div>
  );
}

export default App;
