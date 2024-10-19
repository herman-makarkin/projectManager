import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
const Show = ({ user }: any) => {
    return (
        <Authenticated
            header={<h2 className="fs-3">{`User "${user.name}"`}</h2>}
        >
            <Head title={`User "${user.name}"`} />
            <div className="bg-gray">
                {/* <div>
                    <img src={user.image_path} alt="" />
                </div> */}
                <div>
                    {/* <label>User Name</label> */}
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.gender}</p>
                    <p>{user.birthdate}</p>
                    {/* <p>{user.updated_by.name}</p> */}
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
