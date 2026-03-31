import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from '../../pages/public/HomePage';
import { ExplorePage } from '../../pages/public/ExplorePage';
import { LoginPage } from '../../pages/public/LoginPage';
import { RegisterPage } from '../../pages/public/RegisterPage';
import { GigDetailPage } from '../../pages/public/GigDetailPage';

import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { MyGigsPage } from '../../pages/dashboard/MyGigsPage';
import { MyApplicationsPage } from '../../pages/dashboard/MyApplicationsPage';
import { CreateGigPage } from '../../pages/dashboard/CreateGigPage';
import { GigApplicantsPage } from '../../pages/dashboard/GigApplicantsPage';
import { ProfilePage } from '../../pages/dashboard/ProfilePage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/gigs/:gigId" element={<GigDetailPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/create-gig" element={<CreateGigPage />} />
            <Route path="/dashboard/my-gigs" element={<MyGigsPage />} />
            <Route path="/dashboard/my-applications" element={<MyApplicationsPage />} />
            <Route path="/gigs/:gigId/applicants" element={<GigApplicantsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
