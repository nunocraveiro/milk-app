import './Search.css';
import { ChangeEvent, useState } from 'react';
import MilkProduct from '../types';

type Props = {
    milks: MilkProduct[],
    setDisplayedMilks: (filteredMilks: MilkProduct[]) => void,
    setFilterActive: (activeBool: boolean) => void
}

const SearchFilter = ({milks, setDisplayedMilks, setFilterActive}: Props) => {
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterActive(true);
        if (e.target.value === '') {
            return setFilterActive(false);
        }
        return setDisplayedMilks(milks.filter(milk => milk.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    return (
        <section className='searchFeature'>
            <div className='searchIconContainer'><span className="material-symbols-outlined searchIcon">search</span></div>
            <input className='search' type="text" placeholder="Search" onChange={searchHandler}/>
        </section>
    )
}

export default SearchFilter;