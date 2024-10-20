import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
const Show = ({ task }: any) => {
    return (
        <Authenticated
            header={<h2 className="fs-3">{`Task "${task.name}"`}</h2>}
        >
            <Head title={`Task "${task.name}"`} />
            <div className="bg-gray">
                <div>
                    <img src={task.image_path} alt="" />
                </div>
                <div>
                    <label>Task Name</label>
                    <p>{task.name}</p>
                    <p className={TASK_STATUS_CLASS_MAP[task.status]}>
                        {TASK_STATUS_TEXT_MAP[task.status]}
                    </p>

                    <p>{task.priority}</p>

                    <p>{task.created_at}</p>
                    <p>{task.deadline}</p>
                    <p>{task.creator.name}</p>
                    <p>{task.updated_by.name}</p>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
