import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';

const EditProduct = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', shop: '', brand: '', category: '', image: '', description: '' });

    useEffect(() => {
        const load = async () => {
            await Promise.all([fetchShops(), fetchProduct()]);
            setLoading(false);
        };
        load();
    }, [id]);

    const fetchShops = async () => {
        try {
            const res = await fetch('http://localhost:4800/api/shops');
            const data = await res.json();
            setShops(data);
        } catch (err) { console.error(err); }
    };

    const fetchProduct = async () => {
        try {
            const res = await fetch(`http://localhost:4800/api/products/${id}`);
            const p = await res.json();
            if (p) setFormData({
                name: p.name || '',
                price: p.price || '',
                shop: p.shop?._id || '',
                brand: p.brand || '',
                category: p.category || '',
                image: p.image || '',
                description: p.description || ''
            });
        } catch (err) { console.error(err); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`http://localhost:4800/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            if (res.ok) navigate('/admin');
            else alert('Update failed.');
        } catch (err) { console.error(err); }
        finally { setSubmitting(false); }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#05060a] flex items-center justify-center">
            <div className="h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans py-32 px-6">
            <Navbar />
            <div className="max-w-2xl mx-auto">
                <div className="mb-10">
                    <Link to="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-violet-400 transition-colors flex items-center gap-2 mb-4 group">
                        <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        Terminal Back
                    </Link>
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Edit Entry</h1>
                </div>

                <div className="bg-[#0f111a]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-10 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-1">Update Protocol</p>
                            <h2 className="text-3xl font-black uppercase tracking-tight">{formData.name}</h2>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Designation</label>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all font-medium" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Valuation ($)</label>
                                <input name="price" type="number" value={formData.price} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all font-black text-xl" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Source Node</label>
                                <select name="shop" value={formData.shop} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all font-bold appearance-none">
                                    {shops.map(s => <option key={s._id} value={s._id} className="bg-[#0f111a]">{s.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Visual Vector</label>
                            <input name="image" type="text" value={formData.image} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all font-medium" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Registry Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all font-medium"></textarea>
                        </div>

                        <div className="flex items-center justify-between pt-6">
                            <button type="button" onClick={() => navigate('/admin')} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors">Cancel Delta</button>
                            <button type="submit" disabled={submitting} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95 disabled:opacity-50">
                                {submitting ? 'RECONFIGURING...' : 'APPLY DELTAS'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
