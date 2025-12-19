import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Snowfall from 'react-snowfall';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const url = isLogin
            ? 'http://localhost:4800/api/auth/login'
            : 'http://localhost:4800/api/auth/register';

        try {
            console.log(`Attempting to reach: ${url}`);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            if (data.token) {
                login(data.token, data.user);
                if (data.user?.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setMessage('Registration successful. Please log in.');
                setIsLogin(true);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setMessage(err.message === 'Failed to fetch'
                ? 'Network Error: Backend server might be offline at http://localhost:4800'
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
       
        // <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md bg-white text-black">
            <div className='flex flex-col items-center justify-center h-screen  bg-transparent '>
                 <Snowfall></Snowfall>
            <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Signup'}</h2>

            {message && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{message}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLogin && (
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full bg-transparent"
                    />
                )}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full "
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                />
                <button type="submit" disabled={loading} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 font-medium">
                    {loading ? 'Processing...' : (isLogin ? 'Login' : 'Signup')}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-500 hover:underline font-medium"
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
