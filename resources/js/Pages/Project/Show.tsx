import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import TasksTable from '../Task/TasksTable';
const Show = ({ project, tasks, queryParams }: any) => {
    return (
        <Authenticated
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="text-gray fs-3">Project {project.name}</h2>
                    <Link
                        href={route('project.edit', project.id)}
                        className="btn btn-success"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Project "${project.name}"`} />
            <div className="bg-gray mb-5">
                <div className="" style={{ width: '38%' }}>
                    <img src={project.image_path} alt="" />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Task ID</label>
                            <p className="fs-3 ms-3">{project.id}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Task Name</label>
                            <p className="fs-3 ms-3">{project.name}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Task Status</label>
                            <p
                                className={
                                    'fs-3 ms-3 ' +
                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                }
                            >
                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </p>
                        </div>

                        <div className="mt-4">
                            <label className="fs-3 fw-bold">
                                Task Description
                            </label>
                            <p className="fs-3 ms-3">{project.description}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        {/* <div className="mt-4">
                            <label className="fs-3 fw-bold">
                                Task priority
                            </label>
                            <p
                                className={
                                    'fs-3 ms-3 ' +
                                    PROJECT_PRIORITY_CLASS_MAP[project.priority]
                                }
                            >
                                {PROJECT_PRIORITY_TEXT_MAP[project.priority]}
                            </p>
                        </div> */}
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Deadline</label>
                            <p className="fs-3 ms-3">{project.deadline}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Creator</label>
                            <p className="fs-3 ms-3">{project.creator.name}</p>
                        </div>
                        <div className="mt-4">
                            <label className="fs-3 fw-bold">Updated By</label>
                            <p className="fs-3 ms-3">
                                {project.updated_by.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                projectColumn={false}
                actions={false}
            />
        </Authenticated>
    );
};

export default Show;
