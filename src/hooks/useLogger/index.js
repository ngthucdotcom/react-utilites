const moment = require("moment");

/**
 * The function write basic log with color in browser
 * To usage, please init variable(s) className and dateTimeFormat (optional)
 * @param className: input used class name or function name or any thing call this function
 * @param dateTimeFormat: optional, default YYYY-MM-DD HH:mm:ss, display in console or same
 * @param environment: optional, default local
 * @returns: this function will return void function to input log
 */
export const useLogger = (className = '', environment = 'local', dateTimeFormat = 'YYYY-MM-DD HH:mm:ss') => {

	/**
	 * A function to make color log by log level
	 * @param level
	 */
	const getStyles = (level) => {
		switch (level) {
			case 'INFO':
				return 'color: #00ccff';
			case 'WARN':
				return 'color: #ffcc00';
			case 'ERROR':
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
	const buildLog = (className, level, data, options = null) => {
		const dateTime = moment().format(dateTimeFormat);
		const rawData = JSON.stringify(data);

		if (!options) {
			console.log(`%c[${dateTime}][${level}][${className}]:`, getStyles(level), rawData);
		} else {
			console.log(`%c[${dateTime}][${level}][${className}]:`, getStyles(level), rawData, options);
		}
	}

	/**
	 * @param level
	 * @param data
	 * @param options
	 */
	const writeLog = (level, data, options = null) => {
		if (environment === "production") {
			if (level === 'ERROR') {
				buildLog(className.toUpperCase(), 'ERROR', data, options);
			}
			return;
		}
		buildLog(className.toUpperCase(), level, data, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_info = (rawData, options = null) => {
		writeLog('INFO', rawData, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_warn = (rawData, options = null) => {
		writeLog('WARN', rawData, options);
	}

	/**
	 * @param rawData
	 * @param options
	 */
	const log_error = (rawData, options = null) => {
		writeLog('ERROR', rawData, options);
	}

	return { log_info, log_warn, log_error };
}
