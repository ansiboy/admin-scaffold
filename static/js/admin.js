$(function() {
    $("header .trigger").click(function(e) {
        e.stopPropagation();
        if (!$("aside").hasClass("small-aside")) {
            $(this).find(".svg1").hide();
            $(this).find(".svg2").show();
            $("aside").addClass("small-aside");
            $("html").css("overflow-y", "hidden")
        } else {
            $(this).find(".svg1").show();
            $(this).find(".svg2").hide();
            $("aside").removeClass("small-aside");
            $("html").css("overflow-y", "auto")
        }
    })
    $("aside .sider-menu li .submenu-title .arrow").click(function(e) {
        e.stopPropagation();
        if (!$(this).parents("li").hasClass("selectopen")) {
            $(this).parents("li").find("ul.menu-sub").slideDown(200, function() {
                $(this).parents("li").addClass("selectopen");
            });
        } else {
            $(this).parents("li").find("ul.menu-sub").slideUp(200, function() {
                $(this).parents("li").removeClass("selectopen");
            });
        }
    })
    $("header .header-right .header-account").hover(function(e) {
        e.stopPropagation();
        $(this).find(".header-dropdown-menu").slideToggle(200);
    })
    $('[data-toggle="tooltip"]').tooltip();
    $(".select input.select-input").click(function(e) {
        e.stopPropagation();
        if (!$(this).parents(".select").is(".selectopen")) {
            $(this).parents(".select").addClass("selectopen");
            $(this).parents(".select").find("dl").slideDown(200)
        } else {
            $(this).parents(".select").find("dl").slideUp(200, function() {
                $(this).parents(".select").removeClass("selectopen");
            })
        }
    })
    $(".select dl dd").click(function(e) {
        e.stopPropagation();
        var dataValue = $(this).attr("data-value");
        $(this).parents(".select").find(".select-input").val(dataValue);
        $(this).parents(".select").find("dl").slideUp(200, function() {
            $(this).parents(".select").removeClass("selectopen");
        })
    })

    $(document).click(function(e) {
        e.stopPropagation();
        if (!$(e.target).is(".select") && !$(e.target).is("dd") && !$(e.target).is("input") && !$(e.target).is("button") && !$(e.target).is("span")) {
            $(".select dl").slideUp(200, function() {
                setTimeout(() => {
                    $(".select").removeClass("selectopen");
                }, 100);
            });
        }
    })
    $(".select-multiple input.select-input").click(function(e) {
        e.stopPropagation();
        if (!$(this).parents(".select-multiple").is(".selectopen")) {
            $(this).parents(".select-multiple").addClass("selectopen");
            $(this).parents(".select-multiple").find("dl").slideDown(200)
        } else {
            $(this).parents(".select-multiple").find("dl").slideUp(200, function() {
                $(this).parents(".select-multiple").removeClass("selectopen");
            })
        }
    })
    $(document).click(function(e) {
        e.stopPropagation();
        if (!$(e.target).is(".select-multiple") && !$(e.target).is("dd") && !$(e.target).is("label") && !$(e.target).is("input")) {

            $(".select-multiple dl").slideUp(200, function() {
                setTimeout(() => {
                    $(".select-multiple").removeClass("selectopen");
                }, 100);
            });
        }
    })
    $(".classification-box .tree-list .tree-title1").click(function(e) {
        e.stopPropagation();
        if (!$(this).parents(".tree-list").hasClass("two")) {
            var cc = $(this).find(".arrow").hasClass("selected");
            if (!$(this).find(".arrow").hasClass("selected")) {
                $(this).find(".arrow").addClass("selected");
                $(this).parents(".tree-list").find(".tree-list.two").slideDown(200);
            } else {
                $(this).find(".arrow").removeClass("selected");
                $(this).parents(".tree-list").find(".tree-list.two").slideUp(200);
            }
        }
    })
    $(".classification-box .tree-list .tree-list.two .tree-title1").click(function(e) {
        e.stopPropagation();
        var dd = $(this).find(".arrow").hasClass("selected");
        if (!$(this).find(".arrow").hasClass("selected")) {
            $(this).find(".arrow").addClass("selected");
            $(this).parents(".tree-title").next(".tree-list.three ").slideDown(200);

        } else {
            $(this).find(".arrow").removeClass("selected");
            $(this).parents(".tree-title").next(".tree-list.three ").slideUp(200);
        }
    })
    $(".file-input input[type=file]").change(function(e) {
        e.stopPropagation();
        var thisname = undefined;
        var file = $(this).val();
        if (file != "") {
            //正则表达式获取文件名，不带后缀
            var strFileName = file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi, "$1");
            //正则表达式获取后缀
            var FileExt = file.replace(/.+\./, "");
            thisname = `${strFileName}.${FileExt}`;
        }
        $(this).parents(".file-input").find("input[type=text]").val(thisname);
    })
    $(".start-list button").hover(function(e) {
        e.stopPropagation();
        var thisindex = $(this).index();
        $(this).parents(".start-list").addClass("noover");
        $(this).parents(".start-list").find("button").each(function(index) {
            if (thisindex >= index) {
                $(this).addClass("over");
            }
        })

    }, function() {
        $(this).parents(".start-list").find("button").removeClass("noover");
        $(this).parents(".start-list").find("button").removeClass("over");
    })
    $(".template-tool-list .tool-title").click(function(e) {
        e.stopPropagation();
        if (!$(this).parents(".template-tool-list").hasClass("selected")) {
            $(this).parents(".template-tool-list").addClass("selected");
            $(this).parents(".template-tool-list").find(".template-tool-con").slideDown(200);
        } else {
            $(this).parents(".template-tool-list").find(".template-tool-con").slideUp(200, function() {
                $(this).parents(".template-tool-list").removeClass("selected");
            });
        }
    })
    $(".circle").each(function() {
        var mask = $(this).find(".mask span").text();
        if (mask <= 50) {
            $(this).find(".pie_right").css({ 'transform': 'rotate(' + (mask * 3.6) + 'deg)' });
        } else {
            $(this).find(".pie_right").css('transform', 'rotate(180deg)');
            $(this).find('.pie_left').css({ 'transform': 'rotate(' + ((mask - 50) * 3.6) + 'deg)' });
        }
        $(this).animate({ 'opacity': 1 });
    })
})