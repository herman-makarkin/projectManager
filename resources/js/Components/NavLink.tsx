import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <li className="nav-item d-flex flex-column justify-content-center">
            <Link
                {...props}
                className={'nav-link ' + (active ? 'active' : ' ' + className)}
            >
                {children}
            </Link>
        </li>
    );
}
