"use client"
import { useState, useEffect, useRef } from 'react'
import { Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Search, Heart, ShoppingCart, User, Store, Menu, ArrowLeft, ChevronRight, Truck } from "lucide-react"
import { Cart } from './Cart';
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { MobileOtpLogin } from './mobile-otp-login';
import UserEmailLoginForm from './userEmailLoginForm';

export function Header() {
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery) {
      // Simulating API call for search suggestions
      const suggestions = ['Sofa', 'Dining Table', 'Bed', 'Wardrobe'].filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchSuggestions(suggestions)

      // Simulating API call for search results
      const results = ['Leather Sofa', 'Wooden Dining Table', 'Queen Size Bed', 'Modern Wardrobe'].filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchSuggestions([])
      setSearchResults([])
    }
  }, [searchQuery])

  const categories = [
    {
      name: "Sale",
      icon: "/placeholder.svg?height=40&width=40",
      highlight: true,
      href: "/sale",
      submenu: [
        { 
          name: "Flash Sale", 
          href: "/sale/flash",
          submenu: [
            { name: "Today's Deals", href: "/sale/flash/today" },
            { name: "Upcoming Deals", href: "/sale/flash/upcoming" },
          ]
        },
        { 
          name: "Clearance", 
          href: "/sale/clearance",
          submenu: [
            { name: "Final Stock", href: "/sale/clearance/final-stock" },
            { name: "Overstock", href: "/sale/clearance/overstock" },
          ]
        },
        { 
          name: "Bundle Offers", 
          href: "/sale/bundles",
          submenu: [
            { name: "Room Sets", href: "/sale/bundles/room-sets" },
            { name: "Combo Deals", href: "/sale/bundles/combo-deals" },
          ]
        },
      ],
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Sofas & Seating",
      icon: "/placeholder.svg?height=40&width=40",
      href: "/category/sofas-seating",
      submenu: [
        { 
          name: "Sofa Sets", 
          href: "/category/sofas-seating/sofa-sets",
          submenu: [
            { name: "3-Seater Sofas", href: "/category/sofas-seating/sofa-sets/3-seater" },
            { name: "2-Seater Sofas", href: "/category/sofas-seating/sofa-sets/2-seater" },
          ]
        },
        { 
          name: "Sectionals", 
          href: "/category/sofas-seating/sectionals",
          submenu: [
            { name: "L-Shaped", href: "/category/sofas-seating/sectionals/l-shaped" },
            { name: "U-Shaped", href: "/category/sofas-seating/sectionals/u-shaped" },
          ]
        },
        { 
          name: "Recliners", 
          href: "/category/sofas-seating/recliners",
          submenu: [
            { name: "Manual Recliners", href: "/category/sofas-seating/recliners/manual" },
            { name: "Power Recliners", href: "/category/sofas-seating/recliners/power" },
          ]
        },
      ],
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Living",
      icon: "/placeholder.svg?height=40&width=40",
      href: "/category/living",
      submenu: [
        { 
          name: "TV Units", 
          href: "/category/living/tv-units",
          submenu: [
            { name: "Wall-Mounted", href: "/category/living/tv-units/wall-mounted" },
            { name: "Floor Standing", href: "/category/living/tv-units/floor-standing" },
          ]
        },
        { 
          name: "Coffee Tables", 
          href: "/category/living/coffee-tables",
          submenu: [
            { name: "Wood", href: "/category/living/coffee-tables/wood" },
            { name: "Glass", href: "/category/living/coffee-tables/glass" },
          ]
        },
        { 
          name: "Bookshelves", 
          href: "/category/living/bookshelves",
          submenu: [
            { name: "Ladder Shelves", href: "/category/living/bookshelves/ladder" },
            { name: "Corner Shelves", href: "/category/living/bookshelves/corner" },
          ]
        },
      ],
      image: "/placeholder.svg?height=200&width=300"
    },
  ]

  const renderSubmenu = (items:any, level = 0) => {
    return items.map((item:any) => (
      <div key={item.name} className={`pl-${level * 4}`}>
        <Link href={item.href} className="block py-2 text-sm text-muted-foreground hover:text-primary">
          {item.name}
        </Link>
        {item.submenu && (
          <div className="pl-4">
            {renderSubmenu(item.submenu, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <>
    <header className="w-full border-b">
      {/* Mobile Header */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full p-0 sm:max-w-sm">
                <SheetHeader className="border-b px-4 py-3">
                  <SheetTitle className="flex items-center gap-3 text-base font-normal">
                    {activeSubmenu.length > 0 ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => setActiveSubmenu(activeSubmenu.slice(0, -1))}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => setIsOpen(false)}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    )}
                    <img
                      src="https://fernindia.com/wp-content/uploads/2024/10/logo-e1729487436319-400x114.png"
                      alt="FernIndia"
                      width={120}
                      height={40}
                      className="h-6 w-auto"
                    />
                    <div className="ml-auto">
                      <Link href="#" className="text-sm text-primary">
                        Register / Login
                      </Link>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="border-b bg-orange-50 px-4 py-3">
                  <Link href="#" className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-orange-500" />
                      <div>
                        <span className="font-medium text-orange-500">Get Extra Upto 10% OFF</span>
                        <br />
                        <span className="text-muted-foreground">On Visiting Your Nearest Store</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                </div>
                <div className="flex flex-col py-2">
                  {activeSubmenu.length === 0 ? (
                    categories.map((category) => (
                      <Button
                        key={category.name}
                        variant="ghost"
                        className="flex w-full items-center justify-between px-4 py-3"
                        onClick={() => setActiveSubmenu([category.name])}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={category.icon}
                            alt={category.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-lg border object-cover"
                          />
                          <span className={category.highlight ? "text-orange-500" : ""}>
                            {category.name}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    ))
                  ) : (
                    renderMobileSubmenu(categories, activeSubmenu, setActiveSubmenu, setIsOpen)
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <img
              src="https://fernindia.com/wp-content/uploads/2024/10/logo-e1729487436319-400x114.png"
              alt="FernIndia"
              width={120}
              height={40}
              className="h-6 w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Truck className="h-5 w-5" />
              <span className="sr-only">Delivery</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            {/* Cart Sidebar */}
            <Sheet open={cartIsOpen} onOpenChange={setCartIsOpen}>
                    <SheetTrigger asChild>
                      <Button onClick={() => {
                        setCartIsOpen;
                        console.log("cart Displayed");
                      }} variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                      </Button>
                    </SheetTrigger>
                  <SheetContent className="flex w-full flex-col sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Shopping Cart
                      </SheetTitle>
                    </SheetHeader>
                    <Cart />
                  </SheetContent>
                </Sheet>
          </div>
        </div>
        {showSearch && (
          <div className="border-b px-4 py-2" ref={searchRef}>
            <div className="relative">
              <Input
                placeholder="Search Products"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              {(searchSuggestions.length > 0 || searchResults.length > 0) && (
                <div className="absolute left-0 z-40 right-0 top-full mt-1 rounded-md border bg-background shadow-lg">
                  {searchSuggestions.length > 0 && (
                    <div className="p-2">
                      <h3 className="mb-1 text-sm font-semibold">Suggestions</h3>
                      <ul>
                        {searchSuggestions.map((suggestion, index) => (
                          <li key={index} className="cursor-pointer p-1 text-sm hover:bg-muted">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="p-2">
                      <h3 className="mb-1 text-sm font-semibold">Results</h3>
                      <ul>
                        {searchResults.map((result, index) => (
                          <li key={index} className="cursor-pointer p-1 text-sm hover:bg-muted">
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        {/* Top bar */}
        <div className="border-b px-4 py-2 text-xs">
          <div className="mx-auto flex max-w-7xl justify-end gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              SELL ON FernIndia
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              BECOME A FRANCHISEE
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              BUY IN BULK
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              GIFT CARDS
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              TRACK YOUR ORDER
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              CONTACT US
            </Link>
          </div>
        </div>

        {/* Main header */}
        <div className="border-b px-4 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-1 md:flex-none">
              <Link href="/" className="mx-auto block w-fit">
                <img
                  src="https://fernindia.com/wp-content/uploads/2024/10/logo-e1729487436319-400x114.png"
                  alt="FernIndia"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Search */}
            <div className="relative hidden w-full max-w-md md:block">
              <Input
                className="pl-10"
                placeholder="Search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)} 
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              {showSearch && (searchSuggestions.length > 0 || searchResults.length > 0) && (
                <div className="absolute left-0 z-40 right-0 top-full mt-1 rounded-md border bg-background shadow-lg">
                  {searchSuggestions.length > 0 && (
                    <div className="p-2">
                      <h3 className="mb-1 text-sm font-semibold">Suggestions</h3>
                      <ul>
                        {searchSuggestions.map((suggestion, index) => (
                          <li key={index} className="cursor-pointer p-1 text-sm hover:bg-muted">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="p-2">
                      <h3 className="mb-1 text-sm font-semibold">Results</h3>
                      <ul>
                        {searchResults.map((result, index) => (
                          <li key={index} className="cursor-pointer p-1 text-sm hover:bg-muted">
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="link" className="h-auto p-0 text-sm">
                  Sign Up Now
                </Button>
                <p className="text-xs text-orange-500">
                  Get Credits worth INR 10,000
                </p>
              </div>
              <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* <MobileOtpLogin /> */}
                  <UserEmailLoginForm />
                </DialogContent>
              </Dialog>
                
                <Button variant="ghost" size="icon">
                  <Store className="h-5 w-5" />
                  <span className="sr-only">Find a Store</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Button>
                
                {/* Cart Sidebar */}
                  <Sheet open={cartIsOpen} onOpenChange={setCartIsOpen}>
                    <SheetTrigger asChild>
                      <Button onClick={() => {
                        setCartIsOpen;
                        console.log("cart Displayed");
                      }} variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                      </Button>
                    </SheetTrigger>
                  <SheetContent className="flex w-full flex-col sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Shopping Cart
                      </SheetTitle>
                    </SheetHeader>
                    <Cart />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation with Mega Menus */}
        <nav className="relative px-4 ">
          <ul className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto py-2 text-sm font-medium sticky top-0">
            {categories.map((category) => (
              <li key={category.name} className="shrink-0">
                <HoverCard openDelay={0} closeDelay={0}>
                  <HoverCardTrigger asChild>
                    <Link  href={category.href} className={`hover:text-primary ${category.highlight ? 'text-orange-500' : ''}`}>
                      {category.name}
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="left-0 w-screen max-w-screen-xl translate-x-0" align="start">
                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div className="col-span-4 grid grid-cols-3 gap-8">
                        {category.submenu.map((item) => (
                          <div key={item.name}>
                            <h3 className="mb-2 font-semibold">
                              <Link href={item.href} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </h3>
                            {item.submenu && (
                              <ul className="space-y-2">
                                {item.submenu.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link href={subItem.href} className="text-sm text-muted-foreground hover:text-primary">
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="col-span-1">
                        <img
                          src={category.image}
                          alt={`${category.name} promotion`}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </li>
            ))}
          </ul>
        </nav>
      </div>


          
    </header>
        
    
    </>

          

            
  );
}

function renderMobileSubmenu(categories:any, activeSubmenu:any, setActiveSubmenu:any, setIsOpen:any) {
  
  let currentLevel = categories
  for (const submenuName of activeSubmenu) {
    const foundCategory = currentLevel.find((cat:any )=> cat.name === submenuName)
    if (foundCategory && foundCategory.submenu) {
      currentLevel = foundCategory.submenu
    } else {
      break
    }
  }

  return currentLevel.map((item:any) => (
    <Button
      key={item.name}
      variant="ghost"
      className="flex w-full items-center justify-between px-4 py-3"
      onClick={() => item.submenu ? setActiveSubmenu([...activeSubmenu, item.name]) : setIsOpen(false)}
    >
      <span>{item.name}</span>
      {item.submenu ? (
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      ) : null}
    </Button>
  ))
}