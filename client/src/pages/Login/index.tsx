import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
export function Login(){

    const handleLogin = (values: any) =>{
      axios.post("http://localhost:3001/login",{
        email: values.email,
        password: values.password
      }).then(res => alert(res.data.response))
    }
  
    const validationLogin = yup.object().shape({
      email: yup.string().email().required(),
      
    })
    return (
      <main className='w-full h-screen  flex flex-col items-center justify-center bg-gray-100'>
        <h1 className="decoration-slate-700">Login</h1>
        <div className=' w-96 h-96 border-2 bg-white rounded-lg border-gray-200'>
          <Formik initialValues={{}} onSubmit={handleLogin} validationSchema={validationLogin}>
            <Form className='p-4 gap-4 flex flex-col justify-between h-full ' >
              <div className=''>
                <div className='flex flex-col gap-8'>
                  <Field name="email" className="w-full h-10 border-gray-200 border-2 rounded-md p-2" placeholder="Email" />
                  <ErrorMessage 
                    component="span"
                    name="email"
                    className="text-red-500 text-bases"
                  />
                </div>
                <div className=''>
                  <Field name="password" className="w-full h-10 border-gray-200 border-2 rounded-md p-2" placeholder="Senha" />
                  <ErrorMessage 
                    component="span"
                    name="password"
                    className=""
                  />
                </div>
              </div>
              <button type="submit"  className="w-full h-10 rounded bg-blue-500 text-black text-base transition duration-75 hover:brightness-75">Logar</button>
            </Form>
          </Formik>
        </div>
      </main>
  
    )
}