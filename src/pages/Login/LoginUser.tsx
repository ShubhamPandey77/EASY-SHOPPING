import { LoginForm } from "./Login.Form"
import {Toaster} from "react-hot-toast";
export default function LoginUser() {
  return (
    <>
    <Toaster/>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  </>
  )  
}