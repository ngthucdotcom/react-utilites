const moment = require("moment");

enum LoggerLevel {
	'INFO' = 'INFO',
	'WARN' = 'WARN',
	'ERROR' = 'ERROR'
}

/**
 * The function write basic log with color in browser
 * To usage, please init variable(s) className and dateTimeFormat (optional)
 * @param className: input used class name or function name or any thing call this function
 * @param dateTimeFormat: optional, default YYYY-MM-DD HH:mm:ss, display in console or same
 * @param environment
 * @returns: this function will return void function to input log
 */
export const useLogger = ({className = '', environment = 'local', dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'}) => {

	/**
	 * A function to make color log by log level
	 * @param level
	 */
	const getStyles = (level: LoggerLevel): string => {
		switch (level) {
			case LoggerLevel.INFO:
				return 'color: #00ccff';
			case LoggerLevel.WARN:
				return 'color: #ffcc00';
			case LoggerLevel.ERROR:
				return 'color: #ff0000';
			default:
				return 'color: #00ccff';
		}
	}

	/**
	 * @param className
	 * @param level
	 * @param data
	 * @param options
	 */
	const buildLog = (className: string, level: LoggerLevel, data: any, options: any = null): void => {
		const dateTime = moment().format(dateTimeFormat);
		const rawData = JSON.stringify(data);

		if (options) {
			console.log(`%c[${dateTime}][${level}][${className}]:`, getStyles(level), rawData, options);
		} else {
			console.log(`%c[${dateTime}][${level}][${className}]:`, getStyles(level), rawData);
		}
	}

	/**
	 * @param level
	 * @param data
	 * @param options
	 */
	const writeLog = (level: LoggerLevel, data: any, options: any = null): void => {
		if (environment === "production") {
			if (level === LoggerLevel.ERROR) {
				buildLog(className.toUpperCase(), LoggerLevel.ERROR, data, options);
			}
			return;
		}
		buildLog(className.toUpperCase(), level, data, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_info = (rawData: any, options: any = null): void => {
		writeLog(LoggerLevel.INFO, rawData, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_warn = (rawData: any, options: any = null): void => {
		writeLog(LoggerLevel.WARN, rawData, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_error = (rawData: any, options: any = null): void => {
		writeLog(LoggerLevel.ERROR, rawData, options);
	}

	return { log_info, log_warn, log_error };
}
