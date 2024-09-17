import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/forgotPassword";
import ResetPasswordPage from "./pages/resetPassword";
import DashboardPage from "./pages/Dashboardpage";
import LoadingSpinner from "./components/spiner";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (user?.isVerified === false) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
  
	if (isAuthenticated) {
	  return <Navigate to='/' replace />;
	}
  
	return children;
  };
function App() {

	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black-900 to-white-900 flex flex-col items-center justify-center relative overflow-hidden'
		>
      <Routes>
		<Route
			path='/signup'
			element={
			<RedirectAuthenticatedUser>
				<SignupPage />
			</RedirectAuthenticatedUser>
			}
		/>
        <Route
			path='/login'
			element={
				<RedirectAuthenticatedUser>
					<LoginPage />
				</RedirectAuthenticatedUser>
			}
		/>
		<Route
			path='/'
			element={
			<ProtectedRoute>
				<DashboardPage />
			</ProtectedRoute>
			}
		/>
		<Route path='/verify-email' element={<EmailVerificationPage />} />
		<Route
			path='/forgot-password'
			element={
			
				<ForgotPasswordPage />
			
			}
		/>
		<Route
			path='/reset_password/:token'
			element={
				<RedirectAuthenticatedUser>
					<ResetPasswordPage />
				</RedirectAuthenticatedUser>
			}
		/>
		<Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
	  <Toaster />
    </div>
  )
}

export default App
