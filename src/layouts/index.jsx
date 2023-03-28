import {useSession} from '@/entities';
import {Notification, Search, Switcher} from '@carbon/icons-react';

import {
    Content,
    Header,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderMenu,
    HeaderMenuItem,
    HeaderName,
    HeaderNavigation,
    Theme
} from '@carbon/react';
import {useEffect, useState} from 'react';

import {history, Outlet} from 'umi';

const publicRoutes = ['/login', '/register'];

export default () =>
{
    const [isLoggedIn] = useState(false);
    const [, {login, logout}] = useSession('session');

    const allowed = publicRoutes.includes(location.pathname);

    useEffect(() =>
    {
        if (!isLoggedIn && !allowed)
        {
            history.push('/login');
        }
    }, [allowed, isLoggedIn]);

    return <Theme theme={'white'}>
        <Header aria-label={'Demo App Dashboard'}>
            <HeaderName href={'/'}
                        prefix={'DEMO'}>
                [App]
            </HeaderName>

            {isLoggedIn && <HeaderNavigation aria-label="Demo [App]">
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
                                        if (isLoggedIn)
                                        {
                                            history.push('/');
                                        }
                                        else
                                        {
                                            history.push('/login');
                                        }

                                    }}>
                    <Switcher/>
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>

        <Content>
            <Outlet/>

            <div>
                isLoggedIn: {isLoggedIn}
            </div>
        </Content>
    </Theme>;
}