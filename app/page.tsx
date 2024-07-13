import Image from "next/image";
import Greet from "./greet";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> this is test</div>
      <div className="p-4">
        <div className="container">
          <h1>Hi {}</h1>
          <p>You&apos;re logged in with Next.js & JWT!!</p>
          {/* <p><link href="/">Manage Users</link></p> */}
        </div>
      </div>
      <Greet />
    </main>
  );
}
