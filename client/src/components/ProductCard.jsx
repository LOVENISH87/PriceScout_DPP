import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const price = Number(product.price || 0).toLocaleString();
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <Link to={`/product/${encodeURIComponent(product.name)}`} className="group relative flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#13162b] p-5 shadow-lg transition-all hover:bg-[#1c2035] hover:border-white/20">
            <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden relative">
                {product.image ? (
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-violet-600/20 to-cyan-500/20 text-white/20 uppercase">
                        {product.name?.[0]}
                    </div>
                )}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {discount}% BOOST
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2.5 py-1 rounded-lg">
                        {product.category || 'General'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {product.brand || 'No Brand'}
                    </span>
                </div>
                <h3 className="line-clamp-2 text-lg font-bold text-white leading-tight group-hover:text-violet-300 transition-colors">
                    {product.name}
                </h3>
            </div>

            <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Valuation</span>
                    <span className="text-2xl font-bold font-mono text-white tracking-tight">₹{price}</span>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                    {product.shop?.name && (
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            {product.shop.name}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
