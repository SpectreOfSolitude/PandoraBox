export async function POST(request) {
    const {nim} = await request.json();

    return new Response(
        JSON.stringify({ nim: nim }),
        { status: 200, headers: {"Content-Type": "application/json"}}
    );
}