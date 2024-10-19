import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksTable from '../Task/TasksTable';
const Show = ({ project, tasks, queryParams }: any) => {
    return (
        <Authenticated
            header={<h2 className="fs-3">{`Project "${project.name}"`}</h2>}
        >
            <Head title={`Project "${project.name}"`} />
            <div className="bg-gray">
                <div>
                    <img src={project.image_path} alt="" />
                </div>
                <div>
                    <label>Project Name</label>
                    <p>{project.name}</p>
                    <p className={PROJECT_STATUS_CLASS_MAP[project.status]}>
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </p>

                    <p>{project.created_at}</p>
                    <p>{project.deadline}</p>
                    <p>{project.creator.name}</p>
                    <p>{project.updated_by.name}</p>
                </div>
            </div>
            <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                projectColumn={false}
            />
        </Authenticated>
    );
};

export default Show;
