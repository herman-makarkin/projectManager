import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import { Link, router } from '@inertiajs/react';

const TasksTable = ({
    tasks,
    queryParams,
    projectColumn = true,
    actions = true,
}: any) => {
    queryParams = queryParams || {};
    const search = (name: string, value: string) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('task.index'), queryParams);
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
        router.get(route('task.index'), queryParams);
    };

    const removeTask = (task: any): void => {
        if (window.confirm('Are you sure you want to remove this project?')) {
            router.delete(route('task.destroy', task.id));
        }
        return;
    };

    return (
        <div className="bg-gray pb-2 pt-2">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" onClick={(e) => sortChanged('id')}>
                            ID
                        </th>
                        <td scope="col">Image</td>
                        {projectColumn && <td scope="col">Project name</td>}
                        <td scope="col" onClick={(e) => sortChanged('name')}>
                            Name
                        </td>
                        <td scope="col" onClick={(e) => sortChanged('status')}>
                            Status
                        </td>
                        <td
                            scope="col"
                            onClick={(e) => sortChanged('created_at')}
                        >
                            Creation date
                        </td>
                        <td
                            scope="col"
                            onClick={(e) => sortChanged('deadline')}
                        >
                            Deadline
                        </td>
                        <td scope="col">Creator</td>
                        {actions && (
                            <td scope="col">
                                <p className="text-end">Actions</p>
                            </td>
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
                                onKeyDown={(e) => onKeyPress('name', e)}
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
                    {tasks.data.map((task: any) => (
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
                                        TASK_STATUS_CLASS_MAP[task.status] +
                                        ' rounded-1'
                                    }
                                >
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td className="align-middle">{task.created_at}</td>
                            <td className="align-middle">{task.deadline}</td>
                            <td className="align-middle">
                                {task.creator.name}
                            </td>
                            {actions && (
                                <td className="align-middle">
                                    <Link
                                        className="text-success"
                                        href={route('task.edit', task.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-danger ms-2"
                                        onClick={() => removeTask(task)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Pagination links={tasks.meta.links} />
            </div>
        </div>
    );
};

export default TasksTable;
