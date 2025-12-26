const font_stylesheet = new CSSStyleSheet();
try {
    font_stylesheet.insertRule(sessionStorage.font);
}
catch (error) {
    font_stylesheet.insertRule("html { font-family: 'DotGothic16'; }");
}
finally {
    document.adoptedStyleSheets = [font_stylesheet];
}

// themes
const styleEl = document.createElement("style");
function setTheme(str_stored_theme_key, bg, fg) {
    try {
        if (str_stored_theme_key.length < 500){
            str_stored_theme_key = customizeBackgroundColor(bg, fg, str_stored_theme_key);
        }
        const arr_stored_theme_key = JSON.parse(str_stored_theme_key);
        addStyleSheetRules(arr_stored_theme_key);
    }
    catch (error) {
        console.log(error);
        console.log("Error!");
        addStyleSheetRules([['body::before', ['background', 'url("https://hytheaway.github.io/assets/bg-test-purple4.png") no-repeat center center']], ['body::before', ['background-size', 'cover']]]);
    }
}

function addStyleSheetRules(rules) {
    try {
        document.head.removeChild(styleEl);
    }
    catch (error) {
    }
    document.head.appendChild(styleEl);
    const styleSheet = styleEl.sheet;

    for (let rule of rules) {
        let i = 1, selector = rule[0], propStr = "";
        if (Array.isArray(rule[1][0])) {
            rule = rule[1];
            i = 0;
        }
        for (; i < rule.length; i++) {
            const prop = rule[1];
            if (Array.isArray(prop[1])){ // this is a really bad way to handle this because it's extremely rigid and hard to follow, but it should be fine for now.
                propStr += `${prop[0]}{${prop[1][0]}:${prop[1][1]}${prop[1][2] ? " !important" : "}"};\n`;
                continue;
            }
            propStr += `${prop[0]}: ${prop[1]}${prop[2] ? " !important" : ""};\n`;
        }
        styleSheet.insertRule(
            `${selector}{${propStr}}`,
            styleSheet.cssRules.length,
        );
    }
}

function blendRGBA(bg, fg) {
    // clamp
    const bgAlpha = bg.a > 1 ? bg.a / 255 : bg.a;
    const fgAlpha = fg.a > 1 ? fg.a / 255 : fg.a;

    const finalAlpha = fgAlpha + bgAlpha * (1 - fgAlpha);
    const finalR = finalAlpha === 0 ? 0 : Math.round(((fg.r * fgAlpha) + (bg.r * bgAlpha * (1 - fgAlpha))) / finalAlpha);
    const finalG = finalAlpha === 0 ? 0 : Math.round(((fg.g * fgAlpha) + (bg.g * bgAlpha * (1 - fgAlpha))) / finalAlpha);
    const finalB = finalAlpha === 0 ? 0 : Math.round(((fg.b * fgAlpha) + (bg.b * bgAlpha * (1 - fgAlpha))) / finalAlpha);

    return {
        r: finalR,
        g: finalG,
        b: finalB,
        a: finalAlpha > 1 ? 1 : finalAlpha
    };
}

function customizeBackgroundColor(bg, fg, theme_key) {
    let str_stored_theme_key = theme_key;
    let background_color_obj = bg;
    let foreground_color_obj = fg;
    const final_rgba_value  = Object.entries(blendRGBA(background_color_obj, foreground_color_obj)).map(([key,value]) => `${value}`).join(', ');
    const background_color = Object.entries(background_color_obj).map(([key,value]) => `${value}`).join(', ');
    const foreground_color = Object.entries(foreground_color_obj).map(([key,value]) => `${value}`).join(', ');
    let index_to_slice = str_stored_theme_key.indexOf("background");
    let first_part = str_stored_theme_key.slice(0,index_to_slice+10);
    let second_part = str_stored_theme_key.slice(index_to_slice+13);
    str_stored_theme_key = first_part + `", "linear-gradient(rgba(${foreground_color}), rgba(${foreground_color})), ` + second_part;
    str_stored_theme_key = str_stored_theme_key.slice(0, -1);
    str_stored_theme_key += `, ["hr:after", ["background", "rgba(${final_rgba_value})"]]]`;
    return str_stored_theme_key;
}