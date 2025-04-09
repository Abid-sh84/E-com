import ProductCard from './ProductCard';
 
 const ProductGrid = ({ products, title }) => {
   return (
     <section className="py-8">
       {title && (
         <h2 className="font-comic text-3xl md:text-4xl text-white mb-8 text-center">{title}</h2>
       )}
       
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {products.map(product => (
           <ProductCard key={product.id} product={product} />
         ))}
       </div>
     </section>
   );
 };
 
 export default ProductGrid;
