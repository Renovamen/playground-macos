/// <reference types="vite/client" />

import type { AttributifyAttributes } from "unocss/dist/preset-attributify";

declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
