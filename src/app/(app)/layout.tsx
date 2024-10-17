import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Only wrap children here, no html/body tags */}
      <Navbar/>
      {children}
    </>
  );
}
