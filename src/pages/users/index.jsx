import {endpoints} from '@/api';
import {columnProps, paginationProps} from '@/defaults';
import getTableData from '@/utils/getTableData';
import {Renew} from '@carbon/icons-react';
import {
    Button,
    Column,
    DataTableSkeleton,
    Grid,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    Tile
} from '@carbon/react';
import {usePagination} from 'ahooks';

const headers = ['Name', 'Email', 'Device ID', 'Actions'];

//icons https://carbondesignsystem.com/guidelines/icons/library

export default () =>
{
    //const {data, loading, run} = useRequest(q => apiGet(q ? `${endpoints.users}?q=${q}` : `${endpoints.users}`));

    const {data, run, loading, pagination, refresh} = usePagination(({
                                                                         current,
                                                                         pageSize,
                                                                         sorter,
                                                                         query
                                                                     }) => getTableData(endpoints.users, {
        current,
        pageSize,
        sorter,
        query,
        filter: ''
    }), {
        defaultPageSize: 10
    });

    return <Stack gap={4}>
        <h1>Users</h1>

        <Grid className={'debug'}
              fullWidth={true}
              columns={3}>
            <Column {...columnProps} className={'debug'}>
                <Stack>
                    <div>
                        Users
                    </div>

                    <h3>
                        {data && data.total}
                    </h3>
                </Stack>
            </Column>

            <Column {...columnProps} className={'debug'}>
                <Stack>
                    <div>
                        Active
                    </div>

                    <h3>
                        {data && data.total}
                    </h3>
                </Stack>
            </Column>

            <Column {...columnProps} className={'debug'}>
                <Stack>
                    <div>
                        Disabled
                    </div>

                    <h3>
                        0
                    </h3>
                </Stack>
            </Column>
        </Grid>

        <Tile>
            {loading && <DataTableSkeleton headers={headers}/>}

            {!loading && <TableContainer>
                <TableToolbar>
                    <TableToolbarContent>
                        <TableToolbarSearch placeholder={'Type to search'}
                                            persistent={true}
                                            onKeyUp={e =>
                                            {
                                                //check if enter key
                                                if (e.keyCode === 13)
                                                {
                                                    const {value} = e.target;
                                                    if (value && value.length >= 3)
                                                    {
                                                        run({
                                                            ...pagination,
                                                            query: value
                                                        });
                                                    }
                                                }
                                            }}/>
                        <Button renderIcon={Renew}
                                hasIconOnly={true}
                                kind={'ghost'}
                                iconDescription={'Reload'}
                                onClick={() => run(pagination)}/>
                        <Button kind={'primary'}
                                size={'sm'}>Add new</Button>
                    </TableToolbarContent>
                </TableToolbar>

                <Table size={'lg'}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableHeader id={header.key}
                                             scope={'col'}
                                             key={header}>
                                    {header}
                                </TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data && data.data.map((row) => (
                            <TableRow key={row.key}>
                                {Object.keys(row)
                                       .filter((key) => key !== 'key')
                                       .map((key) =>
                                       {
                                           return <TableCell key={key}>{row[key]}</TableCell>;
                                       })}
                                <TableCell key={'actions'}>[none]</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            <Pagination {...paginationProps}
                        totalItems={pagination.total}
                        page={pagination.current}
                        onChange={({page, pageSize}) =>
                        {
                            pagination.onChange(page, pageSize);
                        }}/>

        </Tile>
    </Stack>;
};