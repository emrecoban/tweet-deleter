import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import tweets from "./tweets";
//console.log("gelen veri => ", tweets[0].tweet.id, tweets[0].tweet.full_text)

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl border border-slate-200 rounded-lg m-6 p-6">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Tabs defaultValue="tweets" className="w-full pr-6">
            <TabsList>
              <TabsTrigger value="tweets">Tweet List</TabsTrigger>
              <TabsTrigger value="center">Delete Center</TabsTrigger>
            </TabsList>
            <TabsContent value="tweets">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">tweets.js</Label>
                <Textarea placeholder="Paste your tweets.js" id="message-2" />
                <p className="text-sm text-muted-foreground">
                  Paste your tweets.js array to the textbox.
                </p>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full text-sm mt-6"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is the tweets.js?</AccordionTrigger>
                    <AccordionContent>
                      This JSON file contains available Tweets which have not
                      been deleted and it includes edited tweets if applicable.
                      Users can edit a tweet up to five times; as such there are
                      up to 5 edited tweets with unique “editTweetIds,” all
                      connected by the “initialTweetID.” The definitions for
                      each of the variables that may be included in any
                      particular Tweet are available in our API documentation:
                      https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How can I download my Twitter Data?
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-inside list-decimal">
                        <li>Login your Twitter account</li>
                        <li>
                          Settings and Support &gt; Settings and privacy &gt;
                          Your account &gt; Download an archive of your data
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How can I find the tweets.js file?
                    </AccordionTrigger>
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
              </div>
            </TabsContent>
            <TabsContent value="center">Change your password here.</TabsContent>
          </Tabs>
        </div>
        <div className="bg-slate-50 rounded-lg p-6 h-min">
          <div className="space-y-1">
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
              <Badge variant="outline">{tweets.length}</Badge> Tweets
            </div>
            <Separator orientation="vertical" />
            <div>
              <Badge variant="destructive">2306</Badge> Deleted
            </div>
          </div>
        </div>
      </div>
    </main>
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
  
*/
