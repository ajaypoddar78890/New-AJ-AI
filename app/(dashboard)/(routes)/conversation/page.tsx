"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";

import Heading from "@/components/heading";
import { MessagesSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define Message type
type Message = {
  role: "user" | "assistant";
  content: string;
};

const Page = () => {
  const router = useRouter();
  const [message, setMessages] = useState<Message[]>([]); // Use correct Message type

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...message, userMessage];

      // API call to Google Generative AI
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      // Assuming the response contains a specific structure; adjust as needed
      const assistantReply =
        response.data?.reply || response.data?.generated_text || "No response"; // Adjust based on Google API response

      // Update messages
      setMessages((prev: Message[]) => [
        ...prev,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation pre-trained model"
        icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl>
                      <Input
                        className="w-full border-0 outline-none focus:ring-0"
                        placeholder="Enter your prompt here ..."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div>
          {message.map((msg, index) => (
            <p key={index} className="mt-4 p-2 border-b">
              <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
              {msg.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
