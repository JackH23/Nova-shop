import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    breadcrumb?: string;
    description?: string;
    children?: ReactNode;
};

export default function PageHeader({
    title,
    breadcrumb,
    description,
    children,
}: PageHeaderProps) {
    return (
        <div className="mb-5 flex items-end justify-between gap-4">
            <div>
                {breadcrumb && (
                    <p className="mb-1 text-xs text-slate-500 dark:text-slate-300">
                        {breadcrumb}
                    </p>
                )}

                <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                )}
            </div>

            {children && <div>{children}</div>}
        </div>
    );
}