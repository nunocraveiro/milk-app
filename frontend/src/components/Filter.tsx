import './Filter.css';
import { MouseEvent } from 'react';
import MilkProduct from '../types';

type Props = {
    milks: MilkProduct[],
    setFilterActive: (activeBool: boolean) => void,
    filterResults:  MilkProduct[],
    setFilterResults: (milkResults: MilkProduct[]) => void
}

const Filter = ({milks, setFilterActive, filterResults, setFilterResults}: Props) => {

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
        if (e.currentTarget.nextElementSibling!.className === 'dropdown hide') {
            e.currentTarget.lastElementChild!.innerHTML = 'arrow_drop_up';
            return e.currentTarget.nextElementSibling!.classList.remove('hide');
        }
        e.currentTarget.lastElementChild!.innerHTML = 'arrow_drop_down';
        return e.currentTarget.nextElementSibling!.classList.add('hide');
    }

    const filterHandler = (e: MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setFilterActive(true);
        if (!target.checked && filterResults.length > 0) {
            const milkResults = filterResults.filter((milk: MilkProduct) => milk.type !== target.name);
            if (milkResults.length === 0) {
                setFilterActive(false);
            }
            return setFilterResults(milkResults);
        }
        if (target.checked && filterResults.length === 0) {
            setFilterResults(milks.filter((milk: MilkProduct) => milk.type === target.name));
        }
        if (target.checked && filterResults.length > 0) {
            setFilterResults(filterResults.concat(milks.filter((milk: MilkProduct) => milk.type === target.name)));
        }
    }

    return (
        <section className="filterContainer">
            <div className="filterFeature" onClick={dropdownHandler}>
                <p className='filter'>Filter</p><span className="material-symbols-outlined filterOpenIcon">arrow_drop_down</span>
            </div>
            <section className='dropdown hide'>
                {getMilkTypes(milks).map((milkType: string) => 
                    <div className='typeCheckbox down' key={milkType}>
                        <input className='down' type="checkbox" id={milkType} name={milkType} onClick={filterHandler}></input>
                        <label className='down' htmlFor={milkType}>{milkType}</label>
                    </div>
                )}
            </section>
        </section>
    )
}

export default Filter;