import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <>
            <Navbar
                className="position-fixed z-3 w-100 border-bottom bg-white pe-3 ps-3"
                expand="md"
            >
                <Container>
                    <Navbar.Brand>
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className="border-none"
                    />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="border-none pb-2"
                    >
                        <Nav className="me-auto">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route('project.index')}
                                active={route().current('project.index')}
                            >
                                {' '}
                                Projects
                            </NavLink>
                            <NavLink
                                href={route('task.index')}
                                active={route().current('task.index')}
                            >
                                Tasks
                            </NavLink>
                            <NavLink
                                href={route('user.index')}
                                active={route().current('user.index')}
                            >
                                Users
                            </NavLink>
                            <NavLink
                                href={route('task.myTasks')}
                                active={route().current('task.myTasks')}
                            >
                                My Tasks
                            </NavLink>
                        </Nav>

                        <NavDropdown
                            title={user.name}
                            id="basic-nav-dropdown"
                            role="button"
                        >
                            <NavDropdown.Item href={route('profile.edit')}>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item as="button">
                                <NavLink
                                    href={route('logout')}
                                    active={route().current('/')}
                                    method="post"
                                >
                                    Log Out
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {header && (
                <header className="bg-white pt-5 shadow">
                    <div className="w-100 container mt-5 pb-4">{header}</div>
                </header>
            )}

            <Container className="mt-3 py-3 shadow">{children}</Container>
        </>
    );
}
