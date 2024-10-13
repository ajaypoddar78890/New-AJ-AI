"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import Heading from "@/components/heading";
import { Code2 } from "lucide-react";
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
  const [message, setMessages] = useState<Message[]>([]);

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

      setMessages((prev) => [userMessage, ...prev]);

      const response = await axios.post("/api/conversation", {
        messages: [userMessage, ...message],
      });

      const parts = response.data?.response?.parts;

      if (Array.isArray(parts) && parts.length > 0) {
        const assistantReply = parts[0]?.text || "No response";
        setMessages((prev) => [
          { role: "assistant", content: assistantReply },
          ...prev,
        ]);
      } else {
        setMessages((prev) => [
          {
            role: "assistant",
            content: "Sorry, no response from the assistant.",
          },
          ...prev,
        ]);
      }

      form.reset();
    } catch (error: unknown) {
      setMessages((prev) => [
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        },
        ...prev,
      ]);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Get your code generated!"
        icon={Code2}
        iconColor="text-gray-500"
        bgColor="bg-gray-500/10"
      />

      <div className="px-4 lg:px-8">
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

        <div className="mt-6">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`mt-4 p-4 rounded-lg shadow-sm ${
                msg.role === "user" ? "bg-blue-50" : "bg-gray-100"
              }`}
            >
              <strong
                className={`block mb-2 font-semibold ${
                  msg.role === "user" ? "text-blue-600" : "text-green-600"
                }`}
              >
                {msg.role === "user" ? "You" : "Assistant"}:
              </strong>

              {msg.role === "assistant" ? (
                <pre className="whitespace-pre-wrap bg-gray-200 rounded-lg p-2 border border-gray-300">
                  <code className="text-gray-800">{msg.content}</code>
                </pre>
              ) : (
                <p className="text-gray-700 leading-relaxed">{msg.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
