//import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { queryParamsProps, TaskData } from '@/props';
import { Head, Link } from '@inertiajs/react';
import TasksTable from './TasksTable';

export default function Index({
    tasks,
    queryParams,
}: {
    tasks: TaskData;
    queryParams: queryParamsProps;
}) {
    return (
        <Authenticated
            //user={auth.user}
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="fs-3">Tasks</h2>
                    <Link
                        href={route('task.create')}
                        className="btn btn-success"
                    >
                        add new task
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />
            <TasksTable tasks={tasks} queryParams={queryParams} />
        </Authenticated>
    );
}
