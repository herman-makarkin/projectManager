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
    wrap?: boolean;
    sortable: boolean;
    sortChanged?: sortChanged;
}>) => {
    let arrowStyle: string;
    if (sort_field === name) {
        arrowStyle = '';
    } else {
        arrowStyle = 'd-none';
    }

    return (
        <th
            scope="col"
            role={sortable ? 'button' : ''}
            onClick={() => sortChanged(name)}
            className={sortable ? '' : 'fw-normal'}
        >
            <div className={'d-flex align-items-center text-nowrap'}>
                {children}
                {sortable && (
                    <Arrow
                        className={'ms-2 ' + arrowStyle}
                        isActive={sort_field === name && sort_mode === 'desc'}
                    />
                )}
            </div>
        </th>
    );
};

export default TableHeading;
