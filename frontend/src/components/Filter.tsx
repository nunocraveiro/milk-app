import './Filter.css';
import { MouseEvent, useEffect } from 'react';
import MilkProduct from '../types';

type Props = {
    milks: MilkProduct[],
    displayedMilks: MilkProduct[],
    setDisplayedMilks: (filteredMilks: MilkProduct[]) => void,
    searchActive: boolean,
    filterActive: boolean,
    setFilterActive: (activeBool: boolean) => void
}

const Filter = ({milks, displayedMilks, setDisplayedMilks, searchActive, filterActive, setFilterActive}: Props) => {
    useEffect(() => {
        if (!searchActive) {
            localStorage.setItem('filteredArray', JSON.stringify(displayedMilks));
        }
    }, [displayedMilks, searchActive])

    const getMilkTypes = (milkArray: MilkProduct[]) => {
        const auxArray: string[] = [];
        milkArray.forEach((milk: MilkProduct) => {
            if (auxArray.includes(milk.type)) {
                return;
            }
            auxArray.push(milk.type);
        })
        return auxArray.sort(); 
    }

    const dropdownHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.nextElementSibling!.className === 'hide') {
            e.currentTarget.lastElementChild!.innerHTML = 'arrow_drop_up';
            return e.currentTarget.nextElementSibling!.className = 'dropdown';
        }
        e.currentTarget.lastElementChild!.innerHTML = 'arrow_drop_down';
        return e.currentTarget.nextElementSibling!.className = 'hide';
    }

    const filterHandler = (e: MouseEvent<HTMLInputElement>) => {
        let target = e.target as HTMLInputElement;
        setFilterActive(true);
        if (localStorage.getItem('filteredArray') && displayedMilks.length === JSON.parse(localStorage.getItem('filteredArray')!).length) {
            localStorage.clear();
            return setFilterActive(false);
        }
        if (!target.checked && displayedMilks.length !== 0) {
            setDisplayedMilks(displayedMilks.filter((milk: MilkProduct) => milk.type !== target.name));
        }
        if (target.checked && displayedMilks.length === 0) {
            setDisplayedMilks(milks.filter((milk: MilkProduct) => milk.type === target.name));
        }
        if (target.checked && displayedMilks.length !== 0) {
            if (searchActive && !filterActive) {
                return setDisplayedMilks(JSON.parse(localStorage.getItem('filteredArray')!).filter((milk: MilkProduct) => milk.type === target.name));
            }
            if (searchActive && filterActive) { // add verification and error message
                return setDisplayedMilks(displayedMilks.concat(JSON.parse(localStorage.getItem('filteredArray')!).filter((milk: MilkProduct) => milk.type === target.name)));
            }
            return setDisplayedMilks(displayedMilks.concat(milks.filter((milk: MilkProduct) => milk.type === target.name)));
        }
    }

    return (
        <section className="filterContainer">
            <div className="filterFeature" onClick={dropdownHandler}>
                <p className='filter'>Filter</p><span className="material-symbols-outlined filterOpenIcon">arrow_drop_down</span>
            </div>
            <section className='hide'>
                {getMilkTypes(milks).map((milkType: string) => 
                    <div className='typeCheckbox' key={milkType}>
                        <input type="checkbox" id={milkType} name={milkType} onClick={filterHandler}></input>
                        <label htmlFor={milkType}>{milkType}</label>
                    </div>
                )}
            </section>
        </section>
    )
}

export default Filter;