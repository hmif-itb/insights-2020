import React from 'react';
import WelcomePage from './pages/@Welcome/WelcomePage';

export const routes: {[path: string]: React.ReactElement} = {
    '/': <WelcomePage />,
}