import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    StatusProps,
} from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Project, ProjectData, queryParamsProps } from '@/props';
import { Head, Link, router } from '@inertiajs/react';

interface Index {
    projects: ProjectData;
    queryParams: queryParamsProps;
    success?: string | null;
}

export default function Index({
    projects,
    queryParams,
    success = null,
}: Index) {
    queryParams = queryParams || {};
    const search = (name: string, value: string): void => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
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
        router.get(route('project.index'), queryParams);
    };

    const removeProject = (project: Project): void => {
        if (window.confirm('Are you sure you want to remove this project?')) {
            router.delete(route('project.destroy', project.id));
        }
        return;
    };
    return (
        <Authenticated
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="text-gray fs-3">Projects</h2>
                    <Link
                        href={route('project.create')}
                        className="btn btn-success"
                    >
                        add new project
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

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
                            <td scope="col">Image</td>
                            <td scope="col" onClick={() => sortChanged('name')}>
                                Name
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('status')}
                            >
                                Status
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('created_at')}
                            >
                                Creation date
                            </td>
                            <td
                                scope="col"
                                onClick={() => sortChanged('deadline')}
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
                                        search('name', e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        onKeyPress('name', e, e.key)
                                    }
                                />
                            </td>
                            <td scope="col">
                                <SelectInput
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        search('status', e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="active">Active</option>
                                    <option value="finished">Finished</option>
                                </SelectInput>
                            </td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                            <td scope="col"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.data.map((project: Project) => (
                            <tr key={project.id}>
                                <th scope="row" className="align-middle">
                                    {project.id}
                                </th>
                                <td
                                    className="align-middle"
                                    style={{
                                        maxWidth: 100,
                                        maxHeight: 60,
                                    }}
                                >
                                    <img src={project.image_path} alt="" />
                                </td>
                                <td className="align-middle">
                                    <Link
                                        href={route('project.show', project.id)}
                                    >
                                        {project.name}
                                    </Link>
                                </td>
                                <td className="align-middle">
                                    <span
                                        className={
                                            PROJECT_STATUS_CLASS_MAP[
                                                project.status as keyof StatusProps
                                            ] + ' rounded-1'
                                        }
                                    >
                                        {
                                            PROJECT_STATUS_TEXT_MAP[
                                                project.status as keyof StatusProps
                                            ]
                                        }
                                    </span>
                                </td>
                                <td className="align-middle">
                                    {project.created_at}
                                </td>
                                <td className="align-middle">
                                    {project.deadline}
                                </td>
                                <td className="align-middle">
                                    {project.creator.name}
                                </td>
                                <td className="align-middle">
                                    <Link
                                        className="text-success"
                                        href={route('project.edit', project.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-danger ms-2"
                                        onClick={() => removeProject(project)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Pagination links={projects.meta.links} />
                </div>
            </div>
        </Authenticated>
    );
}
