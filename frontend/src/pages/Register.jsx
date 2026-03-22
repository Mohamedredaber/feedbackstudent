import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../store/thunks/authThunks';
import { selectAuthLoading, selectAuthError } from '../store/slices/authSlice';

export default function Register() {
    const [formData, setFormData] = useState({
        nom: '', prenom: '', email: '', password: '', role: 'student'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Nom</label>
                        <input type="text" name="nom" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Prenom</label>
                        <input type="text" name="prenom" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input type="password" name="password" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={handleChange} required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Role</label>
                    <select name="role" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none" onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition disabled:opacity-50">
                    {loading ? 'Processing...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link>
            </p>
        </div>
    );
}
