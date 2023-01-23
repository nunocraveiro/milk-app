import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from '../components/Header'

interface MilkProduct {
  name: string,
  type: string,
  storage: number,
  id: string
}

function App() {
  const [milks, setMilks] = useState<MilkProduct[]>([]);
  
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
    </div>
  );
}

export default App;
