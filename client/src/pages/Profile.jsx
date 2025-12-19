import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Snowfall from 'react-snowfall';

const Profile = () => {
    const { user, token, login } = useContext(AuthContext); // login is used to update the user in context/localstorage
    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('http://localhost:4800/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, password: password || undefined })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Profile updated successfully!');
                // Update local context/storage with new user data
                // We reuse 'login' but keep the same token
                login(token, data.user);
                setPassword(''); // clear password field
            } else {
                setMessage(data.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            setMessage('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans">
            <Navbar />
            <Snowfall />
            <div className="h-screen flex items-center justify-center px-4 pt-20">
                <div className="w-[550px] bg-transparent">
                    {/* bg-[#0f111a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group */}
                    {/* <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-1000"></div> */}

                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 relative z-10">change your name and password!</h2>

                    {message && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.includes('success') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Display Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border hover:border-white border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-bold placeholder-gray-700"
                                placeholder="Update your name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 hover:border-pink-50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-bold placeholder-gray-700"
                                placeholder="Leave empty to keep current"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:scale-105 transition-all shadow-lg shadow-white/5 active:scale-95 disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Saving Changes...' : 'Save Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
