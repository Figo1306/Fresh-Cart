"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  IconBabyCarriage,
  IconCategory,
  IconChevronDown,
  IconChevronRight,
  IconDotsVertical,
  IconHeart,
  IconHome,
  IconId,
  IconLogout,
  IconMail,
  IconMapPin,
  IconMenu2,
  IconPackage,
  IconPhone,
  IconProgressBolt,
  IconReportMedical,
  IconSearch,
  IconSettings,
  IconShirtSport,
  IconShoppingBag,
  IconShoppingCart,
  IconTags,
  IconUser,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";

import logo from "../../../assets/images/freshcart-logo.svg";
import { AppState } from "@/app/store/store";
import { authActions } from "@/features/auth/slicese/auth.slice";
import { deleteToken } from "@/features/auth/server/auth.action";
import {
  useCartCount,
  useInitializeGuestCart,
} from "@/features/cart/hooks/useCart";
import { useWishlistCount } from "@/features/wishlist/hooks/useWishlist";

export default function Navbar() {
  useInitializeGuestCart();
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.authReducer
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { logout } = authActions;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Close mobile menu and search dropdown when navigating to a new route
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await deleteToken();
    dispatch(logout());
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/products?keyword=${encodeURIComponent(query)}`);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-gray-100">
        <div className="container mx-auto">
          {/* Desktop Top Header */}
          <div className="hidden lg:flex border-b text-xs text-gray-500 border-gray-200/60 py-2 justify-between items-center">
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                <IconPhone size={15} stroke={2} />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-2 hover:text-primary-600 transition-colors">
                <IconMail size={15} stroke={2} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>

            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/orders"
                  className="hover:text-primary-600 transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-600 transition-colors"
                >
                  About & Contact
                </Link>
              </li>
              <li>
                <span className="text-gray-400">|</span>
              </li>
              <li>
                <select className="bg-transparent text-gray-600 border-none outline-none cursor-pointer">
                  <option>EGP</option>
                  <option>USD</option>
                  <option>SAR</option>
                </select>
              </li>
              <li>
                <select className="bg-transparent text-gray-600 border-none outline-none cursor-pointer">
                  <option>English</option>
                  <option>العربية</option>
                </select>
              </li>
            </ul>
          </div>

          {/* Main Navigation Bar */}
          <nav className="py-3 lg:py-4 flex justify-between items-center gap-4">
            {/* Left: Mobile Hamburger & Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Open menu"
              >
                <IconMenu2 className="w-6 h-6" stroke={2} />
              </button>

              <Link href="/" className="flex items-center">
                <Image
                  src={logo}
                  alt="FreshCart"
                  className="h-7 sm:h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Center: Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden lg:flex items-center flex-1 max-w-md mx-6"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control w-full pr-10 text-sm"
                placeholder="Search for products, brands, categories..."
              />
              <button
                type="submit"
                className="absolute right-3 text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Search"
              >
                <IconSearch stroke={2} className="w-5 h-5" />
              </button>
            </form>

            {/* Right: Mobile Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className={`p-2 rounded-xl transition-colors ${
                  isMobileSearchOpen
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                }`}
                aria-label="Toggle search"
              >
                <IconSearch className="w-5 h-5" stroke={2} />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Wishlist"
              >
                <IconHeart className="w-5 h-5" stroke={2} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 size-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex justify-center items-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Cart"
              >
                <IconShoppingCart className="w-5 h-5" stroke={2} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 size-4 rounded-full bg-primary-600 text-white text-[10px] font-bold flex justify-center items-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Right: Desktop Navigation Icons */}
            <menu className="hidden lg:flex items-center gap-6 *:hover:text-primary-600 *:transition-colors *:duration-200">
              <li>
                <Link
                  href="/wishlist"
                  className="flex flex-col gap-1 items-center"
                >
                  <div className="relative">
                    <IconHeart stroke={2} className="w-6 h-6" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-2 size-4.5 rounded-full bg-red-500 text-white text-xs font-semibold flex justify-center items-center shadow-xs">
                        {wishlistCount > 9 ? "9+" : wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium">Wishlist</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="flex flex-col gap-1 items-center"
                >
                  <div className="relative">
                    <IconShoppingCart stroke={2} className="w-6 h-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 size-4.5 rounded-full bg-primary-600 text-white text-xs font-semibold flex justify-center items-center shadow-xs">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium">Cart</span>
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="flex flex-col gap-1 items-center"
                    >
                      <IconUser stroke={2} className="w-6 h-6" />
                      <span className="text-xs font-medium">Account</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex flex-col gap-1 items-center cursor-pointer text-gray-700 hover:text-red-600"
                    >
                      <IconLogout stroke={2} className="w-6 h-6" />
                      <span className="text-xs font-medium">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signup"
                      className="flex flex-col gap-1 items-center"
                    >
                      <IconUserPlus stroke={2} className="w-6 h-6" />
                      <span className="text-xs font-medium">Signup</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/login"
                      className="flex flex-col gap-1 items-center"
                    >
                      <IconId stroke={2} className="w-6 h-6" />
                      <span className="text-xs font-medium">Login</span>
                    </Link>
                  </li>
                </>
              )}
            </menu>
          </nav>
        </div>

        {/* Collapsible Search on Mobile */}
        {isMobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-1 border-t border-gray-100 bg-white">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, brands..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                autoFocus
              />
              <IconSearch
                className="absolute left-3 w-5 h-5 text-gray-400"
                stroke={2}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-1 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <IconX className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:block bg-gray-50 border-t border-gray-100 py-3">
          <div className="container mx-auto flex gap-8 items-center">
            {/* All Categories Dropdown */}
            <div className="group/categories relative">
              <button
                type="button"
                className="btn bg-primary-600 hover:bg-primary-700 text-white flex gap-2 items-center text-sm font-semibold py-2 px-4 rounded-xl shadow-xs"
              >
                <IconMenu2 stroke={2} className="w-5 h-5" />
                <span>All Categories</span>
                <IconChevronDown stroke={2} className="w-4 h-4" />
              </button>

              <ul className="hidden divide-y divide-gray-100 shadow-xl group-hover/categories:flex flex-col absolute z-50 top-full left-0 mt-2 rounded-xl bg-white w-64 border border-gray-100 overflow-hidden">
                <li>
                  <Link
                    href="/categories/6439d5b90049ad0b52b90048"
                    className="p-3.5 flex gap-3 items-center hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconUser stroke={2} className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium">Men&apos;s Fashion</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories/6439d58a0049ad0b52b9003f"
                    className="p-3.5 flex gap-3 items-center hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconShirtSport
                      stroke={2}
                      className="w-5 h-5 text-gray-500"
                    />
                    <span className="text-sm font-medium">
                      Women&apos;s Fashion
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories/6439d40367d9aa4ca97064cc"
                    className="p-3.5 flex gap-3 items-center hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconBabyCarriage
                      stroke={2}
                      className="w-5 h-5 text-gray-500"
                    />
                    <span className="text-sm font-medium">Baby &amp; Toys</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories/6439d30b67d9aa4ca97064b1"
                    className="p-3.5 flex gap-3 items-center hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconReportMedical
                      stroke={2}
                      className="w-5 h-5 text-gray-500"
                    />
                    <span className="text-sm font-medium">
                      Beauty &amp; Health
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/categories/6439d2d167d9aa4ca970649f"
                    className="p-3.5 flex gap-3 items-center hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  >
                    <IconProgressBolt
                      stroke={2}
                      className="w-5 h-5 text-gray-500"
                    />
                    <span className="text-sm font-medium">Electronics</span>
                  </Link>
                </li>

                <li className="bg-gray-50/60">
                  <Link
                    href="/categories"
                    className="p-3.5 flex gap-3 items-center text-primary-600 hover:bg-gray-100 font-semibold transition-colors"
                  >
                    <IconDotsVertical stroke={2} className="w-5 h-5" />
                    <span className="text-sm">View All Categories</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Navigation Links */}
            <menu className="flex gap-6 text-sm font-medium text-gray-700">
              <li>
                <Link
                  href="/"
                  className={`hover:text-primary-600 transition-colors ${
                    pathname === "/" ? "text-primary-600 font-bold" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className={`hover:text-primary-600 transition-colors ${
                    pathname.startsWith("/products")
                      ? "text-primary-600 font-bold"
                      : ""
                  }`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`hover:text-primary-600 transition-colors ${
                    pathname.startsWith("/categories")
                      ? "text-primary-600 font-bold"
                      : ""
                  }`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className={`hover:text-primary-600 transition-colors ${
                    pathname.startsWith("/brands")
                      ? "text-primary-600 font-bold"
                      : ""
                  }`}
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:text-primary-600 transition-colors ${
                    pathname.startsWith("/contact")
                      ? "text-primary-600 font-bold"
                      : ""
                  }`}
                >
                  Contact
                </Link>
              </li>
            </menu>
          </div>
        </nav>
      </header>

      {/* Mobile Offcanvas Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/70">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center"
              >
                <Image src={logo} alt="FreshCart" className="h-7 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 active:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <IconX className="w-5 h-5" stroke={2} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Drawer Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
                <IconSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  stroke={2}
                />
              </form>

              {/* User / Auth Section */}
              <div className="bg-gradient-to-br from-primary-50 via-emerald-50/50 to-white rounded-2xl p-4 border border-primary-100/60">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                        {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {userInfo?.name || "Customer"}
                        </p>
                        {userInfo?.email && (
                          <p className="text-xs text-gray-500 truncate">
                            {userInfo.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-primary-100/80 grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 text-gray-700 hover:text-primary-600 hover:border-primary-200 font-medium transition-colors"
                      >
                        <IconUser className="w-4 h-4 text-primary-600" />
                        <span>Profile</span>
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 text-gray-700 hover:text-primary-600 hover:border-primary-200 font-medium transition-colors"
                      >
                        <IconPackage className="w-4 h-4 text-primary-600" />
                        <span>Orders</span>
                      </Link>

                      <Link
                        href="/profile/my-adresses"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-100 text-gray-700 hover:text-primary-600 hover:border-primary-200 font-medium transition-colors"
                      >
                        <IconMapPin className="w-4 h-4 text-primary-600" />
                        <span>Addresses</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 font-medium transition-colors text-left"
                      >
                        <IconLogout className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600 font-medium">
                      Welcome to FreshCart! Sign in to track orders and save your wishlist.
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 py-2 text-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 py-2 text-center rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-semibold transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  Navigation
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname === "/"
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      }`}
                    >
                      <IconHome className="w-5 h-5" stroke={2} />
                      <span>Home</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname.startsWith("/products")
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      }`}
                    >
                      <IconShoppingBag className="w-5 h-5" stroke={2} />
                      <span>All Products</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/categories"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname.startsWith("/categories")
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      }`}
                    >
                      <IconCategory className="w-5 h-5" stroke={2} />
                      <span>Categories</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/brands"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname.startsWith("/brands")
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      }`}
                    >
                      <IconTags className="w-5 h-5" stroke={2} />
                      <span>Brands</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname.startsWith("/wishlist")
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconHeart className="w-5 h-5 text-red-500" stroke={2} />
                        <span>Wishlist</span>
                      </div>
                      {wishlistCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        pathname.startsWith("/cart")
                          ? "bg-primary-50 text-primary-600 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconShoppingCart
                          className="w-5 h-5 text-primary-600"
                          stroke={2}
                        />
                        <span>Shopping Cart</span>
                      </div>
                      {cartCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Popular Categories */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  Popular Categories
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/categories/6439d5b90049ad0b52b90048"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconUser className="w-4 h-4 text-gray-400" />
                        <span>Men&apos;s Fashion</span>
                      </div>
                      <IconChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/categories/6439d58a0049ad0b52b9003f"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconShirtSport className="w-4 h-4 text-gray-400" />
                        <span>Women&apos;s Fashion</span>
                      </div>
                      <IconChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/categories/6439d40367d9aa4ca97064cc"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconBabyCarriage className="w-4 h-4 text-gray-400" />
                        <span>Baby &amp; Toys</span>
                      </div>
                      <IconChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/categories/6439d30b67d9aa4ca97064b1"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconReportMedical className="w-4 h-4 text-gray-400" />
                        <span>Beauty &amp; Health</span>
                      </div>
                      <IconChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/categories/6439d2d167d9aa4ca970649f"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconProgressBolt className="w-4 h-4 text-gray-400" />
                        <span>Electronics</span>
                      </div>
                      <IconChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support & Legal */}
              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-primary-600 font-medium"
                >
                  Need Help? Contact Support
                </Link>
                <div className="flex gap-4 pt-1 text-[11px] text-gray-400">
                  <Link
                    href="/privacy-policy"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  <span>•</span>
                  <Link
                    href="/terms"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:underline"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 flex justify-around items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
            pathname === "/"
              ? "text-primary-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <IconHome className="w-5 h-5" stroke={pathname === "/" ? 2.5 : 1.8} />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          href="/categories"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith("/categories")
              ? "text-primary-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <IconCategory
            className="w-5 h-5"
            stroke={pathname.startsWith("/categories") ? 2.5 : 1.8}
          />
          <span className="text-[10px]">Categories</span>
        </Link>

        <Link
          href="/products"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith("/products")
              ? "text-primary-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <IconShoppingBag
            className="w-5 h-5"
            stroke={pathname.startsWith("/products") ? 2.5 : 1.8}
          />
          <span className="text-[10px]">Products</span>
        </Link>

        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith("/wishlist")
              ? "text-primary-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <div className="relative">
            <IconHeart
              className="w-5 h-5"
              stroke={pathname.startsWith("/wishlist") ? 2.5 : 1.8}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 size-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex justify-center items-center">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Wishlist</span>
        </Link>

        <Link
          href="/cart"
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith("/cart")
              ? "text-primary-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <div className="relative">
            <IconShoppingCart
              className="w-5 h-5"
              stroke={pathname.startsWith("/cart") ? 2.5 : 1.8}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 size-4 rounded-full bg-primary-600 text-white text-[9px] font-bold flex justify-center items-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </Link>

        <Link
          href={isAuthenticated ? "/profile" : "/login"}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
            pathname.startsWith("/profile") ||
            pathname === "/login" ||
            pathname === "/signup"
              ? "text-primary-600 font-semibold"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <IconUser
            className="w-5 h-5"
            stroke={
              pathname.startsWith("/profile") || pathname === "/login"
                ? 2.5
                : 1.8
            }
          />
          <span className="text-[10px]">
            {isAuthenticated ? "Account" : "Login"}
          </span>
        </Link>
      </div>
    </>
  );
}
