import React from 'react';
import { format, addMilliseconds } from 'date-fns';

function TableBody({ lapsHistory }) {
  return (
    <tbody>
      {lapsHistory.map(({ lap, total, lapResult }) => (
        <tr key={lap}>
          <td>Lap {lap}</td>
          <td>{format(addMilliseconds(new Date(0), total), 'mm:ss:S')}</td>
          <td>{format(addMilliseconds(new Date(0), lapResult), 'mm:ss:S')}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
