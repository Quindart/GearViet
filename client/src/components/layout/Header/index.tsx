import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="w-full bg-black h-[70px]">
        <div className="container mx-auto px-4 h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 w-[220px] h-[60px]">
            <Image 
              src="/images/logo.webp" 
              alt="The Gioi Gear" 
              width={220} 
              height={60}
              className="object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-[600px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Bạn đang tìm gì..."
                className="w-full h-11 px-4 rounded bg-white text-gray-800 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                  <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-6">
            {/* Hotline */}
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="text-green-500 text-xs font-medium">Hotline</div>
                <div className="text-green-500 text-sm font-medium">02899998399</div>
              </div>
            </div>

            {/* Store Locations */}
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 11.892 4.402 13.13 5.5 14.5L12 22L18.5 14.5C19.598 13.13 20 11.892 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="text-green-500 text-xs font-medium">Hệ thống</div>
                <div className="text-green-500 text-sm font-medium">cửa hàng</div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Account */}
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="text-green-500 text-xs font-medium">Đăng nhập</div>
                <div className="text-green-500 text-sm font-medium">Đăng ký</div>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-2 bg-black border border-white rounded-lg px-4 py-2">
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </div>
              </div>
              <span className="text-green-500 text-sm font-medium">Giỏ hàng</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="w-full bg-white border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            {/* Category Menu */}
            <div className="flex items-center gap-2 py-3 px-4 bg-black cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-green-500 font-bold uppercase">DANH MỤC SẢN PHẨM</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center ml-8 gap-8">
              <Link href="/warranty" className="flex items-center gap-2 py-3 text-black hover:text-green-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Chính Sách Bảo Hành - Đổi Trả</span>
              </Link>
              <Link href="/payment" className="flex items-center gap-2 py-3 text-black hover:text-green-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Hình Thức Thanh Toán</span>
              </Link>
              <Link href="/shipping" className="flex items-center gap-2 py-3 text-black hover:text-green-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M13 16V6C13 5.44772 12.5523 5 12 5H5C4.44772 5 4 5.44772 4 6V16C4 16.5523 4.44772 17 5 17H12C12.5523 17 13 16.5523 13 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 7H16.5858C16.851 7 17.1054 7.10536 17.2929 7.29289L20.7071 10.7071C20.8946 10.8946 21 11.149 21 11.4142V16C21 16.5523 20.5523 17 20 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 17V20M8 20H16M8 20H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Chính Sách Giao Hàng</span>
              </Link>
              <Link href="/installment" className="flex items-center gap-2 py-3 text-black hover:text-green-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M12 8C8.13401 8 5 11.134 5 15M12 8C15.866 8 19 11.134 19 15M12 8V4M12 8L7 3M12 8L17 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Hỗ trợ trả góp lãi suất 0%</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header