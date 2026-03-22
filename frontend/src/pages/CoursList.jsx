import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCours, deleteCours } from '../store/thunks/coursThunks';
import { selectAllCours, selectCoursLoading, selectCoursError } from '../store/slices/coursSlice';
import { selectRole } from '../store/slices/authSlice';

export default function CoursList() {
    const dispatch = useDispatch();
    const cours = useSelector(selectAllCours);
    const loading = useSelector(selectCoursLoading);
    const error = useSelector(selectCoursError);
    const role = useSelector(selectRole);

    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        dispatch(fetchAllCours());
    }, [dispatch]);

    const handleDelete = (title) => {
        if (window.confirm(`Delete course ${title}?`)) {
            dispatch(deleteCours(title));
        }
    };

    const filteredCours = filterCategory
        ? cours.filter(c => c.category.toLowerCase().includes(filterCategory.toLowerCase()))
        : cours;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Filter by category..."
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    />
                    {role === 'admin' && (
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => alert('Create course modal can be implemented here')}>
                            Add Course
                        </button>
                    )}
                </div>
            </div>

            {loading && <div className="text-center py-10 text-gray-600">Loading courses...</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCours?.map((course) => (
                    <div key={course._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{course.description}</p>
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-4">
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{course.category}</span>
                            <span className="text-gray-400">By {course.instructor}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <Link to={`/cours/${encodeURIComponent(course.title)}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                                View Details →
                            </Link>
                            {role === 'admin' && (
                                <button onClick={() => handleDelete(course.title)} className="text-red-500 hover:text-red-700 text-sm">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {!loading && filteredCours?.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        No courses found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
