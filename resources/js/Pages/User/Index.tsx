import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { queryParamsProps, UserData, UserProps } from '@/props';
import { Head, Link, router } from '@inertiajs/react';

interface Index {
    users: UserData;
    queryParams: queryParamsProps;
    success?: string | null;
}

export default function Index({ users, queryParams = null, success }: Index) {
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
                <table className="mt-3 table">
                    <thead>
                        <tr>
                            <th scope="col" onClick={() => sortChanged('id')}>
                                ID
                            </th>
                            {/* <td scope="col">Image</td> */}
                            <td scope="col" onClick={() => sortChanged('name')}>
                                Name
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('email')}
                            >
                                Email
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('gender')}
                            >
                                Gender
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('birthdate')}
                            >
                                Birthdate
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('created_at')}
                            >
                                Created at
                            </td>
                            <td scope="col">
                                <p className="text-end">Actions</p>
                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            {/* <td scope="col"></td> */}
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
                                    className="align-middle"
                                    style={{
                                        maxWidth: 100,
                                    }}
                                >
                                    <img src={user.image_path} alt="" />
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
                                        className="text-success"
                                        href={route('user.edit', user.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-danger ms-2"
                                        onClick={() => removeUser(user)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Pagination links={users.meta.links} />
                </div>
            </div>
        </Authenticated>
    );
}
