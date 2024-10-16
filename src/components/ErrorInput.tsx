import { TextInput } from "flowbite-react"
import React from "react"

type ErrorInputProps<T> = {
    fieldName: keyof T;  // The specific field name (like 'password', 'email', etc.)
    credentials: T;      // The credentials object with multiple fields
    setCredentials: React.Dispatch<React.SetStateAction<T>>;  // Function to update credentials
    type?: string;       // Input type (optional), default to 'text'
};

const ErrorInput = <T,>({
    fieldName,
    credentials,
    setCredentials,
    type,
}: ErrorInputProps<T>) => {
    return (
        <TextInput
            id={String(fieldName)}
            type={type}
            value={credentials[fieldName] as string}  // Type assertion for flexible field value
            onChange={(e) => {
                setCredentials((prev) => ({ ...prev, [fieldName]: e.target.value }));
            }}
            color="failure"
            required
        />
    );
};

export default ErrorInput