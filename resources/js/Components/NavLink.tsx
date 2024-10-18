import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <li className="d-flex flex-column justify-content-center">
            <Link
                {...props}
                className={
                    'nav-item col-6 col-lg-auto nav-link px-lg-2 px-0 py-2 ' +
                    (active ? 'active' : ' ' + className)
                }
            >
                {children}
            </Link>
        </li>
    );
}
