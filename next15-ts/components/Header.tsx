import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href={"/"}>Pocetna</Link>
      <Link href={"/users"}>Korisnici</Link>
      <Link href={"/about"}>O Nama</Link>
    </div>
  );
}
