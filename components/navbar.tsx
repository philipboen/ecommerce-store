import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { NavbarActions } from "@/components/navbar-actions";
import { Container } from "@/components/shared/container";
import getCategories from "@/lib/actions/get-categories";

export const revalidate = 0;

export const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 flex gap-x-2 lg:ml-0">
            <h3 className="font-serif text-xl font-bold">STORE</h3>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
