import { LinkProps } from '@/props';
import { Link } from '@inertiajs/react';

interface Pagination {
    links: LinkProps[];
}
export default function Pagination({ links }: Pagination) {
    return (
        <nav className="pagination">
            {links.map((link: LinkProps, i: number) => (
                <Link
                    className={
                        'page-item page-link ' +
                        (link.active ? 'active' : '') +
                        (!link.url ? 'text-secondary' : '')
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
