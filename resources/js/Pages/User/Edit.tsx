import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { UserProps } from '@/props';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Form } from 'react-bootstrap';

const Edit = ({ user }: { user: UserProps }) => {
    const { data, setData, post, errors } = useForm({
        // image: '',
        name: user.name || '',
        email: user.email || '',
        gender: user.gender || '',
        birthdate: user.birthdate || '',
        password: '',
        password_confirmation: '',
        _method: 'PUT',
        // description: '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.update', user.id));
    };
    return (
        <Authenticated
            header={<h2 className="text-gray fs-3">Edit user '{user.name}'</h2>}
        >
            <Form onSubmit={onSubmit}>
                {/* <div>
                    <InputLabel
                        htmlFor='user_image_path'
                        value='User Image'
                    />
                    <TextInput
                        id='user_image_path'
                        type='file'
                        name='image'
                        onChange={(e) => setData('image', e.target.files[0])}
                    />
                    <InputError message={errors.image} />
                </div> */}
                <div>
                    <InputLabel htmlFor="user_name" value="User Name" />
                    <TextInput
                        id="user_name"
                        type="text"
                        name="name"
                        value={data.name}
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="mt-3">
                    <InputLabel htmlFor="user_email" value="User email" />
                    <TextInput
                        id="user_email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="mt-3">
                    <InputLabel htmlFor="user_birthdate" value="Birthdate" />
                    <TextInput
                        id="user_birthdate"
                        type="date"
                        name="birthdate"
                        value={data.birthdate}
                        onChange={(e) => setData('birthdate', e.target.value)}
                    />
                    <InputError message={errors.birthdate} />
                </div>
                {/* <div>
                    <InputLabel
                        htmlFor='user_description'
                        value='Description'
                    />
                    <TextAreaInput
                        id='user_description'
                        name='description'
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div> */}
                <div className="mt-3">
                    <InputLabel htmlFor="user_gender" value="Gender" />

                    <SelectInput
                        id="user_gender"
                        type="gender"
                        name="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                    ></SelectInput>
                    <InputError message={errors.gender} />
                </div>
                <div className="mt-3">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-3">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Password Confirmation"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="d-flex mt-4 flex-row-reverse">
                    <input
                        type="submit"
                        className="btn btn-success ms-3"
                        value="Submit"
                    />
                    <Link href={route('user.index')} className="btn btn-danger">
                        Cancel
                    </Link>
                </div>
            </Form>
        </Authenticated>
    );
};

export default Edit;
