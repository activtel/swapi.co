import React from 'react';

export default ({ term, onChange }) => {
    return (
        <input
            value={term}
            type="search"
            placeholder="Поиск..."
            className="form-control mr-sm-2"
            aria-label="Search"
            onChange={(event) => onChange(event.target.value)}
        />
    );
};