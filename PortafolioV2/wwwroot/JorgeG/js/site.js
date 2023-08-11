/*!
    * Start Bootstrap - Resume v6.0.2 (https://startbootstrap.com/theme/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */


$(function () {

    "use strict"; // Start of use strict

    //// Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });

    SetLang();

})

let lang = null;

$("#Langs").change(function () {

    SetLang();
})

function SetLang() {

    if ($("#Langs").val() == "ESP") {
        lang = ESP;
    }
    else {
        lang = ENG;
    }

    console.log(lang);

    $("Title").html(lang.WebTitle);


    $("#IdMenuAbout").html(lang.Menu.About);
    $("#IdMenuExperience").html(lang.Menu.Experience);
    $("#IdMenuEducation").html(lang.Menu.Education);
    $("#IdMenuSkills").html(lang.Menu.Skills);
    $("#IdMenuInterests").html(lang.Menu.Interests);
    $("#IdMenuGallery").html(lang.Menu.Gallery);


    $("#IdTitleExperience").html(lang.Title.Experience);
    $("#IdTitleEducation").html(lang.Title.Education);
    $("#IdTitleSkills").html(lang.Title.Skills);
    $("#IdTitleInterests").html(lang.Title.Interests);
    $("#IdTitleGallery").html(lang.Title.Gallery);

    $("#IdInterests").html(lang.Interests.Resume);

    $("#IdAboutResume").html(lang.About.Resume);

    $(".ExperienceItem").remove();

    lang.Experience.forEach(function (item) {

        let activities = '';

        if (item.Activities.length > 0) {

            item.Activities.forEach(function (item) {
                activities +=
                    `
                        <li>${item}</li>
                    `
            });

            activities =
                `
                <ul>
                    ${activities}
                </ul>
                `;
        }


        $("#IdExperienceContent").append(
            `
            <div class="d-flex flex-column flex-md-row justify-content-between mb-5 ExperienceItem">
                <div class="flex-grow-1">
                    <h3 class="mb-0">${item.Title}</h3>
                    <div class="subheading mb-3">${item.Place}</div>
                    <p>${item.Resume}</p>
                    ${activities}
                </div>
                <div class="flex-shrink-0"><span class="text-primary">${item.Period}</span></div>
            </div>
            `
        );

    });



    $(".EducationItem").remove();

    lang.Education.forEach(function (item) {


        $("#IdEducationContent").append(
            `
            <div class="d-flex flex-column flex-md-row justify-content-between mb-5 EducationItem">
                <div class="flex-grow-1">
                    <h3 class="mb-0">${item.Place}</h3>
                    <div class="subheading mb-3">${item.Title}</div>
                </div>
                <div class="flex-shrink-0"><span class="text-primary">${item.Period}</span></div>
            </div>
            `
        );

    });

    $(".ToolsItem").remove();
    $(".WorkflowItem").remove();

    $("#IdSkillsTitle").html(lang.Skills.ToolsTitle);
    $("#IdWorkflowTitle").html(lang.Skills.WorkflowTitle);

    lang.Skills.Tools.forEach(function (item) {


        $("#IdToolsContent").append(
            `
                <li class="ToolsItem">
                    <span class="fa-li"><i class="fas fa-check"></i></span>
                    ${item}
                </li>
            `
        );

    });

    lang.Skills.Workflows.forEach(function (item) {


        $("#IdWorkflowContent").append(
            `
                <li class="WorkflowItem">
                    <span class="fa-li"><i class="fas fa-check"></i></span>
                    ${item}
                </li>
            `
        );

    });


    $(".GalleryItem").remove();

    lang.Gallery.forEach(function (item, i) {


        $("#IdGalleryContent").append(
            `
                <div class="col-4 GalleryItem mt-2">
                    <div class="card" style="width:300px">
                        <img class="card-img-top" src="/JorgeG/Galeria/${item.Folder}/${item.Thumb}" alt="Card image" style="width:100%">
                        <div class="card-body">
                            <h4 class="card-title">${item.Title}</h4>
                            <p class="card-text">${item.Resume}</p>
                            <button type="button" class="btn btn-primary" onclick="ToggleModal(${i})">${item.BtnTxt}</button>
                        </div>
                    </div>
                </div>
            `
        );

    });





}


$("#BtnGalleryModalClose").click(() => {

    $("#myModal").hide();
});

function ToggleModal(id) {

    $("#myModal").show();


    $(".CarouselIndicatorsItem").remove();
    $(".CarouselImgsItem").remove();

    let GallerySelected = lang.Gallery[id];

    $("#GalleryModalTitle").html(GallerySelected.Title);
    $("#BtnGalleryModalClose").html(GallerySelected.BtnClose);

    GallerySelected.Imgs.forEach(function (item, i) {


        $("#CarouselIndicators").append(
            `
                <li data-target="#GalleryContent" data-slide-to="${i}" class="${(i == 0) ? "active" : ""} CarouselIndicatorsItem"></li>
            `
        );

        $("#CarouselImgs").append(
            `
             <div class="carousel-item ${(i == 0) ? "active" : ""} CarouselImgsItem">
                <img src="/JorgeG/Galeria/${GallerySelected.Folder}/${item}" alt="${item}" class="img-fluid">
             </div>            
            `
        );

    });




}