import { Filter } from "./filter";
import { MobileFilters } from "./mobile-filters";
import { Billboard } from "@/components/billboard";
import { Container } from "@/components/shared/container";
import { NoResults } from "@/components/shared/no-results";
import { ProductCard } from "@/components/shared/product-card";
import getCategory from "@/lib/actions/get-category";
import getColors from "@/lib/actions/get-colors";
import getProducts from "@/lib/actions/get-products";
import getSizes from "@/lib/actions/get-sizes";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();

  const colors = await getColors();

  const catgeory = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={catgeory.billboard} />
        <div className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
