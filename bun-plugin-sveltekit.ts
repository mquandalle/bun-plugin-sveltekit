// https://bun.sh/docs/runtime/plugins
Bun.plugin({
	name: 'bun-plugin-sveltekit',

	setup(build) {
		build.module('$env/static/private', () => {
			return {
				exports: Bun.env,
				loader: 'object',
			};
		});

		build.module('$app/environment', () => {
			return {
				exports: { dev: true },
				loader: 'object',
			};
		});
	},
});