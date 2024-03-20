import ioClient from "socket.io-client";
import { PUBLIC_SERVER } from "$env/static/public";

export const socket = ioClient(PUBLIC_SERVER);
