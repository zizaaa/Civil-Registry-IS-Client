import { useState } from 'react';
import { Avatar, Button, Card, Label, Tabs, TextInput } from 'flowbite-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { ErrorInput, errorToast, LoaderDefault, serverURL, successToast } from '../../hooks/imports';
import { User } from '../../types/user';
import { Toaster } from 'react-hot-toast';
import { useActivityMutation } from '../../services/sendActivity';

interface PersonalStateType{
    username:string;
    name:string;
    email:string;
}

interface PersonalWithID{
    id:number;
    data:PersonalStateType;
}

interface PasswordType{
    password:string;
    confirmPassword:string;
    oldPassword:string;
}

interface PasswordWithIDType{
    id:number;
    data:PasswordType;
}

const Settings: React.FC = () => {
    const [personalInfo, setPersonalInfo] = useState<PersonalStateType>({
        username:"",
        name:"",
        email:""
    });

    const [passwords, setPasswords] = useState<PasswordType>({
        password:"",
        confirmPassword:"",
        oldPassword:""
    });

    const [passNotMatch, setPassNotMatch] = useState<boolean>(false);
    const [passError, setPassError] = useState<boolean>(false);

    const activityMutation = useActivityMutation();

    const { data, refetch } = useQuery({
        queryKey:['get-user'],
        queryFn: async(): Promise<User>=>{
            const { data } = await axios.get(`${serverURL}/api/cris/current-user`, { withCredentials:true })

            return data;
        }
    });

    const personalInfoMutation = useMutation({
        mutationFn: async(info:PersonalWithID)=>{
            const { data } = await axios.post(`${serverURL}/api/cris/update-information/${info.id}`, info.data, { withCredentials:true })
            
            return data;
        },
        onSuccess:(data)=>{
            successToast(`${data.message}`);
            activityMutation.mutate(`Update a personal information`);
            refetch();
            setPersonalInfo({
                username:"",
                name:"",
                email:""
            })
        },
        onError:(error:Error)=>{
            if(isAxiosError(error)){
                return errorToast(error.response?.data.message)
            }
            return errorToast('Something went wrong.');
        },
    });

    const passwordMutation = useMutation({
        mutationFn: async(passData:PasswordWithIDType)=>{
            const { data } = await axios.post(`${serverURL}/api/cris/update-password/${passData.id}`, passData.data, { withCredentials:true })
            
            return data;
        },
        onSuccess:(data)=>{
            successToast(`${data.message}`);
            activityMutation.mutate(`Update a password`);
            setPassNotMatch(false);
            setPassError(false);
            setPasswords({
                password:"",
                confirmPassword:"",
                oldPassword:""
            });
        },
        onError:(error:Error)=>{
            if(isAxiosError(error)){
                if(error.response?.data.message === 'Incorrect password.'){
                    setPassError(true);
                }
                return errorToast(error.response?.data.message)
            }
            return errorToast('Something went wrong.');
        },
    });

    // submit
    const isFormEmpty = (cred:PersonalStateType) => {
        // Check if every key in the form data is either an empty string or undefined/null
        return Object.values(cred).every((value) => !value || value === '');
    };

    const handleUpdateInformation = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(isFormEmpty(personalInfo)){
            errorToast('Empty form');
            return;
        }

        const informations = {
            id:data?.id as number,
            data:personalInfo
        }
        personalInfoMutation.mutate(informations);
    }

    const isPassEmpty = (cred:PasswordType) => {
        // Check if every key in the form data is either an empty string or undefined/null
        return Object.values(cred).every((value) => !value || value === '');
    };
    const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isPassEmpty(passwords)){
            errorToast('Empty form');
            return;
        }

        if(passwords.password !== passwords.confirmPassword){
            errorToast('Password not match');
            setPassNotMatch(true);
            return
        }

        const informations = {
            id:data?.id as number,
            data:passwords
        }

        passwordMutation.mutate(informations)
    }
    return (
        <>
            <Toaster/>
            <Card className="w-full">
                {/* User Avatar and Information Section */}
                <div className="flex items-center space-x-4 mb-4">
                    <Avatar
                        img={undefined}
                        rounded={true}
                        size="lg"
                        alt="User Profile Picture"
                        placeholderInitials={data?.name.charAt(0)}
                    />
                    <div>
                        <div className='flex gap-1 items-center'>
                            <h1 className="text-lg font-bold">{data?.name}</h1>
                            <h2 className="text-lg">({data?.username})</h2>
                        </div>
                        <p className="text-sm text-gray-500">{data?.email}</p>
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs>
                    <Tabs.Item title="Personal Info">
                        <form onSubmit={handleUpdateInformation}>
                            <div className="mb-2">
                                <Label htmlFor="username" value="Username" />
                                <TextInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={personalInfo.username}
                                    onChange={(e)=>{setPersonalInfo(prev => ({...prev, username:e.target.value}))}}
                                />
                            </div>
                            <div className="mb-2">
                                <Label htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={personalInfo.name}
                                    onChange={(e)=>{setPersonalInfo(prev => ({...prev, name:e.target.value}))}}
                                />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={personalInfo.email}
                                    onChange={(e)=>{setPersonalInfo(prev => ({...prev, email:e.target.value}))}}
                                />
                            </div>
                            <Button 
                                type='submit' 
                                disabled={isFormEmpty(personalInfo)}
                                className='disabled:bg-[#145b7f] transition-all duration-300 w-44'
                            >
                                {personalInfoMutation.isPending ? (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <LoaderDefault/>
                                        </div>
                                    ) : (
                                        'Update Information'
                                    )
                                }
                            </Button>
                        </form>
                    </Tabs.Item>

                    <Tabs.Item title="Change Password">
                        <form onSubmit={handleUpdatePassword}>
                            <div className="mb-4">
                                <Label htmlFor="oldPassword" value="Current Password" />
                                {
                                    passError ?
                                    (
                                        <ErrorInput
                                            fieldName="oldPassword"
                                            credentials={passwords}
                                            setCredentials={setPasswords}
                                            type="password"
                                        />
                                    ):(
                                        <TextInput
                                            id="oldPassword"
                                            name="oldPassword"
                                            type="password"
                                            placeholder="Current password"
                                            value={passwords.oldPassword}
                                            onChange={(e)=>{setPasswords(prev => ({...prev, oldPassword:e.target.value}))}}
                                        />
                                    )
                                }
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="newPassword" value="New Password" />
                                {
                                    passNotMatch ?
                                    (
                                        <ErrorInput
                                            fieldName="password"
                                            credentials={passwords}
                                            setCredentials={setPasswords}
                                            type="password"
                                        />
                                    ):(
                                        <TextInput
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            placeholder="New password"
                                            value={passwords.password}
                                            onChange={(e)=>{setPasswords(prev => ({...prev, password:e.target.value}))}}
                                        />
                                    )
                                }
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="confirmPassword" value="Confirm Password" />
                                {
                                    passNotMatch ?
                                    (
                                        <ErrorInput
                                            fieldName="confirmPassword"
                                            credentials={passwords}
                                            setCredentials={setPasswords}
                                            type="password"
                                        />
                                    ):(
                                        <TextInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm password"
                                            value={passwords.confirmPassword}
                                            onChange={(e)=>{setPasswords(prev => ({...prev, confirmPassword:e.target.value}))}}
                                        />
                                    )
                                }
                            </div>
                            <Button 
                                type='submit' 
                                disabled={isPassEmpty(passwords)}
                                className='disabled:bg-[#145b7f] transition-all duration-300 w-40'
                            >
                                {passwordMutation.isPending ? (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <LoaderDefault/>
                                        </div>
                                    ) : (
                                        'Change password'
                                    )
                                }
                            </Button>
                        </form>
                    </Tabs.Item>
                </Tabs>
            </Card>
        </>
    );
};

export default Settings;
