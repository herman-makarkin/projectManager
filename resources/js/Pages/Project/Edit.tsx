import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { ProjectProps } from '@/props';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Form } from 'react-bootstrap';

const Edit = ({ project }: { project: ProjectProps }) => {
    const { data, setData, post, errors } = useForm({
        image: project.image || '',
        name: project.name || '',
        status: project.status || '',
        description: project.description || '',
        deadline: project.deadline || '',
        _method: 'PUT',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('project.update', project.id));
    };
    return (
        <Authenticated
            header={
                <h2 className="text-gray fs-3">
                    Edit project '{project.name}'
                </h2>
            }
        >
            <Form onSubmit={onSubmit} className="rounded p-4 shadow">
                {project.image_path && (
                    <div style={{ maxWidth: 500 }}>
                        <img src={project.image_path} alt="" />
                    </div>
                )}
                <Form.Group>
                    <InputLabel
                        htmlFor="project_image_path"
                        value="Project Image"
                    />
                    <TextInput
                        id="project_image_path"
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
                    <InputLabel htmlFor="project_name" value="Project Name" />
                    <TextInput
                        id="project_name"
                        type="text"
                        name="name"
                        value={data.name}
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel htmlFor="project_deadline" value="Deadline" />
                    <TextInput
                        id="project_deadline"
                        type="date"
                        name="deadline"
                        value={data.deadline}
                        onChange={(e) => setData('deadline', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel
                        htmlFor="project_description"
                        value="Description"
                    />
                    <TextAreaInput
                        id="project_description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <InputLabel htmlFor="project_status" value="Status" />

                    <SelectInput
                        id="project_status"
                        name="status"
                        value={data.status}
                        type="status"
                        onChange={(e) => setData('status', e.target.value)}
                    ></SelectInput>
                    <InputError message={errors.status} />
                </Form.Group>
                <Form.Group className="d-flex mt-4 flex-row-reverse">
                    <input
                        type="submit"
                        className="btn btn-success ms-3"
                        value="Submit"
                    />
                    <Link
                        href={route('project.index')}
                        className="btn btn-danger"
                    >
                        Cancel
                    </Link>
                </Form.Group>
            </Form>
        </Authenticated>
    );
};

export default Edit;
