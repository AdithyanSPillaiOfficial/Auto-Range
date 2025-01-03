import { NextResponse } from "next/server";
import { getUserWithSession } from "../db";

export async function POST(request) {
    const req = await request.json();
    const user = await getUserWithSession(req.sessionid);
    console.log(user);
    if (user) {
        return NextResponse.json({
            status : true,
            vehicles : user.vehicles ? user.vehicles : []
        })
    }
    else {
        return NextResponse.json({
            status : false
        })
    }
}