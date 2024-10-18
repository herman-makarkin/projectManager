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
    return (
        <Authenticated
            //user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="bg-gray">
                            {/* <pre className="text-gray">
                                {JSON.stringify(projects, undefined, 2)}
                            </pre> */}
                            <table className="table-dark table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <td scope="col">Image</td>
                                        <td scope="col">Name</td>
                                        <td scope="col">Status</td>
                                        <td scope="col">Creation date</td>
                                        <td scope="col">Deadline</td>
                                        <td scope="col">Creator</td>
                                        <td scope="col">Actions</td>
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
                                            <td>{project.name}</td>
                                            <td
                                                className={
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project.status
                                                    ]
                                                }
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project.status
                                                    ]
                                                }
                                            </td>
                                            <td>{project.created_at}</td>
                                            <td>{project.deadline}</td>
                                            <td>{project.creator.name}</td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        'project.edit',
                                                        project.id,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
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
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
