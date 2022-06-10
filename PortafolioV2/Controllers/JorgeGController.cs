using Microsoft.AspNetCore.Mvc;

namespace PortafolioV2.Controllers
{
    public class JorgeGController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/JorgeG/Index.cshtml");
        }
    }
}
