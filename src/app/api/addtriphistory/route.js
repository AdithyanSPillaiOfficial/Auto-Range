import { getUserWithSession, updateDocumentwithId } from "../db";

export async function POST(request) {
    const req = await request.json();

    const user = await getUserWithSession(req.sessionid);
    if(!user.triphistory){
        user.triphistory = [];
    }

    user.triphistory.push(req.fueldata);
    const result = await updateDocumentwithId("users",user._id,"triphistory",user.triphistory);
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