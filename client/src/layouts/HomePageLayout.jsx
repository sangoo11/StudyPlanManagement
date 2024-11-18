import React from 'react';
import { Outlet } from 'react-router';

function HomePageLayout() {
    return (
        <div>
            <h1>HomePage Layout</h1>
            <Outlet />
        </div>
    );
}

export default HomePageLayout;