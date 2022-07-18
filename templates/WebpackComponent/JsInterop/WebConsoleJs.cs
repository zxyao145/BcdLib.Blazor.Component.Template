using Microsoft.JSInterop;

namespace ApplicationName.JsInterop;


/// <summary>
/// browser console 代理
/// </summary>
public class WebConsoleJs : IAsyncDisposable
{
    const string _moduleName = "window.Introp.WebConsole.";

    private readonly IJSRuntime _jSRuntime;
    // 对于通过WebPack的方式进行打包，建议直接在HTML中引用js文件
    // For packaging through webpack, it is recommended to directly reference JS files in HTML
    //private readonly Lazy<Task<IJSObjectReference>> moduleTask;

    public WebConsoleJs(IJSRuntime jsRuntime)
    {
        _jSRuntime = jsRuntime;
        //moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
        //   "import", "./_content/ApplicationName/dist/index.min.js").AsTask());
    }

    public async ValueTask LogAsync(params string[] message)
    {
        //await moduleTask.Value;
        try
        {
            await _jSRuntime.InvokeVoidAsync(_moduleName + "log", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask InfoAsync(params string[] message)
    {
        //await moduleTask.Value;
        try
        {
            await _jSRuntime.InvokeVoidAsync(_moduleName + "info", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async ValueTask WarnAsync(params string[] message)
    {
        //await moduleTask.Value;
        try
        {
            await _jSRuntime.InvokeVoidAsync(_moduleName + "warn", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }


    public async ValueTask ErrorAsync(params string[] message)
    {
        //await moduleTask.Value;
        try
        {
            await _jSRuntime.InvokeVoidAsync(_moduleName + "error", message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public ValueTask DisposeAsync()
    {
        //if (moduleTask.IsValueCreated)
        //{
        //    var module = await moduleTask.Value;
        //    await module.DisposeAsync();
        //}
        return ValueTask.CompletedTask;
    }
}
