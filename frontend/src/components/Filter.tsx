import './Filter.css';
import { MouseEvent } from 'react';

const Filter = () => {
    const dropdownHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.nextElementSibling!.className === 'hide') {
            e.currentTarget.lastElementChild!.innerHTML = 'arrow_drop_up';
            return e.currentTarget.nextElementSibling!.className = 'dropdown';
        }
        e.currentTarget.lastElementChild!.innerHTML = 'arrow_drop_down';
        return e.currentTarget.nextElementSibling!.className = 'hide';
    }

    return (
        <section className="filterContainer">
            <div className="filterFeature" onClick={dropdownHandler}>
                <p className='filter'>Filter</p><span className="material-symbols-outlined filterOpenIcon">arrow_drop_down</span>
            </div>
            <div className='hide'><span className="material-symbols-outlined checkBlank">check_box_outline_blank</span></div>
        </section>
    )
}

export default Filter;