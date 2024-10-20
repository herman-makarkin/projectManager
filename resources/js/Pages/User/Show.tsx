import Authenticated from '@/Layouts/AuthenticatedLayout';
import { UserProps } from '@/props';
import { Head, Link } from '@inertiajs/react';

interface Index {
    user: UserProps;
}

const Show = ({ user }: Index) => {
    return (
        <Authenticated
            header={
                <div className="d-flex justify-content-between">
                    <h2 className="text-gray fs-3">User {user.name}</h2>
                    <Link
                        href={route('user.edit', user.id)}
                        className="btn btn-success"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`User "${user.name}"`} />
            <div className="bg-gray">
                {/* <div>
                    <img src={user.image_path} alt="" />
                </div> */}
                <div>
                    {/* <label>User Name</label> */}
                    <div className="mt-4">
                        <label className="fs-3 fw-bold">User ID</label>
                        <p className="fs-3 ms-3">{user.id}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-3 fw-bold">User Name</label>
                        <p className="fs-3 ms-3">{user.name}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-3 fw-bold">User Email</label>
                        <p className="fs-3 ms-3">{user.email}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-3 fw-bold">User Gender</label>
                        <p className="fs-3 ms-3">{user.gender}</p>
                    </div>
                    <div className="mt-4">
                        <label className="fs-3 fw-bold">User Birthdate</label>
                        <p className="fs-3 ms-3">{user.birthdate}</p>
                    </div>
                    {/* <p>{user.updated_by.name}</p> */}
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
