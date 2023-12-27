"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { useUniversalContext } from "@/base/context/universalProvider";
import { menuItems } from "@/base/constants/menu.const";

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

  function handleClick(link: string) {
    router.push(link);
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
      {/* <div className="sign-out relative m-6">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => {
            signOut(() => router.push("/signin"));
          }}
        />
      </div> */}
    </StyledSideBar>
  );
}
