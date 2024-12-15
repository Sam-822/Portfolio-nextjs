import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const menuItems = ["Home", "Projects", "About", "Conact Me"];
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Projects", link: "/projects" },
    { label: "About", link: "/#about" },
    { label: "Conact Me", link: "/#contact" },
  ];
  return (
    <Navbar
      isBordered
      className=""
      classNames={{ base: "nav-glass", wrapper: "max-w-screen-xl md:px-0" }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Link href="/">
          <Image
            src={"/logo.svg"}
            height={50}
            width={30}
            alt=""
            className="h-full me-10"
          />
        </Link>
        <Link href="/" className="font-semibold text-xl sm:text-3xl">
          Abdul Samad Ansari
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/projects">Projects</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/#about">About</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/#contact">Conact Me</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="max-w-56 ms-auto items-end">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={item.link}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
    </Navbar>
  );
};

export default NavBar;
