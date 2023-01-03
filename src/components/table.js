
export const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {},
    {},
    {
        name: 'Location',
        selector: row => row.location,
        sortable: true,
        right: true,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true,
        right: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
        right: true,
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
        },
    },
    headCells: {
        style: {
            paddingLeft: '2rem', // override the cell padding for head cells
            paddingRight: '2rem',

        },

    },
    cells: {
        style: {
            paddingLeft: '2rem', // override the cell padding for data cells
            paddingRight: '2rem',

        },
    },

};
