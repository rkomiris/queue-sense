import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { AdminDashboard } from './screens/AdminDashboard';
import { ClinicScreen } from './screens/Clinic';
import { CampusScreen } from './screens/Campus';
import { DmvScreen } from './screens/DMV';
import { HomeDashboard } from './screens/Home';
import { LoginScreen } from './screens/Login';
import { NotificationsScreen } from './screens/Notifications';
import { SettingsScreen } from './screens/Settings';
import { SystemDiagramScreen } from './screens/SystemDiagram';
import './styles/global.css';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route element={<ProtectedRoute allowed={['consumer']} />}>
              <Route path="/home" element={<HomeDashboard />} />
              <Route path="/clinic" element={<ClinicScreen />} />
              <Route path="/dmv" element={<DmvScreen />} />
              <Route path="/campus" element={<CampusScreen />} />
            </Route>
            <Route element={<ProtectedRoute allowed={['org-admin']} />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/system" element={<SystemDiagramScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
