//import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksTable from './TasksTable';

interface IndexProps {}

export default function Index({ tasks, queryParams = null }: any) {
    return (
        <Authenticated
            //user={auth.user}
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="text-gray fs-3">Tasks</h2>
                    <button className="btn btn-success">add new task</button>
                </div>
            }
        >
            <Head title="Tasks" />
            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"> */}
            <TasksTable tasks={tasks} queryParams={queryParams} />
            {/* </div>
                </div>
            </div> */}
        </Authenticated>
    );
}
