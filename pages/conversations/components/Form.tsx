import {
    HiPaperAirplane,
    HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/hooks/useConversation";

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true }); // shouldRevalidate will cause re-render
        axios.post('/api/messages', {
            ...data,
            conversationId: conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result.info.secure_url,
            conversationId: conversationId
        })
    }

    return (
        <div
            className="
        py-4 
        px-4 
        border-t 
        border-neutral-800
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
        >
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="yk8cjqpt"
            >
                <HiPhoto size={30} className="text-white" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="
            rounded-full 
            p-2 
            cursor-pointer 
            hover:bg-slate-300 
            hover:bg-opacity-10 
            transition
          "
                >
                    <HiPaperAirplane
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    );
}

export default Form;