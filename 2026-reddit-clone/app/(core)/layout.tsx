import LeftSidebar from "@/components/layout/LeftSidebar";
import Navbar from "@/components/layout/Navbar";

export default async function CoreGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div>
        <LeftSidebar />
        <div>{children}</div>
      </div>
    </>
  );
}
