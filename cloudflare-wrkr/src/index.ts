
const main: ExportedHandler<Env> = {
	async fetch(request, env, ctx): Promise<Response> {
		return Response.json({
			message: 'Namaste World'
		});
	}
}

export default main;
