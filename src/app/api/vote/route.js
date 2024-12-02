export async function POST(request) {
    const {nim, choice_id} = await request.json();
    
    return new Response(
        JSON.stringify({ nim: "105221026" }),
        { status: 200, headers: {"Content-Type": "application/json"}}
    );
}