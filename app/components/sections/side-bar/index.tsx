"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { useUniversalContext } from "@/base/context/universalProvider";
import { menuItems } from "@/base/constants/menu.const";
import { useClerk } from "@clerk/nextjs";
import Button from "@/components/elements/button";
import { logout } from "@/base/constants/icons.const";

import { StyledSideBar } from "./styled.const";

export default function Sidebar({
  firstName = "John",
  lastName = "Doe",
  menu = menuItems,
  imageUrl = "/profile.png",
}) {
  const { theme } = useUniversalContext();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  function handleClick(link: string) {
    router.push(link);
  }

  function handleSignOut() {
    signOut(() => router.push("/sign-in"));
  }

  return (
    <StyledSideBar theme={theme}>
      {/* <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button> */}
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt={"profile"} />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          {/* <UserButton /> */}
        </div>
        <h1 className="capitalize">
          {firstName} {lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name="Sign Out"
          type="submit"
          variant="secondary"
          icon={logout}
          click={handleSignOut}
        />
      </div>
    </StyledSideBar>
  );
}
