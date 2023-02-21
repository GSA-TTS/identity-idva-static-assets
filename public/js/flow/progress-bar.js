function initpbar(current) {
    var i = 1
    var stepName
    $("#prog-bar-placeholder").load("https://identity-idva-static-assets-dev.app.cloud.gov/html/progress-bar.html", function () {
        $("ol#prog-bar li").each(function () {
            if (i < current) {
                $(this).addClass("usa-step-indicator__segment--complete")
                $("span.usa-sr-only", this).text("completed")
            } else if (i == current) {
                $(this).addClass("usa-step-indicator__segment--current")
                $(this).attr("aria-current", "true")
                stepName = $("span.innerspan", this).html()
            } else {
                $("span.usa-sr-only", this).text("not complete")
            }
            i++
        })
        $("#step-count").text(current)
        $("#step-name").html(stepName)
    });

}