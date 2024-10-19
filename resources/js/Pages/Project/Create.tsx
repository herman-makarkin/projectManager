import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        deadline: '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(e.preventDefault());
        post(route('project.store'));
    };
    return (
        <Authenticated
            header={<h2 className="text-gray fs-3">Create new Project</h2>}
        >
            <form onSubmit={onSubmit}>
                <div>
                    <InputLabel
                        htmlFor="project_image_path"
                        value="Project Image"
                    />
                    <TextInput
                        id="project_image_path"
                        type="file"
                        name="image"
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                    <InputError message={errors.image} />
                </div>
                <div>
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
                </div>
                <div>
                    <InputLabel htmlFor="project_deadline" value="Deadline" />
                    <TextInput
                        id="project_deadline"
                        type="date"
                        name="deadline"
                        value={data.deadline}
                        onChange={(e) => setData('deadline', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
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
                </div>
                <div>
                    <InputLabel htmlFor="project_status" value="Status" />

                    <SelectInput
                        id="project_status"
                        name="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </SelectInput>
                    <InputError message={errors.status} />
                </div>
                <div>
                    <Link
                        href={route('project.index')}
                        className="btn btn-danger"
                    >
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

export default Create;
