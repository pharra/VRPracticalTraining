export default function DebugLog(message?: any, ...optionalParams: any[]) {
    if (optionalParams.length !== 0) {
        console.log(message, optionalParams);
    } else {
        console.log(message);
    }
}
