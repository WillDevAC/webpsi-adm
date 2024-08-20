"use server"

import { revalidateTag } from "next/cache"

const revalidateTagServer = (path: string) =>{
revalidateTag(path)
}

export{ revalidateTagServer }