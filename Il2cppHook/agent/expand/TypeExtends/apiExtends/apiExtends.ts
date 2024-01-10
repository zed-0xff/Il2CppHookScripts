function transfromStrToWithTryCatchFunction<R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>(
    AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number = -1,
    retType: R, argTypes: A
) {
    try {
        return overloadTransfromStrToFunction(AssemblyName, NameSpaces, functionName, argsCount, [], retType, argTypes)
    } catch (error) {
        LOGE(error)
        return ptr(0)
    }
}

function transfromStrToFunction<R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>(
    AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number = -1,
    retType: R, argTypes: A
) {
    return overloadTransfromStrToFunction(AssemblyName, NameSpaces, functionName, argsCount, [], retType, argTypes)
}

function overloadTransfromStrToFunction<R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>(
    AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number = -1,
    overload: string[], retType: R, argTypes: A
) {
    let method = findMethod(AssemblyName, NameSpaces, functionName, argsCount, overload, false)
    if (method == undefined) throw new Error(`method ${functionName} not found`)
    let exportPointer = method.virtualAddress
    if (exportPointer == null) throw new Error("Could not find method")
    return new NativeFunction<R, A>(exportPointer, retType, argTypes);
}

Il2CppHook.e = transfromStrToFunction
Il2CppHook.t = transfromStrToWithTryCatchFunction
Il2CppHook.o = overloadTransfromStrToFunction

declare global {
    namespace Il2CppHook {
        // transform
        var e: <R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>
            (AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
            retType: R, argTypes: A) => any
        // transform
        var t: <R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>
            (AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
            retType: R, argTypes: A) => any
        // overload
        var o: <R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>
            (AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
            overload: string[], retType: R, argTypes: A) => any
    }
}

export { }
