import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:4800/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Erase this data point from the matrix?')) return;
        try {
            const res = await fetch(`http://localhost:4800/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            } else {
                const errorData = await res.json();
                alert(`System Error: ${errorData.message || 'Access Denied'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Connection Terminal Error. Check backend status.');
        }
    };

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans selection:bg-violet-500/30">
            <Navbar />

            <main className="relative z-10 mx-auto max-w-[1600px] px-8 py-32">
                {/* Header Strip */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Control Center</h1>
                        <nav className="flex gap-6 mt-4">
                            <Link to="/admin" className="text-xs font-black uppercase tracking-widest text-violet-400 border-b-2 border-violet-400 pb-1">Inventory</Link>
                            <Link to="/admin/shops" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors pb-1 border-b-2 border-transparent">Infrastructure</Link>
                        </nav>
                    </div>
                    <Link to="/admin/add-product" className="group flex items-center gap-3 bg-blue-800 text-blue-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95">
                        Initialize New Entry
                        <span className="text-xl group-hover:rotate-90 transition-transform">+</span>
                    </Link>
                </div>

                {/* Main View Container */}
                <div className="bg-[#0f111a]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Subject</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Source Node</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Valuation</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Scanning Registry...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-gray-500 font-bold">Registry empty. No data points detected.</td>
                                    </tr>
                                ) : (
                                    products.map((p) => (
                                        <tr key={p._id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-gray-500">
                                                        {p.image ? <img src={p.image} className="w-full h-full object-cover rounded-xl" /> : p.name?.[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-lg tracking-tight">{p.name}</div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-violet-400">{p.brand || 'No Spec'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                                    {p.shop?.name || 'Local Host'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-black text-xl tracking-tight">${p.price.toLocaleString()}</td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                                    <Link
                                                        to={`/admin/edit-product/${p._id}`}
                                                        className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 hover:bg-violet-500 hover:text-white transition-all border border-violet-500/20 shadow-lg shadow-violet-500/5"
                                                        title="Edit Product"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(p._id)}
                                                        className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/5"
                                                        title="Delete Product"
                                                    >
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
            </main>
        </div>
    );
};

export default AdminDashboard;
