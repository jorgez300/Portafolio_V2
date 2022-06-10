using Microsoft.AspNetCore.Mvc;

namespace PortafolioV2.Controllers
{
    public class AracelisMController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/AracelisM/Index.cshtml");
        }
    }
}
