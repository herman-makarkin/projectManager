import Pagination from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { queryParamsProps, UserData, UserProps } from '@/props';
import { Head, Link, router } from '@inertiajs/react';
import { Table } from 'react-bootstrap';
export default function Index({
    users,
    queryParams = null,
    success,
}: {
    users: UserData;
    queryParams: queryParamsProps | null;
    success?: string | null;
}) {
    queryParams = queryParams || {};
    const search = (name: string, value: string | null): void => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('user.index'), queryParams);
    };

    const onKeyPress = (
        name: string,
        e: React.KeyboardEvent<HTMLInputElement>,
        key: string,
    ): void => {
        const searchKey = 'Enter';
        if (key !== searchKey) return;
        search(name, e.currentTarget.value);
    };

    const sortChanged = (name: string): void => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_mode === 'asc') {
                queryParams.sort_mode = 'desc';
            } else {
                queryParams.sort_mode = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_mode = 'asc';
        }
        router.get(route('user.index'), queryParams);
    };

    const removeUser = (user: UserProps): void => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            router.delete(route('user.destroy', user.id));
        }
        return;
    };
    return (
        <Authenticated
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="text-gray fs-3">Users</h2>
                    <Link
                        href={route('user.create')}
                        className="btn btn-success"
                    >
                        add new user
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="bg-gray pb-2 pt-2">
                {success && (
                    <div className="alert alert-success">{success}</div>
                )}
                <Table className="mt-3" responsive>
                    <thead>
                        <tr>
                            <TableHeading
                                name="id"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                ID
                            </TableHeading>
                            {/* <td scope='col'>Image</td> */}
                            <TableHeading
                                name="name"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Name
                            </TableHeading>
                            <TableHeading
                                name="email"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Email
                            </TableHeading>
                            <TableHeading
                                name="gender"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Gender
                            </TableHeading>
                            <TableHeading
                                name="birthdate"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Birthdate
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Creation Date
                            </TableHeading>
                            <TableHeading sortable={false}>
                                Actions
                            </TableHeading>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            {/* <td scope='col'></td> */}
                            <td scope="col">
                                <TextInput
                                    placeholder="User name"
                                    defaultValue={queryParams.name}
                                    onBlur={(e) =>
                                        search('name', e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        onKeyPress('name', e, e.key)
                                    }
                                />
                            </td>
                            <td scope="col">
                                <TextInput
                                    defaultValue={queryParams.email}
                                    placeholder="User email"
                                    onBlur={(e) =>
                                        search('email', e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        onKeyPress('email', e, e.key)
                                    }
                                />
                            </td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id}>
                                <th scope="row" className="align-middle">
                                    {user.id}
                                </th>
                                {/* <td
                                    className='align-middle'
                                    style={{
                                        maxWidth: 100,
                                    }}
                                >
                                    <img src={user.image_path} alt='' />
                                </td> */}
                                <td className="align-middle">
                                    <Link href={route('user.show', user.id)}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td className="align-middle">{user.email}</td>
                                <td className="align-middle">{user.gender}</td>
                                <td className="align-middle">
                                    {user.birthdate}
                                </td>
                                <td className="align-middle">
                                    {user.created_at}
                                </td>
                                <td className="align-middle">
                                    <Link
                                        className="text-success me-2"
                                        href={route('user.edit', user.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-danger mt-lg-0 mt-3"
                                        onClick={() => removeUser(user)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                    <Pagination links={users.meta.links} />
                </div>
            </div>
        </Authenticated>
    );
}
