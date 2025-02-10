import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import Dashboard from './common-components/Dashboard/Dashboard';
import Layout from './common-components/Layout/Layout';
import { routerData } from './routes';
import { useEffect } from 'react';

function App() {

    return (
        <Router>
            <Routes>
                {
                    routerData.map((routeData, index) => (
                        <Route
                            key={index}
                            path={routeData.path}
                            element={
                                <Layout routerJson={routeData}>
                                    {routeData.component}
                                </Layout>
                            }
                        />
                    ))
                }

            </Routes>
        </Router>
    );
}

export default App;
