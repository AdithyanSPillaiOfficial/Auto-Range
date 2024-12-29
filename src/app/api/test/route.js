import { NextResponse } from "next/server";
import { getUserWithSession, updateDocumentwithId } from "../db";

export async function POST(request) {
    const req = await request.json();
    const user = await getUserWithSession(req.sessionid);
    await updateDocumentwithId("users",user._id,"cars",['hai','hello']);
    return NextResponse.json({
        status : user ? true : false,
        userid : user
    })
}