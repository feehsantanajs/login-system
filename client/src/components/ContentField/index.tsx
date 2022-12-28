import { Field, ErrorMessage } from "formik";
type ContentFieldProps = {
    name: string;
    placeholder: string;
    choosenType: string;
}
export function ContentField({name, placeholder, choosenType}: ContentFieldProps){
    return(
        <>
            <Field
                name={name}
                type={choosenType}
                className="w-full h-10 border-gray-200 border-2 rounded-md p-2"
                placeholder={placeholder}
            />
            <ErrorMessage
                component="span"
                name={name}
                className="block text-red-500 text-sm font-semibold ml-1"
            />
        </>
    )
}