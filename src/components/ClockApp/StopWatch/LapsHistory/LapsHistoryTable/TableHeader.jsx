import React from 'react';

const HEADERS = ['Lap #', 'Total', 'Lap result'];

function TableHeader() {
  return (
    <thead>
      <tr>
        {HEADERS.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
