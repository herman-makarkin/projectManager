import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            padding={false}
            header={<h2 className="fs-3">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="d-flex flex-column align-items-center">
                    <div className="col-12 col-md-8 mt-4 p-4 shadow">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="col-12 col-md-8 mt-4 p-4 shadow">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="col-12 col-md-8 mt-4 p-4 shadow">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
