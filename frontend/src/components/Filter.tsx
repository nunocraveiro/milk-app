import './Filter.css';
import { MouseEvent, RefObject } from 'react';
import { MilkProduct } from '../types';

type Props = {
    milks: MilkProduct[],
    setFilterActive: (activeBool: boolean) => void,
    filterResults:  MilkProduct[],
    setFilterResults: (milkResults: MilkProduct[]) => void,
    arrowRef: RefObject<HTMLSpanElement>,
    filterRef: RefObject<HTMLElement>
}

const Filter = ({milks, setFilterActive, filterResults, setFilterResults, arrowRef, filterRef}: Props) => {
    const getMilkTypes = (milkArray: MilkProduct[]) => {
        const auxArray: string[] = [];
        milkArray.forEach((milk: MilkProduct) => {
            if (auxArray.includes(milk.type!)) {
                return;
            }
            auxArray.push(milk.type!);
        })
        return auxArray.sort(); 
    }

    const dropdownHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (filterRef.current!.className === 'dropdown hide') {
            arrowRef.current!.innerHTML = 'arrow_drop_up';
            return filterRef.current!.classList.remove('hide');
        }
        arrowRef.current!.innerHTML = 'arrow_drop_down';
        return filterRef.current!.classList.add('hide');
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
                <p className='filter'>Filter</p><span className="material-symbols-outlined filterOpenIcon" ref={arrowRef}>arrow_drop_down</span>
            </div>
            <section className='dropdown hide' ref={filterRef}>
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