import { currentUser } from "@/lib/current-user";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface Url {
  _id: string;
  longUrl: string;
  shortUrl: string;
  clicks?: number;
}

const Home = () => {
  const [urls, setUrls] = useState<Url[] | null>(null)
  const [copying, setCopying] = useState<string | null>(null)
  const { user } = useUser();
  useEffect(() => {

    if (user)
      (async () => {
        const existingUser = await currentUser(user.id)
        const userId = existingUser._id;
        const res = await axios.get<Url[]>(`${import.meta.env.VITE_BACKEND_URI}/api/urls/${userId}`);
        console.log(res.data);
        setUrls(res.data)
      })()
  }, [user]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopying(id);
      setTimeout(() => setCopying(null), 1200);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/urls/${id}`);
      window.location.reload();
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

  return (
    <div className="bg-background overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Your Shortened Links</h1>
            <p className="text-muted-foreground">Manage and share your URLs easily.</p>
          </div>
        </header>

        {!urls && (
          <div className="grid gap-3">
            <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        )}

        {Array.isArray(urls) && urls.length === 0 && (
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-lg font-medium">No links yet</p>
            <p className="text-sm text-muted-foreground">Create your first shortened URL to see it here.</p>
          </div>
        )}

        {Array.isArray(urls) && urls.length > 0 && (
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="grid grid-cols-16 items-center border-b bg-muted/50 px-4 py-3 text-sm font-medium text-muted-foreground">
              <div className="col-span-5">Original URL</div>
              <div className="col-span-4">Short URL</div>
              <div className="col-span-3 text-center">Clicks</div>
              <div className="col-span-4 text-center">Actions</div>
            </div>
            <ul className="divide-y">
              {urls.map((u) => {
                const short = `${import.meta.env.VITE_BACKEND_URI}/${u.shortUrl}`;
                return (
                  <li key={u._id} className="grid grid-cols-16 items-center gap-3 px-4 py-4">
                    <div className="col-span-5 min-w-0 pr-4">
                      <a
                        href={u.longUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="line-clamp-2 break-all text-foreground hover:underline"
                        title={u.longUrl}
                      >
                        {u.longUrl}
                      </a>
                    </div>
                    <div className="col-span-4 pr-4 min-w-0">
                      <a
                        href={short}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate font-medium text-primary hover:underline"
                        title={short}
                      >
                        {short}
                      </a>
                    </div>
                    <div className="col-span-3 text-center text-lg text-muted-foreground">
                      {(u.clicks ?? 0)}
                    </div>
                    <div className="col-span-4 flex items-center justify-end gap-2 md:flex-nowrap flex-wrap flex-shrink-0">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="whitespace-nowrap cursor-pointer"
                        onClick={() => handleCopy(short, u._id)}
                      >
                        {copying === u._id ? "Copied" : "Copy"}
                      </Button>
                      <Button asChild size="sm" className="whitespace-nowrap cursor-pointer">
                        <a href={short} target="_blank" rel="noreferrer">Visit</a>
                      </Button>
                      <Button size="sm" className="whitespace-nowrap cursor-pointer" variant={"destructive"} onClick={() => handleDelete(u._id)}>
                        Delete
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home