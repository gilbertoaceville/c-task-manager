"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { useUniversalContext } from "@/base/context/universalProvider";
import { menuItems } from "@/base/constants/menu.const";
import { useClerk, UserButton } from "@clerk/nextjs";
import Button from "@/components/elements/button";
import { arrowLeft, bars, logout } from "@/base/constants/icons.const";

import { StyledSideBar } from "./styled.const";

export default function Sidebar({ menu = menuItems }) {
  const { theme, isOpenedMenu, handleOpenMenu } = useUniversalContext();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut, user } = useClerk();

  function handleClick(link: string) {
    router.push(link);
  }

  function handleSignOut() {
    signOut(() => router.push("/sign-in"));
  }

  return (
    <StyledSideBar isOpenedMenu={isOpenedMenu} theme={theme}>
      <button className="toggle-nav" onClick={handleOpenMenu}>
        {isOpenedMenu ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            width={70}
            height={70}
            src={user?.imageUrl || "/profile.png"}
            alt={"profile"}
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          {user?.firstName} {user?.lastName}
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
