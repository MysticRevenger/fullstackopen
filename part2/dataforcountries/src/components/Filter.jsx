import React from 'react'

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            find countries: <input type="text" value={filter} onChange={handleFilter} />
        </div>
    )
}

export default Filter