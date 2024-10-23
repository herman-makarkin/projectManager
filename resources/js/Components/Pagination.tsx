import { LinkProps } from '@/props';
import { Link } from '@inertiajs/react';

export default function Paginatio({ links }: { links: LinkProps[] }) {
    const linkClass = 'page-item page-link text-nowrap ';
    const maxPages = 6;
    return (
        <nav className="pagination" style={{ maxHeight: 40 }}>
            {links.map((link: LinkProps, i: number) => (
                <Link
                    className={
                        linkClass +
                        (link.active ? 'active' : '') +
                        (!link.url ? 'd-none' : '')
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
