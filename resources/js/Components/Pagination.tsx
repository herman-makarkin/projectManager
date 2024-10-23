import { LinkProps } from '@/props';
import { Link } from '@inertiajs/react';

export default function Paginatio({ links }: { links: LinkProps[] }) {
    const linkClass = 'page-item page-link text-nowrap ';
    return (
        <nav className="pagination" style={{ maxHeight: 40 }}>
            {links.slice(1, -1).map((link: LinkProps, i: number) => (
                <Link
                    className={
                        linkClass + (link.active ? 'active' : 'text-secondary')
                    }
                    disabled={!link.url}
                    preserveScroll
                    key={i}
                    href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
