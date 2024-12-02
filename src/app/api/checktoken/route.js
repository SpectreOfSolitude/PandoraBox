export async function POST(request) {
    const {token} = await request.json();

    console.log(token);

    return new Response(
        JSON.stringify({ nim: "105221026" }),
        { status: 200, headers: {"Content-Type": "application/json"}}
    );
}