import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function SignUp() {

  const [errorMessage,setErrorMessage]=useState("")
  const [loading,setLoading]=useState(false)

  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()

    setLoading(true)
    setErrorMessage("")
    const formData=new FormData(e.target)
    const inputs=Object.fromEntries(formData.entries())

    try{
      const res=await fetch("/api/v1/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(inputs)
      })

      const data=await res.json()
     
      if(data.success===false){
        setErrorMessage(data.message)
      }

      if(res.ok){
        navigate("/login")
      }
    }catch(err){
      setErrorMessage(err.message)
    }finally{
      setErrorMessage("")
      setLoading(false)
    }
  }

 
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              وبلاگ
            </span>
            مرتضی
          </Link>
          <p className='text-sm mt-5'>
           این یک پروژه نمونه می باشد وشما میتوانید با استفاده از ایمیل تان وارید شوید
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='نام کاربری' />
              <TextInput
                type='text'
                placeholder='نام'
                id='username'
                name='username'
              />
            </div>
            <div>
              <Label value='ایمیل شما' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                name='email'
              />
            </div>
            <div>
              <Label value='رمزعبوزشما' />
              <TextInput
                type='password'
                placeholder='رمزعبور'
                id='password'
                name='password'
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>درحل پردازش</span>
                </>
              ) : (
                'ثبت نام'
              )}
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/login' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
