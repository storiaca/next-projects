import { Metadata } from "next";
import Button from "../components/Button";

export const metadata: Metadata = {
  title: "About Title",
  description: "About page description",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl">About page</h1>
      <Button />
    </div>
  );
}
