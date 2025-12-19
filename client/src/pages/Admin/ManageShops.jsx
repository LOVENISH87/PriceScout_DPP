import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const ManageShops = () => {
    const { token } = useContext(AuthContext);
    const [shops, setShops] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchShops(); }, []);

    const fetchShops = async () => {
        try {
            const res = await fetch('http://localhost:4800/api/shops');
            const data = await res.json();
            setShops(data);
        } catch (err) { console.error(err); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4800/api/shops', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ name })
            });
            if (res.ok) {
                setName('');
                fetchShops();
            } else {
                const data = await res.json();
                alert(`Error: ${data.message || 'Redundant Node Detected'}`);
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans py-32 px-8">
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">Infrastructure Matrix</h1>
                    <nav className="flex gap-8 mt-4">
                        <Link to="/admin" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors pb-1 border-b-2 border-transparent">Inventory</Link>
                        <Link to="/admin/shops" className="text-xs font-black uppercase tracking-widest text-cyan-400 border-b-2 border-cyan-400 pb-1">Infrastructure</Link>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <div className="bg-[#0f111a]/80 backdrop-blur-2xl rounded-[2rem] border border-white/5 p-8 sticky top-32">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-6">Provision New Node</h2>
                            <form onSubmit={handleAdd} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Node Identity</label>
                                    <input type="text" placeholder="STRIPE, AMAZON, ETC." value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all font-bold" />
                                </div>
                                <button type="submit" disabled={loading} className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:opacity-50">
                                    {loading ? 'PROVISIONING...' : 'REGISTER NODE'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-[#0f111a]/80 backdrop-blur-2xl rounded-[2rem] border border-white/5 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/5">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Active Node</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">System ID</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {shops.map(s => (
                                        <tr key={s._id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6 flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-black text-cyan-400">
                                                    {s.name?.[0]}
                                                </div>
                                                <span className="font-bold text-lg tracking-tight">{s.name}</span>
                                            </td>
                                            <td className="px-8 py-6 font-mono text-[10px] text-gray-600 uppercase">
                                                NODE_XSR_{s._id.slice(-6)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageShops;
