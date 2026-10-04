import Image from "next/image";

export default function DealsHero() {
  return (
    <section className="mt-10 overflow-hidden rounded-lg bg-slate-100 transition-colors dark:bg-slate-900">
      <div className="grid min-h-[340px] md:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-950/50 dark:text-red-400">
            Hot Deals
          </span>

          <h2 className="mt-3 text-xl font-bold text-slate-950 dark:text-white">
            Today's Best Deals
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
            Limited-time offers on selected products. Don't miss out on these
            incredible savings.
          </p>
        </div>

        {/* Right */}
        <div className="relative min-h-[340px]">
          <Image
            src="/images/deal-hero-banner.jpg"
            alt="Today's best deals"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}