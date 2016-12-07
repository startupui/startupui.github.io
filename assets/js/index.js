jQuery(document).ready(function() {

    jQuery('#buynowbutton').after('<a href="http://designmodo.github.io/Flat-UI/" target="_blank" class="btn demo">View Demo</a>');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.mobile = true;
    } else {
        window.mobile = false;
    }

    // Show / Hide comments via AJAX
    function load_comments(post_id, cpage, element) {
        var list_div = jQuery(element);

        if (list_div.html() == '') {
            list_div.html('Loading...');

            jQuery.ajax({
                type: 'post',
                url: '/wp-admin/admin-ajax.php',
                data: 'post_id=' + post_id + '&cpage=' + cpage + '&action=dm_show_comments',
                success: function(response) {
                    list_div.html(response);
                }
            });
        }
    }

    // Show / Hide comments trigger
    jQuery(document).on('click', '#flat_ui_comments_trigger', function() {
        var comments_trigger = jQuery(this);
        load_comments(jQuery(this).data('post-id'), jQuery(this).data('cpage'), '.flat_ui_comments_list_ajax');

        if (!jQuery('.flat_ui_comments_list').is(':visible')) {
            jQuery('.flat-comments-wrapper .slide_wrapper').slideUp(400, function() {
                jQuery('.comments-wrapper').removeClass('flat-comments-wrapper');
                jQuery('.flat_ui-comments-title').css('margin-top', '0px');
                jQuery('.flat_ui_comments_list').toggle(400);
            });
        }
    });

    // Show comments when #comments- in url hash
    var page_hash = window.location.hash;
    if (page_hash != '' && page_hash.match(/comment-/g)) {
        jQuery('#flat_ui_comments_trigger').click();
    }

    //SWTICH SVG TO PNG
    if ((!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) || (window.mobile)) {
        jQuery('.svg').remove();
        jQuery('.nosvg').attr('style', 'display:block !important;');
    }

    if (!window.mobile) {
        jQuery('.zoomify').click(function(a) {
            jQuery('html').addClass('noscroll');
            var widthStr = '';
            if (jQuery(this).attr('data')) {
                widthStr = ' style="width: ' + jQuery(this).attr("data") + 'px"';
            }
            jQuery('body').addClass('noscroll').append('<div class="previewer"><span class="loading"></span><img src="' + jQuery(this).attr('href') + '" class="largeimage"' + widthStr + '/></div>');

            jQuery(".previewer").click(function() {
                jQuery('html').removeClass('noscroll');
                jQuery('body').removeClass('noscroll');
                jQuery(this).remove();
            });
            jQuery('.largeimage').load(function() {
                jQuery('.largeimage').addClass('animated');
                jQuery('.loading').remove();
            });

            return false;
        });
    }

    jQuery(document).scroll(function() {
        init();
    });

    jQuery(document).resize(function() {
        init();
    });
    var i = 0;
    var paddingForMobile = 0;

    function init() {
        var baseSection = jQuery('.base-section').offset();
        var itemSection = jQuery('.item-section').offset();
        var responsiveSection = jQuery('.responsive-section').offset();
        var swatchSection = jQuery('.swatch-section').offset();
        var iconSection = jQuery('.icon-section').offset();
        var shareSection = jQuery('.share-section').offset();

        if (window.mobile) paddingForMobile = 500;

        if (jQuery(document).scrollTop() >= baseSection.top - jQuery(window).height() + 700 - paddingForMobile) {
            jQuery('.base-section .holder').addClass("highlight");
        }

        if (jQuery(document).scrollTop() >= responsiveSection.top - jQuery(window).height() + 300 - paddingForMobile) {
            showResponsive();
        }

        if (jQuery(document).scrollTop() >= swatchSection.top - jQuery(window).height() - paddingForMobile) {
            showSwatchSection();
        }

        if (jQuery(document).scrollTop() >= iconSection.top - jQuery(window).height() + 300 - paddingForMobile) {
            showIconSection();
        }

        if (jQuery(document).scrollTop() >= itemSection.top - jQuery(window).height() + 300 - paddingForMobile) {
            showFeatures();
        }

        if (jQuery(document).scrollTop() >= shareSection.top - jQuery(window).height() + 300 - paddingForMobile) {
            jQuery("#counts").animateNumber(window.newNumber, {
                easing: "easeInOutCirc",
                duration: 1000,
                floatStepDecimals: 0
            });
        }
    }
    init();

    var showResponsiveRunning = 0;

    function showResponsive() {
        if (showResponsiveRunning == 0) {
            jQuery('.responsive-iphone').css('left', 0).css('opacity', 1);
            showResponsiveRunning = 1;
        }
    }

    var showSwatchSectionRunning = 0;

    function showSwatchSection() {
        if (showSwatchSectionRunning == 0) {
            jQuery('#colorful-icon').css('background-color', "rgb(26, 188, 156)");
            showSwatchSectionRunning = 1;
        }
    }

    var showIconSectionRunning = 0;

    function showIconSection() {
        if (showIconSectionRunning == 0) {
            showIconSectionRunning = 1;
            jQuery('#icon-heart').addClass('animated');
        }
    }

    var showFeaturesRunning = 0;
    var i = 0;

    function showFeatures() {
        if (showFeaturesRunning == 0) {
            jQuery('.item-list li').each(function() {
                jQuery(this).delay(jQuery(this).index() * 50).animate({
                    opacity: 1
                }, 0);
            });
            showFeaturesRunning = 1;
        }
    }

    //SWATCHES CHANGE
    jQuery('.color-list li span').click(function() {
        jQuery('.color-list li.selected').removeClass('selected');
        jQuery(this).parent().addClass('selected');
        var colors = new Array('#1abc9c', '#2dc86f', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e', '#ecf0f1', '#95a5a6');
        jQuery('#colorful-icon').css('background-color', colors[jQuery(this).parent().index()]);
    });
    jQuery('#colorful-icon').click(function() {
        jQuery('.color-list li.selected').nextOrFirst('li').find('span').click();
    });

    //RESPONSIVE TOGGLES
    jQuery('.mobile-list li div').click(function() {

        if (jQuery(this).hasClass('selected')) {

            jQuery('.mobile-list li div').not('selected').addClass('selected');
            jQuery(this).removeClass('selected');

            if (jQuery('.responsive-ipad').is(':visible')) {
                jQuery('.responsive-iphone').show().animate({
                    left: 0,
                    opacity: 1
                }, {
                    duration: 0
                });
                jQuery('.responsive-ipad').removeAttr('style').hide();
            } else if (jQuery('.responsive-iphone').is(':visible')) {
                jQuery('.responsive-ipad').show().animate({
                    left: 0,
                    opacity: 1
                }, {
                    duration: 0
                });
                jQuery('.responsive-iphone').removeAttr('style').hide();
            }
        }
    });

    //PROTOTYPING PAGINATION
    jQuery('.prototype-section .pr-navigation li').click(function() {
        if (!jQuery(this).hasClass('active')) {
            jQuery('.prototype-section .pr-navigation li.active').removeClass('active');
            jQuery(this).addClass('active');

            jQuery('.prototype-section .pr-block div').not(".hidden").addClass('hidden');
            jQuery('.prototype-section .pr-block div:eq(' + jQuery(this).index() + ')').removeClass('hidden');

            jQuery('.prototype-section .pr-block div:eq(' + jQuery(this).index() + ') span').each(function(index) {
                pos = jQuery(this).css('left');
                jQuery(this).css('left', "+=10").css('opacity', 0).delay(jQuery(this).index() * 50).animate({
                    left: pos,
                    opacity: 1
                }, {
                    duration: 500,
                    easing: "easeOutCubic"
                });
            });

        }
    });

    //PROTOTYPING NEXT
    jQuery('#pr-site, #pr-blog, #pr-page').click(function() {
        jQuery('.prototype-section .pr-navigation li.active').nextOrFirst('li').click();
    });

    //LICENSE CHANGE
    jQuery('.license-list li span').click(function() {
        if (jQuery(this).parent().attr('class') != 'active') {
            jQuery('.license-list li.active').removeClass('active');
            jQuery(this).parent().addClass('active');
            jQuery('.boxes.developer').slideToggle(300);
            jQuery('.boxes.personal').slideToggle(300);
            jQuery('.boxes.personal').before(jQuery('.boxes.developer'));
        }
    });

    //================================================================================================
    //================================================================================================
    //==================================                            ==================================
    //==================================        SVG ANIMATION       ==================================
    //==================================                            ==================================
    //================================================================================================
    //================================================================================================

    //CLOCK ANIMATION
    function startTicking() {
        newInt = window.setInterval(function() {

            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();

            h = (h > 12) ? h - 12 : h;
            h = (h == '00') ? 12 : h;

            var secangle = (s) * 6;
            var minangle = (m) * 6;
            var hrsangle = h * 30;

            jQuerysvg = jQuery("#clock");

            if (s == 0) {
                jQuery("#sec", jQuerysvg).attr('transform', "rotate(" + secangle + ",50,50)");
            }

            jQuery("#sec", jQuerysvg).animate({
                svgTransform: 'rotate(' + secangle + ',50,50)'
            }, {
                duration: 400,
                easing: 'easeOutElastic'
            });
            jQuery("#min", jQuerysvg).animate({
                svgTransform: 'rotate(' + minangle + ',50,50)'
            }, {
                duration: 600,
                easing: 'easeOutElastic'
            });
            jQuery("#hrs", jQuerysvg).animate({
                svgTransform: 'rotate(' + hrsangle + ',50,50)'
            }, {
                duration: 800,
                easing: 'easeOutElastic'
            });

        }, 1000);
    }
    jQuery('#clock').hover(function() {

        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();

        h = (h > 12) ? h - 12 : h;
        h = (h == '00') ? 12 : h;

        var secangle = (s) * 6;
        var minangle = (m) * 6;
        var hrsangle = h * 30;

        jQuerysvg = jQuery("#clock");

        jQuery("#sec", jQuerysvg).animate({
            svgTransform: 'rotate(' + secangle + ',50,50)'
        }, {
            duration: 400,
            easing: 'easeOutElastic'
        });
        jQuery("#min", jQuerysvg).animate({
            svgTransform: 'rotate(' + minangle + ',50,50)'
        }, {
            duration: 400,
            easing: 'easeOutElastic'
        });
        jQuery("#hrs", jQuerysvg).animate({
            svgTransform: 'rotate(' + hrsangle + ',50,50)'
        }, {
            duration: 600,
            easing: 'easeOutElastic'
        });

        startTicking();

    }, function() {
        window.clearInterval(newInt);
    });

    //================================================================================================
    //SWATCHES
    jQuery('#swatches').hover(function() {
        jQuerysvg = jQuery('#swatches');
        rotate();

    }, function() {
        jQuery('#body-1').stop(true).animate({
            svgFill: "#29bb9c"
        }, 500);
        jQuery('#body-2').stop(true).animate({
            svgFill: "#e54d42"
        }, 500);

    }).click(function() {
        jQuerysvg = jQuery('#swatches');
        var colors = new Array('#1abc9c', '#2dc86f', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#34495e');

        newcolor1 = getRandomInt(0, colors.length)
        newcolor2 = getRandomInt(0, colors.length)

        if (newcolor1 == newcolor2) {
            newcolor1 = getRandomInt(0, colors.length);
        }

        jQuery('#body-1').stop(true).animate({
            svgFill: colors[newcolor1]
        }, 500);
        jQuery('#body-2').stop(true).animate({
            svgFill: colors[newcolor2]
        }, 500);

        rotate();
    });
    newangle = 0;

    function rotate() {
        newangle = newangle - 180;
        jQuery('#pen-1', jQuerysvg).stop(true).animate({
            svgTransform: 'rotate(' + newangle + ',50,50)'
        }, {
            duration: 1400,
            easing: 'easeOutElastic'
        });
        jQuery('#pen-2', jQuerysvg).stop(true).animate({
            svgTransform: 'rotate(' + newangle + ',50,50)'
        }, {
            duration: 1500,
            easing: 'easeOutElastic'
        });

        var nf1 = jQuery('#inner-2', jQuerysvg).attr('fill');
        var nf2 = jQuery('#inner-1', jQuerysvg).attr('fill');
    }

    //================================================================================================
    //RESPONSIVE ICON
    h = 1;
    jQuery('#responsive').click(function() {
        jQuerysvg = jQuery('#responsive');

        var colors = new Array('#1abc9c', '#2ecc71', '#3498db', '#f1c40f', '#ebedee', '#e74c3c');
        newcolor1 = colors[getRandomInt(0, colors.length)];
        newcolor2 = shadeColor(newcolor1, -10);

        jQuery('#window-screen2').stop().clearQueue().animate({
            svgFill: newcolor1
        }, 500);
        jQuery('#window-screen1').stop().clearQueue().animate({
            svgFill: newcolor2
        }, 600);

        jQuery('#iphone-screen2').stop().clearQueue().animate({
            svgFill: newcolor1
        }, 500);
        jQuery('#iphone-screen1').stop().clearQueue().animate({
            svgFill: newcolor2
        }, 600);

    }).hover(function() {

        jQuerysvg = jQuery('#responsive');
        jQuery('#responsive-window').stop().animate({
            svgTransform: "translate(20,-15)"
        }, {
            duration: 500,
            easing: "easeInOutQuad"
        });
        jQuery('#responsive-iphone').stop().animate({
            svgTransform: "translate(-52,12)"
        }, {
            duration: 500,
            easing: "easeInOutQuad"
        });
        jQuery('#shade', jQuerysvg).stop().animate({
            opacity: 0
        }, {
            duration: 100,
            easing: "easeInOutQuad"
        });

    }, function() {
        jQuerysvg = jQuery('#responsive');
        jQuery('#responsive-window').stop().animate({
            svgTransform: "translate(0)"
        }, {
            duration: 500,
            easing: "easeInOutQuad"
        });
        jQuery('#responsive-iphone').stop().animate({
            svgTransform: "translate(0)"
        }, {
            duration: 500,
            easing: "easeInOutQuad",
            complete: function() {
                jQuery('#iphone-shade').show();
            }
        });
        jQuery('#shade', jQuerysvg).stop().animate({
            svgTransform: "translate(0)",
            opacity: 0.2
        }, {
            duration: 500,
            easing: "easeInOutQuad"
        });
    });

    //================================================================================================
    //B00TSTRAP ICON
    var jQuerysvg = jQuery("#bootstrap");
    var dragging = false;
    var degree = 0;
    jQuery('#bootstrap').on('mousedown', function(e) {
        dragging = true;
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop - 154;
        var radians = Math.atan2(x - 50, y - 50);
        window.degreeOnClick = (radians * (180 / Math.PI) * -1) + 90;
    }).on('mousemove', function(e) {

        if (dragging) {

            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop - 154;
            if (jQuery('.header-banner').is(":visible")) {
                y = y - jQuery('.header-banner').height()
            }

            if (jQuery.browser.mozilla) y = y + 238;

            var radians = Math.atan2(x - 50, y - 50);
            var degree = (radians * (180 / Math.PI) * -1) + 90;
            degree = Math.round(degree - window.degreeOnClick);
            var jQuerysvg = jQuery("#bootstrap");
            jQuery('#all-lines', jQuerysvg).stop().clearQueue().attr('transform', 'rotate(' + degree + ',50,50)');
        }
    }).hover(function() {

        animateBootstrap = window.setInterval(function() {
            var jQuerysvg = jQuery("#bootstrap");

            var newX = 70;
            var newY = 86;

            var lines = new Array("line-1", "line-1-2", "line-2", "line-2-3", "line-3", "line-3-4", "line-4", "line-4-5", "line-5", "line-5-6", "line-6");
            var opac = new Array("0", "1");

            jQuery("#" + lines[getRandomInt(0, 11)], jQuerysvg).animate({
                opacity: opac[getRandomInt(0, 1)]
            }, {
                duration: 250,
                easing: 'easeOutCubic'
            });
        }, 250);

        animateBootstrap2 = window.setInterval(function() {
            var jQuerysvg = jQuery("#bootstrap");
            jQuery('#bootstrap-bg, #circle-1, #circle-2, #circle-3, #circle-4, #circle-5, #circle-6', jQuerysvg).animate({
                svgFill: '#34495e'
            }, {
                duration: 1500,
                easing: 'easeInOutQuad'
            }).animate({
                svgFill: '#4A245A'
            }, {
                duration: 1500,
                easing: 'easeInOutQuad'
            });
        }, 3000);

    }, function() {

        window.clearInterval(animateBootstrap);
        window.clearInterval(animateBootstrap2);

    });

    jQuery(document).on('mouseup', function() {
        dragging = false;
        var jQuerysvg = jQuery("#bootstrap");
        jQuery('#all-lines', jQuerysvg).stop().clearQueue().animate({
            svgTransform: 'rotate(0,50,50)'
        }, {
            duration: 1000,
            easing: 'easeOutElastic'
        });
    });

    //================================================================================================
    //SPACESHIP ANIMATION
    var up = 1;

    function animateSpaceship() {

        if (up == 1) {
            area = 30;
            distance1 = getRandomInt(20, 30);
            distance2 = distance1;

            speed = 1986;

            var translate1 = "translate(-" + distance1 + "," + distance2 + ")";
            var translate2 = "translate(" + distance1 + ",-" + distance2 + ")";
            up = 0;
        } else {
            distance1 = getRandomInt(1, 10)
            distance2 = getRandomInt(1, 10);

            speed = 1986;

            var translate1 = "translate(-" + distance1 + "," + distance2 + ")";
            var translate2 = "translate(" + distance1 + ",-" + distance2 + ")";
            up = 1;
        }

        jQuerysvg = jQuery('#spaceship');

        jQuery('#rocket-raw', jQuerysvg).animate({
            svgTransform: translate1
        }, {
            duration: speed,
            easing: "easeInOutQuad"
        });
        jQuery('#rocketmask1', jQuerysvg).animate({
            svgTransform: translate2
        }, {
            duration: speed,
            easing: "easeInOutQuad"
        });
    };

    var speedmin = 1000;
    var speedmax = 2000;

    function animateStar(what) {
        function randomate(type) {
            if (type == 'speed') {
                return getRandomInt(speedmin, speedmax);
            } else if (type == 'pos') {

                if (getRandomInt(0, 1) == 1) {
                    posx = 0;
                    posy = getRandomInt(25, 80);
                } else {
                    posy = 0;
                    posx = getRandomInt(25, 80);
                }

                var result = new Array('translate(' + (10 - posx) + ',' + (-10 + posy) + ')', 'translate(' + (-110 - posx) + ',' + (110 + posy) + ')');
                return result;
            } else if (type == 'delay') {
                return getRandomInt(0, 1000);
            }
        }

        jQuerysvg = jQuery('#spaceship');

        var position = randomate('pos');
        jQuery(what).attr('transform', position[0]).delay(randomate('delay')).animate({
            svgTransform: position[1]
        }, {
            duration: randomate('speed'),
            complete: function() {
                animateStar(this);
            },
            easing: 'linear'
        });
    }

    jQuery('#spaceship').hover(
        function() {
            animateSpaceship();
            liftSpaceship = window.setInterval(function() {
                animateSpaceship();
            }, 2000);

            animateStar(jQuery('#star0', jQuery('#spaceship')));
            animateStar(jQuery('#star1', jQuery('#spaceship')));
            animateStar(jQuery('#star2', jQuery('#spaceship')));

        },
        function() {
            window.clearInterval(liftSpaceship);

            var translate1 = "translate(0,0)";
            var translate2 = "translate(0,0)";
            jQuery('#rocket-raw', jQuerysvg).clearQueue().stop().animate({
                svgTransform: translate1
            }, 500);
            jQuery('#rocketmask1', jQuerysvg).clearQueue().stop().animate({
                svgTransform: translate2
            }, 500);

            jQuery('#star0', jQuery('#spaceship')).animate({
                svgTransform: 'translate(+=100,+=100)'
            }, {
                duration: 500,
                complete: function() {
                    jQuery(this).clearQueue()
                }
            });
            jQuery('#star1', jQuery('#spaceship')).animate({
                svgTransform: 'translate(+=100,+=100)'
            }, {
                duration: 500,
                complete: function() {
                    jQuery(this).clearQueue()
                }
            });
            jQuery('#star2', jQuery('#spaceship')).animate({
                svgTransform: 'translate(+=100,+=100)'
            }, {
                duration: 500,
                complete: function() {
                    jQuery(this).clearQueue()
                }
            });
            jQuery('#star3', jQuery('#spaceship')).animate({
                svgTransform: 'translate(+=100,+=100)'
            }, {
                duration: 500,
                complete: function() {
                    jQuery(this).clearQueue()
                }
            });

        });

    //================================================================================================
    //RETINA ICON
    jQuerysvg = jQuery('#retina');
    if (jQuery.browser.webkit) {
        jQuery('#retina').on('mousemove', function(e) {

            var x = e.pageX - jQuery(this).position().left;
            var y = e.pageY - jQuery(this).position().top - 154;

            if (jQuery('.header-banner').is(":visible")) {
                y = y - jQuery('.header-banner').height();
            }

            if (x < 30) x = 30;
            if (x > 86) x = 86;
            if (y < 28) y = 28;
            if (y > 75) y = 75;

            jQuery('#lens', jQuery(this)).attr('transform', 'translate(' + x + ',' + y + ')');
            var largeGlyphPosX = x * 2;
            var largeGlyphPosY = y * 2;
            jQuery('#largeGlyph', jQuery(this)).attr('transform', 'translate(' + (0 - largeGlyphPosX) + ',' + (0 - largeGlyphPosY) + ')');
            jQuery('#lensmask', jQuery(this)).attr('transform', 'translate(' + ((x * 2) + 1) + ',' + (y * 2) + ')');
            jQuery(this).css('cursor', 'none');
        }).on('mouseleave', function(e) {

            jQuery('#lens', jQuery(this)).stop().animate({
                svgTransform: 'translate(81,35)'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });
            jQuery('#largeGlyph', jQuery(this)).stop().animate({
                svgTransform: 'translate(-163,-70)'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });
            jQuery('#lensmask', jQuery(this)).stop().animate({
                svgTransform: 'translate(163,70)'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });

        });
    } else {
        var pos = 0;
        jQuery('#retina').on('click', function(e) {

            posX = new Array('44', '30', '78');
            posY = new Array('75', '56', '39');

            x = posX[pos];
            y = posY[pos];

            var largeGlyphPosX = x * 2;
            var largeGlyphPosY = y * 2;

            jQuery('#lens', jQuery(this)).stop().animate({
                svgTransform: 'translate(' + x + ',' + y + ')'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });
            jQuery('#largeGlyph', jQuery(this)).stop().animate({
                svgTransform: 'translate(' + (0 - largeGlyphPosX) + ',' + (0 - largeGlyphPosY) + ')'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });
            jQuery('#lensmask', jQuery(this)).stop().animate({
                svgTransform: 'translate(' + ((x * 2) + 1) + ',' + (y * 2) + ')'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });

            pos++;
            if (pos >= 3) pos = 0;
        }).on('mouseleave', function(e) {
            pos = 0;
            jQuery('#lens', jQuery(this)).stop().animate({
                svgTransform: 'translate(81,35)'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });
            jQuery('#largeGlyph', jQuery(this)).stop().animate({
                svgTransform: 'translate(-163,-70)'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });
            jQuery('#lensmask', jQuery(this)).stop().animate({
                svgTransform: 'translate(163,70)'
            }, {
                duration: 500,
                easing: "easeOutBack"
            });

        });
    }

    //================================================================================================
    //FIT TOGETHER ICON
    window.rotateAngle = 0;
    jQuery('#fittogether').data('color', 'white');
    jQuery('#fittogether').hover(
        function() {
            jQuery('#whitehalf', jQuery(this)).animate({
                svgFill: "#34495E"
            }, 250);
            jQuery('#darkhalf', jQuery(this)).animate({
                svgFill: '#ffffff'
            }, 250);
        },
        function() {
            jQuery('#whitehalf', jQuery(this)).animate({
                svgFill: "#ffffff"
            }, 250);
            jQuery('#darkhalf', jQuery(this)).animate({
                svgFill: "#34495E"
            }, 250);
            var durationBack = (window.rotateAngle / 180) * 250;
            if (durationBack >= 5000) durationBack = 5000;
            if (durationBack <= 1000) durationBack = 1000;
            jQuery('#shape', jQuery(this)).animate({
                svgTransform: 'rotate(0,54,50)'
            }, {
                duration: durationBack,
                easing: "easeOutElastic"
            });
            window.rotateAngle = 0;
        }
    ).click(function() {
        window.rotateAngle = window.rotateAngle + 180;
        jQuery('#shape', jQuery(this)).stop().clearQueue().animate({
            svgTransform: 'rotate(' + window.rotateAngle + ',54,50)'
        }, {
            duration: 250,
            easing: "easeOutCubic"
        });

    });

    //================================================================================================
    //ALIGNED TO GRID ICON
    jQuery('#aligned').on('mouseover',
        function() {
            jQuery('#finger', jQuery(this)).stop().animate({
                svgTransform: 'translate(-10,-10)'
            }, 250);
        }).on('mouseleave', function() {
        jQuery('#finger', jQuery(this)).stop().clearQueue().animate({
            svgTransform: 'translate(0,0)'
        }, 400);
    }).on('click', function() {
        rand = getRandomInt(-10, 0);
        jQuery('#finger', jQuery(this)).stop().clearQueue().animate({
            svgTransform: 'translate(' + rand + ',0)'
        }, {
            duration: 100,
            complete: function() {
                jQuery('#surface', jQuery('#aligned')).stop().clearQueue().animate({
                    svgTransform: 'translate(0,2)'
                }, 100).animate({
                    svgTransform: 'translate(0,0)'
                }, {
                    duration: 500,
                    easing: 'easeOutElastic'
                });
            }
        }).animate({
            svgTransform: 'translate(-10,-10)'
        }, 100);
    });

    //================================================================================================
    //FREE FONT ICON
    window.case = 0;
    jQuery('#freefont').on('click',
        function() {
            switch (window.case) {
                case 0:
                    /* f - r */
                    posX = "37";
                    posY = "72";
                    letter = "r";
                    pimple = 0;
                    break;
                case 1:
                    /* r - e */
                    posX = "72";
                    posY = "0";
                    letter = "e";
                    pimple = 0;
                    break;
                case 2:
                    /* e - e */
                    posX = "0";
                    posY = "0";
                    letter = "e";
                    pimple = 0;
                    break;
                case 3:
                    /* e - f */
                    posX = "-37";
                    posY = "-72";
                    letter = "f";
                    pimple = 1;
                    break;
                case 4:
                    /* f - o */
                    posX = "-37";
                    posY = "72";
                    letter = "o";
                    pimple = 0;
                    break;
                case 5:
                    /* o - n */
                    posX = "37";
                    posY = "-72";
                    letter = "n";
                    pimple = 0;
                    break;
                case 6:
                    /* n - t */
                    posX = "37";
                    posY = "72";
                    letter = "t";
                    pimple = 0;
                    break;
                case 7:
                    /* t - f */
                    posX = "37";
                    posY = "-72";
                    letter = "f";
                    pimple = 1;
                    break;
            }

            window.case++;
            if (window.case > 7) window.case = 0;

            jQuery('#group', jQuery(this)).stop().animate({
                svgTransform: "translate(" + posX + "," + posY + ")"
            }, {
                duration: 100,
                complete: function() {
                    jQuery(this).removeAttr("transform");

                    jQuery('#letters *', jQuery('#freefont')).each(function() {
                        jQuery(this).attr('opacity', '0');
                    });

                    jQuery('#symbol-' + letter, jQuery('#freefont')).attr('opacity', 1);
                    jQuery('#pimple', jQuery('#freefont')).attr('opacity', pimple);

                }
            });
            jQuery('#groupmask', jQuery(this)).stop().animate({
                svgTransform: "translate(" + (0 - posX) + "," + (0 - posY) + ")"
            }, {
                duration: 100,
                complete: function() {
                    jQuery(this).removeAttr("transform");
                }
            });

        }).on('mousedown', function() {
        jQuery('#hl', jQuery('#freefont')).stop().clearQueue().animate({
            opacity: 0
        }, 250);
        jQuery('#shadow', jQuery('#freefont')).stop().clearQueue().animate({
            opacity: 0
        }, 250);
    }).on('mouseup', function() {
        jQuery('#hl', jQuery('#freefont')).stop().clearQueue().animate({
            opacity: 1
        }, 250);
        jQuery('#shadow', jQuery('#freefont')).stop().clearQueue().animate({
            opacity: 1
        }, 250);
    });

    // ================================================================================================
    // LOOP ICON
    // animated by css

    //LIB
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shadeColor(color, percent) {
        var num = parseInt(color.slice(1), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            B = (num >> 8 & 0x00FF) + amt,
            G = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    }

    jQuery.fn.nextOrFirst = function(selector) {
        var next = this.next(selector);
        return (next.length) ? next : this.prevAll(selector).last();
    }

    //Sharrre
    window.newNumber = 0;
    // commented because of mixed content on https version
    //	jQuery('.share-section-cont').sharrre({
    //	  share: {
    //	  	twitter: true,
    //	  	googlePlus: true,
    //	  	facebook: true,
    //	  	pinterest: true,
    //	  	linkedin: true
    //	  },
    //	  template: " ",
    //	  url:"https://designmodo.com/flat/",
    //	  urlCurl: '/wp-content/themes/designmodov2.1/custom-pages/startup/presentation/js/sharrre.php',
    //	  enableHover: false,
    //	  className: '',
    //	  render: function(api, options){
    //		  if (options.count.pinterest == 0){ options.count.pinterest = 546; }
    //	  	jQuery('.share-section .google span').text(options.count.googlePlus);
    //	  	//jQuery('.share-section .twitter').remove();
    //		  jQuery('.share-section .facebook span').text(options.count.facebook);
    //	  	jQuery('.share-section .linkedin span').text(options.count.linkedin);
    //		  jQuery('.share-section .pin span').text(options.count.pinterest);
    //      window.newNumber = options.count.googlePlus + options.count.facebook + options.count.linkedin + options.count.pinterest;
    //
    //                jQuery('.share-section #counts').text(window.newNumber);
    //	  }
    //	});
});

//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================
//===============================================================================================================================================================================

//nextOrFirst? prevOrLast?
jQuery.fn.nextOrFirst = function(selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}
jQuery.fn.prevOrLast = function(selector) {
    var prev = this.prev(selector);
    return (prev.length) ? prev : this.nextAll(selector).last();
}

// OpenInWindow
function oiw(theURL, winName, w, h, scrollbars) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 100;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 100;
    settings = 'width=' + w + ',height=' + h + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scrollbars + ',location=no,directories=no,status=0,menubar=no,toolbar=no,resizable=no';
    URL = theURL;
    window.open(URL, winName, settings);
}

//ANIMATE
(function(jQuery, undefined) {
    var defaults = {
        duration: 5E3,
        easing: "swing",
        animateOpacity: false,
        intStepDecimals: 0,
        intEndDecimals: 0,
        floatStepDecimals: 4,
        floatEndDecimals: 1,
        callback: function() {}
    };

    function round(number, decimals) {
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
    }

    function isInt(number) {
        return /^-?[\d]+jQuery/.test(number)
    }
    jQuery.fn.animateNumber = function(value, options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = {}
        }
        options = jQuery.extend({}, defaults, options);
        return this.each(function() {
            var container =
                jQuery(this);
            var initialValue = parseFloat(jQuery(this).text(), 10);
            if (round(value, options.floatEndDecimals) == round(initialValue, options.floatEndDecimals)) return;
            var type = container.data("type") || (isInt(jQuery(this).text()) ? "int" : "float"),
                stepDecimals, endDecimals, defaultStepDecimals, defaultEndDecimals;
            if (type == "int") {
                defaultStepDecimals = options.intStepDecimals;
                defaultEndDecimals = options.intEndDecimals
            } else {
                defaultStepDecimals = options.floatStepDecimals;
                defaultEndDecimals = options.floatEndDecimals
            }
            stepDecimals = container.data("stepDecimals") ||
                defaultStepDecimals;
            endDecimals = container.data("endDecimals") || defaultEndDecimals;
            if (options.animateOpacity) container.animate({
                opacity: 0.2
            }, {
                duration: options.duration / 2,
                easing: options.easing,
                complete: function() {
                    container.animate({
                        opacity: 1
                    }, {
                        duration: options.duration / 2,
                        easing: options.easing
                    })
                }
            });
            jQuery({
                number: initialValue
            }).animate({
                number: value
            }, {
                duration: options.duration,
                easing: options.easing,
                step: function() {
                    container.text(round(this.number, stepDecimals))
                },
                complete: function() {
                    container.text(round(this.number,
                        endDecimals));
                    if (typeof options.callback === "function") options.callback.call(container)
                }
            })
        })
    }
})(jQuery);

//COLOR SHADE
function shadeColor(e, t) {
    var n = parseInt(e.substring(1, 3), 16);
    var r = parseInt(e.substring(3, 5), 16);
    var i = parseInt(e.substring(5, 7), 16);
    n = parseInt(n * (100 + t) / 100);
    r = parseInt(r * (100 + t) / 100);
    i = parseInt(i * (100 + t) / 100);
    n = n < 255 ? n : 255;
    r = r < 255 ? r : 255;
    i = i < 255 ? i : 255;
    var s = n.toString(16).length == 1 ? "0" + n.toString(16) : n.toString(16);
    var o = r.toString(16).length == 1 ? "0" + r.toString(16) : r.toString(16);
    var u = i.toString(16).length == 1 ? "0" + i.toString(16) : i.toString(16);
    return "#" + s + o + u
}

//Get Original Width Of Img
function getOriginalWidthOfImg(img_element) {
    var t = new Image();
    t.src = (img_element.getAttribute ? img_element.getAttribute("src") : false) || img_element.src;
    return t.width;
}

// sharrre.com
! function(a, b, c, d) {
    function l(b, c) {
        this.element = b, this.options = a.extend(!0, {}, g, c), this.options.share = c.share, this._defaults = g, this._name = f, this.init()
    }
    var f = "sharrre",
        g = {
            className: "sharrre",
            share: {
                googlePlus: !1,
                facebook: !1,
                twitter: !1,
                digg: !1,
                delicious: !1,
                stumbleupon: !1,
                linkedin: !1,
                pinterest: !1
            },
            shareTotal: 0,
            template: "",
            title: "",
            url: c.location.href,
            text: c.title,
            urlCurl: "sharrre.php",
            count: {},
            total: 0,
            shorterTotal: !0,
            enableHover: !0,
            enableCounter: !0,
            enableTracking: !1,
            hover: function() {},
            hide: function() {},
            click: function() {},
            render: function() {},
            buttons: {
                googlePlus: {
                    url: "",
                    urlCount: !1,
                    size: "medium",
                    lang: "en-US",
                    annotation: ""
                },
                facebook: {
                    url: "",
                    urlCount: !1,
                    action: "like",
                    layout: "button_count",
                    width: "",
                    send: "false",
                    faces: "false",
                    colorscheme: "",
                    font: "",
                    lang: "en_US"
                },
                twitter: {
                    url: "",
                    urlCount: !1,
                    count: "horizontal",
                    hashtags: "",
                    via: "",
                    related: "",
                    lang: "en"
                },
                digg: {
                    url: "",
                    urlCount: !1,
                    type: "DiggCompact"
                },
                delicious: {
                    url: "",
                    urlCount: !1,
                    size: "medium"
                },
                stumbleupon: {
                    url: "",
                    urlCount: !1,
                    layout: "1"
                },
                linkedin: {
                    url: "",
                    urlCount: !1,
                    counter: ""
                },
                pinterest: {
                    url: "",
                    media: "",
                    description: "",
                    layout: "horizontal"
                }
            }
        },
        h = {
            googlePlus: "",
            facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
            twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
            digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
            delicious: "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
            stumbleupon: "",
            linkedin: "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
            pinterest: ""
        },
        i = {
            googlePlus: function(d) {
                var e = d.options.buttons.googlePlus;
                a(d.element).find(".buttons").append('<div class="button googleplus"><div class="g-plusone" data-size="' + e.size + '" data-href="' + ("" !== e.url ? e.url : d.options.url) + '" data-annotation="' + e.annotation + '"></div></div>'), b.___gcfg = {
                    lang: d.options.buttons.googlePlus.lang
                };
                var f = 0;
                "undefined" == typeof gapi && 0 == f ? (f = 1, function() {
                    var a = c.createElement("script");
                    a.type = "text/javascript", a.async = !0, a.src = "//apis.google.com/js/plusone.js";
                    var b = c.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b)
                }()) : gapi.plusone.go()
            },
            facebook: function(b) {
                var d = b.options.buttons.facebook;
                a(b.element).find(".buttons").append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' + ("" !== d.url ? d.url : b.options.url) + '" data-send="' + d.send + '" data-layout="' + d.layout + '" data-width="' + d.width + '" data-show-faces="' + d.faces + '" data-action="' + d.action + '" data-colorscheme="' + d.colorscheme + '" data-font="' + d.font + '" data-via="' + d.via + '"></div></div>');
                var e = 0;
                "undefined" == typeof FB && 0 == e ? (e = 1, function(a, b, c) {
                    var e, f = a.getElementsByTagName(b)[0];
                    a.getElementById(c) || (e = a.createElement(b), e.id = c, e.src = "//connect.facebook.net/" + d.lang + "/all.js#xfbml=1", f.parentNode.insertBefore(e, f))
                }(c, "script", "facebook-jssdk")) : FB.XFBML.parse()
            },
            twitter: function(b) {
                var d = b.options.buttons.twitter;
                a(b.element).find(".buttons").append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' + ("" !== d.url ? d.url : b.options.url) + '" data-count="' + d.count + '" data-text="' + b.options.text + '" data-via="' + d.via + '" data-hashtags="' + d.hashtags + '" data-related="' + d.related + '" data-lang="' + d.lang + '">Tweet</a></div>');
                var e = 0;
                "undefined" == typeof twttr && 0 == e ? (e = 1, function() {
                    var a = c.createElement("script");
                    a.type = "text/javascript", a.async = !0, a.src = "//platform.twitter.com/widgets.js";
                    var b = c.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b)
                }()) : a.ajax({
                    url: "//platform.twitter.com/widgets.js",
                    dataType: "script",
                    cache: !0
                })
            },
            digg: function(b) {
                var d = b.options.buttons.digg;
                a(b.element).find(".buttons").append('<div class="button digg"><a class="DiggThisButton ' + d.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent("" !== d.url ? d.url : b.options.url) + '"></a></div>');
                var e = 0;
                "undefined" == typeof __DBW && 0 == e && (e = 1, function() {
                    var a = c.createElement("SCRIPT"),
                        b = c.getElementsByTagName("SCRIPT")[0];
                    a.type = "text/javascript", a.async = !0, a.src = "//widgets.digg.com/buttons.js", b.parentNode.insertBefore(a, b)
                }())
            },
            delicious: function(b) {
                if ("tall" == b.options.buttons.delicious.size) var c = "width:50px;",
                    d = "height:35px;width:50px;font-size:15px;line-height:35px;",
                    e = "height:18px;line-height:18px;margin-top:3px;";
                else var c = "width:93px;",
                    d = "float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",
                    e = "float:left;height:20px;line-height:20px;";
                var f = b.shorterTotal(b.options.count.delicious);
                "undefined" == typeof f && (f = 0), a(b.element).find(".buttons").append('<div class="button delicious"><div style="' + c + 'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="' + d + 'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' + f + '</div><div style="' + e + 'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>'), a(b.element).find(".delicious").on("click", function() {
                    b.openPopup("delicious")
                })
            },
            stumbleupon: function(d) {
                var e = d.options.buttons.stumbleupon;
                a(d.element).find(".buttons").append('<div class="button stumbleupon"><su:badge layout="' + e.layout + '" location="' + ("" !== e.url ? e.url : d.options.url) + '"></su:badge></div>');
                var f = 0;
                "undefined" == typeof STMBLPN && 0 == f ? (f = 1, function() {
                    var a = c.createElement("script");
                    a.type = "text/javascript", a.async = !0, a.src = "//platform.stumbleupon.com/1/widgets.js";
                    var b = c.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b)
                }(), s = b.setTimeout(function() {
                    "undefined" != typeof STMBLPN && (STMBLPN.processWidgets(), clearInterval(s))
                }, 500)) : STMBLPN.processWidgets()
            },
            linkedin: function(d) {
                var e = d.options.buttons.linkedin;
                a(d.element).find(".buttons").append('<div class="button linkedin"><script type="in/share" data-url="' + ("" !== e.url ? e.url : d.options.url) + '" data-counter="' + e.counter + '"></script></div>');
                var f = 0;
                "undefined" == typeof b.IN && 0 == f ? (f = 1, function() {
                    var a = c.createElement("script");
                    a.type = "text/javascript", a.async = !0, a.src = "//platform.linkedin.com/in.js";
                    var b = c.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b)
                }()) : b.IN.init()
            },
            pinterest: function(b) {
                var d = b.options.buttons.pinterest;
                a(b.element).find(".buttons").append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' + ("" !== d.url ? d.url : b.options.url) + "&media=" + d.media + "&description=" + d.description + '" class="pin-it-button" count-layout="' + d.layout + '">Pin It</a></div>'),
                    function() {
                        var a = c.createElement("script");
                        a.type = "text/javascript", a.async = !0, a.src = "//assets.pinterest.com/js/pinit.js";
                        var b = c.getElementsByTagName("script")[0];
                        b.parentNode.insertBefore(a, b)
                    }()
            }
        },
        j = {
            googlePlus: function() {},
            facebook: function() {
                fb = b.setInterval(function() {
                    "undefined" != typeof FB && (FB.Event.subscribe("edge.create", function(a) {
                        _gaq.push(["_trackSocial", "facebook", "like", a])
                    }), FB.Event.subscribe("edge.remove", function(a) {
                        _gaq.push(["_trackSocial", "facebook", "unlike", a])
                    }), FB.Event.subscribe("message.send", function(a) {
                        _gaq.push(["_trackSocial", "facebook", "send", a])
                    }), clearInterval(fb))
                }, 1e3)
            },
            twitter: function() {
                tw = b.setInterval(function() {
                    "undefined" != typeof twttr && (twttr.events.bind("tweet", function(a) {
                        a && _gaq.push(["_trackSocial", "twitter", "tweet"])
                    }), clearInterval(tw))
                }, 1e3)
            },
            digg: function() {},
            delicious: function() {},
            stumbleupon: function() {},
            linkedin: function() {},
            pinterest: function() {}
        },
        k = {
            googlePlus: function(a) {
                b.open("https://plus.google.com/share?hl=" + a.buttons.googlePlus.lang + "&url=" + encodeURIComponent("" !== a.buttons.googlePlus.url ? a.buttons.googlePlus.url : a.url), "", "toolbar=0, status=0, width=900, height=500")
            },
            facebook: function(a) {
                b.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("" !== a.buttons.facebook.url ? a.buttons.facebook.url : a.url) + "&t=" + a.text, "", "toolbar=0, status=0, width=900, height=500")
            },
            twitter: function(a) {
                b.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(a.text) + "&url=" + encodeURIComponent("" !== a.buttons.twitter.url ? a.buttons.twitter.url : a.url) + ("" !== a.buttons.twitter.via ? "&via=" + a.buttons.twitter.via : ""), "", "toolbar=0, status=0, width=650, height=360")
            },
            digg: function(a) {
                b.open("http://digg.com/tools/diggthis/submit?url=" + encodeURIComponent("" !== a.buttons.digg.url ? a.buttons.digg.url : a.url) + "&title=" + a.text + "&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360")
            },
            delicious: function(a) {
                b.open("http://www.delicious.com/save?v=5&noui&jump=close&url=" + encodeURIComponent("" !== a.buttons.delicious.url ? a.buttons.delicious.url : a.url) + "&title=" + a.text, "delicious", "toolbar=no,width=550,height=550")
            },
            stumbleupon: function(a) {
                b.open("http://www.stumbleupon.com/badge/?url=" + encodeURIComponent("" !== a.buttons.delicious.url ? a.buttons.delicious.url : a.url), "stumbleupon", "toolbar=no,width=550,height=550")
            },
            linkedin: function(a) {
                b.open("https://www.linkedin.com/cws/share?url=" + encodeURIComponent("" !== a.buttons.delicious.url ? a.buttons.delicious.url : a.url) + "&token=&isFramed=true", "linkedin", "toolbar=no,width=550,height=550")
            },
            pinterest: function(a) {
                b.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent("" !== a.buttons.pinterest.url ? a.buttons.pinterest.url : a.url) + "&media=" + encodeURIComponent(a.buttons.pinterest.media) + "&description=" + a.buttons.pinterest.description, "pinterest", "toolbar=no,width=700,height=300")
            }
        };
    l.prototype.init = function() {
        var b = this;
        "" !== this.options.urlCurl && (h.googlePlus = this.options.urlCurl + "?url={url}&type=googlePlus", h.stumbleupon = this.options.urlCurl + "?url={url}&type=stumbleupon", h.pinterest = this.options.urlCurl + "?url={url}&type=pinterest"), a(this.element).addClass(this.options.className), "undefined" != typeof a(this.element).data("title") && (this.options.title = a(this.element).attr("data-title")), "undefined" != typeof a(this.element).data("url") && (this.options.url = a(this.element).data("url")), "undefined" != typeof a(this.element).data("text") && (this.options.text = a(this.element).data("text")), a.each(this.options.share, function(a, c) {
            c === !0 && b.options.shareTotal++
        }), b.options.enableCounter === !0 ? a.each(this.options.share, function(a, c) {
            if (c === !0) try {
                b.getSocialJson(a)
            } catch (a) {}
        }) : "" !== b.options.template ? this.options.render(this, this.options) : this.loadButtons(), a(this.element).hover(function() {
            0 === a(this).find(".buttons").length && b.options.enableHover === !0 && b.loadButtons(), b.options.hover(b, b.options)
        }, function() {
            b.options.hide(b, b.options)
        }), a(this.element).click(function() {
            return b.options.click(b, b.options), !1
        })
    }, l.prototype.loadButtons = function() {
        var b = this;
        a(this.element).append('<div class="buttons"></div>'), a.each(b.options.share, function(a, c) {
            1 == c && (i[a](b), b.options.enableTracking === !0 && j[a]())
        })
    }, l.prototype.getSocialJson = function(b) {
        var c = this,
            d = 0,
            e = h[b].replace("{url}", encodeURIComponent(this.options.url));
        this.options.buttons[b].urlCount === !0 && "" !== this.options.buttons[b].url && (e = h[b].replace("{url}", this.options.buttons[b].url)), "" != e && "" !== c.options.urlCurl ? a.getJSON(e, function(a) {
            if ("undefined" != typeof a.count) {
                var e = a.count + "";
                e = e.replace("Ã‚ ", ""), d += parseInt(e, 10)
            } else a.data && a.data.length > 0 && "undefined" != typeof a.data[0].total_count ? d += parseInt(a.data[0].total_count, 10) : "undefined" != typeof a.shares ? d += parseInt(a.shares, 10) : "undefined" != typeof a[0] ? d += parseInt(a[0].total_posts, 10) : "undefined" != typeof a[0];
            c.options.count[b] = d, c.options.total += d, c.renderer(), c.rendererPerso()
        }).error(function() {
            c.options.count[b] = 0, c.rendererPerso()
        }) : (c.renderer(), c.options.count[b] = 0, c.rendererPerso())
    }, l.prototype.rendererPerso = function() {
        var a = 0;
        for (e in this.options.count) a++;
        a === this.options.shareTotal && this.options.render(this, this.options)
    }, l.prototype.renderer = function() {
        var b = this.options.total,
            c = this.options.template;
        this.options.shorterTotal === !0 && (b = this.shorterTotal(b)), "" !== c ? (c = c.replace("{total}", b), a(this.element).html(c)) : a(this.element).html('<div class="box"><a class="count" href="#">' + b + "</a>" + ("" !== this.options.title ? '<a class="share" href="#">' + this.options.title + "</a>" : "") + "</div>")
    }, l.prototype.shorterTotal = function(a) {
        return a >= 1e6 ? a = (a / 1e6).toFixed(2) + "M" : a >= 1e3 && (a = (a / 1e3).toFixed(1) + "k"), a
    }, l.prototype.openPopup = function(a) {
        if (k[a](this.options), this.options.enableTracking === !0) {
            var b = {
                googlePlus: {
                    site: "Google",
                    action: "+1"
                },
                facebook: {
                    site: "facebook",
                    action: "like"
                },
                twitter: {
                    site: "twitter",
                    action: "tweet"
                },
                digg: {
                    site: "digg",
                    action: "add"
                },
                delicious: {
                    site: "delicious",
                    action: "add"
                },
                stumbleupon: {
                    site: "stumbleupon",
                    action: "add"
                },
                linkedin: {
                    site: "linkedin",
                    action: "share"
                },
                pinterest: {
                    site: "pinterest",
                    action: "pin"
                }
            };
            _gaq.push(["_trackSocial", b[a].site, b[a].action])
        }
    }, l.prototype.simulateClick = function() {
        var b = a(this.element).html();
        a(this.element).html(b.replace(this.options.total, this.options.total + 1))
    }, l.prototype.update = function(a, b) {
        "" !== a && (this.options.url = a), "" !== b && (this.options.text = b)
    }, a.fn[f] = function(b) {
        var c = arguments;
        return b === d || "object" == typeof b ? this.each(function() {
            a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new l(this, b))
        }) : "string" == typeof b && "_" !== b[0] && "init" !== b ? this.each(function() {
            var d = a.data(this, "plugin_" + f);
            d instanceof l && "function" == typeof d[b] && d[b].apply(d, Array.prototype.slice.call(c, 1))
        }) : void 0
    }
}(jQuery, window, document);
//eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(6(jQuery,g,h,i){l j=\'1Y\',23={3i:\'1Y\',L:{O:C,E:C,z:C,I:C,p:C,K:C,N:C,B:C},2a:0,18:\'\',12:\'\',3:h.3h.1a,x:h.12,1p:\'1Y.3d\',y:{},1q:0,1w:w,3c:w,3b:w,2o:C,1X:6(){},38:6(){},1P:6(){},26:6(){},8:{O:{3:\'\',15:C,1j:\'37\',13:\'35-4Y\',2p:\'\'},E:{3:\'\',15:C,R:\'1L\',11:\'4V\',H:\'\',1A:\'C\',2c:\'C\',2d:\'\',1B:\'\',13:\'4R\'},z:{3:\'\',15:C,y:\'33\',2m:\'\',16:\'\',1I:\'\',13:\'35\'},I:{3:\'\',15:C,Q:\'4K\'},p:{3:\'\',15:C,1j:\'37\'},K:{3:\'\',15:C,11:\'1\'},N:{3:\'\',15:C,22:\'\'},B:{3:\'\',1s:\'\',1C:\'\',11:\'33\'}}},1n={O:"",E:"1D://4J.E.o/4x?q=4u%2X,%4j,%4i,%4h,%4f,%4e,46,%45,%44%42%41%40%2X=%27{3}%27&1y=?",z:"S://3W.3P.z.o/1/3D/y.2G?3={3}&1y=?",I:"S://3l.I.o/2.0/5a.59?54={3}&Q=1c&1y=?",p:\'S://52.p.o/4Q/2G/4B/m?3={3}&1y=?\',K:"",N:"S://1o.N.o/4z/y/L?4r=4o&3={3}&1y=?",B:""},2A={O:6(b){l c=b.4.8.O;jQuery(b.r).X(\'.8\').Z(\'<n G="U 4d"><n G="g-25" m-1j="\'+c.1j+\'" m-1a="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-2p="\'+c.2p+\'"></n></n>\');g.3Z={13:b.4.8.O.13};l d=0;9(A 2x===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//3w.2w.o/Y/25.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}J{2x.25.3X()}},E:6(c){l e=c.4.8.E;jQuery(c.r).X(\'.8\').Z(\'<n G="U E"><n 2T="1V-47"></n><n G="1V-1L" m-1a="\'+(e.3!==\'\'?e.3:c.4.3)+\'" m-1A="\'+e.1A+\'" m-11="\'+e.11+\'" m-H="\'+e.H+\'" m-3u-2c="\'+e.2c+\'" m-R="\'+e.R+\'" m-2d="\'+e.2d+\'" m-1B="\'+e.1B+\'" m-16="\'+e.16+\'"></n></n>\');l f=0;9(A 1i===\'F\'&&f==0){f=1;(6(d,s,a){l b,2s=d.1d(s)[0];9(d.3x(a)){1v}b=d.1g(s);b.2T=a;b.17=\'//4c.E.4n/\'+e.13+\'/4t.Y#4C=1\';2s.1e.1f(b,2s)}(h,\'P\',\'E-5g\'))}J{1i.3n.3p()}},z:6(b){l c=b.4.8.z;jQuery(b.r).X(\'.8\').Z(\'<n G="U z"><a 1a="1D://z.o/L" G="z-L-U" m-3="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-y="\'+c.y+\'" m-x="\'+b.4.x+\'" m-16="\'+c.16+\'" m-2m="\'+c.2m+\'" m-1I="\'+c.1I+\'" m-13="\'+c.13+\'">3q</a></n>\');l d=0;9(A 2j===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//1M.z.o/1N.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}J{jQuery.3C({3:\'//1M.z.o/1N.Y\',3E:\'P\',3F:w})}},I:6(a){l b=a.4.8.I;jQuery(a.r).X(\'.8\').Z(\'<n G="U I"><a G="3H \'+b.Q+\'" 3L="3U 3V" 1a="S://I.o/2y?3=\'+V((b.3!==\'\'?b.3:a.4.3))+\'"></a></n>\');l c=0;9(A 43===\'F\'&&c==0){c=1;(6(){l s=h.1g(\'2z\'),24=h.1d(\'2z\')[0];s.Q=\'x/1c\';s.1r=w;s.17=\'//1N.I.o/8.Y\';24.1e.1f(s,24)})()}},p:6(a){9(a.4.8.p.1j==\'4g\'){l b=\'H:2r;\',2e=\'D:2B;H:2r;1B-1j:4y;1t-D:2B;\',2l=\'D:2C;1t-D:2C;2k-50:1H;\'}J{l b=\'H:53;\',2e=\'2g:58;2f:0 1H;D:1u;H:5c;1t-D:1u;\',2l=\'2g:5d;D:1u;1t-D:1u;\'}l c=a.1w(a.4.y.p);9(A c==="F"){c=0}jQuery(a.r).X(\'.8\').Z(\'<n G="U p"><n 1T="\'+b+\'1B:5i 5j,5k,5l-5n;5t:3k;1S:#3m;2D:3o-2E;2g:2F;D:1u;1t-D:3r;2k:0;2f:0;x-3s:0;3t-2b:3v;">\'+\'<n 1T="\'+2e+\'2H-1S:#2I;2k-3y:3z;3A:3B;x-2b:2J;1O:2K 2L #3G;1O-2M:1H;">\'+c+\'</n>\'+\'<n 1T="\'+2l+\'2D:2E;2f:0;x-2b:2J;x-3I:2F;H:2r;2H-1S:#3J;1O:2K 2L #3K;1O-2M:1H;1S:#2I;">\'+\'<2N 17="S://1o.p.o/3M/2N/p.3N.3O" D="10" H="10" 3Q="3R" /> 3S</n></n></n>\');jQuery(a.r).X(\'.p\').3T(\'1P\',6(){a.2O(\'p\')})},K:6(b){l c=b.4.8.K;jQuery(b.r).X(\'.8\').Z(\'<n G="U K"><2P:28 11="\'+c.11+\'" 3h="\'+(c.3!==\'\'?c.3:b.4.3)+\'"></2P:28></n>\');l d=0;9(A 1E===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//1M.K.o/1/1N.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})();s=g.3Y(6(){9(A 1E!==\'F\'){1E.2Q();21(s)}},20)}J{1E.2Q()}},N:6(b){l c=b.4.8.N;jQuery(b.r).X(\'.8\').Z(\'<n G="U N"><P Q="1Z/L" m-3="\'+(c.3!==\'\'?c.3:b.4.3)+\'" m-22="\'+c.22+\'"></P></n>\');l d=0;9(A g.2R===\'F\'&&d==0){d=1;(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//1M.N.o/1Z.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}J{g.2R.1W()}},B:6(b){l c=b.4.8.B;jQuery(b.r).X(\'.8\').Z(\'<n G="U B"><a 1a="S://B.o/1K/2u/U/?3=\'+(c.3!==\'\'?c.3:b.4.3)+\'&1s=\'+c.1s+\'&1C=\'+c.1C+\'" G="1K-3j-U" y-11="\'+c.11+\'">48 49</a></n>\');(6(){l a=h.1g(\'P\');a.Q=\'x/1c\';a.1r=w;a.17=\'//4a.B.o/Y/4b.Y\';l s=h.1d(\'P\')[0];s.1e.1f(a,s)})()}},2S={O:6(){},E:6(){1V=g.2v(6(){9(A 1i!==\'F\'){1i.2t.2q(\'2U.2u\',6(a){1m.1l([\'1k\',\'E\',\'1L\',a])});1i.2t.2q(\'2U.4k\',6(a){1m.1l([\'1k\',\'E\',\'4l\',a])});1i.2t.2q(\'4m.1A\',6(a){1m.1l([\'1k\',\'E\',\'1A\',a])});21(1V)}},2V)},z:6(){2W=g.2v(6(){9(A 2j!==\'F\'){2j.4p.4q(\'1J\',6(a){9(a){1m.1l([\'1k\',\'z\',\'1J\'])}});21(2W)}},2V)},I:6(){},p:6(){},K:6(){},N:6(){6 4s(){1m.1l([\'1k\',\'N\',\'L\'])}},B:6(){}},2Y={O:6(a){g.19("1D://4v.2w.o/L?4w="+a.8.O.13+"&3="+V((a.8.O.3!==\'\'?a.8.O.3:a.3)),"","1b=0, 1G=0, H=2Z, D=20")},E:6(a){g.19("S://1o.E.o/30/30.3d?u="+V((a.8.E.3!==\'\'?a.8.E.3:a.3))+"&t="+a.x+"","","1b=0, 1G=0, H=2Z, D=20")},z:6(a){g.19("1D://z.o/4A/1J?x="+V(a.x)+"&3="+V((a.8.z.3!==\'\'?a.8.z.3:a.3))+(a.8.z.16!==\'\'?\'&16=\'+a.8.z.16:\'\'),"","1b=0, 1G=0, H=31, D=32")},I:6(a){g.19("S://I.o/4D/4E/2y?3="+V((a.8.I.3!==\'\'?a.8.I.3:a.3))+"&12="+a.x+"&1I=w&1T=w","","1b=0, 1G=0, H=31, D=32")},p:6(a){g.19(\'S://1o.p.o/4F?v=5&4G&4H=4I&3=\'+V((a.8.p.3!==\'\'?a.8.p.3:a.3))+\'&12=\'+a.x,\'p\',\'1b=1F,H=1h,D=1h\')},K:6(a){g.19(\'S://1o.K.o/28/?3=\'+V((a.8.p.3!==\'\'?a.8.p.3:a.3)),\'K\',\'1b=1F,H=1h,D=1h\')},N:6(a){g.19(\'1D://1o.N.o/4L/L?3=\'+V((a.8.p.3!==\'\'?a.8.p.3:a.3))+\'&4M=&4N=w\',\'N\',\'1b=1F,H=1h,D=1h\')},B:6(a){g.19(\'S://B.o/1K/2u/U/?3=\'+V((a.8.B.3!==\'\'?a.8.B.3:a.3))+\'&1s=\'+V(a.8.B.1s)+\'&1C=\'+a.8.B.1C,\'B\',\'1b=1F,H=4O,D=4P\')}};6 T(a,b){7.r=a;7.4=jQuery.4S(w,{},23,b);7.4.L=b.L;7.4T=23;7.4U=j;7.1W()};T.W.1W=6(){l c=7;9(7.4.1p!==\'\'){1n.O=7.4.1p+\'?3={3}&Q=O\';1n.K=7.4.1p+\'?3={3}&Q=K\';1n.B=7.4.1p+\'?3={3}&Q=B\'}jQuery(7.r).4W(7.4.3i);9(A jQuery(7.r).m(\'12\')!==\'F\'){7.4.12=jQuery(7.r).4X(\'m-12\')}9(A jQuery(7.r).m(\'3\')!==\'F\'){7.4.3=jQuery(7.r).m(\'3\')}9(A jQuery(7.r).m(\'x\')!==\'F\'){7.4.x=jQuery(7.r).m(\'x\')}jQuery.1z(7.4.L,6(a,b){9(b===w){c.4.2a++}});9(c.4.3b===w){jQuery.1z(7.4.L,6(a,b){9(b===w){4Z{c.34(a)}51(e){}}})}J 9(c.4.18!==\'\'){7.4.26(7,7.4)}J{7.2n()}jQuery(7.r).1X(6(){9(jQuery(7).X(\'.8\').36===0&&c.4.3c===w){c.2n()}c.4.1X(c,c.4)},6(){c.4.38(c,c.4)});jQuery(7.r).1P(6(){c.4.1P(c,c.4);1v C})};T.W.2n=6(){l c=7;jQuery(7.r).Z(\'<n G="8"></n>\');jQuery.1z(c.4.L,6(a,b){9(b==w){2A[a](c);9(c.4.2o===w){2S[a]()}}})};T.W.34=6(c){l d=7,y=0,3=1n[c].1x(\'{3}\',V(7.4.3));9(7.4.8[c].15===w&&7.4.8[c].3!==\'\'){3=1n[c].1x(\'{3}\',7.4.8[c].3)}9(3!=\'\'&&d.4.1p!==\'\'){jQuery.55(3,6(a){9(A a.y!=="F"){l b=a.y+\'\';b=b.1x(\'\\56\\57\',\'\');y+=1Q(b,10)}J 9(a.m&&a.m.36>0&&A a.m[0].39!=="F"){y+=1Q(a.m[0].39,10)}J 9(A a.3a!=="F"){y+=1Q(a.3a,10)}J 9(A a[0]!=="F"){y+=1Q(a[0].5b,10)}J 9(A a[0]!=="F"){}d.4.y[c]=y;d.4.1q+=y;d.2i();d.1R()}).5e(6(){d.4.y[c]=0;d.1R()})}J{d.2i();d.4.y[c]=0;d.1R()}};T.W.1R=6(){l a=0;5f(e 1Z 7.4.y){a++}9(a===7.4.2a){7.4.26(7,7.4)}};T.W.2i=6(){l a=7.4.1q,18=7.4.18;9(7.4.1w===w){a=7.1w(a)}9(18!==\'\'){18=18.1x(\'{1q}\',a);jQuery(7.r).1U(18)}J{jQuery(7.r).1U(\'<n G="5h"><a G="y" 1a="#">\'+a+\'</a>\'+(7.4.12!==\'\'?\'<a G="L" 1a="#">\'+7.4.12+\'</a>\':\'\')+\'</n>\')}};T.W.1w=6(a){9(a>=3e){a=(a/3e).3f(2)+"M"}J 9(a>=3g){a=(a/3g).3f(1)+"k"}1v a};T.W.2O=6(a){2Y[a](7.4);9(7.4.2o===w){l b={O:{14:\'5m\',R:\'+1\'},E:{14:\'E\',R:\'1L\'},z:{14:\'z\',R:\'1J\'},I:{14:\'I\',R:\'29\'},p:{14:\'p\',R:\'29\'},K:{14:\'K\',R:\'29\'},N:{14:\'N\',R:\'L\'},B:{14:\'B\',R:\'1K\'}};1m.1l([\'1k\',b[a].14,b[a].R])}};T.W.5o=6(){l a=jQuery(7.r).1U();jQuery(7.r).1U(a.1x(7.4.1q,7.4.1q+1))};T.W.5p=6(a,b){9(a!==\'\'){7.4.3=a}9(b!==\'\'){7.4.x=b}};jQuery.5q[j]=6(b){l c=5r;9(b===i||A b===\'5s\'){1v 7.1z(6(){9(!jQuery.m(7,\'2h\'+j)){jQuery.m(7,\'2h\'+j,5u T(7,b))}})}J 9(A b===\'5v\'&&b[0]!==\'5w\'&&b!==\'1W\'){1v 7.1z(6(){l a=jQuery.m(7,\'2h\'+j);9(a 5x T&&A a[b]===\'6\'){a[b].5y(a,5z.W.5A.5B(c,1))}})}}})(5C,5D,5E);',62,351,'|||url|options||function|this|buttons|if||||||||||||var|data|div|com|delicious||element|||||true|text|count|twitter|typeof|pinterest|false|height|facebook|undefined|class|width|digg|else|stumbleupon|share||linkedin|googlePlus|script|type|action|http|Plugin|button|encodeURIComponent|prototype|find|js|append||layout|title|lang|site|urlCount|via|src|template|open|href|toolbar|javascript|getElementsByTagName|parentNode|insertBefore|createElement|550|FB|size|_trackSocial|push|_gaq|urlJson|www|urlCurl|total|async|media|line|20px|return|shorterTotal|replace|callback|each|send|font|description|https|STMBLPN|no|status|3px|related|tweet|pin|like|platform|widgets|border|click|parseInt|rendererPerso|color|style|html|fb|init|hover|sharrre|in|500|clearInterval|counter|defaults|s1|plusone|render||badge|add|shareTotal|align|faces|colorscheme|cssCount|padding|float|plugin_|renderer|twttr|margin|cssShare|hashtags|loadButtons|enableTracking|annotation|subscribe|50px|fjs|Event|create|setInterval|google|gapi|submit|SCRIPT|loadButton|35px|18px|display|block|none|json|background|fff|center|1px|solid|radius|img|openPopup|su|processWidgets|IN|tracking|id|edge|1000|tw|20url|popup|900|sharer|650|360|horizontal|getSocialJson|en|length|medium|hide|total_count|shares|enableCounter|enableHover|php|1e6|toFixed|1e3|location|className|it|pointer|services|666666|XFBML|inline|parse|Tweet|normal|indent|vertical|show|baseline|apis|getElementById|bottom|5px|overflow|hidden|ajax|urls|dataType|cache|ccc|DiggThisButton|decoration|7EACEE|40679C|rel|static|small|gif|api|alt|Delicious|Add|on|nofollow|external|cdn|go|setTimeout|___gcfg|20WHERE|20link_stat|20FROM|__DBW|20click_count|20comments_fbid|commentsbox_count|root|Pin|It|assets|pinit|connect|googleplus|20total_count|20comment_count|tall|20like_count|20share_count|20normalized_url|remove|unlike|message|net|jsonp|events|bind|format|LinkedInShare|all|SELECT|plus|hl|fql|15px|countserv|intent|urlinfo|xfbml|tools|diggthis|save|noui|jump|close|graph|DiggCompact|cws|token|isFramed|700|300|v2|en_US|extend|_defaults|_name|button_count|addClass|attr|US|try|top|catch|feeds|93px|links|getJSON|u00c2|u00a0|right|getInfo|story|total_posts|26px|left|error|for|jssdk|box|12px|Arial|Helvetica|sans|Google|serif|simulateClick|update|fn|arguments|object|cursor|new|string|_|instanceof|apply|Array|slice|call|jQuery|window|document'.split('|'),0,{}))


function load_script(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var x = document.getElementsByTagName('head')[0];
    x.appendChild(s);
}

jQuery(document).ready(function($) {
   "use strict";

    //FOR CART ONLY
    if ($('.woocommerce-cart').length > 0){
      //add to cart
      $('.checkout-button').click(function(){
         ga('send', 'event', 'cart', 'checkout');
      });
    }

    //FOR CHECKOUT
    if ($('.woocommerce-checkout').length > 0){
      //add to cart
      $('#place_order').click(function(){
         ga('send', 'event', 'checkout', 'proceed');
      });
    }

    //THANK YOU PAGE
    if ($('.thanksforpurchase').length > 0){
      //visited
      ga('send', 'event', 'thankyou-page', 'purchase');
    }

    $("body").click(function() {
        $(".top-menu").parent().removeClass("active");
    });

    $(".top-menu").click(function(e) {
        e.stopPropagation();
    });

    $(".top-menu").click(function() {
        $(parent).toggleClass("active");
    });

    // SEARCH
    $('.gobutton').click(function() {
        $('#search').submit();
    });

    $(document).click(function() {
        $(".top-menu.search").removeClass('selected');
    });

    $(".top-menu.search").click(function(event) {
        $(this).addClass('selected');
        $('.search-input').focus();
        event.stopPropagation();
    });

    // CONTACT FORM
    $(document).on('submit', '#dm_contact_form_1', function() {
        var form_container = $(this);
        $('#dm_contact_form #message').empty();
        $('#submit', form_container).attr('disabled', 'disabled');
        $('.loader', form_container).show();

        $.ajax({
            type: 'post',
            url: '/wp-admin/admin-ajax.php',
            data: form_container.serialize() + '&action=dm_contact',
            success: function(response) {
                $('#dm_contact_form #message').html(response).slideDown();

                if (response.match('success') != null) {
                    form_container.slideUp();
                }

                $('.loader', form_container).hide();
                $('#submit', form_container).removeAttr('disabled');
            }
        });

        return false;
    });

    // CONTACT FORM ON CHANGE SUBJECT
    var contact_form_array = [
        'startup-support',
        'startup-wordpress-support',
        'flat-ui-support',
        'qards-support',
        'slides-support'
    ];

    if($('#dm_contact_form_1').length > 0 && $.inArray($('#dm_contact_form_1 #subject').val(), contact_form_array) !== -1) {
        $('#dm_contact_form_1 #order_number').closest('div').show();
    }

    $('#dm_contact_form_1').on('change', '#subject', function() {
        if($.inArray($(this).val(), contact_form_array) !== -1) {
            $('#dm_contact_form_1 #order_number').closest('div').show();
        } else {
            $('#dm_contact_form_1 #order_number').closest('div').hide();
        }
    });

    // LOAD ASYNC
    load_script('//platform.twitter.com/widgets.js');
    load_script('//apis.google.com/js/plusone.js');
    load_script('//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=368289576549864&version=v2.0');
});



/*! iFrame Resizer (iframeSizer.min.js ) - v2.7.1 - 2014-12-12
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

! function() {
    "use strict";

    function a(a, b, c) {
        "addEventListener" in window ? a.addEventListener(b, c, !1) : "attachEvent" in window && a.attachEvent("on" + b, c)
    }

    function b() {
        var a, b = ["moz", "webkit", "o", "ms"];
        for (a = 0; a < b.length && !w; a += 1) w = window[b[a] + "RequestAnimationFrame"];
        w || c(" RequestAnimationFrame not supported")
    }

    function c(a) {
        y.log && "object" == typeof console && console.log(s + "[Host page" + u + "]" + a)
    }

    function d(a) {
        function b() {
            function a() {
                h(B), f(), y.resizedCallback(B)
            }
            k("Height"), k("Width"), i(a, B, "resetPage")
        }

        function d(a) {
            var b = a.id;
            c(" Removing iFrame: " + b), a.parentNode.removeChild(a), y.closedCallback(b), c(" --")
        }

        function j() {
            var a = A.substr(t).split(":");
            return {
                iframe: document.getElementById(a[0]),
                id: a[0],
                height: a[1],
                width: a[2],
                type: a[3]
            }
        }

        function k(a) {
            var b = Number(y["max" + a]),
                d = Number(y["min" + a]),
                e = a.toLowerCase(),
                f = Number(B[e]);
            if (d > b) throw new Error("Value for min" + a + " can not be greater than max" + a);
            c(" Checking " + e + " is in range " + d + "-" + b), d > f && (f = d, c(" Set " + e + " to min value")), f > b && (f = b, c(" Set " + e + " to max value")), B[e] = "" + f
        }

        function l() {
            var b = a.origin,
                d = B.iframe.src.split("/").slice(0, 3).join("/");
            if (y.checkOrigin && (c(" Checking connection is from: " + d), "" + b != "null" && b !== d)) throw new Error("Unexpected message received from: " + b + " for " + B.iframe.id + ". Message was: " + a.data + ". This error can be disabled by adding the checkOrigin: false option.");
            return !0
        }

        function m() {
            return s === ("" + A).substr(0, t)
        }

        function n() {
            var a = B.type in {
                "true": 1,
                "false": 1
            };
            return a && c(" Ignoring init message from meta parent page"), a
        }

        function o() {
            var a = A.substr(A.indexOf(":") + r + 6);
            c(" MessageCallback passed: {iframe: " + B.iframe.id + ", message: " + a + "}"), y.messageCallback({
                iframe: B.iframe,
                message: JSON.parse(a)
            }), c(" --")
        }

        function q() {
            if (null === B.iframe) throw new Error("iFrame (" + B.id + ") does not exist on " + u);
            return !0
        }

        function w() {
            var a = B.iframe.getBoundingClientRect();
            return e(), {
                x: Number(a.left) + Number(v.x),
                y: Number(a.top) + Number(v.y)
            }
        }

        function x(a) {
            var b = a ? w() : {
                x: 0,
                y: 0
            };
            c(" Reposition requested from iFrame (offset x:" + b.x + " y:" + b.y + ")"), v = {
                x: Number(B.width) + b.x,
                y: Number(B.height) + b.y
            }, f()
        }

        function z() {
            switch (B.type) {
                case "close":
                    d(B.iframe), y.resizedCallback(B);
                    break;
                case "message":
                    o();
                    break;
                case "scrollTo":
                    x(!1);
                    break;
                case "scrollToOffset":
                    x(!0);
                    break;
                case "reset":
                    g(B);
                    break;
                case "init":
                    b(), y.initCallback(B.iframe);
                    break;
                default:
                    b()
            }
        }
        var A = a.data,
            B = {};
        m() && (c(" Received: " + A), B = j(), !n() && q() && l() && (z(), p = !1))
    }

    function e() {
        null === v && (v = {
            x: void 0 !== window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft,
            y: void 0 !== window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop
        }, c(" Get position: " + v.x + "," + v.y))
    }

    function f() {
        null !== v && (window.scrollTo(v.x, v.y), c(" Set position: " + v.x + "," + v.y), v = null)
    }

    function g(a) {
        function b() {
            h(a), j("reset", "reset", a.iframe)
        }
        c(" Size reset requested by " + ("init" === a.type ? "host page" : "iFrame")), e(), i(b, a, "init")
    }

    function h(a) {
        function b(b) {
            a.iframe.style[b] = a[b] + "px", c(" IFrame (" + a.iframe.id + ") " + b + " set to " + a[b] + "px")
        }
        y.sizeHeight && b("height"), y.sizeWidth && b("width")
    }

    function i(a, b, d) {
        d !== b.type && w ? (c(" Requesting animation frame"), w(a)) : a()
    }

    function j(a, b, d) {
        c("[" + a + "] Sending msg to iframe (" + b + ")"), d.contentWindow.postMessage(s + b, "*")
    }

    function k() {
        function b() {
            function a(a) {
                1 / 0 !== y[a] && 0 !== y[a] && (k.style[a] = y[a] + "px", c(" Set " + a + " = " + y[a] + "px"))
            }
            a("maxHeight"), a("minHeight"), a("maxWidth"), a("minWidth")
        }

        function d(a) {
            return "" === a && (k.id = a = "iFrameResizer" + o++, c(" Added missing iframe ID: " + a + " (" + k.src + ")")), a
        }

        function e() {
            c(" IFrame scrolling " + (y.scrolling ? "enabled" : "disabled") + " for " + l), k.style.overflow = !1 === y.scrolling ? "hidden" : "auto", k.scrolling = !1 === y.scrolling ? "no" : "yes"
        }

        function f() {
            ("number" == typeof y.bodyMargin || "0" === y.bodyMargin) && (y.bodyMarginV1 = y.bodyMargin, y.bodyMargin = "" + y.bodyMargin + "px")
        }

        function h() {
            return l + ":" + y.bodyMarginV1 + ":" + y.sizeWidth + ":" + y.log + ":" + y.interval + ":" + y.enablePublicMethods + ":" + y.autoResize + ":" + y.bodyMargin + ":" + y.heightCalculationMethod + ":" + y.bodyBackground + ":" + y.bodyPadding + ":" + y.tolerance
        }

        function i(b) {
            a(k, "load", function() {
                var a = p;
                j("iFrame.onload", b, k), !a && y.heightCalculationMethod in x && g({
                    iframe: k,
                    height: 0,
                    width: 0,
                    type: "init"
                })
            }), j("init", b, k)
        }
        var k = this,
            l = d(k.id);
        e(), b(), f(), i(h())
    }

    function l(a) {
        if ("object" != typeof a) throw new TypeError("Options is not an object.")
    }

    function m() {
        function a(a) {
            if ("IFRAME" !== a.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + a.tagName + ">.");
            k.call(a)
        }

        function b(a) {
            a = a || {}, l(a);
            for (var b in z) z.hasOwnProperty(b) && (y[b] = a.hasOwnProperty(b) ? a[b] : z[b])
        }
        return function(c, d) {
            b(c), Array.prototype.forEach.call(document.querySelectorAll(d || "iframe"), a)
        }
    }

    function n(a) {
        a.fn.iFrameResize = function(b) {
            return b = b || {}, l(b), y = a.extend({}, z, b), this.filter("iframe").each(k).end()
        }
    }
    var o = 0,
        p = !0,
        q = "message",
        r = q.length,
        s = "[iFrameSizer]",
        t = s.length,
        u = "",
        v = null,
        w = window.requestAnimationFrame,
        x = {
            max: 1,
            scroll: 1,
            bodyScroll: 1,
            documentElementScroll: 1
        },
        y = {},
        z = {
            autoResize: !0,
            bodyBackground: null,
            bodyMargin: null,
            bodyMarginV1: 8,
            bodyPadding: null,
            checkOrigin: !0,
            enablePublicMethods: !1,
            heightCalculationMethod: "offset",
            interval: 32,
            log: !1,
            maxHeight: 1 / 0,
            maxWidth: 1 / 0,
            minHeight: 0,
            minWidth: 0,
            scrolling: !1,
            sizeHeight: !0,
            sizeWidth: !1,
            tolerance: 0,
            closedCallback: function() {},
            initCallback: function() {},
            messageCallback: function() {},
            resizedCallback: function() {}
        };
    b(), a(window, "message", d), window.jQuery && n(jQuery), "function" == typeof define && define.amd ? define([], m) : "object" == typeof exports ? module.exports = m() : window.iFrameResize = m()
}();



/*! iFrame Resizer (iframeSizer.contentWindow.min.js) - v2.7.1 - 2014-12-12
 *  Desc: Include this file in any page being loaded into an iframe
 *        to force the iframe to resize to the content size.
 *  Requires: iframeResizer.min.js on host page.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

! function() {
    "use strict";

    function a(a, b, c) {
        "addEventListener" in window ? a.addEventListener(b, c, !1) : "attachEvent" in window && a.attachEvent("on" + b, c)
    }

    function b(a) {
        return $ + "[" + ab + "] " + a
    }

    function c(a) {
        Z && "object" == typeof window.console && console.log(b(a))
    }

    function d(a) {
        "object" == typeof window.console && console.warn(b(a))
    }

    function e() {
        c("Initialising iFrame"), f(), i(), h("background", L), h("padding", O), o(), m(), j(), p(), n(), D("init", "Init message from host page")
    }

    function f() {
        function a(a) {
            return "true" === a ? !0 : !1
        }
        var b = X.substr(_).split(":");
        ab = b[0], M = void 0 !== b[1] ? Number(b[1]) : M, P = void 0 !== b[2] ? a(b[2]) : P, Z = void 0 !== b[3] ? a(b[3]) : Z, Y = void 0 !== b[4] ? Number(b[4]) : Y, bb = void 0 !== b[5] ? a(b[5]) : bb, J = void 0 !== b[6] ? a(b[6]) : J, N = b[7], V = void 0 !== b[8] ? b[8] : V, L = b[9], O = b[10], fb = void 0 !== b[11] ? Number(b[11]) : fb
    }

    function g(a, b) {
        return -1 !== b.indexOf("-") && (d("Negative CSS value ignored for " + a), b = ""), b
    }

    function h(a, b) {
        void 0 !== b && "" !== b && "null" !== b && (document.body.style[a] = b, c("Body " + a + ' set to "' + b + '"'))
    }

    function i() {
        void 0 === N && (N = M + "px"), g("margin", N), h("margin", N)
    }

    function j() {
        document.documentElement.style.height = "", document.body.style.height = "", c('HTML & body height set to "auto"')
    }

    function k() {
        a(window, "resize", function() {
            D("resize", "Window resized")
        })
    }

    function l() {
        a(window, "click", function() {
            D("click", "Window clicked")
        })
    }

    function m() {
        U !== V && (V in jb || (d(V + " is not a valid option for heightCalculationMethod."), V = "bodyScroll"), c('Height calculation method set to "' + V + '"'))
    }

    function n() {
        !0 === J ? (k(), l(), s()) : c("Auto Resize disabled")
    }

    function o() {
        var a = document.createElement("div");
        a.style.clear = "both", a.style.display = "block", document.body.appendChild(a)
    }

    function p() {
        bb && (c("Enable public methods"), window.parentIFrame = {
            close: function() {
                D("close", "parentIFrame.close()", 0, 0)
            },
            getId: function() {
                return ab
            },
            reset: function() {
                G("parentIFrame.size")
            },
            scrollTo: function(a, b) {
                H(b, a, "scrollTo")
            },
            scrollToOffset: function(a, b) {
                H(b, a, "scrollToOffset")
            },
            sendMessage: function(a, b) {
                H(0, 0, "message", JSON.stringify(a), b)
            },
            setHeightCalculationMethod: function(a) {
                V = a, m()
            },
            setTargetOrigin: function(a) {
                c("Set targetOrigin: " + a), db = a
            },
            size: function(a, b) {
                var c = "" + (a ? a : "") + (b ? "," + b : "");
                E(), D("size", "parentIFrame.size(" + c + ")", a, b)
            }
        })
    }

    function q() {
        0 !== Y && (c("setInterval: " + Y + "ms"), setInterval(function() {
            D("interval", "setInterval: " + Y)
        }, Math.abs(Y)))
    }

    function r(b) {
        function d(b) {
            (void 0 === b.height || void 0 === b.width || 0 === b.height || 0 === b.width) && (c("Attach listerner to " + b.src), a(b, "load", function() {
                D("imageLoad", "Image loaded")
            }))
        }
        b.forEach(function(a) {
            if ("attributes" === a.type && "src" === a.attributeName) d(a.target);
            else if ("childList" === a.type) {
                var b = a.target.querySelectorAll("img");
                Array.prototype.forEach.call(b, function(a) {
                    d(a)
                })
            }
        })
    }

    function s() {
        function a() {
            var a = document.querySelector("body"),
                d = {
                    attributes: !0,
                    attributeOldValue: !1,
                    characterData: !0,
                    characterDataOldValue: !1,
                    childList: !0,
                    subtree: !0
                },
                e = new b(function(a) {
                    D("mutationObserver", "mutationObserver: " + a[0].target + " " + a[0].type), r(a)
                });
            c("Enable MutationObserver"), e.observe(a, d)
        }
        var b = window.MutationObserver || window.WebKitMutationObserver;
        b ? 0 > Y ? q() : a() : (d("MutationObserver not supported in this browser!"), q())
    }

    function t() {
        function a(a) {
            function b(a) {
                var b = /^\d+(px)?$/i;
                if (b.test(a)) return parseInt(a, K);
                var d = c.style.left,
                    e = c.runtimeStyle.left;
                return c.runtimeStyle.left = c.currentStyle.left, c.style.left = a || 0, a = c.style.pixelLeft, c.style.left = d, c.runtimeStyle.left = e, a
            }
            var c = document.body,
                d = 0;
            return "defaultView" in document && "getComputedStyle" in document.defaultView ? (d = document.defaultView.getComputedStyle(c, null), d = null !== d ? d[a] : 0) : d = b(c.currentStyle[a]), parseInt(d, K)
        }
        return document.body.offsetHeight + a("marginTop") + a("marginBottom")
    }

    function u() {
        return document.body.scrollHeight
    }

    function v() {
        return document.documentElement.offsetHeight
    }

    function w() {
        return document.documentElement.scrollHeight
    }

    function x() {
        for (var a = document.querySelectorAll("body *"), b = a.length, d = 0, e = (new Date).getTime(), f = 0; b > f; f++) a[f].getBoundingClientRect().bottom > d && (d = a[f].getBoundingClientRect().bottom);
        return e = (new Date).getTime() - e, c("Parsed " + b + " HTML elements"), c("LowestElement bottom position calculated in " + e + "ms"), d
    }

    function y() {
        return [t(), u(), v(), w()]
    }

    function z() {
        return Math.max.apply(null, y())
    }

    function A() {
        return Math.min.apply(null, y())
    }

    function B() {
        return Math.max(t(), x())
    }

    function C() {
        return Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
    }

    function D(a, b, d, e) {
        function f() {
            a in {
                reset: 1,
                resetPage: 1,
                init: 1
            } || c("Trigger event: " + b)
        }

        function g() {
            S = n, ib = o, H(S, ib, a)
        }

        function h() {
            return gb && a in Q
        }

        function i() {
            function a(a, b) {
                var c = Math.abs(a - b) <= fb;
                return !c
            }
            return n = void 0 !== d ? d : jb[V](), o = void 0 !== e ? e : C(), a(S, n) || P && a(ib, o)
        }

        function j() {
            return !(a in {
                init: 1,
                interval: 1,
                size: 1
            })
        }

        function k() {
            return V in cb
        }

        function l() {
            c("No change in size detected")
        }

        function m() {
            j() && k() ? G(b) : a in {
                interval: 1
            } || (f(), l())
        }
        var n, o;
        h() ? c("Trigger event cancelled: " + a) : i() ? (f(), E(), g()) : m()
    }

    function E() {
        gb || (gb = !0, c("Trigger event lock on")), clearTimeout(hb), hb = setTimeout(function() {
            gb = !1, c("Trigger event lock off"), c("--")
        }, R)
    }

    function F(a) {
        S = jb[V](), ib = C(), H(S, ib, a)
    }

    function G(a) {
        var b = V;
        V = U, c("Reset trigger event: " + a), E(), F("reset"), V = b
    }

    function H(a, b, d, e, f) {
        function g() {
            void 0 === f ? f = db : c("Message targetOrigin: " + f)
        }

        function h() {
            var g = a + ":" + b,
                h = ab + ":" + g + ":" + d + (void 0 !== e ? ":" + e : "");
            c("Sending message to host page (" + h + ")"), eb.postMessage($ + h, f)
        }
        g(), h()
    }

    function I(a) {
        function b() {
            return $ === ("" + a.data).substr(0, _)
        }

        function f() {
            X = a.data, eb = a.source, e(), T = !1, setTimeout(function() {
                W = !1
            }, R)
        }

        function g() {
            W ? c("Page reset ignored by init") : (c("Page size reset by host page"), F("resetPage"))
        }

        function h() {
            return a.data.split("]")[1]
        }

        function i() {
            return "iFrameResize" in window
        }

        function j() {
            return a.data.split(":")[2] in {
                "true": 1,
                "false": 1
            }
        }
        b() && (T && j() ? f() : "reset" === h() ? g() : a.data === X || i() || d("Unexpected message (" + a.data + ")"))
    }
    var J = !0,
        K = 10,
        L = "",
        M = 0,
        N = "",
        O = "",
        P = !1,
        Q = {
            resize: 1,
            click: 1
        },
        R = 128,
        S = 1,
        T = !0,
        U = "offset",
        V = U,
        W = !0,
        X = "",
        Y = 32,
        Z = !1,
        $ = "[iFrameSizer]",
        _ = $.length,
        ab = "",
        bb = !1,
        cb = {
            max: 1,
            scroll: 1,
            bodyScroll: 1,
            documentElementScroll: 1
        },
        db = "*",
        eb = window.parent,
        fb = 0,
        gb = !1,
        hb = null,
        ib = 1,
        jb = {
            offset: t,
            bodyOffset: t,
            bodyScroll: u,
            documentElementOffset: v,
            scroll: w,
            documentElementScroll: w,
            max: z,
            min: A,
            grow: z,
            lowestElement: B
        };
    a(window, "message", I)
}();
