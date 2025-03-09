import { GetAllGaleri } from "@/api/galeriHook";
import Image from "next/image";
import SidebarMenu from "./Sidebar";
import { GetAllBlog } from "@/api/blogHook";
import { GetAllCategories } from "@/api/CategoryHook";
import Link from "next/link";

export default async function Navbar() {
  const [galleries, categories, blogs] = await Promise.all([
    GetAllGaleri(),
    GetAllCategories(),
    GetAllBlog(),
  ]);

  return (
    <>
      <nav className="border-b border-gray-200 px-4 py-3 w-full">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between lg:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-lg font-bold">
            <Image src={"/logo.png"} width={150} height={100} alt="a" />
          </span>
          <button className="text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 5.121a1.5 1.5 0 000 2.121l1.415 1.415M12 14l7 7M7.05 7.05a7 7 0 019.9 9.9m-12.72-3.3L5.293 13.293"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center">
          <SidebarMenu routes={{
            galleries: galleries?.docs || [],
            categories: categories?.docs || [],
            blogs: blogs?.docs || [],
          }}/>
          </div>
          <Link href={"/"} className="text-lg font-bold">
            <Image src={"/logo.png"} width={150} height={100} alt="a" />
          </Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 focus:outline-none">
              Hubungi Kami
            </button>
            <button className="text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.172 3.172a4 4 0 015.656 0l1.414 1.414m4.95 4.95l1.415 1.415a4 4 0 010 5.656l-1.415 1.414m-4.95-4.95L8.828 8.828a4 4 0 010-5.656l1.415-1.414"
                />
              </svg>
            </button>
            <button className="text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12a7 7 0 1114 0A7 7 0 015 12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

