import React from 'react';
import WelcomePage from './pages/@Welcome/WelcomePage';
import InsightsPage from './pages/@Insights/InsightsPage';

export const routes: {[path: string]: React.ReactElement} = {
    '/': <WelcomePage />,
    '/insights/:uid': <InsightsPage />
}