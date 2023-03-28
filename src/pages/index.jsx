import {Column, Row, Stack, Tile} from '@carbon/react';

export default () =>
{

    return <>
        <Stack gap={4}>
            <Tile>
                <h1>Welcome</h1>

                <Row>
                    <Column lg={4}>#1</Column>
                    <Column lg={4}>#2</Column>
                    <Column lg={4}>#3</Column>
                </Row>
            </Tile>

        </Stack>
    </>;
}