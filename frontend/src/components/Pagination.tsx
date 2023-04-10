import './Pagination.css';
import { MouseEvent } from 'react';

type Props = {
    pageNum: number,
    setPageNum: (num: number) => void,
    maxPageNum: number
}

const Pagination = ({pageNum, setPageNum, maxPageNum}: Props) => {
    const paginationHandler = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.localName === 'p') {
            return setPageNum(Number(target.innerHTML));
        }
        if (target.className.includes('previous') && pageNum > 1) {
            return setPageNum(pageNum-1);
        }
        if (target.className.includes('next') && pageNum < maxPageNum) {
            console.log(pageNum);
            return setPageNum(pageNum+1);
        }
    }

    if (pageNum < 4) {
        return (
            <div className='paginationDiv' onClick={paginationHandler}>
                <span className="material-symbols-outlined navigate previous">navigate_before</span>
                {maxPageNum === 1 || maxPageNum === 2 ? 
                    Array.from(Array(maxPageNum)).map((el, i) => <p className={i+1 === pageNum ? 'bold' : ''}>{i+1}</p>)
                    : Array.from(Array(4)).map((el, i) => <p className={i+1 === pageNum ? 'bold' : ''}>{i+1}</p>)}
                <>...</>
                <p>{maxPageNum}</p>
                <span className="material-symbols-outlined navigate next">navigate_next</span>
            </div>
        )
    }
    if (pageNum > maxPageNum-3) {
        return (
            <div className='paginationDiv' onClick={paginationHandler}>
                <span className="material-symbols-outlined navigate previous">navigate_before</span>
                <p>1</p>
                <>...</>
                <p>{maxPageNum-3}</p>
                <p className={maxPageNum-2 === pageNum ? 'bold' : ''}>{maxPageNum-2}</p>
                <p className={maxPageNum-1 === pageNum ? 'bold' : ''}>{maxPageNum-1}</p>
                <p className={maxPageNum === pageNum ? 'bold' : ''}>{maxPageNum}</p>
                <span className="material-symbols-outlined navigate next">navigate_next</span>
            </div>
        )
    }
    return (
        <div className='paginationDiv' onClick={paginationHandler}>
            <span className="material-symbols-outlined navigate previous">navigate_before</span>
            <p>1</p>
            <>...</>
            <p>{pageNum-1}</p>
            <p className='bold'>{pageNum}</p>
            <p>{pageNum+1}</p>
            <>...</>
            <p>{maxPageNum}</p>
            <span className="material-symbols-outlined navigate next">navigate_next</span>
        </div>
    )
}

export default Pagination;