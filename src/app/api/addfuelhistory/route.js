import { NextResponse } from "next/server";
import { getUserWithSession, updateDocumentwithId } from "../db";

export async function POST(request) {
    const req = await request.json();

    const user = await getUserWithSession(req.sessionid);
    const vehicle = user.vehicles.find(v => v.regno === req.regno);
    if(!vehicle.fuelhistory){
        vehicle.fuelhistory = [];
    }

    vehicle.fuelhistory.push(req.fueldata);
    console.log(req.fueldata);
    console.log(user.vehicles);
    const result = await updateDocumentwithId("users",user._id,"vehicles",user.vehicles);
    if(result) {
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