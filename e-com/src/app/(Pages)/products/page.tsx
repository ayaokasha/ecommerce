import ProductCard from "@/app/_Components/productCard/ProductCard";
import { ProductI } from "@/interfaces/product";
import React from "react";

export default async function Products() {
  //ISR
  const respons = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      next: {
        revalidate: 10 * 60,
      },
    }
  );
  const { data: products }: { data: ProductI[] } = await respons.json();
  console.log(products);

  return (
    <>
      <div
        className="container
        grid gap-4 px-4 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5 
               "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
