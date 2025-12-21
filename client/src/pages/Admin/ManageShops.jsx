import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const ManageShops = () => {
    const { token } = useContext(AuthContext);
    const [shops, setShops] = useState([]);
    const [formData, setFormData] = useState({ name: '', location: '', website: '' });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchShops(); }, []);

    const fetchShops = async () => {
        try {
            const res = await fetch('http://localhost:4800/api/shops');
            const data = await res.json();
            setShops(data);
        } catch (err) { console.error(err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editingId
                ? `http://localhost:4800/api/shops/${editingId}`
                : 'http://localhost:4800/api/shops';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setFormData({ name: '', location: '', website: '' });
                setEditingId(null);
                fetchShops();
            } else {
                const data = await res.json();
                alert(`Error: ${data.message || 'Operation Failed'}`);
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleEdit = (shop) => {
        setEditingId(shop._id);
        setFormData({ name: shop.name, location: shop.location || '', website: shop.website || '' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate this infrastructure node?')) return;
        try {
            const res = await fetch(`http://localhost:4800/api/shops/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchShops();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans selection:bg-cyan-500/30">
            <Navbar />

            <main className="relative z-10 mx-auto max-w-[1400px] px-8 py-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-white via-white to-gray-600 bg-clip-text text-transparent">Infrastructure Matrix</h1>
                        <nav className="flex gap-8 mt-6">
                            <Link to="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-all pb-2 border-b-2 border-transparent">Inventory</Link>
                            <Link to="/admin/shops" className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 border-b-2 border-cyan-400 pb-2">Infrastructure</Link>
                        </nav>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#0f111a]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-10 sticky top-32 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-8 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
                                <h2 className="text-xl font-black uppercase tracking-tight">{editingId ? 'Modify Node' : 'Provision Node'}</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Identity</label>
                                    <input type="text" placeholder="e.g. CYBERPLEX" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-gray-800" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Physical Location</label>
                                    <input type="text" placeholder="e.g. SEATTLE, WA" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-gray-800" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Digital Interface (URL)</label>
                                    <input type="url" placeholder="https://..." value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all font-bold placeholder:text-gray-800" />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    {editingId && (
                                        <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', location: '', website: '' }) }} className="flex-1 bg-white/5 text-white font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white/10 transition-all border border-white/10 active:scale-95">
                                            Cancel
                                        </button>
                                    )}
                                    <button type="submit" disabled={loading} className="flex-[2] bg-white text-black font-black uppercase tracking-widest py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-2xl shadow-white/5 active:scale-95 disabled:opacity-50">
                                        {loading ? 'PROCESSING...' : editingId ? 'UPDATE NODE' : 'INITIALIZE NODE'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-[#0f111a]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/5">
                                        <tr>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Infrastructure Node</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Location</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {shops.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-10 py-20 text-center text-gray-600 font-bold italic">No active nodes detected in the matrix.</td>
                                            </tr>
                                        ) : (
                                            shops.map(s => (
                                                <tr key={s._id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-5">
                                                            <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-black text-xl text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                                                                {s.name?.[0]}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-xl tracking-tight text-white mb-1">{s.name}</div>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 font-mono">NODE_ID::{s._id.slice(-8)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <span className="text-sm font-bold text-gray-400 capitalize">{s.location || 'Global/Remote'}</span>
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                            <button onClick={() => handleEdit(s)} className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                            </button>
                                                            <button onClick={() => handleDelete(s._id)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/5">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageShops;
