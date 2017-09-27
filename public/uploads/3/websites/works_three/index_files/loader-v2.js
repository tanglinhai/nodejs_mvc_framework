(function() {

    var __hs_cta_json = {"css":"a#cta_button_608639_15c0289f-e81d-46a4-96fe-6a71c1094d5b {\n  cursor:pointer; \n    border-radius: 4px;\n    display: inline-block;\n    transition: .2s ease;\n    border: none;\n    color: #fff;\n    font-family: kulturista-web,serif;\n    font-size: 16px;\n    font-size: 1.6rem;\n    line-height: 1.75;\n    margin: 2em 0 1em;\n    padding: .25em 1.5em .35em;\n    text-align: center;\nbackground: #f6364d;}\na#cta_button_608639_15c0289f-e81d-46a4-96fe-6a71c1094d5b:hover {\n}\na#cta_button_608639_15c0289f-e81d-46a4-96fe-6a71c1094d5b:active, #cta_button_608639_15c0289f-e81d-46a4-96fe-6a71c1094d5b:active:hover {\n}\n\n","image_html":"<a id=\"cta_button_608639_15c0289f-e81d-46a4-96fe-6a71c1094d5b\" class=\"cta_button\" href=\"https://cta-service-cms2.hubspot.com/ctas/v2/public/cs/c/?cta_guid=15c0289f-e81d-46a4-96fe-6a71c1094d5b&placement_guid=2cc136cc-af5d-45b0-98f0-63292c8d5337&portal_id=608639&redirect_url=APefjpHPCJWYKe7aBT3--9OPUg1O70Oa8Hb2wH1gUTkUqfUz19hHdRcxG_6HeOwPDSiDkoFMsrbMcTSSu-4OcWfUyG2tTFOV-ZCU1JhDu4Wvfhm1s6Ap1u4&hsutk=c7a0000016d313fc14fb015e23c9adc4&canon=https%3A%2F%2Funion.co%2F%23&click=87e4bff6-4334-45cd-af28-f3aacf1c93c0&utm_referrer=http%3A%2F%2Fwww.25xt.com%2Fhtml5css3%2F8555.html\"  cta_dest_link=\"http://union.co/contact\"><img id=\"hs-cta-img-2cc136cc-af5d-45b0-98f0-63292c8d5337\" class=\"hs-cta-img btn\" style=\"border-width: 0px; /*hs-extra-styles*/\" mce_noresize=\"1\" alt=\"Work with us\" src=\"https://cdn2.hubspot.net/hubshot/15/10/27/07a77f73-cdc0-470b-81ad-3a24acd3c8cc.png\" /></a>","is_image":false,"placement_element_class":"hs-cta-2cc136cc-af5d-45b0-98f0-63292c8d5337","raw_html":"<a id=\"cta_button_608639_15c0289f-e81d-46a4-96fe-6a71c1094d5b\" class=\"cta_button btn\" href=\"https://cta-service-cms2.hubspot.com/ctas/v2/public/cs/c/?cta_guid=15c0289f-e81d-46a4-96fe-6a71c1094d5b&placement_guid=2cc136cc-af5d-45b0-98f0-63292c8d5337&portal_id=608639&redirect_url=APefjpHPCJWYKe7aBT3--9OPUg1O70Oa8Hb2wH1gUTkUqfUz19hHdRcxG_6HeOwPDSiDkoFMsrbMcTSSu-4OcWfUyG2tTFOV-ZCU1JhDu4Wvfhm1s6Ap1u4&hsutk=c7a0000016d313fc14fb015e23c9adc4&canon=https%3A%2F%2Funion.co%2F%23&click=87e4bff6-4334-45cd-af28-f3aacf1c93c0&utm_referrer=http%3A%2F%2Fwww.25xt.com%2Fhtml5css3%2F8555.html\"  style=\"/*hs-extra-styles*/\" cta_dest_link=\"http://union.co/contact\" title=\"Work with us\"><span>Work with us</span></a>"};
    var __hs_cta = {};

    __hs_cta.drop = function() {
        var is_legacy = document.getElementById('hs-cta-ie-element') && true || false,
            html = __hs_cta_json.image_html,
            tags = __hs_cta.getTags(),
            is_image = __hs_cta_json.is_image,
            parent, _style;

        if (!is_legacy && !is_image) {
            parent = (document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]);

            _style = document.createElement('style');
            parent.insertBefore(_style, parent.childNodes[0]);
            try {
                default_css = ".hs-cta-wrapper p, .hs-cta-wrapper div { margin: 0; padding: 0; }";
                cta_css = default_css + " " + __hs_cta_json.css;
                // http://blog.coderlab.us/2005/09/22/using-the-innertext-property-with-firefox/
                _style[document.all ? 'innerText' : 'textContent'] = cta_css;
            } catch (e) {
                // addressing an ie9 issue
                _style.styleSheet.cssText = cta_css;
            }

            html = __hs_cta_json.raw_html;
        }

        for (var i = 0; i < tags.length; ++i) {

            var tag = tags[i];
            var images = tag.getElementsByTagName('img');
            var cssText = "";
            var align = "";
            for (var j = 0; j < images.length; j++) {
                align = images[j].align;
                images[j].style.border = '';
                images[j].style.display = '';
                cssText = images[j].style.cssText;
            }

            if (align == "right") {
                tag.style.display = "block";
                tag.style.textAlign = "right";
            } else if (align == "middle") {
                tag.style.display = "block";
                tag.style.textAlign = "center";
            }

            tag.innerHTML = html.replace('/*hs-extra-styles*/', cssText);
            tag.style.visibility = 'visible';
            tag.setAttribute('data-hs-drop', 'true');
            window.hbspt && hbspt.cta && hbspt.cta.afterLoad && hbspt.cta.afterLoad('2cc136cc-af5d-45b0-98f0-63292c8d5337');
        }

        return tags;
    };

    __hs_cta.getTags = function() {
        var allTags, check, i, divTags, spanTags,
            tags = [];
            if (document.getElementsByClassName) {
                allTags = document.getElementsByClassName(__hs_cta_json.placement_element_class);
                check = function(ele) {
                    return (ele.nodeName == 'DIV' || ele.nodeName == 'SPAN') && (!ele.getAttribute('data-hs-drop'));
                };
            } else {
                allTags = [];
                divTags = document.getElementsByTagName("div");
                spanTags = document.getElementsByTagName("span");
                for (i = 0; i < spanTags.length; i++) {
                    allTags.push(spanTags[i]);
                }
                for (i = 0; i < divTags.length; i++) {
                    allTags.push(divTags[i]);
                }

                check = function(ele) {
                    return (ele.className.indexOf(__hs_cta_json.placement_element_class) > -1) && (!ele.getAttribute('data-hs-drop'));
                };
            }
            for (i = 0; i < allTags.length; ++i) {
                if (check(allTags[i])) {
                    tags.push(allTags[i]);
                }
            }
        return tags;
    };

    // need to do a slight timeout so IE has time to react
    setTimeout(__hs_cta.drop, 10);

}());
