using Microsoft.AspNetCore.Mvc;

namespace PortafolioV2.Controllers
{
    public class PolarSoftController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/PolarSoft/Index.cshtml");
        }

        public IActionResult Detalle()
        {
            return View("~/Views/PolarSoft/Detalle.cshtml");
        }
    }
}
