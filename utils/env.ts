
const VIEWPORT_HEIGHT_DEFAULT = 1080;
const VIEWPORT_WIDTH_DEFAULT = 1920;

const parseEnvInt = (value: string | undefined, fallback: number): number =>
	value !== undefined && !isNaN(+value) ? +value : fallback;

const env = {
	VIEWPORT_WIDTH: parseEnvInt(process.env.VIEWPORT_WIDTH, VIEWPORT_WIDTH_DEFAULT),
    VIEWPORT_HEIGHT: parseEnvInt(process.env.VIEWPORT_HEIGHT, VIEWPORT_HEIGHT_DEFAULT)
};

export default env;
