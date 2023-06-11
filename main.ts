#!/usr/bin/env -S deno run --allow-all

import "https://deno.land/x/violet/globals.d.ts";
import "https://deno.land/x/violet@0.1.0/globals.ts";
import { basename } from "https://deno.land/std@0.38.0/path/mod.ts"

const TARGETS: any = {
  "x86_64-linux": "x86_64-unknown-linux-gnu",
  "x86_64-windows": "x86_64-pc-windows-msvc",
  "x86_64-darwin": "x86_64-apple-darwin",
  "arm64-darwin": "aarch64-apple-darwin",
}


console.log(Deno.args)
const filename = Deno.args[0]
const baseFilename = basename(filename).split('.')[0]
const args = Deno.args.slice(1, -1)

// TODO: mkdir for output?

for (const k of Object.keys(TARGETS)) {
  const v = TARGETS[k]
  console.log(k, v)
  const cmd = [
    "deno",
    "compile",
    "--allow-all",
    "--target", v,
    "--output", `./build/${k}/${baseFilename}`,
    filename,
    args
  ]
  await $`${cmd}`
}


await $`zstd ./build/**/*`
