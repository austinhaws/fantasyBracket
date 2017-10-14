/**
 * Keep "a" from firing and call the function. Is YOUR a protected?
 * @param run_function The function to run
 * @param bindThis the "this" for the resulting function call; can be false to use the event (jquery style) or for React can be the react component
 * @returns {Function}
 */
function protectA(run_function, bindThis) {
	return function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}

		// react support
		if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
			e.nativeEvent.stopImmediatePropagation();
		}

		// react needs "this" to be the react component
		if (bindThis) {
			run_function.bind(bindThis)(e);
		} else {
			// call sets "this" of the called function
			// the called function behaves as if jquery had called it by giving it the triggering element
			run_function.call(e.target, e);
		}
	};
}
