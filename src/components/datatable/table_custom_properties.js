
export const columns = [
    {
        name: 'project',
        id: 'first_col',
        selector: row => row.title,
        sortable: true,
        // right: true,

    },
    { hide: 'md' },
    { hide: 'md' },
    { hide: 'md' },
    {
        name: 'location',
        selector: row => row.location,
        sortable: true,
        // right: true,
        hide: 'md',
        // style: {
        //     display: 'flex',
        //     justifyContent: 'end'
        // }
    },
    { hide: 'md' },

    {
        name: 'type',
        selector: row => row.type,
        sortable: true,
        // right: true,
        hide: 'md',
        // style: {
        //     display: 'flex',
        //     justifyContent: 'end'
        // }
    },
    { hide: 'md' },

    {
        name: 'year',
        selector: row => row.year,
        sortable: true,
        // right: true,
        hide: 'md',
        // style: {
        //     display: 'flex',
        //     justifyContent: 'end'
        // }
    },

    {
        name: 'no.',
        selector: row => row.no,
        sortable: true,
        right: true,
        style: {
            display: 'flex',
            justifyContent: 'end'
        }
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
            fontFamily: 'Circular Medium',

            // display: 'flex',
            // justifyContent: 'end'
        },

    },
    cells: {
        style: {
            paddingLeft: '0rem', // override the cell padding for data cells
            paddingRight: '0rem',
            // display: 'flex',
            // justifyContent: 'end'
        },
    },
    // headRow: {
    //     style: {
    //         // backgroundColor: theme.background.default,
    //         minHeight: '52px',
    //         // borderBottomWidth: '20px',
    //         // borderBottomColor: theme.divider.default,
    //         borderBottomStyle: 'solid',
    //         borderTopColor: '#f00'
    //     },
    //     denseStyle: {
    //         minHeight: '10px',
    //     },
    // },

};
