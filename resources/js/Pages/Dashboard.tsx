import {
    StatusProps,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Task, TaskData } from '@/props';
import { Head, Link } from '@inertiajs/react';
import { Card, Col, Row, Table } from 'react-bootstrap';

export default function Dashboard({
    totalPendingTasks,
    myPendingTasks,
    totalActiveTasks,
    myActiveTasks,
    totalFinishedTasks,
    myFinishedTasks,
    currentTasks,
}: {
    totalPendingTasks: string;
    myPendingTasks: string;
    totalActiveTasks: string;
    myActiveTasks: string;
    totalFinishedTasks: string;
    myFinishedTasks: string;
    currentTasks: TaskData;
}) {
    return (
        <AuthenticatedLayout header={<h2 className="fs-3">Dashboard</h2>}>
            <Head title="Dashboard" />
            <Row xs={1} md={3} className="g-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <h2 className="cart-title fs-2 text-primary">
                                Pending Tasks
                            </h2>
                            <p className="card-text fs-4">
                                {myPendingTasks}/{totalPendingTasks}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <h2 className="cart-title fs-2 text-danger">
                                Active Tasks
                            </h2>
                            <p className="card-text fs-4">
                                {myActiveTasks}/{totalActiveTasks}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <h2 className="cart-title fs-2 text-success">
                                Finished Tasks
                            </h2>
                            <p className="card-text fs-4">
                                {myFinishedTasks}/{totalFinishedTasks}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="mt-4">
                <h3 className="fs-3">Tasks at hand</h3>
                <Table className="mt-3" responsive="lg">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <td scope="col">Project name</td>
                            <td scope="col">Name</td>
                            <td scope="col">Status</td>
                            <td scope="col">Creation date</td>
                            <td scope="col">Deadline</td>
                            {/* <td scope='col'>
                                <p className='text-end'>Actions</p>
                            </td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.data.map((task: Task) => (
                            <tr className="align-middle" key={task.id}>
                                <td>{task.id}</td>

                                <td scope="col">
                                    <Link
                                        href={route(
                                            'project.show',
                                            task.project.id,
                                        )}
                                    >
                                        {task.project.name}
                                    </Link>
                                </td>

                                <td className="align-middle">
                                    <Link href={route('task.show', task.id)}>
                                        {task.name}
                                    </Link>
                                </td>
                                <td className="align-middle">
                                    <span
                                        className={
                                            TASK_STATUS_CLASS_MAP[
                                                task.status as keyof StatusProps
                                            ] + ' rounded-1'
                                        }
                                    >
                                        {
                                            TASK_STATUS_TEXT_MAP[
                                                task.status as keyof StatusProps
                                            ]
                                        }
                                    </span>
                                </td>
                                <td className="align-middle">
                                    {task.created_at}
                                </td>
                                <td className="align-middle">
                                    {task.deadline}
                                </td>
                                {/* <td className='align-middle'>
                                    <Link
                                        className='text-success'
                                        href={route('task.edit', task.id)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className='text-danger ms-2'
                                        onClick={() => removeTask(task)}
                                    >
                                        Destroy
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}
