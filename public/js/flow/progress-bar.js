function initpbar(current) {
    var i = 1
    var stepName
    const bar = '<div><div class="usa-step-indicator usa-step-indicator--no-labels"aria-label=progress><ol class=usa-step-indicator__segments id=prog-bar><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>What you need</span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Your Privacy and Security</span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Verify your ID <i>1 of 5</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Verify your ID <i>2 of 5</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Verify your ID <i>3 of 5</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Verify your ID <i>4 of 5</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Verify your ID <i>5 of 5</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Enter your personal details</span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Verify your personal details</span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Challenge Code Selection <i>1 of 2</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Challenge Code Validation <i>1 of 2</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Challenge Code Selection <i>2 of 2</i></span><span class=usa-sr-only></span></span><li class=usa-step-indicator__segment><span class=usa-step-indicator__segment-label><span class=innerspan>Challenge Code Validation <i>2 of 2</i></span><span class=usa-sr-only></span></span></ol><div class=usa-step-indicator__header><h4 class=usa-step-indicator__heading><span class=usa-step-indicator__heading-counter><span class=usa-sr-only>Step</span> <span class=usa-step-indicator__current-step id=step-count></span> <span class=usa-step-indicator__total-steps>of 13</span></span><span class=usa-step-indicator__heading-text id=step-name></span></h4></div></div><hr class=blurline style=width:auto;margin-left:-1rem;margin-right:-1rem></div>'
    $("#prog-bar-placeholder").html(bar)
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
}