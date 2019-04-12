import React from 'react';
import { format, addSeconds } from 'date-fns';

// const data = [
//   {
//     lap: 1,
//     total: '00:02.3',
//     lapResult: '00:02.3',
//   },
//   {
//     lap: 2,
//     total: '00:05.5',
//     lapResult: '00:03.2',
//   },
//   {
//     lap: 3,
//     total: '00:07.5',
//     lapResult: '00:02.0',
//   },
//   {
//     lap: 4,
//     total: '00:09.4',
//     lapResult: '00:00.7',
//   },
//   {
//     lap: 5,
//     total: '00:12.4',
//     lapResult: '00:03.0',
//   },
// ];

function TableBody({ lapsHistory }) {
  return (
    <tbody>
      {lapsHistory.map(({ lap, total, lapResult }) => (
        <tr key={lap}>
          <td>Lap {lap}</td>
          <td>{format(addSeconds(new Date(0), total), 'mm:ss')}</td>
          <td>{format(addSeconds(new Date(0), lapResult), 'mm:ss')}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;