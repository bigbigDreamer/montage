import { z } from 'zod';
import { type PluginOptions } from "./pluginOptions";

export const ZPluginOptions: z.ZodType<PluginOptions> = z.lazy(() => z.object({
    host: z.string({ invalid_type_error: 'The host property of plugin options must be string type!' }),
}))
