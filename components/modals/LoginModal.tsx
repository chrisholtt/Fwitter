import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from 'react-icons/bs'

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from 'next/navigation'

import AuthSocialButton from "./components/AuthSocialButton"
import Input from "../Input";
import Modal from "../Modal";
import { callbackify } from "util";
import { redirect } from "next/dist/server/api-utils";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      },)

      if (res?.error) {
        toast.error("invalid credentials")
      }
      if (!res?.error && res?.ok)
        toast.success('Logged in');

      loginModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Login failed")
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Login success")
        }
      }).finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )



  const footerContent = (
    <>
      <div className="mt-6 flex gap-2">
        <AuthSocialButton icon={BsGithub} onClick={() => socialAction("Github")} />
        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("Google")} />
      </div>
      <div className="text-neutral-400 text-center mt-4">
        <p>First time using Twitter?
          <span
            onClick={onToggle}
            className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create an account</span>
        </p>
      </div>
    </>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
