import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { currentUser } from "@/lib/current-user"
import { useState } from "react"

const Shorten = () => {
    const { user } = useUser();
    const [copying, setCopying] = useState<string | null>(null)

    const schema = z.object({
        url: z.string().url({
            message: "Enter valid url"
        })
    });
    const form = useForm({
        resolver: zodResolver(schema),
    })
    const [shortUrl, setShortUrl] = useState<string>("")
    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            if (!user) throw new Error("Not signed in");
            const existingUser = await currentUser(user.id)
            console.log("existingUser", existingUser);

            if (existingUser) {
                const payload = { longUrl: data.url, userId: existingUser._id };
                console.log(payload);
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/shorten`, payload)
                setShortUrl(`${import.meta.env.VITE_BACKEND_URI}/${res.data.shortUrl}`)
            }
        } catch (error) {
            console.log("error on submitting url", error)
        }
    }
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopying(text);
            setTimeout(() => setCopying(null), 1200);
        } catch (e) {
            console.error("Failed to copy", e);
        }
    };
    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">Create a Short Link</h1>
                <p className="text-muted-foreground">Paste a long URL and we’ll make it short and shareable.</p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-12 md:items-end">
                        <FormItem className="md:col-span-9">
                            <FormLabel className="text-sm">URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://example.com/very/long/link"
                                    {...form.register("url")}
                                />
                            </FormControl>
                            <FormDescription>Enter the URL you want to shorten</FormDescription>
                            <FormMessage />
                        </FormItem>

                        <div className="md:col-span-3 flex items-end justify-end">
                            <Button type="submit" className="w-full md:w-auto cursor-pointer">Shorten</Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="mt-6 rounded-xl border bg-card p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Your Short URL</div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input placeholder="shortUrl" readOnly value={shortUrl} className="font-mono" />
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="whitespace-nowrap cursor-pointer"
                            onClick={() => handleCopy(shortUrl)}
                            aria-live="polite"
                        >
                            {copying === shortUrl ? "Copied" : "Copy"}
                        </Button>
                        <Button asChild size="sm" className="whitespace-nowrap cursor-pointer">
                            <a href={shortUrl} target="_blank" rel="noreferrer">Visit</a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Shorten