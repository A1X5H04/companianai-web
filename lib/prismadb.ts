import { PrismaClient } from "@prisma/client";
import { tmpdir } from "os";
import fs from "fs";

declare global {
  var prisma: PrismaClient | undefined;
}

fs.writeFile(
  `${tmpdir()}/server-ca.pem`,
  process.env.CLIENT_CERTIFICATE!,
  (err) => {
    if (err) return console.log(err);
  }
);

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
