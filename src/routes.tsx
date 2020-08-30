import React from 'react';
import WelcomePage from './pages/@Welcome/WelcomePage';
import InsightsPage from './pages/@Insights/InsightsPage';
import LoginPage from './pages/@Login/LoginPage';

export const routes: {[path: string]: React.ReactElement} = {
    '/': <WelcomePage />,
    '/login': <LoginPage />,
    '/insights/:uid': <InsightsPage />
}