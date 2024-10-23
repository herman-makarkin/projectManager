import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    StatusProps,
} from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Project, ProjectData, queryParamsProps } from '@/props';
import { Head, Link, router } from '@inertiajs/react';
import { Table } from 'react-bootstrap';

export default function Index({
    projects,
    queryParams,
    success = null,
}: {
    projects: ProjectData;
    queryParams: queryParamsProps;
    success?: string | null;
}) {
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
                <Table responsive>
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
                            <TableHeading sortable={false}>Image</TableHeading>

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
                                name="status"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Status
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
                            <TableHeading
                                name="deadline"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_mode={queryParams.sort_mode}
                                sortable={true}
                            >
                                Deadline
                            </TableHeading>
                            <TableHeading sortable={false}>
                                Creator
                            </TableHeading>
                            <TableHeading sortable={false}>
                                Actions
                            </TableHeading>
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
                                        className="text-success ms-2"
                                        href={route('project.edit', project.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-danger mt-lg-0 ms-2 mt-3"
                                        onClick={() => removeProject(project)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                    <Pagination links={projects.meta.links} />
                </div>
            </div>
        </Authenticated>
    );
}
