import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
const Show = ({ task }: any) => {
    return (
        <Authenticated
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="text-gray fs-3">Task {task.name}</h2>
                    <Link
                        href={route('task.edit', task.id)}
                        className="btn btn-success"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Task "${task.name}"`} />
            <div className="bg-gray">
                <div>
                    <img src={task.image_path} alt="" />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Task ID</label>
                            <p className="fs-3 ms-3">{task.id}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Task Name</label>
                            <p className="fs-3 ms-3">{task.name}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Task Status</label>
                            <p
                                className={
                                    'fs-3 ms-3 ' +
                                    TASK_STATUS_CLASS_MAP[task.status]
                                }
                            >
                                {TASK_STATUS_TEXT_MAP[task.status]}
                            </p>
                        </div>

                        <div className="mt-4">
                            <label className="fs-3 fw-bold">
                                Task Description
                            </label>
                            <p className="fs-3 ms-3">{task.description}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">
                                Task priority
                            </label>
                            <p
                                className={
                                    'fs-3 ms-3 ' +
                                    TASK_PRIORITY_CLASS_MAP[task.priority]
                                }
                            >
                                {TASK_PRIORITY_TEXT_MAP[task.priority]}
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Deadline</label>
                            <p className="fs-3 ms-3">{task.deadline}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Creator</label>
                            <p className="fs-3 ms-3">{task.creator.name}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Updated By</label>
                            <p className="fs-3 ms-3">{task.updated_by.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
