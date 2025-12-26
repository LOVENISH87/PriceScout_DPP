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
        <div className="min-h-screen bg-[#05060a] flex items-center justify-center relative overflow-hidden">
            <Snowfall color="light-blue" snowflakeCount={550} />
            
            {/* The "Rectangle" box covering the content */}
            <div className="relative z-10 w-full max-w-md mx-4 p-10 bg-[#0f111a] border border-white/10 rounded-[2rem] shadow-2xl shadow-black/50">
                <h2 className="text-3xl font-black text-white mb-8 text-center uppercase tracking-tighter">
                    {isLogin ? 'Login' : 'Signup'}
                </h2>

                {message && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 text-xs font-bold uppercase tracking-widest text-center">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {!isLogin && (
                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 transition-all"
                        />
                    )}
                    <input
                        name="email"
                        type={isLogin ? "text" : "email"}
                        placeholder={isLogin ? "Email or Username" : "Email Address"}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 transition-all font-medium"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blue-500/50 transition-all"
                    />
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-blue-600 hover:bg-blue-400 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 mt-2"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Authenticate' : 'Register')}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span className="text-blue-400">
                            {isLogin ? 'Create Account' : 'Sign In'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
