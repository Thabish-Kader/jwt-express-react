import { Tweets } from "@/components/Tweets";

export default async function Dashboard() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-l from-pink-500 to-violet-500">
          Welcome to the Dashboard
        </h1>
        <Tweets />
      </div>
    </main>
  );
}
