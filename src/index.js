import React from 'react';
import ReactDOM from 'react-dom/client';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './index.css';
import App from './App';
import NotFound from './components/NotFound/NotFound';
import EventsPage from './components/EventsPage/EventsPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import AuthorizationPage from './components/AuthorizationPage/AuthorizationPage';
import VotingResultsPage from './components/VotingResultsPage/VotingResultsPage';
import MeetingResultPage from './components/MeetingResultPage/MeetingResultPage';
import { MeetingDocumentsPage } from './components/MeetingDocumentsPage/MeetingDocumentsPage';
import MeetingProtocolConstructorPage from './components/MeetingProtocolConstructorPage/MeetingProtocolConstructorPage';
import FAQPage from './components/FAQPage/FAQPage';
import CabinetPage from './components/CabinetPage/CabinetPage';
import VotingUserPage from './components/VotingUserPage/VotingUserPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
              <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/auth" element={<AuthorizationPage/>} />
                <Route path="/register" element={<RegistrationPage/>} />
                <Route path="/user/:id/cabinet" element={<CabinetPage/>} />
                <Route path="/user/:id/events" element={<EventsPage/>} />
                <Route path="/user/:id/bulletdoc" element={<h1>Бюллетень</h1>} />
                <Route path="/protocol" element={<MeetingProtocolConstructorPage/>} />
                {/* <Route path="/meetingresult" element={<MeetingResultPage/>} /> */}
                <Route path="/meetingdocs/:id" element={<MeetingDocumentsPage/>} />
                <Route path="/votingadmin/:id" element={<VotingResultsPage/>} />
                <Route path="/votinguser/:id" element={<VotingUserPage/>} />
                <Route path="/faq" element={<FAQPage/>} />
                <Route path="/calc" element={<h1>Калькуляторы</h1>} />
                <Route path="*" element={<NotFound/>} />               
              </Routes>
              <NotificationContainer />
    </BrowserRouter>
  // </React.StrictMode>
);

