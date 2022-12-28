import { Form, Formik } from "formik"
import { FormEvent, useState } from "react"
import * as yup from 'yup'
import { ContentField } from "../../components/ContentField";
import axios from 'axios'

export function Register() {
    const handleRegister = (values: any) => {
        axios.post("http://localhost:3001/register", {
            user: values.user,
            email: values.email,
            password: values.confirmPass
        }).then(response =>alert(response.data))
    }
    const validationRegister = yup.object().shape({
        user: yup.string(),
        email: yup.string().email().required("Este campo é obrigatório"),
        password: yup.string().required('Este campo é obrigatório'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
    })

    return (
        <main className='w-full h-screen  flex flex-col items-center justify-center bg-gray-100'>
            <h1 className="decoration-slate-700">Cadastrar</h1>
            <div className=' w-[400px] h-[400px] border-2 bg-white rounded-lg border-gray-200'>
                <Formik initialValues={{}} onSubmit={handleRegister} validationSchema={validationRegister}>
                    <Form className='p-4 gap-4 flex flex-col justify-between h-full ' >
                        <div className='flex flex-col gap-2'>
                            <ContentField name="user" choosenType="text"  placeholder="Usuario"/>
                            <ContentField name="email" choosenType="email"   placeholder="Email"/>
                            <ContentField name="password" choosenType="password"  placeholder="Senha"/>
                            <ContentField name="confirmPassword" choosenType="password"  placeholder="Confirmar Senha"/>
                        </div>
                        <button type="submit" className="w-full h-10 rounded bg-blue-500 text-black text-base transition duration-75 hover:brightness-75">Cadastrar</button>

                    </Form>
                </Formik>
            </div>
        </main>

    )
}