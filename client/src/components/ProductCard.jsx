const ProductCard = ({ product }) => {
  const price = Number(product.price || 0).toFixed(2);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#0f111a] p-5 shadow-2xl transition-all hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-violet-500/10">
      <div className="flex items-start justify-between">
        <div className="inline-flex rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400 backdrop-blur-sm transition-colors group-hover:bg-violet-500/10 group-hover:text-violet-300">
          {product.category || "General"}
        </div>
        {discount > 0 && (
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-white group-hover:text-violet-200">
          {product.name}
        </h3>
        {product.description && (
          <p className="line-clamp-2 text-sm text-gray-400">
            {product.description}
          </p>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Price</span>
          <span className="text-xl font-bold text-white">${price}</span>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          {product.brand && (
            <span className="text-xs font-medium text-gray-400">
              {product.brand}
            </span>
          )}
          {product.shop?.name && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
              {product.shop.name}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
