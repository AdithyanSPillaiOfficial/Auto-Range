import { NextResponse } from "next/server";
import { getUserWithSession } from "../db";

export async function POST(request) {
    const req = await request.json();
    const user = await getUserWithSession(req.sessionid);
    return NextResponse.json({
        status : user ? true : false,
        userid : user
    })
}