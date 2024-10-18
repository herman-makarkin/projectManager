import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

interface IndexProps {}

export default function Index({ projects, queryParams = null }: any) {
    queryParams = queryParams || {};
    const search = (name: string, value: string) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
    };

    const onKeyPress = (name: string, e: any) => {
        if (e.key !== 'Enter') return;

        search(name, e.target.value);
    };

    const sortChanged = (name: string) => {
        if (name === queryParams[name]) {
            if (queryParams.sort_mode === 'asc') {
                queryParams.sort_mode = 'desc';
            } else {
                queryParams.sort_mode = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_mode = 'asc';
        }
        router.get(route('project.index'), queryParams);
    };
    return (
        <Authenticated
            //user={auth.user}
            header={<h2 className="text-gray fs-3">Projects</h2>}
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="bg-gray pb-2 pt-2">
                            {/* <pre className="text-gray">
                                {JSON.stringify(projects, undefined, 2)}
                            </pre> */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            onClick={(e) => sortChanged('id')}
                                        >
                                            ID
                                        </th>
                                        <td scope="col">Image</td>
                                        <td
                                            scope="col"
                                            onClick={(e) => sortChanged('name')}
                                        >
                                            Name
                                        </td>
                                        <td
                                            scope="col"
                                            onClick={(e) =>
                                                sortChanged('status')
                                            }
                                        >
                                            Status
                                        </td>
                                        <td
                                            scope="col"
                                            onClick={(e) =>
                                                sortChanged('created_at')
                                            }
                                        >
                                            Creation date
                                        </td>
                                        <td
                                            scope="col"
                                            onClick={(e) =>
                                                sortChanged('deadline')
                                            }
                                        >
                                            Deadline
                                        </td>
                                        <td scope="col">Creator</td>
                                        <td scope="col">
                                            <p className="text-end">Actions</p>
                                        </td>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <td scope="col"></td>
                                        <td scope="col">
                                            <TextInput
                                                placeholder="Project name"
                                                defaultValue={queryParams.name}
                                                onBlur={(e) =>
                                                    search(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress('name', e)
                                                }
                                            />
                                        </td>
                                        <td scope="col">
                                            <SelectInput
                                                defaultValue={
                                                    queryParams.status
                                                }
                                                onChange={(e) =>
                                                    search(
                                                        'status',
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Status
                                                </option>
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="finished">
                                                    Finished
                                                </option>
                                            </SelectInput>
                                        </td>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                        <td scope="col"></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project: any) => (
                                        <tr key={project.id}>
                                            <td>{project.id}</td>
                                            <td
                                                style={{
                                                    maxWidth: 100,
                                                }}
                                            >
                                                <img
                                                    src={project.image_path}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        'project.show',
                                                        project.id,
                                                    )}
                                                >
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td className="position-relative">
                                                <span
                                                    className={
                                                        PROJECT_STATUS_CLASS_MAP[
                                                            project.status
                                                        ] +
                                                        ' position-absolute top-50 start-50 translate-middle'
                                                    }
                                                >
                                                    {
                                                        PROJECT_STATUS_TEXT_MAP[
                                                            project.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td>{project.created_at}</td>
                                            <td>{project.deadline}</td>
                                            <td>{project.creator.name}</td>
                                            <td>
                                                <Link
                                                    className="text-success"
                                                    href={route(
                                                        'project.edit',
                                                        project.id,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    className="text-danger ms-2"
                                                    href={route(
                                                        'project.destroy',
                                                        project.id,
                                                    )}
                                                >
                                                    Destroy
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
