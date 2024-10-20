import { HTMLAttributes } from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={'fs-6 text-danger ' + className}>
            {message}
        </p>
    ) : null;
}
