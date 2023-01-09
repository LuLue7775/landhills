
export const columns = [
    {
        name: 'Title',
        id: 'first_col',
        selector: row => row.title,
        sortable: true,
    },
    { hide: 'md' },
    { hide: 'md' },
    {
        name: 'Location',
        selector: row => row.location,
        sortable: true,
        right: true,
        hide: 'md'
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
        right: true,
        hide: 'md'
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
        right: true,
        hide: 'md'
    },
    {
        name: 'No.',
        selector: row => row.no,
        sortable: true,
        right: true,
    },
];

export const customStyles = {
    rows: {
        style: {
            minHeight: '4rem', // override the row height
            cursor: 'pointer',
            fontFamily: 'Circular Book',
        },
    },
    headCells: {
        style: {
            paddingLeft: '2rem', // override the cell padding for head cells
            paddingRight: '2rem',
            fontFamily: 'Circular Medium'
        },

    },
    cells: {
        style: {
            paddingLeft: '2rem', // override the cell padding for data cells
            paddingRight: '2rem',

        },
    },

};
