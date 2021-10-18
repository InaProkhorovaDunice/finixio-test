import React from "react";
import { useTable } from "react-table";
import { changeSortOrder, getCurrencySymbol } from "../utils";

const Table = ({ columns, data, sortInfo, makeSort, currency }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
    )

    const getSortOrder = (column) => {
        return column === sortInfo.column ? sortInfo.order : 'asc';
    };

    const sortCoins = (column) => {
        makeSort(column, changeSortOrder(getSortOrder(column)));
    };

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup, index) => index !== 0 && (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                <span onClick={() => sortCoins(column.id)} style={{cursor: 'pointer'}}>
                                    {column.isSorted
                                        ? getSortOrder(column.id) === 'desc'
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {['price', 'openPrice'].includes(cell.column.id) && getCurrencySymbol(currency)}{cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )}
                )}
                </tbody>
            </table>
        </>
    )
}

export default Table;
