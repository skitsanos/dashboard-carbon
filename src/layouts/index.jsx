import useSession from '@/hooks/useSession';
import {Notification, Search, Switcher} from '@carbon/icons-react';

import {
    Content,
    Header,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderMenu,
    HeaderMenuItem,
    HeaderName,
    HeaderNavigation
} from '@carbon/react';
import {useEffect} from 'react';

import {history, Outlet} from 'umi';

const publicRoutes = ['/login', '/register'];

export default () =>
{
    const {session, login, logout} = useSession();

    console.log(session);

    const allowed = publicRoutes.includes(location.pathname);

    useEffect(() =>
    {
        if (!session && !allowed)
        {
            history.push('/login');
        }
    }, [allowed, session]);

    return <>
        <Header aria-label={'Demo App Dashboard'}>
            <HeaderName href={'/'}
                        prefix={'DEMO'}>
                [App]
            </HeaderName>

            {session && <HeaderNavigation aria-label="Demo [App]">
                <HeaderMenuItem href="/users">Users</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4"
                            menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
            </HeaderNavigation>}

            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search"
                                    onClick={() =>
                                    {
                                    }}>
                    <Search/>
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications"
                                    onClick={() =>
                                    {
                                    }}>
                    <Notification/>
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="App Switcher"
                                    onClick={() =>
                                    {
                                        if (session)
                                        {
                                            logout();

                                            history.push('/login');
                                        }
                                        else
                                        {
                                            login({
                                                user: {
                                                    name: 'Demo User'
                                                }
                                            });

                                            history.push('/');
                                        }
                                    }}>
                    <Switcher/>
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>

        <Content>
            <Outlet/>
        </Content>
    </>;
};