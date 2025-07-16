import { getCurrentTimestamp } from "../utils/time";

export function step(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;

	descriptor.value = async function (...args: any[]) {
		const timestamp = () => `[ ${getCurrentTimestamp()} ]`;

		console.log(`${timestamp()} [ step start  -> ${propertyKey} ]`);

		try {
			const result = await originalMethod.apply(this, args);
			console.log(`${timestamp()} [ step end -> ${propertyKey} ]`);
			return result;
		} catch (error: any) {
			console.error(
				`${timestamp()} [ ❗️ step error ❗️ -> ${propertyKey}: ${error.message || error} ]`
			);
			throw error;
		}
	};

	return descriptor;
}
