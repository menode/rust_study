import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <Link href="/login">
          Login
        </Link>
      <h1 className="text-4xl font-bold text-center">Welcome to Next.js</h1>
    </main>
  );
}
