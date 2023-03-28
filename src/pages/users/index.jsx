import {apiGet, endpoints} from '@/api';
import {Stack, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tile} from '@carbon/react';
import {useRequest} from 'ahooks';

const headers = ['Name', 'Email', 'Device ID', 'Actions'];
export default () =>
{
    const {data, loading} = useRequest(() => apiGet(endpoints.users));

    return <Stack gap={4}>
        <h1>Users</h1>

        <Tile>
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
        </Tile>
    </Stack>;
};