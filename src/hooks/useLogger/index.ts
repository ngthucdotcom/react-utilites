const moment = require("moment");

enum LoggerLevel {
	'INFO' = 'INFO',
	'WARN' = 'WARN',
	'ERROR' = 'ERROR'
}

/**
 * React hooks to write log in console.
 *
 * @example
 * import { useLogger } from 'react-utilities';
 *
 * const logger = useLogger({className: 'className'});
 *
 * logger.log_info(data, embedded_data) -> to log info
 *
 * logger.log_warn(data, embedded_data) -> to log warning
 *
 * logger.log_error(data, embedded_data) -> to log error
 *
 * @param initialize
 * @subparam className: required
 * @subparam environment: optional, default is 'local'
 * @subparam dateTimeFormat: optional, default is 'YYYY-MM-DD HH:mm:ss'
 */
export const useLogger = (initialize: {className: string, environment?: string, dateTimeFormat?: string}) => {

	/**
	 * A function to make color log by log level
	 * @param level
	 */
	const getStyles = (level: LoggerLevel) => {
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
	const buildLog = (className: string, level: LoggerLevel, data: any, options: any = null) => {
		const dateTime = moment().format(initialize.dateTimeFormat || 'YYYY-MM-DD HH:mm:ss');
		const rawData = JSON.stringify(data);

		if (options) {
			console.log(`%c[${dateTime}][${level}][${className}]:`, getStyles(level), rawData, options);
		} else {
			console.log(`%c[${dateTime}][${level}][${className}]:`, getStyles(level), rawData);
		}
		return {
			message: 'Build log success',
			data: {
				className,
				level,
				data,
				options
			}
		}
	}

	/**
	 * @param level
	 * @param data
	 * @param options
	 */
	const writeLog = (level: LoggerLevel, data: any, options: any = null) => {
		if (initialize.environment === "production") {
			if (level === LoggerLevel.ERROR) {
				return buildLog(initialize.className.toUpperCase(), LoggerLevel.ERROR, data, options);
			}
		}
		return buildLog(initialize.className.toUpperCase(), level, data, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_info = (rawData: any, options: any = null) => {
		return writeLog(LoggerLevel.INFO, rawData, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_warn = (rawData: any, options: any = null) => {
		return writeLog(LoggerLevel.WARN, rawData, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_error = (rawData: any, options: any = null) => {
		return writeLog(LoggerLevel.ERROR, rawData, options);
	}

	return { log_info, log_warn, log_error };
}
