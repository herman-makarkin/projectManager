import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';

import {
    StatusProps,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from '@/constants';
import { queryParamsProps, TaskData, TaskProps } from '@/props';
import { Link, router } from '@inertiajs/react';
import { Table } from 'react-bootstrap';

const TasksTable = ({
    tasks,
    queryParams,
    projectColumn = true,
    actions = true,
}: {
    tasks: TaskData;
    queryParams: queryParamsProps;
    projectColumn?: boolean;
    actions?: boolean;
}) => {
    if (!queryParams) {
        queryParams = {};
        queryParams.sort_field = 'created_at';
    }
    const search = (name: string, value: string) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('task.index'), queryParams);
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

    const sortChanged = (name: string) => {
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
        router.get(route('task.index'), queryParams);
    };

    const removeTask = (task: TaskProps): void => {
        if (window.confirm('Are you sure you want to remove this project?')) {
            router.delete(route('task.destroy', task.id));
        }
        return;
    };

    return (
        <>
            <Table className="mb-3" responsive="lg">
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
                        {projectColumn && (
                            <TableHeading sortable={false}>
                                Project Name
                            </TableHeading>
                        )}
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
                        <TableHeading sortable={false}>Creator</TableHeading>
                        {actions && (
                            <TableHeading sortable={false}>
                                Actions
                            </TableHeading>
                        )}
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <td scope="col"></td>
                        {projectColumn && <td scope="col"></td>}
                        <td scope="col">
                            <TextInput
                                placeholder="Task name"
                                defaultValue={queryParams.name}
                                onBlur={(e) => search('name', e.target.value)}
                                onKeyDown={(e) => onKeyPress('name', e, e.key)}
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
                        {actions && <td scope="col"></td>}
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task) => (
                        <tr className="align-middle" key={task.id}>
                            <td>{task.id}</td>
                            <td
                                style={{
                                    maxWidth: 100,
                                }}
                            >
                                <img src={task.image_path} alt="" />
                            </td>
                            {projectColumn && (
                                <td scope="col">
                                    <Link
                                        href={route(
                                            'project.show',
                                            task.project.id,
                                        )}
                                    >
                                        {task.project.name}
                                    </Link>
                                </td>
                            )}
                            <td className="align-middle">
                                <Link href={route('task.show', task.id)}>
                                    {task.name}
                                </Link>
                            </td>
                            <td className="align-middle">
                                <span
                                    className={
                                        TASK_STATUS_CLASS_MAP[
                                            task.status as keyof StatusProps
                                        ] + ' rounded-1'
                                    }
                                >
                                    {
                                        TASK_STATUS_TEXT_MAP[
                                            task.status as keyof StatusProps
                                        ]
                                    }
                                </span>
                            </td>
                            <td className="align-middle">{task.created_at}</td>
                            <td className="align-middle">{task.deadline}</td>
                            <td className="align-middle">
                                {task.creator ? task.creator.name : ''}
                            </td>
                            {actions && (
                                <td className="align-middle">
                                    <Link
                                        className="text-success me-2"
                                        href={route('task.edit', task.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-danger mt-lg-0 mt-3"
                                        onClick={() => removeTask(task)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                <Pagination links={tasks.meta.links} />
            </div>
        </>
    );
};

export default TasksTable;
