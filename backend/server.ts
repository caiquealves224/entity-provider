import { env } from "./utils/env.ts";

const hello: string = "Hello, World!!!";

console.log(hello, {  appname: env.APP_NAME });