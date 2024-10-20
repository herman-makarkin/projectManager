import {
    forwardRef,
    InputHTMLAttributes,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function SelectInput(
    {
        className = '',
        children = [],
        type = '',
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    if (type === 'gender') {
        children = [
            <option value="" key="1">
                Select Status
            </option>,
            <option value="Male" key="2">
                Male
            </option>,
            <option value="Female" key="3">
                Female
            </option>,
        ];
    } else if (type === 'status') {
        children = [
            <option value="" key="1">
                Select Status
            </option>,
            <option value="pending" key="2">
                Pending
            </option>,
            <option value="active" key="3">
                Active
            </option>,
            <option value="finished" key="4">
                Finished
            </option>,
        ];
    } else if (type === 'priority') {
        children = [
            <option value="" key="1">
                Select Priority
            </option>,
            <option value="low" key="2">
                Low
            </option>,
            <option value="medium" key="3">
                Medium
            </option>,
            <option value="high" key="4">
                High
            </option>,
        ];
    }

    return (
        <select {...props} className={'form-select ' + className}>
            {children}
        </select>
    );
});
