import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (

    <main>
      <div>
        <p className="mt-10 text-center text-red-500" style={{ textDecoration: "underline", textDecorationColor: "black" }}>By default all the components inside the app are
          server components - means components runs only on the server,
          and their rendered HTML is sent to the client
        </p>

        <p className="mt-10 text-center text-gray-700" style={{ textDecoration: "underline", textDecorationColor: "red" }}>
          By default all the components inside the app are server Components,
          But the server components can't listen to browser events</p>
          
      </div>
      <h1>Hello world</h1>
      <Link href="/users" className="underline">Go to Users</Link>
      <ProductCard />
    </main>
  );
}
