import {ClickableTile, Stack} from '@carbon/react';
import {Text} from '@carbon/react/lib/components/Text/Text';

const Stats = ({value, label, children}) =>
{

    return <ClickableTile className={'h100'}>
        <Stack gap={4}>
            <div>{label}</div>
            <Text as={'h3'}>{value}</Text>
            {children && <div>{children}</div>}
        </Stack>
    </ClickableTile>;
};

export default Stats;