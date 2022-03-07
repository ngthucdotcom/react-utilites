import {useRef} from "react";

export const useTyping = (initialState = {debounceTimeout: 300}) => {
	const typingTimeoutRef = useRef({});
	const debounceTimeout = initialState.debounceTimeout || 300;

	/**
	 * This function return value on timeout
	 * @param value typeof any
	 * @param callback typeof function
	 */
	const onDebounce = (value, callback) => {
		if (!callback || !(typeof callback === "function")) return;
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			callback(value);
		}, debounceTimeout);
	}

	/**
	 * This function handle event ENTER key down
	 * Get 2 params: event of Input and callback as a function
	 * @param event
	 * @param keyDown
	 * @param callback
	 */
	const onKeyDown = (event, callback, keyDown = 'Enter') => {
		if (event.key === keyDown) {
			if (!callback) return;
			callback();
		}
	}

	return { onDebounce, onKeyDown }
}
