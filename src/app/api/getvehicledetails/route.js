import { NextResponse } from "next/server";
import { getUserWithSession } from "../db";

export async function POST(request) {
    const req = await request.json();

    const user = await getUserWithSession(req.sessionid);
    if(user.vehicles && user.vehicles.length > 0) {
        const filteredVehicles = user.vehicles.filter(vehicle => vehicle.regno === req.regno);
        if(filteredVehicles.length > 0) {
            return NextResponse.json({
                status : true,
                vehicledetails : filteredVehicles[0]
            })
        }
        else return NextResponse.json({status : false});
    }
    else return NextResponse.json({status : false});


}