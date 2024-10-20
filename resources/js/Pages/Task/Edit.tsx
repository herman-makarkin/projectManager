import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const Edit = ({ task, projects, users }: any) => {
    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: task.name || '',
        priority: task.priority || '',
        status: task.status || '',
        project_id: task.project_id || '',
        assigned_user_id: task.assigned_user_id || '',
        description: task.description || '',
        deadline: task.deadline || '',
        _method: 'PUT',
    });

    const onSubmit: FormEventHandler = (e): void => {
        e.preventDefault();
        post(route('task.update', task.id));
    };
    return (
        <Authenticated
            header={<h2 className="text-gray fs-3">Edit "{task.name}"</h2>}
        >
            <form onSubmit={onSubmit}>
                <div>
                    {task.image_path && <img src={task.image_path} />}
                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                    <TextInput
                        id="task_image_path"
                        type="file"
                        name="image"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                    <InputError message={errors.image} />
                </div>
                <div>
                    <InputLabel htmlFor="task_name" value="Task Name" />
                    <TextInput
                        id="task_name"
                        type="text"
                        name="name"
                        value={data.name}
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="task_deadline" value="Deadline" />
                    <TextInput
                        id="task_deadline"
                        type="date"
                        name="deadline"
                        value={data.deadline}
                        onChange={(e) => setData('deadline', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <InputLabel
                        htmlFor="task_description"
                        value="Description"
                    />
                    <TextAreaInput
                        id="task_description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div>
                <div>
                    <InputLabel htmlFor="task_priority" value="Priority" />

                    <SelectInput
                        id="task_priority"
                        name="priority"
                        type="priority"
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                    ></SelectInput>
                    <InputError message={errors.priority} />
                </div>
                <div>
                    <InputLabel htmlFor="task_status" value="status" />

                    <SelectInput
                        id="task_status"
                        name="status"
                        type="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    ></SelectInput>
                    <InputError message={errors.status} />
                </div>
                <div>
                    <InputLabel htmlFor="task_project_id" value="Project id" />

                    <SelectInput
                        id="task_project_id"
                        name="project_id"
                        value={data.project_id}
                        onChange={(e) => setData('project_id', e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.data.map((project: any) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </SelectInput>

                    <InputError message={errors.project_id} />
                </div>
                <div>
                    <InputLabel
                        htmlFor="task_assigned_user_id"
                        value="assigned user id"
                    />

                    <SelectInput
                        id="task_assigned_user_id"
                        name="assigned_user_id"
                        value={data.assigned_user_id}
                        onChange={(e) =>
                            setData('assigned_user_id', e.target.value)
                        }
                    >
                        <option value="">Select User</option>
                        {users.data.map((user: any) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </SelectInput>

                    <InputError message={errors.assigned_user_id} />
                </div>
                <div>
                    <Link href={route('task.index')} className="btn btn-danger">
                        Cancel
                    </Link>
                    <input
                        type="submit"
                        className="btn btn-success"
                        value="Submit"
                    />
                </div>
            </form>
        </Authenticated>
    );
};

export default Edit;
