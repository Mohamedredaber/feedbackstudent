// import { Routes, Route, Navigate } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import MainLayout from '../layouts/MainLayout';
// import AuthLayout from '../layouts/AuthLayout';

// // Auth
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
// import HomePage from '../pages/HomePage';

// // Cours
// import CoursListPage from '../pages/cours/CoursListPage';
// import CoursDetailPage from '../pages/cours/CoursDetailPage';

// // Feedback
// import FeedbackListPage from '../pages/feedback/FeedbackListPage';
// import AddFeedbackPage from '../pages/feedback/AddFeedbackPage';
// import StudentFeedbackPage from '../pages/feedback/StudentFeedbackPage';
// import TopCoursesPage from '../pages/feedback/TopCoursesPage';

// const AppRoutes = () => (
//   <Routes>

//     {/* ── Public ── */}
//     <Route path="/" element={<HomePage />} />

//     {/* ── Auth Layout ── */}
//     <Route element={<AuthLayout />}>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//     </Route>

//     {/* ── Main Layout — student + admin ── */}
//     <Route element={
//       <ProtectedRoute roles={['student', 'admin']}>
//         <MainLayout />
//       </ProtectedRoute>
//     }>
//       <Route path="/cours" element={<CoursListPage />} />
//       <Route path="/cours/:id" element={<CoursDetailPage />} />
//       <Route path="/feedback" element={<FeedbackListPage />} />
//       <Route path="/feedback/top" element={<TopCoursesPage />} />
//     </Route>

//     {/* ── Main Layout — student seulement ── */}
//     <Route element={
//       <ProtectedRoute roles={['student']}>
//         <MainLayout />
//       </ProtectedRoute>
//     }>
//       <Route path="/feedback/add/:id" element={<AddFeedbackPage />} />
//       <Route path="/feedback/student" element={<StudentFeedbackPage />} />
//     </Route>

//     {/* ── Unauthorized ── */}
//     <Route path="/unauthorized" element={
//       <div className="text-center mt-20 text-red-500 text-2xl">
//         403 - Non autorisé
//       </div>
//     } />

//     {/* ── 404 ── */}
//     <Route path="*" element={<Navigate to="/login" />} />

//   </Routes>
// );

// export default AppRoutes;
