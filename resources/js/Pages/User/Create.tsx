import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, post, errors, reset } = useForm({
        // image: '',
        name: '',
        email: '',
        gender: '',
        birthdate: '',
        password: '',
        password_confirmation: '',
        // description: '',
        // deadline: '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        post(route('user.store'));
    };
    return (
        <Authenticated
            header={<h2 className="text-gray fs-3">Create new User</h2>}
        >
            <form onSubmit={onSubmit}>
                {/* <div>
                    <InputLabel
                        htmlFor="user_image_path"
                        value="User Image"
                    />
                    <TextInput
                        id="user_image_path"
                        type="file"
                        name="image"
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
                <div>
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
                <div>
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
                        htmlFor="user_description"
                        value="Description"
                    />
                    <TextAreaInput
                        id="user_description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div> */}
                <div>
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
                <div className="mt-4">
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
                <div className="mt-4">
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
                <div>
                    <Link href={route('user.index')} className="btn btn-danger">
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
