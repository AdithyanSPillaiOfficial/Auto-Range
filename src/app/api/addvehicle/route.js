import { NextResponse } from "next/server";
import { getUserWithSession, updateDocumentwithId } from "../db";

export async function POST(request) {
    const req = await request.json();

    const user = await getUserWithSession(req.sessionid);
    user.vehicles.push(req.vehicle);
    const updation = await updateDocumentwithId("users", user._id,"vehicles", user.vehicles);
    if(updation) {
        return NextResponse.json({
            status : true
        })
    }
    else {
        return NextResponse.json({
            status : false
        })
    }
}