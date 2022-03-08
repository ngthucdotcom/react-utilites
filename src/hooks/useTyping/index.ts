import {useRef} from "react";

// interface TypingParams {
// 	debounceTimeout?: number;
// }
//
// interface Typing {
// 	onDebounce: (value: any, callback: (value: any) => void) => void;
// 	onKeyDown: (event: any, callback: () => void, keyDown?: string) => void;
// }

export const useTyping = (initialState: any = {debounceTimeout: 300}) => {
	const typingTimeoutRef = useRef({});
	const debounceTimeout = initialState.debounceTimeout || 300;

	/**
	 * This function return value on timeout
	 * @param value typeof any
	 * @param callback typeof function
	 */
	function onDebounce(value: any, callback: (value: any) => void) {
		if (!callback || !(typeof callback === "function")) return;
		if (typingTimeoutRef.current) {
			clearTimeout(<NodeJS.Timeout>typingTimeoutRef.current);
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
	const onKeyDown = (event: any, callback: () => void, keyDown: string = 'Enter') => {
		if (event.key === keyDown) {
			if (!callback) return;
			callback();
		}
	}

	return { onDebounce, onKeyDown }
}
