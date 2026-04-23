import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/testimage.jpg"
          alt="Test image"
          width={300}
          height={300}
          priority
        />
      </div>
    </main>
  );
}
