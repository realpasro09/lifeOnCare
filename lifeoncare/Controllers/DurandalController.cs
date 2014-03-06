using System.Web.Mvc;

namespace lifeoncare.Controllers {
  public class DurandalController : Controller {
    public ActionResult Index() {
        return File("index.html", "text/html");
    }
  }
}