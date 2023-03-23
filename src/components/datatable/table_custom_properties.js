
export const columns = [
    {
        name: 'Project',
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
        // right: true,
        hide: 'md'
    },
    { hide: 'md' },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
        // right: true,
        hide: 'md'
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
        // right: true,
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
            minHeight: '39px', // override the row height
            cursor: 'pointer',
            fontFamily: 'Circular Book',
        },
    },
    headRow: {
        style: {
            minHeight: '39px', // override the row height
        }
    },
    headCells: {
        style: {
            margin: '0',
            paddingLeft: '0rem', // override the cell padding for head cells
            paddingRight: '0rem',
            fontFamily: 'Circular Medium'
        },

    },
    cells: {
        style: {
            paddingLeft: '0rem', // override the cell padding for data cells
            paddingRight: '0rem',

        },
    },

};
