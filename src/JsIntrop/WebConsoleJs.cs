using Microsoft.JSInterop;

namespace ApplicationName.JsIntrop;


/// <summary>
/// browser console 代理
/// </summary>
public class WebConsoleJs : IAsyncDisposable
{
    const string _moduleName = "WebConsole.";

    private readonly Lazy<Task<IJSObjectReference>> moduleTask;

    public WebConsoleJs(IJSRuntime jsRuntime)
    {
        moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
           "import", "./_content/BcdLib.Blazor.Component.Template/dist/WebConsole.min.js").AsTask());
    }

    public async ValueTask LogAsync(params string[] message)
    {
        var module = await moduleTask.Value;
        try
        {
            await module.InvokeVoidAsync(_moduleName + "log", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask InfoAsync(params string[] message)
    {
        var module = await moduleTask.Value;
        try
        {
            await module.InvokeVoidAsync(_moduleName + "info", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask WarnAsync(params string[] message)
    {
        var module = await moduleTask.Value;
        try
        {
            await module.InvokeVoidAsync(_moduleName + "warn", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }


    public async ValueTask ErrorAsync(params string[] message)
    {
        var module = await moduleTask.Value;
        try
        {
            await module.InvokeVoidAsync(_moduleName + "error", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }



    public async ValueTask DisposeAsync()
    {
        if (moduleTask.IsValueCreated)
        {
            var module = await moduleTask.Value;
            await module.DisposeAsync();
        }
    }
}
