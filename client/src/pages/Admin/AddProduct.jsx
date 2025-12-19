import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const AddProduct = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', shop: '', brand: '', category: '', image: '', description: '' });

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const res = await fetch('http://localhost:4800/api/shops');
            const data = await res.json();
            setShops(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4800/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                navigate('/admin');
            } else {
                const data = await res.json();
                alert(`Sync failed: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans py-32 px-6">
            <Navbar />
            <div className="max-w-2xl mx-auto">
                <div className="mb-10">
                    <Link to="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-violet-400 transition-colors flex items-center gap-2 mb-4 group">
                        <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        Terminal Back
                    </Link>
                    <h1 className="text-5xl font-black uppercase tracking-tighter">New Entry</h1>
                </div>

                <div className="bg-[#0f111a]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-violet-600 to-cyan-500 p-10 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">Upload Protocol</p>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Deployment Spec</h2>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Universal Designation</label>
                            <input name="name" type="text" onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-medium" placeholder="PRODUCT NAME" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Market Value (₹)</label>
                                <input name="price" type="number" onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-black text-xl" placeholder="0.00" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Target Host</label>
                                <select name="shop" onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-bold appearance-none">
                                    <option value="" className="bg-[#0f111a]">SELECT NODE</option>
                                    {shops.map(s => <option key={s._id} value={s._id} className="bg-[#0f111a]">{s.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Brand Identifier</label>
                                <input name="brand" type="text" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-medium" placeholder="..." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Category Vector</label>
                                <input name="category" type="text" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-medium" placeholder="..." />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Visual Reference URL</label>
                            <input name="image" type="text" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-medium" placeholder="HTTPS://..." />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Description Buffer</label>
                            <textarea name="description" onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-all font-medium"></textarea>
                        </div>

                        <div className="flex items-center justify-between pt-6">
                            <button type="button" onClick={() => navigate('/admin')} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors">Discard Sync</button>
                            <button type="submit" disabled={loading} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:opacity-50">
                                {loading ? 'INITIATING...' : 'PUBLISH ENTRY'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
