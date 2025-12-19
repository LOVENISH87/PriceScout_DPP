import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import request from "../api/axiosInstance.js";
import Navbar from "../components/Navbar.jsx";

const ProductDetails = () => {
    const { name } = useParams();
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await request(`/products/prices/${encodeURIComponent(name)}`);
                setPrices(data);
            } catch (err) { setError(err.message); }
            finally { setLoading(false); }
        };
        if (name) fetch();
    }, [name]);

    if (loading) return (
        <div className="min-h-screen bg-[#05060a] text-white">
            <Navbar />
            <div className="flex h-[80vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            </div>
        </div>
    );

    const bestDeal = prices.length > 0 ? prices[0] : null;

    return (
        <div className="min-h-screen bg-[#05060a] text-white font-sans">
            <Navbar />

            <main className="mx-auto max-w-[1200px] px-6 py-24">
                <div className="mb-12">
                    <Link to="/" className="text-sm font-medium text-gray-500 hover:text-white transition-colors mb-6 inline-flex items-center gap-2">
                        ← Back to Catalog
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Market Analysis</h1>
                    <p className="text-gray-400">Comparison for: <span className="text-white">"{decodeURIComponent(name)}"</span></p>
                </div>

                {bestDeal && (
                    <div className="mb-12 bg-[#13162b] rounded-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-80 bg-white/5 p-8 flex items-center justify-center">
                            <div className="aspect-square w-full rounded-xl bg-[#0a0a0a] border border-white/5 overflow-hidden">
                                <img src={bestDeal.image || "https://placehold.co/800"} alt={bestDeal.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="flex-1 p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Best Price</span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-white mb-4">{bestDeal.name}</h2>
                            <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl">{bestDeal.description}</p>

                            <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/5">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Vendor</p>
                                    <p className="text-xl font-bold text-white">{bestDeal.shop?.name || 'Unknown'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Current Price</p>
                                    <p className="text-3xl font-bold text-white">₹{bestDeal.price.toLocaleString()}</p>
                                </div>
                            </div>

                            <button className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                                View Deal ↗
                            </button>
                        </div>
                    </div>
                )}

                <h3 className="text-xl font-bold text-white mb-6">All Vendors</h3>
                <div className="bg-[#13162b] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4">Rank</th>
                                    <th className="px-6 py-4">Vendor</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {prices.map((item, idx) => (
                                    <tr key={item._id || idx} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{idx + 1}</td>
                                        <td className="px-6 py-4 font-medium text-white">{item.shop?.name || 'Unknown'}</td>
                                        <td className="px-6 py-4 font-bold text-white">₹{item.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-blue-400 hover:text-blue-300">View →</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
