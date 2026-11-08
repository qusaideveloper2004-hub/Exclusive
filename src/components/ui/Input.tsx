import React from 'react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

icon?: React.ReactNode;
error?: string;
}


export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', icon, error, id, 'aria-describedby': ariaDescribedby, ...props }, ref) => {

const errorId = error && id ? `${id}-error` : undefined;

return (

  <div className="w-full">

        <div className="relative flex items-center w-full">

            <input

              ref={ref}
              id={id}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? [ariaDescribedby, errorId].filter(Boolean).join(' ') : ariaDescribedby}

              className={`w-full py-2 px-4 text-sm bg-gray-50 border rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] focus:border-[var(--brand)]
                ${
                icon ? 'ltr:pr-10 rtl:pl-10' : ''
              } ${
                error ? 'border-red-700' : 'border-gray-200'
              } ${className}`}
              {...props}
            />

            {icon && (
              <div className="absolute ltr:right-3 rtl:left-3 flex items-center text-gray-500">
                {icon}
              </div>
            )}

        </div>

        {error && <p id={errorId} role="alert" className="mt-1 text-xs text-red-700">{error}</p>}

  </div>
);


}
);

Input.displayName = 'Input';

