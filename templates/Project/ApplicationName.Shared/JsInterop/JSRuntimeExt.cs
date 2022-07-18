using Microsoft.JSInterop;

namespace ApplicationName.Shared.JsInterop;

public static class JSRuntimeExt
{
    public static WebConsoleJs GetWebConsoleJs(this IJSRuntime jsRuntime)
    {
        return new WebConsoleJs(jsRuntime);
    }
}

