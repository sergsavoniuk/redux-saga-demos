import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  border-collapse: collapse;

  tbody {
    display: block;
    height: 250px;
    overflow: auto;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead {
    background-color: #7997a1;
  }

  th {
    padding: 15px;

    text-align: left;

    :nth-child(2) {
      text-align: center;
    }

    :nth-child(3) {
      text-align: right;
    }
  }

  tr {
    td:nth-child(1) {
      padding-left: 15px;
      text-align: left;
    }

    td:nth-child(2) {
      text-align: center;
    }

    td:nth-child(3) {
      text-align: right;
      padding-right: 15px;
    }

    :hover {
      cursor: pointer;
    }
  }

  td {
    height: 55px;
    padding: 10px;
  }
`;
