import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import '@mui/x-data-grid/styles/css';  /     / Import the default styles

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <div className="m-4 shadow-lg rounded-lg">
      <div className="p-4 bg-gray-100 rounded-t-lg">
        <h1 className="text-xl font-semibold">{heading}</h1>
      </div>
      <div style={{ height: 400, width: '100%' }} className="bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          rowHeight={rowHeight}
        />
      </div>
    </div>
  );
};

export default Table;
