'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SharedIcon from '@/components/shared/icons'
import { FaChevronDown, FaChevronRight, FaPhone, FaSearch, FaUser } from 'react-icons/fa'
import { headerData } from './mockHeaderData'
import { IconName } from '@/constants/icons'

const MegaMenu = () => {
  // Map category icons to available SharedIcon names
  const getIconName = (icon: string): IconName => {
    const iconMap: { [key: string]: IconName } = {
      'PC': 'MENU',
      'CPU': 'MENU',
      'COMPONENTS': 'MENU',
      'MONITOR': 'MENU',
      'GAMEPAD': 'MENU',
      'LAPTOP': 'MENU',
      'FURNITURE': 'MENU',
      'STREAMING': 'MENU',
      'ACCESSORIES': 'MENU',
      'SPEAKER': 'MENU',
    }
    return iconMap[icon] || 'MENU'
  }

  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="absolute top-full left-0 w-full bg-gray-50 shadow-lg z-50">
      <div className="flex min-h-[350px]">
        {/* Main Categories */}
        <div className="w-[246px] min-w-[246px] border-r border-gray-200 bg-white max-h-[350px] overflow-y-auto">
          {headerData.map((category, index) => (
            <div 
              key={index}
              onMouseEnter={() => setActiveCategory(category.title)}
              className={`relative ${activeCategory === category.title ? 'bg-gray-50' : ''}`}
            >
              <Link 
                href={category.href}
                className={`flex items-center gap-2 px-4 py-2 group justify-between hover:bg-gray-50 transition-all duration-300`}
                onClick={(e) => {
                  if (category.submenu) {
                    e.preventDefault()
                  }
                }}
              >
                <div className='flex items-center gap-2'>
                  <SharedIcon 
                    iconName={getIconName(category.icon)} 
                    width={20} 
                    height={20} 
                    className="text-gray-500 group-hover:text-primary"
                  />
                  <span className="font-medium text-gray-700 group-hover:text-primary whitespace-nowrap transition-all duration-400">
                    {category.title}
                  </span>
                </div>
                {category.submenu && (
                  <FaChevronRight className="text-gray-400 w-3 h-3" />
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Submenu Panel */}
        <div className={`min-w-[750px] max-h-[350px] overflow-y-auto flex-1 shadow-lg bg-white transition-all duration-300 ${activeCategory ? 'opacity-100' : 'opacity-0'}`}>
          {activeCategory && (
            <div className="p-6 h-full">
              <div className="grid grid-cols-3 gap-6">
                {headerData.find(cat => cat.title === activeCategory)?.submenu?.map((submenu, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-medium text-gray-900 pb-2 border-b border-gray-200">
                      {submenu.title}
                    </h3>
                    <ul className="space-y-2">
                      {submenu.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link 
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-primary block py-1"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Header = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false)

  return (
    <>
      {/* Overlay */}
      {showMegaMenu && (
        <div 
          className="fixed inset-0 bg-black opacity-25 z-40 transition-opacity duration-300"
          onClick={() => setShowMegaMenu(false)}
        />
      )}
      
      <header className="w-full relative z-99">
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
                  className="w-full h-10 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none placeholder:text-gray-500"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-black h-[90%] w-[80px] flex items-center justify-center rounded-md">
                  <FaSearch className='text-white' />
                </button>
              </div>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-6">
              {/* Hotline */}
              <div className="flex items-center gap-2">
                <FaPhone className='text-white' />
                <div>
                  <div className="text-green-500 text-xs font-medium">Hotline</div>
                  <div className="text-green-500 text-sm font-medium">02899998399</div>
                </div>
              </div>

              {/* Store Locations */}
              <div className="flex items-center gap-2">
                <SharedIcon iconName="LOCATION" className="text-white" />
                <div>
                  <div className="text-green-500 text-xs font-medium">Hệ thống</div>
                  <div className="text-green-500 text-sm font-medium">cửa hàng</div>
                </div>
                <FaChevronDown className='text-white' />
              </div>

              {/* Account */}
              <div className="flex items-center gap-2">
                <FaUser className='text-white w-6 h-6' />
                <div>
                  <div className="text-green-500 text-xs font-medium">Đăng nhập</div>
                  <div className="text-green-500 text-sm font-medium">Đăng ký</div>
                </div>
                <FaChevronDown className='text-white' />
              </div>

              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-2 bg-black border border-white rounded-lg px-4 py-2">
                <div className="relative">
                  <SharedIcon iconName="CART" className="text-white" />
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
        <div className="w-full bg-white border-t border-gray-800 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              {/* Category Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <div className="flex items-center gap-2 px-4 bg-black cursor-pointer py-1.5">
                  <SharedIcon iconName="MENU_ACTIVE" className="" />
                  <span className="text-title text-base uppercase font-bold">DANH MỤC SẢN PHẨM</span>
                </div>
                {showMegaMenu && <MegaMenu />}
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-x-auto whitespace-nowrap ml-8 scrollbar-hide">
                <nav className="flex items-center gap-8 py-1.5 min-w-max">
                  <Link href="/warranty" className="flex items-center gap-2 text-black hover:text-green-500">
                    <SharedIcon iconName="WARRANTY" width={20} height={20} className="text-gray-400" />
                    <span>Chính Sách Bảo Hành - Đổi Trả</span>
                  </Link>
                  <Link href="/payment" className="flex items-center gap-2 text-black hover:text-green-500">
                    <SharedIcon iconName="PAYMENT" width={20} height={20} className="text-gray-400" />
                    <span>Hình Thức Thanh Toán</span>
                  </Link>
                  <Link href="/shipping" className="flex items-center gap-2 text-black hover:text-green-500">
                    <SharedIcon iconName="SHIPPING" width={20} height={20} className="text-gray-400" />
                    <span>Chính Sách Giao Hàng</span>
                  </Link>
                  <Link href="/installment" className="flex items-center gap-2 text-black hover:text-green-500">
                    <SharedIcon iconName="INSTALLMENT" width={20} height={20} className="text-gray-400" />
                    <span>Hỗ trợ trả góp lãi suất 0%</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header