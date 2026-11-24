import "dotenv/config";
import arcjet, {detectBot, shield, slidingWindow} from "@arcjet/node";

const arcjetKey = process.env.ARCJET_KEY;

if (!arcjetKey) {
    if (process.env.NODE_ENV === "test") {
        console.log("ARCJET_KEY environment variable is missing; Arcjet is bypassed in tests.");
    } else {
        throw new Error("ARCJET_KEY environment variable is missing in .env file");
    }
}

const aj = arcjet({
    key: arcjetKey ?? "",
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:PREVIEW",
            ],
        }),
       slidingWindow({
           mode: "LIVE",
           interval: "2s",
           max: 5,
       }),
    ],
});

export default aj;
