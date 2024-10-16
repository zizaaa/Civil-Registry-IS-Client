import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../types/user";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { ErrorInput, errorToast, LoaderDefault, serverURL } from "../../hooks/imports";

function Login() {
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<UserLogin>({
        username:"",
        password:"",
        remember:false
    });

    const mutation = useMutation({
        mutationFn: async(userCred:UserLogin)=>{
            const { data } = await axios.post(`${serverURL}/api/cris/login`, userCred, {
                withCredentials: true,
            });
            return data;
        },
        onError:(error:Error)=>{
            if(isAxiosError(error)){
                if(error.response?.data.message === 'User not found.'){
                    setUsernameError(true);
                    setPasswordError(false);
                }else if(error.response?.data.message === 'Incorrect password.'){
                    setPasswordError(true);
                    setUsernameError(false);
                }
                return errorToast(error.response?.data.message)
            }
            return errorToast('Could not log in. Please try again later.');
        },
        onSuccess:()=>{
            navigate('/');
        }
    });

    const login = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        mutation.mutate(credentials);
    }
    return (
        <div className="flex flex-row max-[400px]:w-full items-center max-[400px]:mx-5 mx-10 gap-10 bg-gray-100 drop-shadow-md p-5 rounded-md">
            <figure className="flex-1 flex flex-col items-center p-5 rounded-e-md max-[800px]:hidden">
                <img 
                    src="/logo.png" 
                    className="w-auto h-52"
                    alt="Log in illustration"
                />
                <figcaption className="flex flex-col items-center text-center text-3xl font-bold text-gray-700 mt-2">
                    <span>Civil Registry</span>
                    <span>Information System</span>
                </figcaption>
            </figure>
            <form 
                className="flex max-[400px]:w-full w-96 flex-col gap-4 p-5"
                onSubmit={(e)=>{login(e)}}
            >
                <h1 className="text-3xl font-bold text-gray-700">Welcome back</h1>
                <div>
                    <div className="mb-2 block">
                        <Label 
                        htmlFor="username" 
                        value="Username" 
                        />
                    </div>
                    {
                        usernameError ?
                        (
                            <ErrorInput
                                fieldName="username"
                                credentials={credentials}
                                setCredentials={setCredentials}
                                type="text"
                            />
                        ):(
                            <TextInput 
                                id="username" 
                                type="text" 
                                placeholder="ziza" 
                                value={credentials.username}
                                onChange={(e)=>{setCredentials(prev => ({...prev, username:e.target.value}))}}
                                required 
                            />
                        )
                    }
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label 
                        htmlFor="password1" 
                        value="Password" 
                        />
                    </div>
                    {
                        passwordError ?
                        (
                            <ErrorInput
                                fieldName="password"
                                credentials={credentials}
                                setCredentials={setCredentials}
                                type="password"
                            />
                        ):(
                            <TextInput 
                                id="password1" 
                                type="password" 
                                value={credentials.password}
                                onChange={(e)=>{setCredentials(prev => ({...prev, password:e.target.value}))}}
                                required 
                            />
                        )
                    }
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Checkbox 
                            id="remember" 
                            checked={credentials.remember}
                            onChange={(e) => setCredentials(prev => ({ ...prev, remember: e.target.checked }))} 
                        />
                        <Label 
                            htmlFor="remember" 
                            className="cursor-pointer"
                        >
                            Remember me
                        </Label>
                    </div>
                    <div>
                        <Link to="/form/forgotpassword" className="text-sm font-medium text-gray-900">Forgot password?</Link>
                    </div>
                </div>
                <Button type="submit">
                {
                    mutation.isPending ? (
                    <LoaderDefault/>
                    ):(
                    'Sign in'
                    )
                }
                </Button>
                {/* <div className="flex items-center gap-2 text-sm font-medium">
                    <p>Don’t have an account yet?</p>
                    <Link to="/form/register" className="text-darkCyan">Sign up</Link>
                </div> */}
            </form>
        </div>
    );
}
export default Login