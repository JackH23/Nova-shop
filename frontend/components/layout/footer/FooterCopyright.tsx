type FooterCopyrightProps = {
  withBorder?: boolean;
  centered?: boolean;
};

export default function FooterCopyright({
  withBorder = true,
  centered = true,
}: FooterCopyrightProps) {
  return (
    <div
      className={`${
        withBorder
          ? "mt-7 border-t border-slate-200 pt-4"
          : ""
      } ${centered ? "text-center" : ""}`}
    >
      <p className="text-[9px] text-slate-600">
        © 2026 NovaShop Inc. All rights reserved.
      </p>
    </div>
  );
}