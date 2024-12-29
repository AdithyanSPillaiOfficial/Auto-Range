import { getUserWithSession, updateDocumentwithId } from "../db";

export async function POST(request) {
    const req = await request.json();

    const user = await getUserWithSession(req.sessionid);
    if(!user.fuelhistory){
        user.fuelhistory = [];
    }

    user.fuelhistory.push(req.fueldata);
    const result = await updateDocumentwithId("users",user._id,"fuelhistory",user.fuelhistory);
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