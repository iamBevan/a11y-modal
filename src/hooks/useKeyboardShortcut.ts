import { useEffect, useCallback, useReducer } from "react";

interface Action {
    type: string
    key: string
}

const blacklistedTargets = ["INPUT", "TEXTAREA"];

const keysReducer = (state: any, action: Action) => {
    switch (action.type) {
        case "set-key-down":
            return { ...state, [action.key]: true };
        case "set-key-up":
            return { ...state, [action.key]: false };
        default:
            return state;
    }
};

const useKeyboardShortcut = (shortcutKeys: object, callback: (keys: string) => void) => {

    const initalKeyMapping = Array.isArray(shortcutKeys) && shortcutKeys.reduce((currentKeys, key) => {
        currentKeys[key.toLowerCase()] = false;
        console.log("currentKeyus", currentKeys)
        return currentKeys;
    }, {});

    const [keys, setKeys] = useReducer(keysReducer, initalKeyMapping);

    const keydownListener = useCallback(
        keydownEvent => {
            const { key, target, repeat } = keydownEvent;
            const loweredKey = key.toLowerCase();

            if (repeat) return;
            if (blacklistedTargets.includes(target.tagName)) return;
            if (keys[loweredKey] === undefined) return;

            if (keys[loweredKey] === false)
                setKeys({ type: "set-key-down", key: loweredKey });
        },
        [keys]
    );

    const keyupListener = useCallback(
        keyupEvent => {
            const { key, target } = keyupEvent;
            const loweredKey = key.toLowerCase();

            if (blacklistedTargets.includes(target.tagName)) return;
            if (keys[loweredKey] === undefined) return;

            if (keys[loweredKey] === true)
                setKeys({ type: "set-key-up", key: loweredKey });
        },
        [keys]
    );

    useEffect(() => {
        let values = Object.keys(keys).map(e => keys[e])

        if (values[0] && values[1]) callback(keys);

    }, [callback, keys]);

    useEffect(() => {
        window.addEventListener("keydown", keydownListener, true);

        return () => window.removeEventListener("keydown", keydownListener, true);

    }, [keydownListener]);

    useEffect(() => {
        window.addEventListener("keyup", keyupListener, true);

        return () => window.removeEventListener("keyup", keyupListener, true);

    }, [keyupListener]);
};

export default useKeyboardShortcut;