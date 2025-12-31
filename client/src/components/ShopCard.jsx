const ShopCard = ({ shop }) => {
    return (
        <a
            href={shop.website || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-[#13162b] p-3 shadow-md transition-all hover:bg-[#1c2035] hover:border-white/20 cursor-pointer"
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl font-black text-cyan-400 border border-white/5 group-hover:bg-cyan-500/10 transition-colors">
                {shop.name?.[0]}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                    {shop.name}
                </h3>
                <p className="truncate text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                    {shop.location || "Online Endpoint"}
                </p>
            </div>

            <div className="h-2 w-2 rounded-full bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        </a>
    );
};

export default ShopCard;
