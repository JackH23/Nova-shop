import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="mb-10 w-full">
      <Image
        src="/images/hero-banner.jpg"
        alt="Fashion collection"
        width={1680}
        height={896}
        priority
        className="h-auto w-full"
      />
    </section>
  );
}