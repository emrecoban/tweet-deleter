"use client";

import icon from "../public/bin.png";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteTweets } from "@/lib/delete-tweets";
import { AlertCircle } from "lucide-react";
//console.log("gelen veri => ", tweets[0].tweet.id, tweets[0].tweet.full_text)

export default function Home() {
  const [step, setStep] = useState("tweets");
  const [tweets, setTweets] = useState(null);
  const [formData, setFormData] = useState({
    pending: false,
    error: null,
    url: "",
    bearer: "",
    csrf: "",
  });
  const [count, setCount] = useState({
    tweets: 0,
    deleted: 0,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        setTweets(JSON.parse(`[${content.replace(/^[^\[]*\[/, "")}`));
      };

      reader.readAsText(file);
    }
  };

  const handleNext = () => {
    if (tweets) {
      setStep("center");
      setCount((prev) => ({
        ...prev,
        tweets: tweets != null ? tweets?.length : 0,
      }));
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    if (formData.url && formData.bearer && formData.csrf) {
      setFormData((prev) => ({
        ...prev,
        error: null,
        pending: true,
      }));
      /*
      await deleteTweets(
            formData.url,
            formData.bearer,
            formData.csrf,
            tweet.id
          );
          await fetch("/deleteTweets", {
            method: "POST",
            body: JSON.stringify({
              url: formData.url,
              bearer: formData.bearer,
              csrf: formData.csrf,
              id: tweet.id,
            }),
          });
           */

      try {
        for (const { tweet } of tweets) {
          const result = await deleteTweets(
            formData.url,
            formData.bearer,
            formData.csrf,
            tweet.id
          );
          console.log("result => ", result);
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.log("gelen hata: ", error);
        setFormData((prev) => ({
          ...prev,
          error: error.message,
          pending: false,
        }));
      } finally {
        setFormData((prev) => ({
          ...prev,
          pending: false,
        }));
      }
    }
  };

  return (
    <main className="mx-auto max-w-7xl border border-slate-200 rounded-lg m-6 p-6">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Tabs defaultValue="0" value={step} className="w-full pr-6">
            <TabsList>
              <TabsTrigger value="tweets" disabled={step != "tweets"}>
                Tweet List
              </TabsTrigger>
              <TabsTrigger value="center" disabled={step != "center"}>
                Delete Center
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tweets" className="p-3">
              <div className="grid w-full gap-1.5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="tweetsjs">tweets.js</Label>
                  <Input
                    id="tweetsjs"
                    type="file"
                    accept=".js"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Select your tweets.js file.
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    disabled={!tweets}
                    onClick={handleNext}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <FAQs />
            </TabsContent>
            <TabsContent value="center" className="p-3">
              <div className="grid w-full gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="RequestUrl">Request URL</Label>
                  <Input
                    type="text"
                    id="RequestUrl"
                    name="url"
                    value={formData.url}
                    placeholder="https://twitter.com/i/api/graphql/XXXXXXXXXXXXXXXXXXXXX/DeleteTweet"
                    onChange={handleInput}
                    disabled={formData.pending}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="Bearer">Bearer Token</Label>
                  <Input
                    type="text"
                    id="Bearer"
                    name="bearer"
                    value={formData.bearer}
                    placeholder="Bearer AAAAAAANwIzUejRCOuHAAA..."
                    onChange={handleInput}
                    disabled={formData.pending}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="Csrf">X-Csrf-Token</Label>
                  <Input
                    type="text"
                    id="Csrf"
                    name="csrf"
                    value={formData.csrf}
                    placeholder="fcf6d5bdc84d95d6f7188d341ef9e139..."
                    onChange={handleInput}
                    disabled={formData.pending}
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  {formData.pending ? (
                    <Button variant="destructive" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting your tweets
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setStep("tweets")}
                      >
                        <ChevronLeft className="h-4 w-4" /> Back
                      </Button>
                      <Button
                        variant="destructive"
                        disabled={
                          !(formData.url && formData.bearer && formData.csrf)
                        }
                        onClick={handleDelete}
                      >
                        Delete my tweets!
                      </Button>
                    </>
                  )}
                </div>
                {formData.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{formData.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="bg-slate-50 rounded-lg p-6 h-min shadow-sm">
          <div className="space-y-1">
            <Image src={icon} alt="tweet delete icon" width="48" height="48" />
            <h4 className="text-base font-medium leading-none">
              Tweet Deleter <Badge>v0.0.1-beta</Badge>
            </h4>
            <p className="text-sm text-muted-foreground">
              Free and easily delete your tweets.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>
              <Badge variant="outline">{count.tweets}</Badge> Tweets
            </div>
            <Separator orientation="vertical" />
            <div>
              <Badge variant="destructive">{count.deleted}</Badge> Deleted
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FAQs() {
  return (
    <Accordion type="single" collapsible className="w-full text-sm mt-6">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the tweets.js?</AccordionTrigger>
        <AccordionContent>
          This JSON file contains available Tweets which have not been deleted
          and it includes edited tweets if applicable. Users can edit a tweet up
          to five times; as such there are up to 5 edited tweets with unique
          “editTweetIds,” all connected by the “initialTweetID.” The definitions
          for each of the variables that may be included in any particular Tweet
          are available in our API documentation:
          https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How can I download my Twitter Data?</AccordionTrigger>
        <AccordionContent>
          <ol className="list-inside list-decimal">
            <li>Login your Twitter account</li>
            <li>
              Settings and Support &gt; Settings and privacy &gt; Your account
              &gt; Download an archive of your data
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How can I find the tweets.js file?</AccordionTrigger>
        <AccordionContent>
          <ol className="list-inside list-decimal">
            <li>Download your Twitter Data</li>
            <li>Extract the zip file</li>
            <li>Open the folder</li>
            <li>/data/tweets.js</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/*
  {
    tweet: {
      edit_info: [Object],
      retweeted: false,
      source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
      entities: [Object],
      display_text_range: [Array],
      favorite_count: '0',
      in_reply_to_status_id_str: '1414718446445727745',
      id_str: '1414719326108721156',
      in_reply_to_user_id: '425109467',
      truncated: false,
      retweet_count: '0',
      id: '1414719326108721156',
      in_reply_to_status_id: '1414718446445727745',
      created_at: 'Mon Jul 12 22:52:26 +0000 2021',
      favorited: false,
      full_text: "Arada ilgimi çeken de yok değil. Yine de Twitter'ın bu tarafı bana göre değil. Twitter bu anlamıyla güzel hee. İstiyorsun haber sitesi oluyor; istiyorsun video sitesi oluyor; istiyorsun kitap alıntıları sitesi...",
      lang: 'tr',
      in_reply_to_screen_name: 'emreshepherd',
      in_reply_to_user_id_str: '425109467'
    }
  },

[    
  {
    tweet: {
      id: '1414719326108721156',
    }
  },
]
  
*/
