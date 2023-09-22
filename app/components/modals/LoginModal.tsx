"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import Button from "@/app/components/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginMoal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginMoal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const onToggle = useCallback(() => {
    loginMoal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginMoal]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSbumit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginMoal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        register={register}
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        register={register}
        type="password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>First time using Airbnb</p>
        <span
          onClick={onToggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginMoal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginMoal.onClose}
      onSubmit={handleSubmit(onSbumit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginMoal;
