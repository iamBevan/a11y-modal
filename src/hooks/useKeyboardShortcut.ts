import { useEffect, useCallback, useReducer } from "react";

type ActionType = "set-key-down" | "set-key-up"

interface State {
    [key: string]: boolean
}

interface Action {
    type: ActionType
    key: string
}

const blacklistedTargets = ["INPUT", "TEXTAREA"];

const keysReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "set-key-down":
            return { ...state, [action.key]: true };
        case "set-key-up":
            return { ...state, [action.key]: false };
        default:
            return state;
    }
};

const useKeyboardShortcut = (shortcutKeys: string[], callback: () => void) => {

    let initialKeys: { [key: string]: boolean } = {}
    shortcutKeys.forEach((_key) => {
        initialKeys[_key.toLowerCase()] = false
    })

    const [keys, setKeys] = useReducer(keysReducer, initialKeys);

    const keydownListener = useCallback(
        (keydownEvent: KeyboardEvent) => {
            const { key, target, repeat } = keydownEvent;
            const loweredKey = key.toLowerCase();
            const targetElement = target as Element

            if (repeat) return;
            if (blacklistedTargets.includes(targetElement.tagName)) return;
            if (keys[loweredKey] === undefined) return;

            if (keys[loweredKey] === false)
                setKeys({ type: "set-key-down", key: loweredKey });
        },
        [keys]
    );

    const keyupListener = useCallback(
        (keyupEvent: KeyboardEvent) => {
            const { key, target } = keyupEvent;
            const loweredKey = key.toLowerCase();
            const targetElement = target as Element

            if (blacklistedTargets.includes(targetElement.tagName)) return;
            if (keys[loweredKey] === undefined) return;

            if (keys[loweredKey] === true)
                setKeys({ type: "set-key-up", key: loweredKey });
        },
        [keys]
    );

    useEffect(() => {
        let values = Object.keys(keys).map(e => keys[e])

        if (values[0] && values[1]) callback();

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

export { useKeyboardShortcut };