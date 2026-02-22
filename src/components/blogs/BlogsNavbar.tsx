"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import { getBlogs } from "@/actions/blog";
import { format } from "date-fns";

export default function BlogsNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const res = await getBlogs({ search: searchQuery.trim(), limit: 5 });
        if (res.success) {
          setSearchResults(res.data);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const SearchResultDropdown = () => {
    if (searchQuery.trim().length < 2) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto">
        {isSearching ? (
          <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Searching...
          </div>
        ) : searchResults.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            No blogs found.
          </div>
        ) : (
          <div className="flex flex-col">
            {searchResults.map((blog) => (
              <Link
                key={blog._id}
                href={`/${blog.slug}`}
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-neutral-800 border-b border-gray-50 dark:border-neutral-800 last:border-0 transition-colors"
              >
                <div className="relative w-12 h-10 shrink-0 rounded overflow-hidden">
                  <Image
                    src={blog.thumbnail.url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {blog.title}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 px-1.5 rounded-sm font-bold uppercase truncate max-w-[100px]">
                      {blog.tags[0]}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <button
              onClick={handleSearch}
              className="p-3 text-center text-sm font-bold text-primary dark:text-secondary hover:bg-primary/5 dark:hover:bg-neutral-800 transition-colors border-t border-gray-100 dark:border-neutral-800"
            >
              View all results
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white dark:bg-neutral-950 border-b border-primary dark:border-secondary/10 sticky top-0 z-50 transition-colors shadow-xl">
      {/* Top Banner */}
      <div className="bg-primary text-white py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-col flex-1 items-center justify-center text-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Vishwanath Academy &ndash; Blogs
            </h1>
            <span className="text-base md:text-lg font-medium text-white/90 inline-block mt-0.5 uppercase tracking-widest">
              News & Education
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors"
            >
              About us
            </a>
            <Link
              href="/educate-a-child-in-need"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors"
            >
              Educate a child in need
            </Link>

            {/* Dropdown: Your Guide */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors py-2">
                Your Guide <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white dark:bg-neutral-900 shadow-xl rounded-b-lg border-t-2 border-primary dark:border-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link
                  href="/tag/affiliation"
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-medium border-b border-gray-50 dark:border-neutral-800 text-gray-700 dark:text-gray-200"
                >
                  How to get CBSE affiliation
                </Link>
                <div className="relative group/sub">
                  <div className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer flex items-center justify-between rounded-b-lg">
                    Submit your reviews{" "}
                    <ChevronDown size={14} className="-rotate-90" />
                  </div>
                  <div className="absolute top-0 left-full ml-0 w-48 bg-white dark:bg-neutral-900 shadow-xl rounded-lg border-t-2 border-primary dark:border-secondary opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 flex flex-col z-50">
                    <a
                      href="https://www.google.com/maps/place/Vishwanath+Academy/@26.7773978,80.9088641,17z/data=!3m1!4b1!4m6!3m5!1s0x399bfbfa91bd1e95:0xe7358e9c5e8c8659!8m2!3d26.7773978!4d80.9088641!16s%2Fg%2F1w6r6phk?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm border-b border-gray-50 dark:border-neutral-800 text-gray-700 dark:text-gray-200 rounded-t-lg"
                    >
                      Aashiana Branch
                    </a>
                    <a
                      href="https://www.google.com/maps/place/Vishwanath+Academy/@26.6688767,80.8438055,17z/data=!3m1!4b1!4m6!3m5!1s0x399bf7982de264b5:0xee605dc76b250c!8m2!3d26.6688767!4d80.8438055!16s%2Fg%2F11ggsg7t9d?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm rounded-b-lg text-gray-700 dark:text-gray-200"
                    >
                      Dhawapur Branch
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown: Students Section */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors py-2">
                Students Section <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white dark:bg-neutral-900 shadow-xl rounded-b-lg border-t-2 border-primary dark:border-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50">
                <Link
                  href="/tag/parents-corner"
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-medium border-b border-gray-50 dark:border-neutral-800 text-gray-700 dark:text-gray-200"
                >
                  Parents Corner
                </Link>
                <Link
                  href="/tag/information"
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-medium border-b border-gray-50 dark:border-neutral-800 text-gray-700 dark:text-gray-200"
                >
                  School's Important Information
                </Link>
                <Link
                  href="/tag/news"
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-medium border-b border-gray-50 dark:border-neutral-800 text-gray-700 dark:text-gray-200"
                >
                  Education News
                </Link>
                <a
                  href="/tag/school-results"
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-medium border-b border-gray-50 dark:border-neutral-800 text-gray-700 dark:text-gray-200"
                >
                  School results
                </a>
                <a
                  href="https://bit.ly/parents-feedback-form"
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm font-medium rounded-b-lg text-gray-700 dark:text-gray-200"
                >
                  Your Feedback
                </a>
              </div>
            </div>

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={16} className="text-secondary" />
                ) : (
                  <Moon
                    size={16}
                    className="text-primary dark:text-secondary"
                  />
                )}
              </button>
            )}
          </div>

          {/* Search Bar Desktop */}
          <div className="hidden md:flex flex-1 justify-end max-w-sm ml-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-primary dark:text-secondary dark:hover:text-secondary transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
            <div className="absolute top-full w-full left-0 z-50">
              <SearchResultDropdown />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-4 ml-auto">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={26} className="text-primary dark:text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${
          isOpen ? "" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 bg-white dark:bg-neutral-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary dark:border-secondary/10 dark:border-neutral-800">
          <span className="font-display font-bold text-xl text-primary dark:text-secondary">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-secondary"
          >
            <X />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="relative w-full mb-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search blogs or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Search size={18} />
              </button>
            </form>
            <SearchResultDropdown />
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block font-medium font-sans text-gray-800 dark:text-gray-200 hover:text-primary dark:text-secondary transition-colors"
          >
            Home
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_BASE_URL}
            onClick={() => setIsOpen(false)}
            className="block font-medium font-sans text-gray-800 dark:text-gray-200 hover:text-primary dark:text-secondary transition-colors"
          >
            About us
          </a>
          <Link
            href="/educate-a-child-in-need"
            onClick={() => setIsOpen(false)}
            className="block font-medium font-sans text-gray-800 dark:text-gray-200 hover:text-primary dark:text-secondary transition-colors"
          >
            Educate a child in need
          </Link>

          <details className="group">
            <summary className="cursor-pointer font-medium font-sans text-gray-800 dark:text-gray-200 group-hover:text-primary dark:text-secondary transition-colors flex items-center justify-between">
              Your Guide
              <ChevronDown
                size={16}
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
              <Link
                href="/tag/affiliation"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1"
              >
                How to get CBSE affiliation
              </Link>
              <div className="text-gray-800 dark:text-gray-200 font-bold mt-2 mb-1 text-sm">
                Submit your reviews:
              </div>
              <a
                href="https://www.google.com/maps/place/Vishwanath+Academy/@26.7773978,80.9088641,17z/data=!3m1!4b1!4m6!3m5!1s0x399bfbfa91bd1e95:0xe7358e9c5e8c8659!8m2!3d26.7773978!4d80.9088641!16s%2Fg%2F1w6r6phk?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1 ml-2"
              >
                - Aashiana Branch
              </a>
              <a
                href="https://www.google.com/maps/place/Vishwanath+Academy/@26.6688767,80.8438055,17z/data=!3m1!4b1!4m6!3m5!1s0x399bf7982de264b5:0xee605dc76b250c!8m2!3d26.6688767!4d80.8438055!16s%2Fg%2F11ggsg7t9d?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1 ml-2"
              >
                - Dhawapur Branch
              </a>
            </div>
          </details>

          <details className="group">
            <summary className="cursor-pointer font-medium font-sans text-gray-800 dark:text-gray-200 group-hover:text-primary dark:text-secondary transition-colors flex items-center justify-between">
              Students Section
              <ChevronDown
                size={16}
                className="transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
              <Link
                href="/tag/parents-corner"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1"
              >
                Parents Corner
              </Link>
              <Link
                href="/tag/information"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1"
              >
                School's Important Information
              </Link>
              <Link
                href="/tag/news"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1"
              >
                Education News
              </Link>
              <a
                href="tag/school-results"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1"
              >
                School results
              </a>
              <a
                href="https://bit.ly/parents-feedback-form"
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:text-secondary py-1"
              >
                Your Feedback
              </a>
            </div>
          </details>

          <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full rounded-lg bg-gray-100 dark:bg-neutral-900 p-3 hover:bg-gray-200 dark:hover:bg-neutral-800 transition flex items-center justify-center gap-2"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={18} className="text-secondary" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon
                      size={18}
                      className="text-primary dark:text-secondary"
                    />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </nav>
  );
}
