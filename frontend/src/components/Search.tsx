import './Search.css';
import { ChangeEvent, useRef } from 'react';
import { MilkProduct } from '../types';

type Props = {
    milks: MilkProduct[],
    setSearchActive: (activeBool: boolean) => void,
    searchResults: MilkProduct[],
    setSearchResults: (milkResults: MilkProduct[]) => void
}

const SearchFilter = ({milks, setSearchActive, searchResults, setSearchResults}: Props) => {
    const searchRef = useRef<HTMLInputElement>(null);

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchActive(true);
        if (e.currentTarget.value === '') {
            setSearchActive(false)
            return setSearchResults([]);
        }
        return setSearchResults(milks.filter(milk => milk.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    const closeHandler = () => {
        searchRef.current!.value = '';
        setSearchActive(false)
        return setSearchResults([]);
    }

    return (
        <section className='searchFeature'>
            <div className='searchIconContainer'><span className="material-symbols-outlined searchIcon">search</span></div>
            <input className='search' type="text" placeholder="Search" onChange={searchHandler} ref={searchRef}/>
            <div className='closeIconContainer' onClick={closeHandler}><span className="material-symbols-outlined searchIcon">close</span></div>
        </section>
    )
}

export default SearchFilter;