import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto">
      <h1>Login</h1>
      <form className="flex flex-col space-y-2 ">
        <input type="text" />
        <input type="text" />
        <button>Submit</button>
      </form>
    </main>
  );
}
