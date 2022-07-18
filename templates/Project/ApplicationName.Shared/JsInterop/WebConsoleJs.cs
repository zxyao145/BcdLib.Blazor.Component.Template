using Microsoft.JSInterop;

namespace ApplicationName.Shared.JsInterop;

/// <summary>
/// browser console 代理
/// </summary>
public class WebConsoleJs
{
    public const string InteropBasePrefix = "window.Introp.";

    const string _moduleName = InteropBasePrefix + "WebConsole.";

    private readonly IJSRuntime jsRuntime;

    public WebConsoleJs(IJSRuntime jsRuntime)
    {
        this.jsRuntime = jsRuntime;
    }

    public async ValueTask LogAsync(params string[] message)
    {
        try
        {
            await jsRuntime.InvokeVoidAsync(_moduleName + "log", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask InfoAsync(params string[] message)
    {
        try
        {
            await jsRuntime.InvokeVoidAsync(_moduleName + "info", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask WarnAsync(params string[] message)
    {
        try
        {
            await jsRuntime.InvokeVoidAsync(_moduleName + "warn", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask ErrorAsync(params string[] message)
    {
        try
        {
            await jsRuntime.InvokeVoidAsync(_moduleName + "error", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
}

