const Print = function (dom, name, num) {
    if (!(this instanceof Print)) {
        return new Print(dom, name, num)
    }
    this.options = {
        'noPrint': '.no-print'
    }
    if ((typeof dom) === "string") {
        this.dom = document.querySelector(dom);
    } else {
        this.isDOM(dom)
        this.dom = this.isDOM(dom) ? dom : dom.$el
    }
    this.init(name, num);
};
Print.prototype = {
    init: function (name,num) {
        var content = this.getStyle() + this.getHtml(name, num);
        this.writeIframe(content);
    },
    getStyle: function () {
        var str = "",
            styles = document.querySelectorAll('style,link');
        for (var i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML;
        }
        str += "<style>" + (this.options.notPrint ? this.options.notPrint : '.no-print') + "{display:none;}</style>";
        str += "<style> .result .title{width:100%;}</style>";
        str += "<style>html,body,div{height: auto!important;font-size:14px}</style>";
        return str;
    },
    // 设置页眉标题 -mpc 2019-08-24
    setHeader: function (name, num) {
        let dom = document.createElement('html')
        let title = document.createElement('title')
        title.innerHTML = name
        dom.appendChild(title)
        for(let i = 0; i < num; i++) {
            var newDom = this.dom.cloneNode(true)
            newDom.style.pageBreakAfter = "always"
            dom.appendChild(newDom)
        }
        return dom.outerHTML
    },
    getHtml: function (name, num) {
        var inputs = document.querySelectorAll('input');
        var textareas = document.querySelectorAll('textarea');
        var selects = document.querySelectorAll('select');
        var canvass = document.querySelectorAll('canvas');
        for (var k = 0; k < inputs.length; k++) {
            if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
                if (inputs[k].checked == true) {
                    inputs[k].setAttribute('checked', "checked")
                } else {
                    inputs[k].removeAttribute('checked')
                }
            } else if (inputs[k].type == "text") {
                inputs[k].setAttribute('value', inputs[k].value)
            } else {
                inputs[k].setAttribute('value', inputs[k].value)
            }
        }

        for (var k2 = 0; k2 < textareas.length; k2++) {
            if (textareas[k2].type == 'textarea') {
                textareas[k2].innerHTML = textareas[k2].value
            }
        }

        for (var k3 = 0; k3 < selects.length; k3++) {
            if (selects[k3].type == 'select-one') {
                var child = selects[k3].children;
                for (var i in child) {
                    if (child[i].tagName == 'OPTION') {
                        if (child[i].selected == true) {
                            child[i].setAttribute('selected', "selected")
                        } else {
                            child[i].removeAttribute('selected')
                        }
                    }
                }
            }
        }
        //canvass echars图表转为图片
        for (var k4 = 0; k4 < canvass.length; k4++) {
            var imageURL = canvass[k4].toDataURL("image/png");
            var img = document.createElement("img");
            img.src = imageURL;
            img.setAttribute('style', 'max-width: 100%;');
            img.className = 'isNeedRemove'
            canvass[k4].parentNode.insertBefore(img, canvass[k4].nextElementSibling);
        }
        return this.setHeader(name, num)
    },
    writeIframe: function (content) {
        var w, doc, iframe = document.createElement('iframe'),
            f = document.body.appendChild(iframe);
        iframe.id = "myIframe";
        //iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
        iframe.setAttribute('style', 'position:absolute;width:' + document.querySelector('.results').clientWidth + 'px;height:0;top:-10px;left:-10px;');
        w = f.contentWindow || f.contentDocument;
        doc = f.contentDocument || f.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();

        var removes = document.querySelectorAll('.isNeedRemove');
        for (var k = 0; k < removes.length; k++) {
            removes[k].parentNode.removeChild(removes[k]);
        }

        var _this = this
        iframe.onload = function () {
            _this.toPrint(w);
            setTimeout(function () {
                document.body.removeChild(iframe)
            }, 100)
        }
    },
    toPrint: function (frameWindow) {
        try {
            setTimeout(function () {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
            }, 10);
        } catch (err) {
            console.log('err', err);
        }
    },
    isDOM: (typeof HTMLElement === 'object') ?
        function (obj) {
            return obj instanceof HTMLElement;
        } :
        function (obj) {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        }
};
const MyPlugin = {}
MyPlugin.install = function (Vue) {
    // 4. 添加实例方法
    Vue.prototype.$print = Print
}
export default MyPlugin