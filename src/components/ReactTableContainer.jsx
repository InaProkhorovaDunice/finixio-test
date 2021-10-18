import React from 'react';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
const ReactTableContainer = ({ data, sortInfo, makeSort, currency }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'Coin Name',
                        accessor: 'coin',
                    },
                    {
                        Header: `Current Price (${currency})`,
                        accessor: 'price',
                        isSorted: true,
                    },
                    {
                        Header: `Opening price (${currency})`,
                        accessor: 'openPrice',
                        isSorted: true,
                    },
                    {
                        Header: 'Price Increase',
                        accessor: 'priceIncrease',
                        isSorted: true,
                    },
                ],
            },
        ],
        [currency]
    );

    return (
        <Styles>
            <Table
                columns={columns}
                data={data}
                sortInfo={sortInfo}
                makeSort={makeSort}
                currency={currency} />
        </Styles>
    )
}

export default ReactTableContainer;
