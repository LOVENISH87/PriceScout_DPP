const ShopCard = ({ shop }) => {
  return (
    <article className="group relative flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#0f111a] p-5 shadow-2xl transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-cyan-500/10">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-xl">
          🏪
        </div>
        <span className="inline-flex rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400">
          Partner
        </span>
      </div>
      
      <div>
        <h3 className="line-clamp-1 text-lg font-bold text-white group-hover:text-cyan-200">
          {shop.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {shop.location || "Location not set"}
        </div>
      </div>
    </article>
  );
};

export default ShopCard;
