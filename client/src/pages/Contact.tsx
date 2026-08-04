import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@shared/contact";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkoddwqd";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          _replyto: values.email,
          _subject: `Portfolio Contact - ${values.subject}`,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Thank you! Your message has been sent successfully."
      );

      form.reset();
    } catch {
      toast.error(
        "Unable to send your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <p className="text-accent font-mono text-sm font-medium">
            Contact
          </p>

          <h1 className="text-5xl font-bold">
            Let's connect
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl">
            Whether you're hiring, looking to collaborate
            on a security project, or just want to say hello —
            I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">

            <div className="space-y-8">

            

              <div className="space-y-6">

                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Mail
                      size={18}
                      className="text-accent"
                    />
                  </div>

                  <div>
                    <p className="font-medium">
                      Email
                    </p>

                    <a
                      href="mailto:toni.shcherbakova@gmail.com"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      toni.shcherbakova@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <MapPin
                      size={18}
                      className="text-accent"
                    />
                  </div>

                  <div>
                    <p className="font-medium">
                      Location
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Stockholm, Sweden —
                      Remote & On-site
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-4 rounded-lg bg-secondary border border-border">
                <p className="text-sm text-muted-foreground">
                  I typically respond within
                  1–2 business days.
                </p>
              </div>

            </div>

            <div className="lg:col-span-2">

              <div className="p-6 md:p-8 rounded-lg border border-border bg-card">

                <Form {...form}>

                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >

                    <div className="grid sm:grid-cols-2 gap-6">

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>

                            <FormLabel>Name</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Your name"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />

                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>

                            <FormLabel>Email</FormLabel>

                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />

                          </FormItem>
                        )}
                      />

                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>

                          <FormLabel>Subject</FormLabel>

                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />

                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>

                          <FormLabel>Message</FormLabel>

                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Tell me about your project, opportunity or question..."
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />

                        </FormItem>
                      )}
                    />

                    {/* Honeypot */}

                    <input
                      type="text"
                      {...form.register("website")}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-accent text-accent-foreground hover:opacity-90"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </Button>

                  </form>

                </Form>

              </div>

            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}