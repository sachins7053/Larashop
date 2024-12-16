import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import InputError from "./InputError"
import InputLabel from "./InputLabel"


export default function UserEmailLoginForm() {
    
const {data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    mobile: '',
})

const handleLogin: FormEventHandler = (e) => {

    e.preventDefault();

    post(route('customerLogin'), {
        onFinish: () => reset('email','password'),
    } )
}
const handleRegister: FormEventHandler = (e) => {

    e.preventDefault();

    post(route('customerRegister'), {
        onFinish: () => reset('name','email','password', 'mobile'),
    } )
}

  return (
    <Tabs defaultValue="register" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <form onSubmit={handleLogin}>
                <InputError message={errors.email} />
                <div  className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <Input
                        id="username"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setData('email', e.target.value)}
                        value={data.email}
                        />
                </div>
                <div  className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => setData('password', e.target.value)}
                        value={data.password}
                        />
                </div>
             <Button className="mt-4 w-full" disabled={processing} type="submit">Login</Button>
             </form>

        </TabsContent>
        <TabsContent value="register">
                <InputError message={errors.email} />
            <form onSubmit={handleRegister}>
                <div  className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Your Email"
                        onChange={(e) => setData('name', e.target.value)}
                        value={data.name}
                        
                        />
                        <InputError
                        message={errors.name}
                        className="mt-2"
                    />
                </div>
                <div  className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <Input
                        id="username"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={(e) => setData('email', e.target.value)}
                        value={data.email}
                        
                        />
                        <InputError
                        message={errors.email}
                        className="mt-2"
                    />
                </div>
                <div  className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        onChange={(e) => setData('password', e.target.value)}
                        value={data.password}
                        />
                        <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="mobile"
                        value="Mobile"
                    />

                    <Input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        value={data.mobile}
                        className="mt-1 block w-full"
                        placeholder="Enter Your Mobile Number"
                        onChange={(e) =>
                            setData('mobile', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.mobile}
                        className="mt-2"
                    />
                </div>
             <Button className="mt-4 w-full" disabled={processing} type="submit">Register</Button>
             </form>

        </TabsContent>
        
    </Tabs>

  )
}



