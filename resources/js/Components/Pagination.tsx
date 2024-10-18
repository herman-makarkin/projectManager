import { Link } from '@inertiajs/react';

export default function Pagination({ links }: any) {
    return (
        <nav className="pagination">
            {links.map((link: any, i: number) => (
                <Link
                    className={
                        'page-item page-link ' + (link.active ? 'active' : '')
                    }
                    preserveScroll
                    key={i}
                    href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
