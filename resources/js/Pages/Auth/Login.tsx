import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <Form onSubmit={submit}>
                <Form.Group>
                    <Form.Label htmlFor="email" value="Email">
                        Email
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Text
                            className="input-group-text"
                            id="inputGroupPrepend"
                        >
                            @
                        </InputGroup.Text>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </InputGroup>
                    <div>
                        <InputError message={errors.email} className="mt-2" />{' '}
                    </div>
                </Form.Group>

                <Form.Group className="mt-4">
                    <Form.Label htmlFor="password" value="Password">
                        Password
                    </Form.Label>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </Form.Group>

                <Form.Group className="mt-4 block">
                    <Form.Check // prettier-ignore
                        type="checkbox"
                        id={`default-checkbox`}
                        label={`Remember me`}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                </Form.Group>

                <Form.Group className="mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="link-secondary"
                            >
                                Forgot my password
                            </Link>
                        )}

                        <PrimaryButton
                            className="ms-sm-4 ms-2"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link href={route('register')} className="link-primary">
                            Sigh up
                        </Link>
                    </div>
                </Form.Group>
            </Form>
        </GuestLayout>
    );
}
