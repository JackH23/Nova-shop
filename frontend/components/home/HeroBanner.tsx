import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="px-4 pt-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-lg">
        <Image
          src="/images/hero-banner.jpg"
          alt="Fashion collection"
          width={1680}
          height={896}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}