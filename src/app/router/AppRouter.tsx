import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { HomePage } from '../../pages/public/HomePage';
import { CreateGigPage } from '../../pages/dashboard/CreateGigPage';

import { LoginPage } from '../../pages/public/LoginPage';
import { SignUpPage } from '../../pages/public/SignUpPage';

const DashboardPage = () => <div className="text-center py-20">Dashboard Page</div>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-gig" element={<CreateGigPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
