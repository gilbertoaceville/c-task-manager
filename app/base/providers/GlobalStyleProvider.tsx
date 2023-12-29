"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

export default function GlobalStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pages = ["/sign-in", "/sign-up"];

  const isAuthPage = pages.includes(pathname);
  return (
    <GlobalStyles data-is-auth={String(isAuthPage)}>{children}</GlobalStyles>
  );
}

const GlobalStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  &[data-is-auth="true"] {
    @media screen and (max-width: 767px) {
      padding: 0;
      gap: 0;
    }
  }

  .cl-internal-b3fm6y {
    display: none;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;
