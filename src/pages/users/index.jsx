import {apiGet, endpoints} from '@/api';
import {Renew} from '@carbon/icons-react';
import {
    Button,
    DataTableSkeleton,
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
import {useRequest} from 'ahooks';

const headers = ['Name', 'Email', 'Device ID', 'Actions'];

//icons https://carbondesignsystem.com/guidelines/icons/library

export default () =>
{
    const {data, loading, run} = useRequest(q => apiGet(q ? `${endpoints.users}?q=${q}` : `${endpoints.users}`));

    return <Stack gap={4}>
        <h1>Users</h1>

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
                                                        run(value);
                                                    }
                                                }
                                            }}/>
                        <Button renderIcon={Renew}
                                hasIconOnly={true}
                                kind={'ghost'}
                                iconDescription={'Reload'}
                                onClick={() => run()}/>
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
                        {data && data.result.map((row) => (
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

        </Tile>
    </Stack>;
};