import { cookies } from "next/dist/server/request/cookies";
import { Navbar } from "@/components/layout/navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  const isLoggedIn = !!token;
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
    </>
  );
}
