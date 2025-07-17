import { getCurrentTimestamp } from "../utils/time";

export function step<This, Args extends never[], Return>(options?: {}) {
  return function actualDecorator<
    T extends (this: This, ...args: Args) => Promise<Return>
  >(
    target: T,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
  ): T {
    async function replacementMethod(this: This, ...args: Args): Promise<Return> {
      const methodName = context.name as string;
	  const timestamp = getCurrentTimestamp();
      console.log(`[ ${timestamp} ] step start -> ${methodName}`);
      try {
        const result = await target.call(this, ...args);
        console.log(`[ ${timestamp} ] 🟢 step done -> ${methodName}`);
        return result;
      } catch (error) {
		console.log(`[ ${timestamp} ] ‼️ step error -> ${methodName}: ${error}`);
        throw error;
      }
    }

    return replacementMethod as T;
  };
}