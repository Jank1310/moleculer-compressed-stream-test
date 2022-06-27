import { Context, Service as MoleculerService } from "moleculer";
import { Action, Service } from "moleculer-decorators";
import { Stream } from "stream";

@Service({
	name: "sender",
	version: process.env.BUILD_VERSION,
	settings: {
		$noVersionPrefix: true,
	},
})
class SenderService extends MoleculerService {
	@Action()
	public async send(ctx: Context): Promise<void> {
		const participants = [];
		for (let i = 0; i < 1000000; i++) {
			participants.push({ entry: i });
		}
		const stream = new Stream.Readable();
		stream.push(Buffer.from(JSON.stringify(participants)));
		stream.push(null);
		console.log("send stream...");
		await ctx.call("receiver.receive", stream, {
			meta: {
				participants: participants.slice(0, 100),
			},
		});
	}
}

module.exports = SenderService;
