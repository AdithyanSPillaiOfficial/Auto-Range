import { NextResponse } from "next/server";
import { addObject, fetchObjectsByParam } from "../db";

export async function POST(request) {
    const req = await request.json();
    const result = await fetchObjectsByParam("email", req.email, "users");
    console.log(result);
    if(result.length == 1 && result[0].password == req.password) {
        const date = new Date();
        const sessionObj = {
            userkey : result[0]._id,
            logintime : date,
        }
        console.log(`User ${req.email} Loged In.`);
        console.log(sessionObj);
        const sessionId = await addObject(sessionObj, "sessions");
        return NextResponse.json({
            status : true,
            sessionkey : sessionId
        })
    }
    return NextResponse.json({
        status : false
    })
}