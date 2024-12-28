import { NextResponse } from "next/server";
import { addObject } from "../db";

export async function POST(request){
    const req = await request.json();

    const objId = await addObject(req, "users");
    console.log(`Objext ID : ${objId}`);
    return NextResponse.json({
        status : true,
        userId : objId,
    })
}