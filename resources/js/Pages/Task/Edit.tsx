import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {
    ProjectData,
    ProjectProps,
    TaskProps,
    UserData,
    UserProps,
} from '@/props';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Form } from 'react-bootstrap';

const Edit = ({
    task,
    projects,
    users,
}: {
    task: TaskProps;
    projects: ProjectData;
    users: UserData;
}) => {
    const { data, setData, post, errors } = useForm({
        image: task.image || undefined,
        name: task.name || undefined,
        priority: task.priority || undefined,
        status: task.status || undefined,
        project_id: task.project_id || undefined,
        assigned_user_id: task.assigned_user_id || undefined,
        description: task.description || undefined,
        deadline: task.deadline || undefined,
        _method: 'PUT',
    });

    const onSubmit: FormEventHandler = (e): void => {
        e.preventDefault();
        post(route('task.update', task.id));
    };
    return (
        <Authenticated
            header={
                <h2 className="text-gray fs-3" style={{ maxHeight: 40 }}>
                    Edit'{task.name}'
                </h2>
            }
        >
            <Form onSubmit={onSubmit}>
                <Form.Group style={{ maxWidth: 500 }}>
                    {task.image_path && <img src={task.image_path} />}
                    <InputLabel htmlFor="task_image_path" value="Task Image" />
                    <TextInput
                        id="task_image_path"
                        type="file"
                        name="image"
                        onChange={(e) => {
                            if (e.target.files)
                                return setData('image', e.target.files[0]);
                        }}
                    />
                    <InputError message={errors.image} />
                </Form.Group>
                <Form.Group className="mt-3">
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
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel htmlFor="task_deadline" value="Deadline" />
                    <TextInput
                        id="task_deadline"
                        type="date"
                        name="deadline"
                        value={data.deadline}
                        onChange={(e) => setData('deadline', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </Form.Group>
                <Form.Group className="mt-3">
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
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel htmlFor="task_priority" value="Priority" />

                    <SelectInput
                        id="task_priority"
                        name="priority"
                        type="priority"
                        value={data.priority}
                        onChange={(e) => setData('priority', e.target.value)}
                    ></SelectInput>
                    <InputError message={errors.priority} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel htmlFor="task_status" value="status" />

                    <SelectInput
                        id="task_status"
                        name="status"
                        type="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    ></SelectInput>
                    <InputError message={errors.status} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel htmlFor="task_project_id" value="Project id" />

                    <SelectInput
                        id="task_project_id"
                        name="project_id"
                        value={data.project_id}
                        onChange={(e) => setData('project_id', e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.data.map((project: ProjectProps) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </SelectInput>

                    <InputError message={errors.project_id} />
                </Form.Group>
                <Form.Group className="mt-3">
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
                        {users.data.map((user: UserProps) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </SelectInput>

                    <InputError message={errors.assigned_user_id} />
                </Form.Group>
                <Form.Group className="d-flex mt-4 flex-row-reverse">
                    <input
                        type="submit"
                        className="btn btn-success ms-3"
                        value="Submit"
                    />
                    <Link href={route('task.index')} className="btn btn-danger">
                        Cancel
                    </Link>
                </Form.Group>
            </Form>
        </Authenticated>
    );
};

export default Edit;
