import { Context, Service as MoleculerService } from "moleculer";
import { Action, Service } from "moleculer-decorators";
import { Readable } from "stream";

@Service({
	name: "receiver",
	version: process.env.BUILD_VERSION,
	settings: {
		$noVersionPrefix: true,
	},
})
class ReceiverService extends MoleculerService {
	@Action()
	public async receive(ctx: Context<Readable>): Promise<void> {
		const participants = [];
		ctx.params.on("data", (d) => participants.push(d));
		ctx.params.on("end", () =>
			console.log("finished", participants.length)
		);
	}
}

module.exports = ReceiverService;
