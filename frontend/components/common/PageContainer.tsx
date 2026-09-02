import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 lg:px-10">
      {children}
    </section>
  );
}