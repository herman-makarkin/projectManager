import { Link } from '@inertiajs/react';

export default function Pagination({ links }: any) {
    return (
        <nav>
            {links.map((link: any, i: number) => (
                <Link
                    preserveScroll
                    key={i}
                    href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
