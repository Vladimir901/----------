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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
              <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/auth" element={<AuthorizationPage/>} />
                <Route path="/register" element={<RegistrationPage/>} />
                <Route path="/user/:id" element={<h1>Личный кабинет</h1>} />
                <Route path="/user/:id/events" element={<EventsPage/>} />
                <Route path="/protocol" element={<MeetingProtocolConstructorPage/>} />
                <Route path="/meetingresult" element={<MeetingResultPage/>} />
                <Route path="/meetingdocs" element={<MeetingDocumentsPage/>} />
                <Route path="/votingresults" element={<VotingResultsPage/>} />
                <Route path="/faq" element={<FAQPage/>} />
                <Route path="/calc" element={<h1>Калькуляторы</h1>} />
                <Route path="*" element={<NotFound/>} />               
              </Routes>
              <NotificationContainer />
    </BrowserRouter>
  </React.StrictMode>
);

