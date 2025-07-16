import "reflect-metadata";

export function step(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
	const originalMethod = descriptor.value;

	descriptor.value = function (...args: any[]) {
		const timestamp = () => `[ ${new Date().toISOString()} ]`;

		console.log(`${timestamp()} [ step start  -> ${propertyKey} ]`);

		const result = originalMethod.apply(this, args);

		console.log(`${timestamp()} [ step end -> ${propertyKey} ]`);
		return result;
	};
}
