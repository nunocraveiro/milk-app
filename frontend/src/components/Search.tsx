import './Search.css';
import { ChangeEvent, useEffect } from 'react';
import MilkProduct from '../types';

type Props = {
    milks: MilkProduct[],
    displayedMilks: MilkProduct[];
    setDisplayedMilks: (filteredMilks: MilkProduct[]) => void,
    setSearchActive: (activeBool: boolean) => void,
    filterActive: boolean
}

const SearchFilter = ({milks, displayedMilks, setDisplayedMilks, setSearchActive, filterActive}: Props) => {
    useEffect(() => {
        if (!filterActive) {
            localStorage.setItem('filteredArray', JSON.stringify(displayedMilks));
        }
    }, [displayedMilks, filterActive])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchActive(true);
        if (e.target.value === '') {
            localStorage.clear();
            return setSearchActive(false);
        }
        if (!filterActive) {
            return setDisplayedMilks(milks.filter(milk => milk.name.toLowerCase().includes(e.target.value.toLowerCase())));
        }
        return setDisplayedMilks(JSON.parse(localStorage.getItem('filteredArray')!).filter((milk: MilkProduct) => milk.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    return (
        <section className='searchFeature'>
            <div className='searchIconContainer'><span className="material-symbols-outlined searchIcon">search</span></div>
            <input className='search' type="text" placeholder="Search" onChange={searchHandler}/>
        </section>
    )
}

export default SearchFilter;