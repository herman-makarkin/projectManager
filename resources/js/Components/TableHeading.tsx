import { PropsWithChildren } from 'react';
import Arrow from './Arrow';
type sortChanged = (name: string) => void;

const TableHeading = ({
    sort_field = '',
    sort_mode = '',
    name = '',
    sortable = false,
    children,
    sortChanged = () => {},
}: PropsWithChildren<{
    sort_field?: string;
    sort_mode?: string;
    name?: string;
    sortable: boolean;
    sortChanged?: sortChanged;
}>) => {
    return (
        <th
            scope="col"
            role={sortable ? 'button' : ''}
            onClick={() => sortChanged(name)}
            className={sortable ? '' : 'fw-normal'}
        >
            <div className={'d-flex align-items-center'}>
                {children}
                {sortable && (
                    <Arrow
                        className="ms-2"
                        isActive={sort_field === name && sort_mode === 'desc'}
                    />
                )}
            </div>
        </th>
    );
};

export default TableHeading;
