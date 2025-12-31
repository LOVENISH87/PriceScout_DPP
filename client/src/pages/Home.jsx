import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Snowfall from 'react-snowfall';
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ShopCard from "../components/ShopCard.jsx";
import { useFetchProducts } from "../hooks/useFetchProducts.js";
import { useLowestPrice } from "../hooks/useLowestPrice.js";
import { useFetchShops } from "../hooks/useFetchShops.js";

const Home = () => {
    const { products, loading, error } = useFetchProducts();
    const { items: deals, loading: dealsLoading } = useLowestPrice();
    const { shops, loading: shopsLoading } = useFetchShops();
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [visibleCount, setVisibleCount] = useState(16);
    const [visibleShops, setVisibleShops] = useState(6);

    const handleSearch = async () => {
        setIsSearching(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSearchQuery(inputValue);
        setIsSearching(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const filtered = useMemo(() => {
        if (!searchQuery.trim()) return products;
        const term = searchQuery.trim().toLowerCase();
        return products.filter((p) => {
            return (
                p.name?.toLowerCase().includes(term) ||
                p.brand?.toLowerCase().includes(term) ||
                p.category?.toLowerCase().includes(term)
            );
        });
    }, [products, searchQuery]);

    return (
        <div className="min-h-screen bg-[#05060a] text-gray-100 font-sans selection:bg-violet-500/30 selection:text-white relative overflow-hidden">
            {/* Ambient Background Blobs */}
            {/* Clean Background */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[#0a0a0a]"></div>
            <Snowfall
                // color="#ffffff" 
                color="lightblue"
                style={{
                    position: 'fixed',
                    width: '150vw',
                    height: '150vh',
                    zIndex: 0,
                    opacity: 1,
                    // image: 'url(/src/assets/snowflake.png)',❄️ CAN I USE THIS?
                }}
                snowflakeCount={950}
                radius={[0.9, 3.0]}
                speed={[0.5, 2.5]}
                wind={[0, 0]}
            />

            <Navbar />

            <main className="relative z-10 mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="mb-24 flex flex-col items-center text-center pt-10">
                    <h1 className="relative max-w-5xl text-6xl font-medium tracking-tight sm:text-7xl lg:text-8xl leading-[1.1]">
                        Search, compare
                        <br />
                        <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x ">
                            and scale your catalog.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-xl text-lg text-gray-400">
                        Instantly surface the best-priced products across shops. Built to
                        expand with analytics, alerts, and admin tools.
                    </p>

                    <div className="mt-10 flex items-center gap-6 ">
                        <button
                            onClick={() => setIsAuthenticated(true)}
                            className="group relative flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-extrabold text-black transition-all hover:scale-110 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
                        >
                            Let's Start Searching
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs transition-transform group-hover:rotate-45">↗</span>
                        </button>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#05060a] bg-gray-700"></div>
                            ))}
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <div className="flex text-yellow-400 text-sm">★★★★★</div>
                            <span className="text-xs text-gray-500 font-medium mt-1">Trusted by 1000+ clients</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-24 grid grid-cols-3 gap-8 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {[
                            { label: "Products Indexed", value: products.length },
                            { label: "Shops Connected", value: shops.length },
                            { label: "Active Deals", value: deals.length },
                        ].map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Search Section */}
                {isAuthenticated && (
                    <>
                        <section className="relative mb-12 px-4 py-4 mx-auto max-w-5xl">
                            <div className="relative max-w-3xl mx-auto group">
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-linear-to-r from-violet-600 via-cyan-500 to-violet-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full rounded-xl border border-white/10 bg-[#13162b] pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 sm:text-sm transition-all shadow-lg"
                                        placeholder="Search products by name, brand, or category..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <div className="absolute inset-y-0 right-3 flex items-center">
                                        {isSearching ? (
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"></div>
                                        ) : (
                                            <span className="hidden sm:inline-flex items-center rounded border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-400">
                                                Enter
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column: Products */}
                            <div className="lg:col-span-8 space-y-8">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-white">Market Products</h2>
                                        <span className="text-sm text-gray-500">{filtered.length} results</span>
                                    </div>

                                    {(loading || isSearching) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="h-64 rounded-2xl bg-[#0f111a] animate-pulse border border-white/5"></div>
                                            ))}
                                        </div>
                                    )}

                                    {error && (
                                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                                            Error loading products: {error}
                                        </div>
                                    )}

                                    {!loading && !isSearching && !error && filtered.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-white/5 bg-[#0f111a]/50">
                                            <div className="text-4xl mb-4">🔍</div>
                                            <h3 className="text-lg font-medium text-white">No products found</h3>
                                            <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filtered.slice(0, visibleCount).map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>

                                    <div className="mt-12 flex justify-center gap-4">
                                        {visibleCount < filtered.length && (
                                            <button
                                                onClick={() => setVisibleCount((prev) => prev + 8)}
                                                className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Show More
                                                    <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                                <div className="absolute inset-0 bg-linear-to-r from-violet-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        )}

                                        {visibleCount > 16 && (
                                            <button
                                                onClick={() => setVisibleCount(16)}
                                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:text-white"
                                            >
                                                Show Less
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sidebar */}
                            <aside className="lg:col-span-4 space-y-8">
                                <div className="bg-[#0f111a] rounded-3xl border border-white/5 p-6 shadow-xl">
                                    <div className="flex items-center gap-2 mb-6 text-emerald-400">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                        <h2 className="text-lg font-bold text-white">Lowest Price Deals</h2>
                                    </div>

                                    {dealsLoading ? (
                                        <div className="space-y-3">
                                            {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse"></div>)}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {deals.slice(0, 5).map((product) => (
                                                <Link 
                                                    key={product._id} 
                                                    to={`/product/${encodeURIComponent(product.name)}`}
                                                    className="block relative group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-sm font-medium text-white line-clamp-1">{product.name}</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">{product.shop?.name}</p>
                                                        </div>
                                                        <span className="font-bold font-mono text-emerald-400">${product.price}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-white mb-4 px-2">Trending Comparisons</h2>
                                    <div className="flex flex-wrap gap-2 px-2">
                                        {['iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra', 'MacBook Pro 16-inch M3', 'Sony WH-1000XM5 Headphones', 'Nintendo Switch OLED', 'PlayStation 5 Console', 'DJI Mini 3 Pro Drone'].map((name) => (
                                            <Link 
                                                key={name}
                                                to={`/product/${encodeURIComponent(name)}`}
                                                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-violet-500/50 hover:text-white transition-all"
                                            >
                                                {name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-white mb-4 px-2">Partner Shops</h2>
                                    {shopsLoading ? (
                                        <p className="text-gray-500 px-2">Loading...</p>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-1 gap-3">
                                                {shops.slice(0, visibleShops).map((shop) => (
                                                    <ShopCard key={shop._id} shop={shop} />
                                                ))}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                {visibleShops < shops.length && (
                                                    <button
                                                        onClick={() => setVisibleShops((prev) => prev + 5)}
                                                        className="w-full rounded-xl border border-white/5 bg-white/5 py-2 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                                                    >
                                                        View More Shops ({shops.length - visibleShops} remaining)
                                                    </button>
                                                )}

                                                {visibleShops > 6 && (
                                                    <button
                                                        onClick={() => setVisibleShops(6)}
                                                        className="w-full rounded-xl border border-transparent py-2 text-xs font-medium text-gray-600 transition-colors hover:text-gray-400"
                                                    >
                                                        Show Less
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>

            <footer className="mt-24 border-t border-white/5 bg-[#030407] pt-20 pb-10 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative mx-auto max-w-[1600px] px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">PriceScout.</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                The advanced price intelligence engine for modern commerce. Track, analyze, and optimize in real-time.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6">Platform</h4>
                            <ul className="space-y-3 text-sm text-gray-500">
                                {['Market Analysis', 'Price Alerts', 'API Docs', 'Enterprise'].map(item => (
                                    <li key={item} className="hover:text-violet-400 transition-colors cursor-pointer">{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6">System Status</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </div>
                                    <span className="text-sm text-emerald-400 font-medium">All Systems Operational</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter email..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-600 hover:text-green-400 transition-colors hover:cursor-auto">&copy; 2025 PriceScout Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
