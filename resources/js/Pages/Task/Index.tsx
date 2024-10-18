import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
//import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

interface IndexProps {}

export default function Index({ tasks, queryParams = null }: any) {
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
    return (
        <Authenticated
            //user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="bg-gray">
                            {/* <pre className="text-gray">
                                {JSON.stringify(tasks, undefined, 2)}
                            </pre> */}
                            <table className="table-dark table">
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
                                        <td scope="col">Actions</td>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <td scope="col"></td>
                                        <td scope="col">
                                            <TextInput
                                                placeholder="Task name"
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
                                    {tasks.data.map((task: any) => (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td
                                                style={{
                                                    maxWidth: 100,
                                                }}
                                            >
                                                <img
                                                    src={task.image_path}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{task.name}</td>
                                            <td
                                            // className={
                                            //     //TASK_STATUS_CLASS_MAP[
                                            //       //</tr>  task.status
                                            //     ]
                                            // }
                                            >
                                                {/* {
                                                    //TASK_STATUS_TEXT_MAP[
                                                      //</tbody>  task.status
                                                    ]
                                                } */}
                                            </td>
                                            <td>{task.created_at}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.creator.name}</td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        'task.edit',
                                                        task.id,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        'task.destroy',
                                                        task.id,
                                                    )}
                                                >
                                                    Destroy
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
