using Microsoft.AspNetCore.Mvc;

namespace PortafolioV2.Controllers
{
    public class GesfarmOnlineController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/GesfarmOnline/Index.cshtml");
        }
    }
}
