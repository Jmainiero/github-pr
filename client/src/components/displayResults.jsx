import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function DisplayResults({ results }) {
function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((entry) => (
                    <div className="results--entry" key={entry.title}>
                        <div className="results--entry--left">
                            <img src={`${entry.avatar}`} className="results--entry__avatar" alt="avatar" />
                            <a className="results--entry__author" href={`${entry.authPage}`} target="_blank" rel="noopener noreferrer">{entry.author}</a>
                        </div>
                        <div className="results--entry--right">
                            <a className="results--entry__title" href={`${entry.url}`} target="_blank" rel="noopener noreferrer">{entry.title}</a>
                            <p className="results--entry__count">Number of Commits: {entry.commitCount}</p>
                            <p className="results--entry__date">Created: {entry.createdDate}</p>
                        </div>
                    </div>
                ))}
        </>
    );
}
function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(results.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(results.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % results.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className='results'><Items currentItems={currentItems} /></div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

    return <PaginatedItems itemsPerPage={8} />

}