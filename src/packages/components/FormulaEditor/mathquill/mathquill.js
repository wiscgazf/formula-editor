!function() {
    var isPinYin;
    var t, e = window.jQuery, n = "mathquill-command-id", s = "mathquill-block-id", r = Math.min, i = Math.max;
    if (isPinYin = !1,
        !e)
        throw "MathQuill requires jQuery 1.5.2+ to be loaded first";
    function a() {}
    var o = [].slice;
    function l(t) {
        var e = t.length - 1;
        return function() {
            var n = o.call(arguments, 0, e)
                , s = o.call(arguments, e);
            return t.apply(this, n.concat([s]))
        }
    }
    var c = l((function(t, e) {
            return l((function(n, s) {
                    if (t in n)
                        return n[t].apply(n, e.concat(s))
                }
            ))
        }
    ));
    function u(t) {
        return l((function(e, n) {
                "function" != typeof e && (e = c(e));
                return t.call(this, (function(t) {
                        return e.apply(t, [t].concat(n))
                    }
                ))
            }
        ))
    }
    function h(t) {
        var e = o.call(arguments, 1);
        return function() {
            return t.apply(this, e)
        }
    }
    var p = function(t, e, n) {
        function s(t) {
            return "object" == typeof t
        }
        function r(t) {
            return "function" == typeof t
        }
        function i() {}
        return function n(a, o) {
            function l() {
                var t = new c;
                return r(t.init) && t.init.apply(t, arguments),
                    t
            }
            function c() {}
            undefined === o && (o = a,
                a = Object),
                l.Bare = c;
            var u, h = i[t] = a[t], p = c[t] = l[t] = l.p = new i;
            return p.constructor = l,
                l.extend = function(t) {
                    return n(l, t)
                }
                ,
                (l.open = function(t) {
                        if (u = {},
                            r(t) ? u = t.call(l, p, h, l, a) : s(t) && (u = t),
                            s(u))
                            for (var n in u)
                                e.call(u, n) && (p[n] = u[n]);
                        return r(p.init) || (p.init = a),
                            l
                    }
                )(o)
        }
    }("prototype", {}.hasOwnProperty)
        , f = -1;
    var d = p(e, (function(t) {
            t.insDirOf = function(t, e) {
                return t === f ? this.insertBefore(e.first()) : this.insertAfter(e.last())
            }
                ,
                t.insAtDirEnd = function(t, e) {
                    return t === f ? this.prependTo(e) : this.appendTo(e)
                }
        }
    ))
        , m = p((function(t) {
            t.parent = 0,
                t[f] = 0,
                t[1] = 0,
                t.init = function(t, e, n) {
                    this.parent = t,
                        this[f] = e,
                        this[1] = n
                }
                ,
                this.copy = function(t) {
                    return m(t.parent, t[f], t[1])
                }
        }
    ))
        , v = p((function(t) {
            t[f] = 0,
                t[1] = 0,
                t.parent = 0;
            var e = 0;
            this.byId = {},
                t.init = function() {
                    this.id = e += 1,
                        v.byId[this.id] = this,
                        this.ends = {},
                        this.ends[f] = 0,
                        this.ends[1] = 0
                }
                ,
                t.dispose = function() {
                    delete v.byId[this.id]
                }
                ,
                t.toString = function() {
                    return "{{ MathQuill Node #" + this.id + " }}"
                }
                ,
                t.jQ = d(),
                t.jQadd = function(t) {
                    return this.jQ = this.jQ.add(t)
                }
                ,
                t.jQize = function(t) {
                    t = d(t || this.html());
                    function e(t) {
                        if (t.getAttribute) {
                            var n = t.getAttribute("mathquill-command-id")
                                , s = t.getAttribute("mathquill-block-id");
                            n && v.byId[n].jQadd(t),
                            s && v.byId[s].jQadd(t)
                        }
                        for (t = t.firstChild; t; t = t.nextSibling)
                            e(t)
                    }
                    for (var n = 0; n < t.length; n += 1)
                        e(t[n]);
                    return t
                }
                ,
                t.createDir = function(t, e) {
                    var n = this;
                    return n.jQize(),
                        n.jQ.insDirOf(t, e.jQ),
                        e[t] = n.adopt(e.parent, e[f], e[1]),
                        n
                }
                ,
                t.createLeftOf = function(t) {
                    return this.createDir(f, t)
                }
                ,
                t.selectChildren = function(t, e) {
                    return y(t, e)
                }
                ,
                t.bubble = u((function(t) {
                        for (var e = this; e; e = e.parent) {
                            if (!1 === t(e))
                                break
                        }
                        return this
                    }
                )),
                t.postOrder = u((function(t) {
                        return function e(n) {
                            n.eachChild(e),
                                t(n)
                        }(this),
                            this
                    }
                )),
                t.isEmpty = function() {
                    return 0 === this.ends[f] && 0 === this.ends[1]
                }
                ,
                t.isStyleBlock = function() {
                    return !1
                }
                ,
                t.children = function() {
                    return q(this.ends[f], this.ends[1])
                }
                ,
                t.eachChild = function() {
                    var t = this.children();
                    return t.each.apply(t, arguments),
                        this
                }
                ,
                t.foldChildren = function(t, e) {
                    return this.children().fold(t, e)
                }
                ,
                t.withDirAdopt = function(t, e, n, s) {
                    return q(this, this).withDirAdopt(t, e, n, s),
                        this
                }
                ,
                t.adopt = function(t, e, n) {
                    return q(this, this).adopt(t, e, n),
                        this
                }
                ,
                t.disown = function() {
                    return q(this, this).disown(),
                        this
                }
                ,
                t.remove = function() {
                    return this.jQ.remove(),
                        this.postOrder("dispose"),
                        this.disown()
                }
        }
    ));
    function g(t, e, n) {
        e ? e[1] === n && e.parent : t.ends[f],
            n ? n[f] === e && n.parent : t.ends[1]
    }
    var q = p((function(e) {
            e.init = function(e, n, s) {
                if (s === t && (s = f),
                    this.ends = {},
                    e) {
                    e.parent,
                        n.parent,
                        this.ends[s] = e,
                        this.ends[-s] = n;
                    var r = this.fold([], (function(t, e) {
                            return t.push.apply(t, e.jQ.get()),
                                t
                        }
                    ));
                    this.jQ = this.jQ.add(r)
                }
            }
                ,
                e.jQ = d(),
                e.withDirAdopt = function(t, e, n, s) {
                    return t === f ? this.adopt(e, n, s) : this.adopt(e, s, n)
                }
                ,
                e.adopt = function(t, e, n) {
                    g(t, e, n);
                    var s = this;
                    s.disowned = !1;
                    var r = s.ends[f];
                    if (!r)
                        return this;
                    var i = s.ends[1];
                    return e || (t.ends[f] = r),
                        n ? n[f] = i : t.ends[1] = i,
                        s.ends[1][1] = n,
                        s.each((function(n) {
                                n[f] = e,
                                    n.parent = t,
                                e && (e[1] = n),
                                    e = n
                            }
                        )),
                        s
                }
                ,
                e.disown = function() {
                    var t = this
                        , e = t.ends[f];
                    if (!e || t.disowned)
                        return t;
                    t.disowned = !0;
                    var n = t.ends[1]
                        , s = e.parent;
                    return g(s, e[f], e),
                        g(s, n, n[1]),
                        e[f] ? e[f][1] = n[1] : s.ends[f] = n[1],
                        n[1] ? n[1][f] = e[f] : s.ends[1] = e[f],
                        t
                }
                ,
                e.remove = function() {
                    return this.jQ.remove(),
                        this.each("postOrder", "dispose"),
                        this.disown()
                }
                ,
                e.each = u((function(t) {
                        var e = this
                            , n = e.ends[f];
                        if (!n)
                            return e;
                        for (; n !== e.ends[1][1]; n = n[1]) {
                            if (!1 === t(n))
                                break
                        }
                        return e
                    }
                )),
                e.fold = function(t, e) {
                    return this.each((function(n) {
                            t = e.call(this, t, n)
                        }
                    )),
                        t
                }
        }
    ))
        , b = {}
        , w = {}
        , x = p(m, (function(t) {
            t.init = function(t, e) {
                this.parent = t,
                    this.options = e;
                var n = this.jQ = this._jQ = d('<span class="mq-cursor">&#8203;</span>');
                this.blink = function() {
                    n.toggleClass("mq-blink")
                }
                    ,
                    this.upDownCache = {}
            }
                ,
                t.show = function() {
                    return this.jQ = this._jQ.removeClass("mq-blink"),
                        "intervalId"in this ? clearInterval(this.intervalId) : (this[1] ? this.selection && this.selection.ends[f][f] === this[f] ? this.jQ.insertBefore(this.selection.jQ) : this.jQ.insertBefore(this[1].jQ.first()) : this.jQ.appendTo(this.parent.jQ),
                            "rgb(0, 0, 0)" == e(".math-area").css("background-color") ? e(this.jQ).css("border-color", "#ffffff") : e(this.jQ).css("border-color", "#000000"),
                            this.parent.focus()),
                        this.intervalId = setInterval(this.blink, 500),
                        this
                }
                ,
                t.hide = function() {
                    return "intervalId"in this && clearInterval(this.intervalId),
                        delete this.intervalId,
                        this.jQ.detach(),
                        this.jQ = d(),
                        this
                }
                ,
                t.withDirInsertAt = function(t, e, n, s) {
                    var r = this.parent;
                    this.parent = e,
                        this[t] = n,
                        this[-t] = s,
                    r !== e && r.blur && r.blur(this)
                }
                ,
                t.insDirOf = function(t, e) {
                    return this.jQ.insDirOf(t, e.jQ),
                        this.withDirInsertAt(t, e.parent, e[t], e),
                        this.parent.jQ.addClass("mq-hasCursor"),
                        this.setCursorHandle(this.parent),
                        this
                }
                ,
                t.insLeftOf = function(t) {
                    return this.insDirOf(f, t)
                }
                ,
                t.insRightOf = function(t) {
                    return this.insDirOf(1, t)
                }
                ,
                t.insAtDirEnd = function(t, e) {
                    return this.jQ.insAtDirEnd(t, e.jQ),
                        this.withDirInsertAt(t, e, 0, e.ends[t]),
                        e.focus(),
                        this.setCursorHandle(e),
                        this
                }
                ,
                t.insAtLeftEnd = function(t) {
                    return this.insAtDirEnd(f, t)
                }
                ,
                t.insAtRightEnd = function(t) {
                    return this.insAtDirEnd(1, t)
                }
                ,
                t.setCursorHandle = function(t) {
                    let e = t=>{
                            t.parent ? e(t.parent) : t.controller.handle("cursor")
                        }
                    ;
                    e(t)
                }
                ,
                t.jumpUpDown = function(t, e) {
                    var n = this;
                    n.upDownCache[t.id] = m.copy(n);
                    var s = n.upDownCache[e.id];
                    if (s)
                        s[1] ? n.insLeftOf(s[1]) : n.insAtRightEnd(s.parent);
                    else {
                        var r = n.offset().left;
                        e.seek(r, n)
                    }
                }
                ,
                t.offset = function() {
                    var t = this.jQ.removeClass("mq-cursor").offset();
                    return this.jQ.addClass("mq-cursor"),
                        t
                }
                ,
                t.unwrapGramp = function() {
                    var t = this.parent.parent
                        , e = t.parent
                        , n = t[1]
                        , s = t[f];
                    if (t.disown().eachChild((function(r) {
                            r.isEmpty() || (r.children().adopt(e, s, n).each((function(e) {
                                    e.jQ.insertBefore(t.jQ.first())
                                }
                            )),
                                s = r.ends[1])
                        }
                    )),
                        !this[1])
                        if (this[f])
                            this[1] = this[f][1];
                        else
                            for (; !this[1]; ) {
                                if (this.parent = this.parent[1],
                                    !this.parent) {
                                    this[1] = t[1],
                                        this.parent = e;
                                    break
                                }
                                this[1] = this.parent.ends[f]
                            }
                    this[1] ? this.insLeftOf(this[1]) : this.insAtRightEnd(e),
                        t.jQ.remove(),
                    t[f].siblingDeleted && t[f].siblingDeleted(this.options, 1),
                    t[1].siblingDeleted && t[1].siblingDeleted(this.options, f)
                }
                ,
                t.startSelection = function() {
                    for (var t = this.anticursor = m.copy(this), e = t.ancestors = {}, n = t; n.parent; n = n.parent)
                        e[n.parent.id] = n
                }
                ,
                t.endSelection = function() {
                    delete this.anticursor
                }
                ,
                t.select = function() {
                    var t = this.anticursor;
                    if (this[f] === t[f] && this.parent === t.parent)
                        return !1;
                    for (var e = this; e.parent; e = e.parent)
                        if (e.parent.id in t.ancestors) {
                            var n = e.parent;
                            break
                        }
                    var s, r, i = t.ancestors[n.id], a = 1;
                    if (e[f] !== i)
                        for (var o = e; o; o = o[1])
                            if (o[1] === i[1]) {
                                a = f,
                                    s = e,
                                    r = i;
                                break
                            }
                    return 1 === a && (s = i,
                        r = e),
                    s instanceof m && (s = s[1]),
                    r instanceof m && (r = r[f]),
                        this.hide().selection = n.selectChildren(s, r),
                    this.selection.ends[a] && this.insDirOf(a, this.selection.ends[a]),
                        this.selectionChanged(),
                        !0
                }
                ,
                t.clearSelection = function() {
                    return this.selection && (this.selection.clear(),
                        delete this.selection,
                        this.selectionChanged()),
                        this
                }
                ,
                t.deleteSelection = function() {
                    this.selection && (this[f] = this.selection.ends[f][f],
                        this[1] = this.selection.ends[1][1],
                        this.selection.remove(),
                        this.selectionChanged(),
                        delete this.selection)
                }
                ,
                t.replaceSelection = function() {
                    var t = this.selection;
                    return t && (this[f] = t.ends[f][f],
                        this[1] = t.ends[1][1],
                        delete this.selection),
                        t
                }
        }
    ))
        , y = p(q, (function(t, e) {
            t.init = function() {
                e.init.apply(this, arguments),
                    this.jQ = this.jQ.wrapAll('<span class="mq-selection"></span>').parent()
            }
                ,
                t.adopt = function() {
                    return this.jQ.replaceWith(this.jQ = this.jQ.children()),
                        e.adopt.apply(this, arguments)
                }
                ,
                t.clear = function() {
                    return this.jQ[0] && this.jQ.replaceWith(this.jQ[0].childNodes),
                        this
                }
                ,
                t.join = function(t) {
                    return this.fold("", (function(e, n) {
                            return e + n[t]()
                        }
                    ))
                }
        }
    ))
        , T = p((function(t) {
            t.init = function(t, e, n) {
                this.id = t.id,
                    this.data = {},
                    this.root = t,
                    this.container = e,
                    this.options = n,
                    t.controller = this,
                    this.cursor = t.cursor = x(t, n)
            }
                ,
                t.handle = function(t, e) {
                    var n = this.options.handlers;
                    if (n && n.fns[t]) {
                        var s = n.APIClasses[this.KIND_OF_MQ](this);
                        e === f || 1 === e ? n.fns[t](e, s) : n.fns[t](s)
                    }
                }
            ;
            var e = [];
            this.onNotify = function(t) {
                e.push(t)
            }
                ,
                t.notify = function() {
                    for (var t = 0; t < e.length; t += 1)
                        e[t].apply(this.cursor, arguments);
                    return this
                }
        }
    ))
        , k = {}
        , O = p()
        , S = {}
        , j = p()
        , Q = {};
    function C() {
        window.console && console.warn("You are using the MathQuill API without specifying an interface version, which will fail in v1.0.0. Easiest fix is to do the following before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\n")
    }
    function _(t) {
        return C(),
            It(t)
    }
    _.prototype = j.p,
        _.VERSION = "v0.10.1",
        _.interfaceVersion = function(t) {
            if (1 !== t)
                throw "Only interface version 1 supported. You specified: " + t;
            return (C = function() {
                    window.console && console.warn("You called MathQuill.interfaceVersion(1); to specify the interface version, which will fail in v1.0.0. You can fix this easily by doing this before doing anything else:\n\n    MathQuill = MathQuill.getInterface(1);\n    // now MathQuill.MathField() works like it used to\n\n")
                }
            )(),
                _
        }
        ,
        _.getInterface = L,
        _.isSelectedItalic = !0;
    var D = L.MIN = 1
        , E = L.MAX = 2;
    function L(t) {
        if (!(D <= t && t <= E))
            throw "Only interface versions between " + D + " and " + E + " supported. You specified: " + t;
        function n(t) {
            if (!t || !t.nodeType)
                return null;
            var e = d(t).children(".mq-root-block").attr(s)
                , n = e && v.byId[e].controller;
            return n ? r[n.KIND_OF_MQ](n) : null
        }
        var r = {};
        function i(t, e) {
            for (var n in e && e.handlers && (e.handlers = {
                fns: e.handlers,
                APIClasses: r
            }),
                e)
                if (e.hasOwnProperty(n)) {
                    var s = e[n]
                        , i = S[n];
                    t[n] = i ? i(s) : s
                }
        }
        n.L = f,
            n.R = 1,
            n.saneKeyboardEvents = B,
            n.config = function(t) {
                return i(O.p, t),
                    this
            }
            ,
            n.registerEmbed = function(t, e) {
                if (!/^[a-z][a-z0-9]*$/i.test(t))
                    throw "Embed name must start with letter and be only letters and digits";
                Q[t] = e
            }
        ;
        var o = r.AbstractMathQuill = p(j, (function(t) {
                t.init = function(t) {
                    this.__controller = t,
                        this.__options = t.options,
                        this.id = t.id,
                        this.data = t.data
                }
                    ,
                    t.__mathquillify = function(t) {
                        var e = this.__controller
                            , n = e.root
                            , r = e.container;
                        e.createTextarea();
                        var i = r.addClass(t).contents().detach();
                        n.jQ = d('<span class="mq-root-block"/>').attr(s, n.id).appendTo(r),
                            this.latex(i.text()),
                            this.revert = function() {
                                return r.empty().unbind(".mathquill").removeClass("mq-editable-field mq-math-mode mq-text-mode").append(i)
                            }
                    }
                    ,
                    t.config = function(t) {
                        return i(this.__options, t),
                            this
                    }
                    ,
                    t.el = function() {
                        return this.__controller.container[0]
                    }
                    ,
                    t.text = function() {
                        return this.__controller.exportText()
                    }
                    ,
                    t.latex = function(t) {
                        return arguments.length > 0 ? (this.__controller.renderLatexMath(t),
                        this.__controller.blurred && this.__controller.cursor.hide().parent.blur(),
                            this) : this.__controller.exportLatex()
                    }
                    ,
                    t.positionFix = function(t) {
                        if (this.__controller.textarea.focus(),
                        null != t && 0 != t)
                            for (var e = Math.abs(t), n = 0; n < e; n++)
                                t > 0 ? this.__controller.moveRight() : this.__controller.moveLeft()
                    }
                    ,
                    t.positionFiy = function(t) {
                        if (this.__controller.textarea.focus(),
                        null != t && 0 != t)
                            for (var e = Math.abs(t), n = 0; n < e; n++)
                                t > 0 ? this.__controller.moveUp() : this.__controller.moveDown()
                    }
                    ,
                    t.html = function() {
                        return this.__controller.root.jQ.html().replace(/ mathquill-(?:command|block)-id="?\d+"?/g, "").replace(/<span class="?mq-cursor( mq-blink)?"?>.?<\/span>/i, "").replace(/ mq-hasCursor|mq-hasCursor ?/, "").replace(/ class=(""|(?= |>))/g, "")
                    }
                    ,
                    t.reflow = function() {
                        return this.__controller.root.postOrder("reflow"),
                            this
                    }
            }
        ));
        for (var l in n.prototype = o.prototype,
            r.EditableField = p(o, (function(t, n) {
                    t.__mathquillify = function() {
                        return n.__mathquillify.apply(this, arguments),
                            this.__controller.editable = !0,
                            this.__controller.delegateMouseEvents(),
                            this.__controller.editablesTextareaEvents(),
                            this
                    }
                        ,
                        t.focus = function() {
                            return this.__controller.textarea.focus(),
                                this
                        }
                        ,
                        t.blur = function() {
                            return this.__controller.textarea.blur(),
                                this
                        }
                        ,
                        t.write = function(t) {
                            if (!(window.$currentJQ.hasClass("mq-text-mode") && t.length > 1))
                                return this.__controller.writeLatex(t),
                                    this.__controller.scrollHoriz(),
                                this.__controller.blurred && this.__controller.cursor.hide().parent.blur(),
                                    this
                        }
                        ,
                        t.empty = function() {
                            var t = this.__controller.root
                                , e = this.__controller.cursor;
                            return t.eachChild("postOrder", "dispose"),
                                t.ends[f] = t.ends[1] = 0,
                                t.jQ.empty(),
                                delete e.selection,
                                e.insAtRightEnd(t),
                                this
                        }
                        ,
                        t.cmd = function(t) {
                            var e = this.__controller.notify()
                                , n = e.cursor;
                            if (/^\\[a-z]+\{\}$/i.test(t)) {
                                t = t.slice(1);
                                var s = b[t];
                                s && (t = s(t),
                                n.selection && t.replaces(n.replaceSelection()),
                                    t.createLeftOf(n.show()),
                                    this.__controller.scrollHoriz())
                            } else
                                n.parent.write(n, t);
                            return e.blurred && n.hide().parent.blur(),
                                this
                        }
                        ,
                        t.select = function() {
                            var t = this.__controller;
                            for (t.notify("move").cursor.insAtRightEnd(t.root); t.cursor[f]; )
                                t.selectLeft();
                            return this
                        }
                        ,
                        t.clearSelection = function() {
                            return this.__controller.cursor.clearSelection(),
                                this
                        }
                        ,
                        t.moveToDirEnd = function(t) {
                            return this.__controller.notify("move").cursor.insAtDirEnd(t, this.__controller.root),
                                this
                        }
                        ,
                        t.moveToLeftEnd = function() {
                            return this.moveToDirEnd(f)
                        }
                        ,
                        t.moveToRightEnd = function() {
                            return this.moveToDirEnd(1)
                        }
                        ,
                        t.keystroke = function(t) {
                            t = t.replace(/^\s+|\s+$/g, "").split(/\s+/);
                            for (var e = 0; e < t.length; e += 1)
                                this.__controller.keystroke(t[e], {
                                    preventDefault: a
                                });
                            return this
                        }
                        ,
                        t.typedText = function(t) {
                            for (var e = 0; e < t.length; e += 1)
                                this.__controller.typedText(t.charAt(e));
                            return this
                        }
                        ,
                        t.dropEmbedded = function(t, e, n) {
                            var s = t - d(window).scrollLeft()
                                , r = e - d(window).scrollTop()
                                , i = document.elementFromPoint(s, r);
                            this.__controller.seek(d(i), t, e),
                                _t().setOptions(n).createLeftOf(this.__controller.cursor)
                        }
                        ,
                        t.clickAt = function(t, n, s) {
                            s = s || document.elementFromPoint(t, n);
                            var r = this.__controller
                                , i = r.root;
                            return e.contains(i.jQ[0], s) || (s = i.jQ[0]),
                                r.seek(d(s), t + pageXOffset, n + pageYOffset),
                            r.blurred && this.focus(),
                                this
                        }
                        ,
                        t.ignoreNextMousedown = function(t) {
                            return this.__controller.cursor.options.ignoreNextMousedown = t,
                                this
                        }
                }
            )),
            n.EditableField = function() {
                throw "wtf don't call me, I'm 'abstract'"
            }
            ,
            n.EditableField.prototype = r.EditableField.prototype,
            k)
            !function(e, s) {
                var i = r[e] = s(r);
                n[e] = function(s, r) {
                    var a = n(s);
                    if (a instanceof i || !s || !s.nodeType)
                        return a;
                    var o = T(i.RootBlock(), d(s), O());
                    return o.KIND_OF_MQ = e,
                        i(o).__mathquillify(r, t)
                }
                    ,
                    n[e].prototype = i.prototype
            }(l, k[l]);
        return n
    }
    _.noConflict = function() {
        return window.MathQuill = A,
            _
    }
    ;
    var A = window.MathQuill;
    function z(t) {
        for (var e = "moveOutOf deleteOutOf selectOutOf upOutOf downOutOf".split(" "), n = 0; n < e.length; n += 1)
            !function(e) {
                t[e] = function(t) {
                    this.controller.handle(e, t)
                }
            }(e[n]);
        t.reflow = function() {
            this.controller.handle("reflow"),
                this.controller.handle("edited"),
                this.controller.handle("edit")
        }
    }
    window.MathQuill = _;
    var I, R = p((function(t, e, n) {
            function s(t, e) {
                throw "Parse Error: " + e + " at " + (t = t ? "'" + t + "'" : "EOF")
            }
            t.init = function(t) {
                this._ = t
            }
                ,
                t.parse = function(t) {
                    return this.skip(a)._("" + t, (function(t, e) {
                            return e
                        }
                    ), s)
                }
                ,
                t.or = function(t) {
                    var e = this;
                    return n((function(n, s, r) {
                            return e._(n, s, (function(e) {
                                    return t._(n, s, r)
                                }
                            ))
                        }
                    ))
                }
                ,
                t.then = function(t) {
                    var e = this;
                    return n((function(s, r, i) {
                            return e._(s, (function(e, s) {
                                    var a = t instanceof n ? t : t(s);
                                    return a._(e, r, i)
                                }
                            ), i)
                        }
                    ))
                }
                ,
                t.many = function() {
                    var t = this;
                    return n((function(e, n, s) {
                            for (var r = []; t._(e, i, a); )
                                ;
                            return n(e, r);
                            function i(t, n) {
                                return e = t,
                                    r.push(n),
                                    !0
                            }
                            function a() {
                                return !1
                            }
                        }
                    ))
                }
                ,
                t.times = function(t, e) {
                    arguments.length < 2 && (e = t);
                    var s = this;
                    return n((function(n, r, i) {
                            for (var a, o = [], l = !0, c = 0; c < t; c += 1)
                                if (!(l = s._(n, u, h)))
                                    return i(n, a);
                            for (; c < e && l; c += 1)
                                l = s._(n, u, p);
                            return r(n, o);
                            function u(t, e) {
                                return o.push(e),
                                    n = t,
                                    !0
                            }
                            function h(t, e) {
                                return a = e,
                                    n = t,
                                    !1
                            }
                            function p(t, e) {
                                return !1
                            }
                        }
                    ))
                }
                ,
                t.result = function(t) {
                    return this.then(i(t))
                }
                ,
                t.atMost = function(t) {
                    return this.times(0, t)
                }
                ,
                t.atLeast = function(t) {
                    var e = this;
                    return e.times(t).then((function(t) {
                            return e.many().map((function(e) {
                                    return t.concat(e)
                                }
                            ))
                        }
                    ))
                }
                ,
                t.map = function(t) {
                    return this.then((function(e) {
                            return i(t(e))
                        }
                    ))
                }
                ,
                t.skip = function(t) {
                    return this.then((function(e) {
                            return t.result(e)
                        }
                    ))
                }
            ;
            this.string = function(t) {
                var e = t.length
                    , s = "expected '" + t + "'";
                return n((function(n, r, i) {
                        var a = n.slice(0, e);
                        return a === t ? r(n.slice(e), a) : i(n, s)
                    }
                ))
            }
            ;
            var r = this.regex = function(t) {
                t.toString().charAt(1);
                var e = "expected " + t;
                return n((function(n, s, r) {
                        var i = t.exec(n);
                        if (i) {
                            var a = i[0];
                            return s(n.slice(a.length), a)
                        }
                        return r(n, e)
                    }
                ))
            }
                , i = n.succeed = function(t) {
                return n((function(e, n) {
                        return n(e, t)
                    }
                ))
            }
                , a = (n.fail = function(t) {
                return n((function(e, n, s) {
                        return s(e, t)
                    }
                ))
            }
                ,
                n.letter = r(/^[a-z]/i),
                n.letters = r(/^[a-z]*/i),
                n.digit = r(/^[0-9]/),
                n.digits = r(/^[0-9]*/),
                n.whitespace = r(/^\s+/),
                n.optWhitespace = r(/^\s*/),
                n.any = n((function(t, e, n) {
                        return t ? e(t.slice(1), t.charAt(0)) : n(t, "expected any character")
                    }
                )),
                n.all = n((function(t, e, n) {
                        return e("", t)
                    }
                )),
                n.eof = n((function(t, e, n) {
                        return t ? n(t, "expected EOF") : e(t, t)
                    }
                )))
        }
    )), B = (I = {
            8: "Backspace",
            9: "Tab",
            10: "Enter",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            20: "CapsLock",
            27: "Esc",
            32: "Spacebar",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            45: "Insert",
            46: "Del",
            144: "NumLock"
        },
            function(t, n) {
                var s, r = null, i = null, o = e(t), l = e(n.container || o), c = a;
                function u(t) {
                    c = t,
                        clearTimeout(s),
                        s = setTimeout(t)
                }
                function h(t) {
                    u((function(e) {
                            c = a,
                                clearTimeout(s),
                                t(e)
                        }
                    ))
                }
                l.bind("keydown keypress input keyup focusout paste", (function(t) {
                        c(t)
                    }
                ));
                var p = !1;
                function f() {
                    n.keystroke(function(t) {
                        var e, n = t.which || t.keyCode, s = I[n], r = [];
                        return t.ctrlKey && r.push("Ctrl"),
                        t.originalEvent && t.originalEvent.metaKey && r.push("Meta"),
                        t.altKey && r.push("Alt"),
                        t.shiftKey && r.push("Shift"),
                            e = s || String.fromCharCode(n),
                            r.length || s ? (r.push(e),
                                r.join("-")) : e
                    }(r), r)
                }
                function d() {
                    var t;
                    if ((!("selectionStart"in (t = o[0])) || t.selectionStart === t.selectionEnd) && !isPinYin) {
                        var e = o.val();
                        window.$currentJQ.hasClass("mq-text-mode") && e.match(/[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u007e｜\\]+/g) ? o.val("") : e.length > 1 ? (o.val(""),
                            n.paste(e)) : 1 === e.length ? (o.val(""),
                            n.typedText(e)) : e && o[0].select && o[0].select();
                        var s = n.notify().cursor.parent;
                        s.isEmpty() ? s.jQ.addClass("mq-outLine") : s.jQ.removeClass("mq-outLine")
                    }
                }
                function m() {
                    var t = o.val();
                    o.val(""),
                    t && n.paste(t)
                }
                return u(d),
                    l.bind({
                        keydown: function(t) {
                            r = t,
                                i = null,
                            p && h((function(t) {
                                    t && "focusout" === t.type || !o[0].select || o[0].select()
                                }
                            )),
                                f()
                        },
                        keypress: function(t) {
                            r && i && f(),
                                i = t,
                                u(d)
                        },
                        keyup: function(t) {
                            r && !i && u(d)
                        },
                        focusout: function() {
                            r = i = null
                        },
                        compositionstart: function(t) {
                            isPinYin = !0
                        },
                        compositionend: function(t) {
                            var e = o.val() || t.originalEvent.data;
                            const s = window.$currentJQ.hasClass("mq-text-mode");
                            o.val(""),
                            !s && n.paste(e),
                                isPinYin = !1
                        },
                        cut: function() {
                            h((function() {
                                    n.cut()
                                }
                            ))
                        },
                        copy: function() {
                            h((function() {
                                    n.copy()
                                }
                            ))
                        },
                        paste: function(t) {
                            o.focus(),
                                u(m)
                        }
                    }),
                    {
                        select: function(t) {
                            c(),
                                c = a,
                                clearTimeout(s),
                                o.val(t),
                            t && o[0].select && o[0].select(),
                                p = !!t
                        }
                    }
            }
    );
    T.open((function(t, e) {
            t.exportText = function() {
                return this.root.foldChildren("", (function(t, e) {
                        return t + e.text()
                    }
                ))
            }
        }
    )),
        T.open((function(t) {
                t.focusBlurEvents = function() {
                    var t, e = this, n = e.root, s = e.cursor;
                    function r() {
                        clearTimeout(t),
                        s.selection && s.selection.jQ.addClass("mq-blur"),
                            i()
                    }
                    function i() {
                        s.hide().parent.blur(),
                            e.container.removeClass("mq-focused"),
                            d(window).unbind("blur", r)
                    }
                    e.textarea.focus((function() {
                            e.blurred = !1,
                                clearTimeout(t),
                                e.container.addClass("mq-focused"),
                            s.parent || s.insAtRightEnd(n),
                                s.selection ? (s.selection.jQ.removeClass("mq-blur"),
                                    e.selectionChanged()) : s.show()
                        }
                    )).blur((function() {
                            e.blurred = !0,
                                t = setTimeout((function() {
                                        n.postOrder("intentionalBlur"),
                                            i()
                                    }
                                )),
                                d(window).bind("blur", r)
                        }
                    )),
                        e.blurred = !0,
                        s.hide().parent.blur()
                }
            }
        )),
        T.open((function(t) {
                t.keystroke = function(t, e) {
                    this.cursor.parent.keystroke(t, e, this)
                }
            }
        )),
        v.open((function(t) {
                t.keystroke = function(t, e, n) {
                    var s = n.cursor;
                    switch (t) {
                        case "Ctrl-Shift-Backspace":
                        case "Ctrl-Backspace":
                            n.ctrlDeleteDir(f);
                            break;
                        case "Shift-Backspace":
                        case "Backspace":
                            n.backspace();
                            break;
                        case "Esc":
                        case "Tab":
                            return void n.escapeDir(1, t, e);
                        case "Shift-Tab":
                        case "Shift-Esc":
                            return void n.escapeDir(f, t, e);
                        case "End":
                            n.notify("move").cursor.insAtRightEnd(s.parent);
                            break;
                        case "Ctrl-End":
                            n.notify("move").cursor.insAtRightEnd(n.root);
                            break;
                        case "Shift-End":
                            for (; s[1]; )
                                n.selectRight();
                            break;
                        case "Ctrl-Shift-End":
                            for (; s[1] || s.parent !== n.root; )
                                n.selectRight();
                            break;
                        case "Home":
                            n.notify("move").cursor.insAtLeftEnd(s.parent);
                            break;
                        case "Ctrl-Home":
                            n.notify("move").cursor.insAtLeftEnd(n.root);
                            break;
                        case "Shift-Home":
                            for (; s[f]; )
                                n.selectLeft();
                            break;
                        case "Ctrl-Shift-Home":
                            for (; s[f] || s.parent !== n.root; )
                                n.selectLeft();
                            break;
                        case "Left":
                            n.moveLeft();
                            break;
                        case "Shift-Left":
                            n.selectLeft();
                            break;
                        case "Ctrl-Left":
                            break;
                        case "Right":
                            n.moveRight();
                            break;
                        case "Shift-Right":
                            n.selectRight();
                            break;
                        case "Ctrl-Right":
                            break;
                        case "Up":
                            n.moveUp();
                            break;
                        case "Down":
                            n.moveDown();
                            break;
                        case "Shift-Up":
                            if (s[f])
                                for (; s[f]; )
                                    n.selectLeft();
                            else
                                n.selectLeft();
                        case "Shift-Down":
                            if (s[1])
                                for (; s[1]; )
                                    n.selectRight();
                            else
                                n.selectRight();
                        case "Ctrl-Up":
                        case "Ctrl-Down":
                            break;
                        case "Ctrl-Shift-Del":
                        case "Ctrl-Del":
                            n.ctrlDeleteDir(1);
                            break;
                        case "Shift-Del":
                        case "Del":
                            n.deleteForward();
                            break;
                        case "Meta-A":
                        case "Ctrl-A":
                            for (n.notify("move").cursor.insAtRightEnd(n.root); s[f]; )
                                n.selectLeft();
                            break;
                        default:
                            return
                    }
                    e.preventDefault(),
                        n.scrollHoriz()
                }
                    ,
                    t.moveOutOf = t.moveTowards = t.deleteOutOf = t.deleteTowards = t.unselectInto = t.selectOutOf = t.selectTowards = function() {}
            }
        )),
        T.open((function(t) {
                function e(t, e) {
                    var n = t.notify("upDown").cursor
                        , s = e + "Into"
                        , r = e + "OutOf";
                    return n[1][s] ? n.insAtLeftEnd(n[1][s]) : n[f][s] ? n.insAtRightEnd(n[f][s]) : n.parent.bubble((function(t) {
                            var e = t[r];
                            if (e && ("function" == typeof e && (e = t[r](n)),
                            e instanceof v && n.jumpUpDown(t, e),
                            !0 !== e))
                                return !1
                        }
                    )),
                        t
                }
                this.onNotify((function(t) {
                        "move" !== t && "upDown" !== t || this.show().clearSelection()
                    }
                )),
                    t.escapeDir = function(t, e, n) {
                        var s = this.cursor;
                        if (s.parent !== this.root && n.preventDefault(),
                        s.parent !== this.root)
                            return s.parent.moveOutOf(t, s),
                                this.notify("move")
                    }
                    ,
                    S.leftRightIntoCmdGoes = function(t) {
                        if (t && "up" !== t && "down" !== t)
                            throw '"up" or "down" required for leftRightIntoCmdGoes option, got "' + t + '"';
                        return t
                    }
                    ,
                    t.moveDir = function(t) {
                        var e = this.cursor
                            , n = e.options.leftRightIntoCmdGoes;
                        return e.selection ? e.insDirOf(t, e.selection.ends[t]) : e[t] ? e[t].moveTowards(t, e, n) : e.parent.moveOutOf(t, e, n),
                            this.notify("move")
                    }
                    ,
                    t.moveLeft = function() {
                        return this.moveDir(f)
                    }
                    ,
                    t.moveRight = function() {
                        return this.moveDir(1)
                    }
                    ,
                    t.moveUp = function() {
                        return e(this, "up")
                    }
                    ,
                    t.moveDown = function() {
                        return e(this, "down")
                    }
                    ,
                    this.onNotify((function(t) {
                            "upDown" !== t && (this.upDownCache = {})
                        }
                    )),
                    this.onNotify((function(t) {
                            "edit" === t && this.show().deleteSelection()
                        }
                    )),
                    t.deleteDir = function(t) {
                        var e = this.cursor
                            , n = e.selection;
                        return this.notify("edit"),
                        n || (e[t] ? e[t].deleteTowards(t, e) : e.parent.deleteOutOf(t, e)),
                        e[f].siblingDeleted && e[f].siblingDeleted(e.options, 1),
                        e[1].siblingDeleted && e[1].siblingDeleted(e.options, f),
                            e.parent.bubble("reflow"),
                            this
                    }
                    ,
                    t.ctrlDeleteDir = function(t) {
                        var e = this.cursor;
                        return !e[t] || e.selection ? this.deleteDir(t) : (this.notify("edit"),
                            t === f ? q(e.parent.ends[f], e[f]).remove() : q(e[1], e.parent.ends[1]).remove(),
                            e.insAtDirEnd(t, e.parent),
                        e[f].siblingDeleted && e[f].siblingDeleted(e.options, 1),
                        e[1].siblingDeleted && e[1].siblingDeleted(e.options, f),
                            e.parent.bubble("reflow"),
                            this)
                    }
                    ,
                    t.backspace = function() {
                        return this.deleteDir(f)
                    }
                    ,
                    t.deleteForward = function() {
                        return this.deleteDir(1)
                    }
                    ,
                    this.onNotify((function(t) {
                            "select" !== t && this.endSelection()
                        }
                    )),
                    t.selectDir = function(t) {
                        var e = this.notify("select").cursor
                            , n = e.selection;
                        e.anticursor || e.startSelection();
                        var s = e[t];
                        s ? n && n.ends[t] === s && e.anticursor[-t] !== s ? s.unselectInto(t, e) : s.selectTowards(t, e) : e.parent.selectOutOf(t, e),
                            e.clearSelection(),
                        e.select() || e.show()
                    }
                    ,
                    t.selectLeft = function() {
                        return this.selectDir(f)
                    }
                    ,
                    t.selectRight = function() {
                        return this.selectDir(1)
                    }
            }
        ));
    var M = function() {
        function t(t) {
            for (var e = t[0] || U(), n = 1; n < t.length; n += 1)
                t[n].children().adopt(e, e.ends[1], 0);
            return e
        }
        var e = R.string
            , n = R.regex
            , s = R.letter
            , r = R.any
            , i = R.optWhitespace
            , a = R.succeed
            , o = R.fail
            , l = s.map((function(t) {
                return tt(t)
            }
        ))
            , c = n(/^[^${}\\_^]/).map((function(t) {
                return N(t)
            }
        ))
            , u = n(/^[^\\a-eg-zA-Z]/).or(e("\\").then(n(/^[a-z]+/i).or(n(/^\s+/).result(" ")).or(r))).then((function(t) {
                var e = b[t];
                return e ? e(t).parser() : o("unknown command: \\" + t)
            }
        )).or(l).or(c)
            , h = e("{").then((function() {
                return f
            }
        )).skip(e("}"))
            , p = i.then(h.or(u.map((function(t) {
                var e = U();
                return t.adopt(e, 0, 0),
                    e
            }
        ))))
            , f = p.many().map(t).skip(i)
            , d = e("[").then(p.then((function(t) {
                return "]" !== t.join("latex") ? a(t) : o()
            }
        )).many().map(t).skip(i)).skip(e("]"))
            , m = f;
        return m.block = p,
            m.optBlock = d,
            m
    }();
    T.open((function(t, e) {
            t.exportLatex = function() {
                return this.root.latex().replace(/(\\[a-z]+) (?![a-z])/gi, "$1")
            }
                ,
                t.writeLatex = function(t) {
                    var e = this.notify("edit").cursor
                        , n = R.all
                        , s = R.eof
                        , r = M.skip(s).or(n.result(!1)).parse(t);
                    r && !r.isEmpty() && (r.children().adopt(e.parent, e[f], e[1]),
                        r.jQize().insertBefore(e.jQ),
                        e[f] = r.ends[1],
                        r.finalizeInsert(e.options, e),
                    r.ends[1][1].siblingCreated && r.ends[1][1].siblingCreated(e.options, f),
                    r.ends[f][f].siblingCreated && r.ends[f][f].siblingCreated(e.options, 1),
                        e.parent.bubble("reflow"));
                    return this
                }
                ,
                t.renderLatexMath = function(t) {
                    var e = this.root
                        , n = this.cursor
                        , s = R.all
                        , r = R.eof
                        , i = M.skip(r).or(s.result(!1)).parse(t);
                    e.eachChild("postOrder", "dispose"),
                        e.ends[f] = e.ends[1] = 0,
                    i && i.children().adopt(e, 0, 0);
                    var a = e.jQ;
                    if (i) {
                        var o = i.join("html");
                        a.html(o),
                            e.jQize(a.children()),
                            e.finalizeInsert(n.options)
                    } else
                        a.empty();
                    delete n.selection,
                        n.insAtRightEnd(e)
                }
                ,
                t.renderLatexText = function(t) {
                    var e = this.root
                        , n = this.cursor;
                    e.jQ.children().slice(1).remove(),
                        e.eachChild("postOrder", "dispose"),
                        e.ends[f] = e.ends[1] = 0,
                        delete n.selection,
                        n.show().insAtRightEnd(e);
                    var s = R.regex
                        , r = R.string
                        , i = R.eof
                        , a = R.all
                        , o = r("$").then(M).skip(r("$").or(i)).map((function(t) {
                            var e = G(n);
                            e.createBlocks();
                            var s = e.ends[f];
                            return t.children().adopt(s, 0, 0),
                                e
                        }
                    ))
                        , l = r("\\$").result("$").or(s(/^[^$]/)).map(N)
                        , c = o.or(l).many().skip(i).or(a.result(!1)).parse(t);
                    if (c) {
                        for (var u = 0; u < c.length; u += 1)
                            c[u].adopt(e, e.ends[1], 0);
                        e.jQize().appendTo(e.jQ),
                            e.finalizeInsert(n.options)
                    }
                }
        }
    )),
        T.open((function(e) {
                O.p.ignoreNextMousedown = a,
                    e.delegateMouseEvents = function() {
                        var e = this.root.jQ;
                        this.container.bind("mousedown.mathquill", (function(n) {
                                var r, i = d(n.target).closest(".mq-root-block"), o = v.byId[i.attr(s) || e.attr(s)].controller, l = o.cursor, c = l.blink, u = o.textareaSpan, h = o.textarea;
                                (n.preventDefault(),
                                    n.target.unselectable = !0,
                                    l.options.ignoreNextMousedown(n)) || (l.options.ignoreNextMousedown = a,
                                o.blurred && (o.editable || i.prepend(u),
                                    h.focus()),
                                    l.blink = a,
                                    o.seek(d(n.target), n.pageX, n.pageY).cursor.startSelection(),
                                    i.mousemove(p),
                                    d(n.target.ownerDocument).mousemove(f).mouseup((function t(e) {
                                            l.blink = c,
                                            l.selection || (o.editable ? l.show() : u.detach()),
                                                i.unbind("mousemove", p),
                                                d(e.target.ownerDocument).unbind("mousemove", f).unbind("mouseup", t)
                                        }
                                    )));
                                function p(t) {
                                    r = d(t.target)
                                }
                                function f(e) {
                                    l.anticursor || l.startSelection(),
                                        o.seek(r, e.pageX, e.pageY).cursor.select(),
                                        r = t
                                }
                            }
                        ))
                    }
            }
        )),
        T.open((function(t) {
                t.seek = function(t, e, r) {
                    var i = this.notify("select").cursor;
                    if (t) {
                        var a = t.attr(s) || t.attr(n);
                        if (!a) {
                            var o = t.parent();
                            a = o.attr(s) || o.attr(n)
                        }
                    }
                    var l = a ? v.byId[a] : this.root;
                    return i.clearSelection().show(),
                        l.seek(e, i),
                        this.scrollHoriz(),
                        this
                }
            }
        )),
        T.open((function(t) {
                t.scrollHoriz = function() {
                    var t = this.cursor
                        , e = t.selection
                        , n = this.root.jQ[0].getBoundingClientRect();
                    if (e) {
                        var s = e.jQ[0].getBoundingClientRect()
                            , r = s.left - (n.left + 20)
                            , i = s.right - (n.right - 20);
                        if (e.ends[f] === t[1])
                            if (r < 0)
                                o = r;
                            else {
                                if (!(i > 0))
                                    return;
                                if (s.left - i < n.left + 20)
                                    o = r;
                                else
                                    o = i
                            }
                        else if (i > 0)
                            o = i;
                        else {
                            if (!(r < 0))
                                return;
                            if (s.right - r > n.right - 20)
                                o = i;
                            else
                                o = r
                        }
                    } else {
                        var a = t.jQ[0].getBoundingClientRect().left;
                        if (a > n.right - 20)
                            var o = a - (n.right - 20);
                        else {
                            if (!(a < n.left + 20))
                                return;
                            var o = a - (n.left + 20)
                        }
                    }
                    this.root.jQ.stop().animate({
                        scrollLeft: "+=" + o
                    }, 100)
                }
            }
        )),
        T.open((function(n) {
                O.p.substituteTextarea = function() {
                    return d("<textarea autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true />")[0]
                }
                    ,
                    n.createTextarea = function() {
                        var t = this.textareaSpan = d('<span class="mq-textarea"></span>')
                            , e = this.options.substituteTextarea();
                        if (!e.nodeType)
                            throw "substituteTextarea() must return a DOM element, got " + e;
                        e = this.textarea = d(e).appendTo(t);
                        var n = this;
                        n.cursor.selectionChanged = function() {
                            n.selectionChanged()
                        }
                    }
                    ,
                    n.selectionChanged = function() {
                        var e = this;
                        ft(e.container[0]),
                        e.textareaSelectionTimeout === t && (e.textareaSelectionTimeout = setTimeout((function() {
                                e.setTextareaSelection()
                            }
                        ))),
                            e.handle("select")
                    }
                    ,
                    n.setTextareaSelection = function() {
                        this.textareaSelectionTimeout = t;
                        var e = "";
                        this.cursor.selection && (e = this.cursor.selection.join("latex"),
                        this.options.statelessClipboard && (e = "$" + e + "$")),
                            this.selectFn(e)
                    }
                    ,
                    n.staticMathTextareaEvents = function() {
                        var t = this
                            , n = (t.root,
                            t.cursor)
                            , s = t.textarea
                            , r = t.textareaSpan;
                        function i() {
                            r.detach(),
                                t.blurred = !0
                        }
                        this.container.prepend(e('<span class="mq-selectable">').text("$" + t.exportLatex() + "$")),
                            t.blurred = !0,
                            s.bind("cut paste", !1).bind("copy", (function() {
                                    t.setTextareaSelection()
                                }
                            )).focus((function() {
                                    t.blurred = !1
                                }
                            )).blur((function() {
                                    n.selection && n.selection.clear(),
                                        setTimeout(i)
                                }
                            )),
                            t.selectFn = function(t) {
                                s.val(t),
                                t && s.select()
                            }
                    }
                    ,
                    O.p.substituteKeyboardEvents = B,
                    n.editablesTextareaEvents = function() {
                        var t = this.textarea
                            , e = this.textareaSpan
                            , n = this.options.substituteKeyboardEvents(t, this);
                        this.selectFn = function(t) {
                            n.select(t)
                        }
                            ,
                            this.container.prepend(e),
                            this.focusBlurEvents()
                    }
                    ,
                    n.typedText = function(t) {
                        if ("\n" === t)
                            return this.handle("enter");
                        var e = this.notify().cursor;
                        e.parent.write(e, t),
                        !e[1] && e.parent.jQ.hasClass("overfrown") && e.parent.jQ.children("[mathquill-command-id]").length >= 3 && this.moveRight(),
                            this.scrollHoriz()
                    }
                    ,
                    n.cut = function() {
                        var t = this
                            , e = t.cursor;
                        e.selection && setTimeout((function() {
                                t.notify("edit"),
                                    e.parent.bubble("reflow")
                            }
                        ))
                    }
                    ,
                    n.copy = function() {
                        this.setTextareaSelection()
                    }
                    ,
                    n.paste = function(t) {
                        this.options.statelessClipboard && (t = "$" === t.slice(0, 1) && "$" === t.slice(-1) ? t.slice(1, -1) : "\\text{" + t + "}");
                        var e = this.notify("edit").cursor;
                        -1 == d(e.parent.jQ[0])[0].className.indexOf("mq-text-mode") && this.writeLatex(t).cursor.show()
                    }
            }
        ));
    var F = p(v, (function(t, e) {
            t.finalizeInsert = function(t, e) {
                var n = this;
                n.postOrder("finalizeTree", t),
                    n.postOrder("contactWeld", e),
                    n.postOrder("blur"),
                    n.postOrder("reflow"),
                n[1].siblingCreated && n[1].siblingCreated(t, f),
                n[f].siblingCreated && n[f].siblingCreated(t, 1),
                    n.bubble("reflow")
            }
        }
    ))
        , $ = p(F, (function(t, e) {
            t.init = function(t, n, s) {
                var r = this;
                e.init.call(r),
                r.ctrlSeq || (r.ctrlSeq = t),
                n && (r.htmlTemplate = n),
                s && (r.textTemplate = s)
            }
                ,
                t.replaces = function(t) {
                    t.disown(),
                        this.replacedFragment = t
                }
                ,
                t.isEmpty = function() {
                    return this.foldChildren(!0, (function(t, e) {
                            return t && e.isEmpty()
                        }
                    ))
                }
                ,
                t.parser = function() {
                    var t = M.block
                        , e = this;
                    return t.times(e.numBlocks()).map((function(t) {
                            e.blocks = t;
                            for (var n = 0; n < t.length; n += 1)
                                t[n].adopt(e, e.ends[1], 0);
                            return e
                        }
                    ))
                }
                ,
                t.createLeftOf = function(t) {
                    var n = this
                        , s = n.replacedFragment;
                    n.createBlocks(),
                        e.createLeftOf.call(n, t),
                    s && (s.adopt(n.ends[f], 0, 0),
                        s.jQ.appendTo(n.ends[f].jQ)),
                        n.finalizeInsert(t.options),
                        n.placeCursor(t)
                }
                ,
                t.createBlocks = function() {
                    for (var t = this, e = t.numBlocks(), n = t.blocks = Array(e), s = 0; s < e; s += 1) {
                        (n[s] = U()).adopt(t, t.ends[1], 0)
                    }
                }
                ,
                t.placeCursor = function(t) {
                    t.insAtRightEnd(this.foldChildren(this.ends[f], (function(t, e) {
                            return t.isEmpty() ? t : e
                        }
                    )))
                }
                ,
                t.moveTowards = function(t, e, n) {
                    var s = n && this[n + "Into"];
                    e.insAtDirEnd(-t, s || this.ends[-t])
                }
                ,
                t.deleteTowards = function(t, e) {
                    this.isEmpty() ? e[t] = this.remove()[t] : this.moveTowards(t, e, null)
                }
                ,
                t.selectTowards = function(t, e) {
                    e[-t] = this,
                        e[t] = this[t]
                }
                ,
                t.selectChildren = function() {
                    return y(this, this)
                }
                ,
                t.unselectInto = function(t, e) {
                    e.insAtDirEnd(-t, e.anticursor.ancestors[this.id])
                }
                ,
                t.seek = function(t, e) {
                    function n(t) {
                        var e = {};
                        return e[f] = t.jQ.offset().left,
                            e[1] = e[f] + t.jQ.outerWidth(),
                            e
                    }
                    var s = this
                        , r = n(s);
                    if (t < r[f])
                        return e.insLeftOf(s);
                    if (t > r[1])
                        return e.insRightOf(s);
                    var i = r[f];
                    s.eachChild((function(a) {
                            var o = n(a);
                            return t < o[f] ? (t - i < o[f] - t ? a[f] ? e.insAtRightEnd(a[f]) : e.insLeftOf(s) : e.insAtLeftEnd(a),
                                !1) : t > o[1] ? void (a[1] ? i = o[1] : r[1] - t < t - o[1] ? e.insRightOf(s) : e.insAtRightEnd(a)) : (a.seek(t, e),
                                !1)
                        }
                    ))
                }
                ,
                t.numBlocks = function() {
                    var t = this.htmlTemplate.match(/&\d+/g);
                    return t ? t.length : 0
                }
                ,
                t.html = function() {
                    var t = this
                        , e = t.blocks
                        , n = " mathquill-command-id=" + t.id
                        , s = t.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);
                    s.join(""),
                        this.htmlTemplate;
                    for (var r = 0, i = s[0]; i; i = s[r += 1])
                        if ("/>" === i.slice(-2))
                            s[r] = i.slice(0, -2) + n + "/>";
                        else if ("<" === i.charAt(0)) {
                            i.charAt(1),
                                s[r] = i.slice(0, -1) + n + ">";
                            var a = 1;
                            do {
                                "</" === (i = s[r += 1]).slice(0, 2) ? a -= 1 : "<" === i.charAt(0) && "/>" !== i.slice(-2) && (a += 1)
                            } while (a > 0)
                        }
                    return s.join("").replace(/>&(\d+)/g, (function(t, n) {
                            return " mathquill-block-id=" + e[n].id + ">" + e[n].join("html")
                        }
                    ))
                }
                ,
                t.latex = function() {
                    return this.foldChildren(this.ctrlSeq, (function(t, e) {
                            return t + "{" + (e.latex() || " ") + "}"
                        }
                    ))
                }
                ,
                t.textTemplate = [""],
                t.text = function() {
                    var t = this
                        , e = 0;
                    return t.foldChildren(t.textTemplate[e], (function(n, s) {
                            e += 1;
                            var r = s.text();
                            return n && "(" === t.textTemplate[e] && "(" === r[0] && ")" === r.slice(-1) ? n + r.slice(1, -1) + t.textTemplate[e] : n + s.text() + (t.textTemplate[e] || "")
                        }
                    ))
                }
        }
    ))
        , P = p($, (function(t, e) {
            t.init = function(t, n, s) {
                s || (s = t && t.length > 1 ? t.slice(1) : t),
                    e.init.call(this, t, n, [s])
            }
                ,
                t.parser = function() {
                    return R.succeed(this)
                }
                ,
                t.numBlocks = function() {
                    return 0
                }
                ,
                t.replaces = function(t) {
                    t.remove()
                }
                ,
                t.createBlocks = a,
                t.moveTowards = function(t, e) {
                    e.jQ.insDirOf(t, this.jQ),
                        e[-t] = this,
                        e[t] = this[t]
                }
                ,
                t.deleteTowards = function(t, e) {
                    e[t] = this.remove()[t]
                }
                ,
                t.seek = function(t, e) {
                    t - this.jQ.offset().left < this.jQ.outerWidth() / 2 ? e.insLeftOf(this) : e.insRightOf(this)
                }
                ,
                t.latex = function() {
                    return this.ctrlSeq
                }
                ,
                t.text = function() {
                    return this.textTemplate
                }
                ,
                t.placeCursor = a,
                t.isEmpty = function() {
                    return !0
                }
        }
    ))
        , N = p(P, (function(t, e) {
            t.init = function(t, n) {
                e.init.call(this, t, "<span>" + (n || t) + "</span>")
            }
        }
    ))
        , W = p(P, (function(t, e) {
            t.init = function(t, n, s) {
                e.init.call(this, t, '<span class="mq-binary-operator">' + n + "</span>", s)
            }
        }
    ))
        , U = p(F, (function(t, e) {
            t.join = function(t) {
                return this.foldChildren("", (function(e, n) {
                        return e.indexOf("\\lbrace ") >= 0 && (e = e.replace(/\\lbrace /g, "\\begin{cases}")),
                        e + n[t]()
                    }
                ))
            }
                ,
                t.html = function() {
                    return this.join("html")
                }
                ,
                t.latex = function() {
                    return this.join("latex")
                }
                ,
                t.text = function() {
                    return this.ends[f] === this.ends[1] && 0 !== this.ends[f] ? this.ends[f].text() : this.join("text")
                }
                ,
                t.keystroke = function(t, n, s) {
                    return !s.options.spaceBehavesLikeTab || "Spacebar" !== t && "Shift-Spacebar" !== t ? e.keystroke.apply(this, arguments) : (n.preventDefault(),
                        void s.escapeDir("Shift-Spacebar" === t ? f : 1, t, n))
                }
                ,
                t.moveOutOf = function(t, e, n) {
                    !(n && this.parent[n + "Into"]) && this[t] ? e.insAtDirEnd(-t, this[t]) : e.insDirOf(t, this.parent)
                }
                ,
                t.selectOutOf = function(t, e) {
                    e.insDirOf(t, this.parent)
                }
                ,
                t.deleteOutOf = function(t, e) {
                    e.unwrapGramp()
                }
                ,
                t.seek = function(t, e) {
                    var n = this.ends[1];
                    if (!n || n.jQ.offset().left + n.jQ.outerWidth() < t)
                        return e.insAtRightEnd(this);
                    if (t < this.ends[f].jQ.offset().left)
                        return e.insAtLeftEnd(this);
                    for (; t < n.jQ.offset().left; )
                        n = n[f];
                    return n.seek(t, e)
                }
                ,
                t.chToCmd = function(t, e) {
                    var n;
                    return t.match(/^[a-zA-Z]$/) ? tt(t) : /^\d$/.test(t) ? J(t) : e && e.typingSlashWritesDivisionSymbol && "/" === t ? b["÷"](t) : e && e.typingAsteriskWritesTimesSymbol && "*" === t ? b["×"](t) : (n = w[t] || b[t]) ? n(t) : N(t)
                }
                ,
                t.write = function(t, e) {
                    var n = this.chToCmd(e, t.options);
                    t.selection && n.replaces(t.replaceSelection()),
                        n.createLeftOf(t.show())
                }
                ,
                t.focus = function() {
                    return window.$currentJQ = this.jQ,
                        this.jQ.addClass("mq-hasCursor"),
                        this.jQ.removeClass("mq-empty"),
                    this.isEmpty() && this.jQ.addClass("mq-outLine"),
                        this
                }
                ,
                t.blur = function() {
                    return this.jQ.removeClass("mq-hasCursor"),
                        this.jQ.removeClass("mq-outLine"),
                    this.isEmpty() && this.jQ.addClass("mq-empty"),
                        this
                }
        }
    ));
    k.StaticMath = function(t) {
        return p(t.AbstractMathQuill, (function(e, n) {
                this.RootBlock = U,
                    e.__mathquillify = function(t, e) {
                        return this.config(t),
                            n.__mathquillify.call(this, "mq-math-mode"),
                            this.__controller.delegateMouseEvents(),
                            this.__controller.staticMathTextareaEvents(),
                            this
                    }
                    ,
                    e.init = function() {
                        n.init.apply(this, arguments),
                            this.__controller.root.postOrder("registerInnerField", this.innerFields = [], t.MathField)
                    }
                    ,
                    e.latex = function() {
                        var e = n.latex.apply(this, arguments);
                        return arguments.length > 0 && this.__controller.root.postOrder("registerInnerField", this.innerFields = [], t.MathField),
                            e
                    }
            }
        ))
    }
    ;
    var H = p(U, z);
    k.MathField = function(t) {
        return p(t.EditableField, (function(t, e) {
                this.RootBlock = H,
                    t.__mathquillify = function(t, n) {
                        return this.config(t),
                        n > 1 && (this.__controller.root.reflow = a),
                            e.__mathquillify.call(this, "mq-editable-field mq-math-mode"),
                            delete this.__controller.root.reflow,
                            this
                    }
            }
        ))
    }
    ;
    var V = p(v, (function(t, e) {
            function n(t) {
                t.jQ[0].normalize();
                var e = t.jQ[0].firstChild;
                if (e) {
                    e.nodeType;
                    var n = Y(e.data);
                    return n.jQadd(e),
                        t.children().disown(),
                        n.adopt(t, 0, 0)
                }
            }
            t.ctrlSeq = "\\text",
                t.replaces = function(t) {
                    t instanceof q ? this.replacedText = t.remove().jQ.text() : "string" == typeof t && (this.replacedText = t)
                }
                ,
                t.jQadd = function(t) {
                    e.jQadd.call(this, t),
                    this.ends[f] && this.ends[f].jQadd(this.jQ[0].firstChild)
                }
                ,
                t.createLeftOf = function(t) {
                    var n = this;
                    if (e.createLeftOf.call(this, t),
                    n[1].siblingCreated && n[1].siblingCreated(t.options, f),
                    n[f].siblingCreated && n[f].siblingCreated(t.options, 1),
                        n.bubble("reflow"),
                        t.insAtRightEnd(n),
                        n.replacedText)
                        for (var s = 0; s < n.replacedText.length; s += 1)
                            n.write(t, n.replacedText.charAt(s))
                }
                ,
                t.parser = function() {
                    var t = this
                        , e = R.string
                        , n = R.regex;
                    return R.optWhitespace.then(e("{")).then(n(/^[^}]*/)).skip(e("}")).map((function(e) {
                            return 0 === e.length ? q() : (Y(e).adopt(t, 0, 0),
                                t)
                        }
                    ))
                }
                ,
                t.textContents = function() {
                    return this.foldChildren("", (function(t, e) {
                            return t + ("function" == typeof e.text ? e.text() : e.text)
                        }
                    ))
                }
                ,
                t.text = function() {
                    return this.textContents()
                }
                ,
                t.latex = function() {
                    var t = this.textContents();
                    // return 0 === t.length ? "" : "\\text{" + t.replace(/\\/g, "\\backslash ").replace(/[{}]/g, "\\$&") + "}"
                    return 0 === t.length ? "" : ""
                }
                ,
                t.html = function() {
                    return '<span class="mq-text-mode"  mathquill-command-id=' + this.id + ">" + this.textContents() + "</span>"
                }
                ,
                t.moveTowards = function(t, e) {
                    e.insAtDirEnd(-t, this)
                }
                ,
                t.moveOutOf = function(t, e) {
                    e.insDirOf(t, this)
                }
                ,
                t.unselectInto = t.moveTowards,
                t.selectTowards = $.prototype.selectTowards,
                t.deleteTowards = $.prototype.deleteTowards,
                t.selectOutOf = function(t, e) {
                    e.insDirOf(t, this)
                }
                ,
                t.deleteOutOf = function(t, e) {
                    this.isEmpty() && e.insRightOf(this)
                }
                ,
                t.write = function(t, n) {
                    if (t.show().deleteSelection(),
                    "$" !== n)
                        t[f] ? t[f].appendText(n) : Y(n).createLeftOf(t);
                    else if (this.isEmpty())
                        t.insRightOf(this),
                            N("\\$", "$").createLeftOf(t);
                    else if (t[1])
                        if (t[f]) {
                            var s = V()
                                , r = this.ends[f];
                            r.disown().jQ.detach(),
                                r.adopt(s, 0, 0),
                                t.insLeftOf(this),
                                e.createLeftOf.call(s, t)
                        } else
                            t.insLeftOf(this);
                    else
                        t.insRightOf(this)
                }
                ,
                t.seek = function(t, e) {
                    e.hide();
                    var s = n(this)
                        , r = this.jQ.width() / this.text.length
                        , i = Math.round((t - this.jQ.offset().left) / r);
                    i <= 0 ? e.insAtLeftEnd(this) : i >= s.text.length ? e.insAtRightEnd(this) : e.insLeftOf(s.splitRight(i));
                    for (var a = t - e.show().offset().left, o = a && a < 0 ? f : 1, l = o; e[o] && a * l > 0; )
                        e[o].moveTowards(o, e),
                            l = a,
                            a = t - e.offset().left;
                    if (o * a < -o * l && e[-o].moveTowards(-o, e),
                        e.anticursor) {
                        if (e.anticursor.parent === this) {
                            var c = e[f] && e[f].text.length;
                            if (this.anticursorPosition === c)
                                e.anticursor = m.copy(e);
                            else {
                                if (this.anticursorPosition < c) {
                                    var u = e[f].splitRight(this.anticursorPosition);
                                    e[f] = u
                                } else
                                    u = e[1].splitRight(this.anticursorPosition - c);
                                e.anticursor = m(this, u[f], u)
                            }
                        }
                    } else
                        this.anticursorPosition = e[f] && e[f].text.length
                }
                ,
                t.blur = function(t) {
                    U.prototype.blur.call(this),
                    t && ("" === this.textContents() ? (this.remove(),
                        t[f] === this ? t[f] = this[f] : t[1] === this && (t[1] = this[1])) : n(this))
                }
                ,
                t.focus = U.prototype.focus
        }
    ))
        , Y = p(v, (function(t, e) {
            function n(t, e) {
                return e.charAt(t === f ? 0 : -1 + e.length)
            }
            t.init = function(t) {
                e.init.call(this),
                    this.text = t
            }
                ,
                t.jQadd = function(t) {
                    this.dom = t,
                        this.jQ = d(t)
                }
                ,
                t.jQize = function() {
                    return this.jQadd(document.createTextNode(this.text))
                }
                ,
                t.appendText = function(t) {
                    this.text += t,
                        this.dom.appendData(t)
                }
                ,
                t.prependText = function(t) {
                    this.text = t + this.text,
                        this.dom.insertData(0, t)
                }
                ,
                t.insTextAtDirEnd = function(t, e) {
                    1 === e ? this.appendText(t) : this.prependText(t)
                }
                ,
                t.splitRight = function(t) {
                    var e = Y(this.text.slice(t)).adopt(this.parent, this, this[1]);
                    return e.jQadd(this.dom.splitText(t)),
                        this.text = this.text.slice(0, t),
                        e
                }
                ,
                t.moveTowards = function(t, e) {
                    var s = n(-t, this.text)
                        , r = this[-t];
                    return r ? r.insTextAtDirEnd(s, t) : Y(s).createDir(-t, e),
                        this.deleteTowards(t, e)
                }
                ,
                t.latex = function() {
                    return this.text
                }
                ,
                t.deleteTowards = function(t, e) {
                    this.text.length > 1 ? 1 === t ? (this.dom.deleteData(0, 1),
                        this.text = this.text.slice(1)) : (this.dom.deleteData(-1 + this.text.length, 1),
                        this.text = this.text.slice(0, -1)) : (this.remove(),
                        this.jQ.remove(),
                        e[t] = this[t])
                }
                ,
                t.selectTowards = function(t, e) {
                    var s = e.anticursor
                        , r = n(-t, this.text);
                    if (s[t] === this) {
                        var i = Y(r).createDir(t, e);
                        s[t] = i,
                            e.insDirOf(t, i)
                    } else {
                        var a = this[-t];
                        if (a)
                            a.insTextAtDirEnd(r, t);
                        else
                            (i = Y(r).createDir(-t, e)).jQ.insDirOf(-t, e.selection.jQ);
                        1 === this.text.length && s[-t] === this && (s[-t] = this[-t])
                    }
                    return this.deleteTowards(t, e)
                }
        }
    ));
    function K(t, e, n) {
        return p(V, {
            ctrlSeq: t,
            htmlTemplate: "<" + e + " " + n + ">&0</" + e + ">"
        })
    }
    b.text = b.textnormal = b.textup = b.textmd = V,
        b.em = b.italic = b.italics = b.emph = b.textsl = K("\\textit", "i", 'class="mq-text-mode"'),
        b.strong = b.bold = b.textbf = K("\\textbf", "b", 'class="mq-text-mode"'),
        b.sf = b.textsf = K("\\textsf", "span", 'class="mq-sans-serif mq-text-mode"'),
        b.tt = b.texttt = K("\\texttt", "span", 'class="mq-monospace mq-text-mode"'),
        b.textsc = K("\\textsc", "span", 'style="font-variant:small-caps" class="mq-text-mode"'),
        b.uppercase = K("\\uppercase", "span", 'style="text-transform:uppercase" class="mq-text-mode"'),
        b.lowercase = K("\\lowercase", "span", 'style="text-transform:lowercase" class="mq-text-mode"');
    var G = p($, (function(t, e) {
            t.init = function(t) {
                e.init.call(this, "$"),
                    this.cursor = t
            }
                ,
                t.htmlTemplate = '<span class="mq-math-mode">&0</span>',
                t.createBlocks = function() {
                    e.createBlocks.call(this),
                        this.ends[f].cursor = this.cursor,
                        this.ends[f].write = function(t, e) {
                            "$" !== e ? U.prototype.write.call(this, t, e) : this.isEmpty() ? (t.insRightOf(this.parent),
                                this.parent.deleteTowards(dir, t),
                                N("\\$", "$").createLeftOf(t.show())) : t[1] ? t[f] ? U.prototype.write.call(this, t, e) : t.insLeftOf(this.parent) : t.insRightOf(this.parent)
                        }
                }
                ,
                t.latex = function() {
                    return "$" + this.ends[f].latex() + "$"
                }
        }
    ))
        , X = p(H, (function(t, e) {
            t.keystroke = function(t) {
                if ("Spacebar" !== t && "Shift-Spacebar" !== t)
                    return e.keystroke.apply(this, arguments)
            }
                ,
                t.write = function(t, e) {
                    var n;
                    (t.show().deleteSelection(),
                    "$" === e) ? G(t).createLeftOf(t) : ("<" === e ? n = "&lt;" : ">" === e && (n = "&gt;"),
                        N(e, n).createLeftOf(t))
                }
        }
    ));
    k.TextField = function(t) {
        return p(t.EditableField, (function(t, e) {
                this.RootBlock = X,
                    t.__mathquillify = function() {
                        return e.__mathquillify.call(this, "mq-editable-field mq-text-mode")
                    }
                    ,
                    t.latex = function(t) {
                        return arguments.length > 0 ? (this.__controller.renderLatexText(t),
                        this.__controller.blurred && this.__controller.cursor.hide().parent.blur(),
                            this) : this.__controller.exportLatex()
                    }
            }
        ))
    }
    ;
    w["\\"] = p($, (function(t, e) {
            t.ctrlSeq = "\\",
                t.replaces = function(t) {
                    this._replacedFragment = t.disown(),
                        this.isEmpty = function() {
                            return !1
                        }
                }
                ,
                t.htmlTemplate = '<span class="mq-latex-command-input mq-non-leaf">\\<span>&0</span></span>',
                t.textTemplate = ["\\"],
                t.createBlocks = function() {
                    e.createBlocks.call(this),
                        this.ends[f].focus = function() {
                            return this.parent.jQ.addClass("mq-hasCursor"),
                            this.isEmpty() && this.parent.jQ.removeClass("mq-empty"),
                                this
                        }
                        ,
                        this.ends[f].blur = function() {
                            return this.parent.jQ.removeClass("mq-hasCursor"),
                            this.isEmpty() && this.parent.jQ.addClass("mq-empty"),
                                this
                        }
                        ,
                        this.ends[f].write = function(t, e) {
                            t.show().deleteSelection(),
                                e.match(/[a-z]/i) ? N(e).createLeftOf(t) : (this.parent.renderCommand(t),
                                "\\" === e && this.isEmpty() || t.parent.write(t, e))
                        }
                        ,
                        this.ends[f].keystroke = function(t, n, s) {
                            return "Tab" === t || "Enter" === t || "Spacebar" === t ? (this.parent.renderCommand(s.cursor, "Enter" === t),
                                void ("Enter" === t && window.$selectItem && n.preventDefault())) : e.keystroke.apply(this, arguments)
                        }
                }
                ,
                t.createLeftOf = function(t) {
                    if (e.createLeftOf.call(this, t),
                        this._replacedFragment) {
                        var n = this.jQ[0];
                        this.jQ = this._replacedFragment.jQ.addClass("mq-blur").bind("mousedown mousemove", (function(t) {
                                return d(t.target = n).trigger(t),
                                    !1
                            }
                        )).insertBefore(this.jQ).add(this.jQ)
                    }
                }
                ,
                t.latex = function() {
                    return "\\" + this.ends[f].latex() + " "
                }
                ,
                t.renderCommand = function(t, e) {
                    this.jQ = this.jQ.last(),
                        this.remove(),
                        this[1] ? t.insLeftOf(this[1]) : t.insAtRightEnd(this.parent);
                    var n = this.ends[f].latex();
                    n || (n = " "),
                    e && window.$selectItem && (n = window.$selectItem);
                    var s = b[n];
                    s ? (s = s(n),
                    this._replacedFragment && s.replaces(this._replacedFragment),
                        s.createLeftOf(t)) : ((s = V()).replaces(n),
                        s.createLeftOf(t),
                        t.insRightOf(s),
                    this._replacedFragment && this._replacedFragment.remove())
                }
        }
    ));
    b.notin = b.cong = b.equiv = b.oplus = b.otimes = p(W, (function(t, e) {
            t.init = function(t) {
                e.init.call(this, "\\" + t + " ", "&" + t + ";")
            }
        }
    )),
        b["≠"] = b.ne = b.neq = h(W, "\\ne ", "&ne;"),
        b["∗"] = b.ast = b.star = b.loast = b.lowast = h(W, "\\ast ", "&lowast;"),
        b.therefor = b.therefore = h(W, "\\therefore ", "&there4;"),
        b.cuz = b.because = h(W, "\\because ", "&#8757;"),
        b.prop = b.propto = h(W, "\\propto ", "&prop;"),
        b["≈"] = b.asymp = b.approx = h(W, "\\approx ", "&asymp;"),
        b.isin = b.in = h(W, "\\in ", "&isin;"),
        b.ni = b.contains = h(W, "\\ni ", "&ni;"),
        b.notni = b.niton = b.notcontains = b.doesnotcontain = h(W, "\\not\\ni ", "&#8716;"),
        b.sub = b.subset = h(W, "\\subset ", "&sub;"),
        b.sup = b.supset = b.superset = h(W, "\\supset ", "&sup;"),
        b.nsub = b.notsub = b.nsubset = b.notsubset = h(W, "\\nsubset ", "&#8836;"),
        b.nsup = b.notsup = b.nsupset = b.notsupset = b.nsuperset = b.notsuperset = h(W, "\\nsupset ", "&#8837;"),
        b.sube = b.subeq = b.subsete = b.subseteq = h(W, "\\subseteq ", "&sube;"),
        b.supe = b.supeq = b.supsete = b.supseteq = b.supersete = b.superseteq = h(W, "\\supseteq ", "&supe;"),
        b.nsube = b.nsubeq = b.notsube = b.notsubeq = b.nsubsete = b.nsubseteq = b.notsubsete = b.notsubseteq = h(W, "\\not\\subseteq ", "&#8840;"),
        b.nsupe = b.nsupeq = b.notsupe = b.notsupeq = b.nsupsete = b.nsupseteq = b.notsupsete = b.notsupseteq = b.nsupersete = b.nsuperseteq = b.notsupersete = b.notsuperseteq = h(W, "\\not\\supseteq ", "&#8841;"),
        b.ℕ = b.naturals = b.Naturals = h(N, "ℕ", '<span style="font-family:Symbola;">&#8469;</span>'),
        b.ℙ = b.primes = b.Primes = b.projective = b.Projective = b.probability = b.Probability = h(N, "ℙ", '<span style="font-family:Symbola;">&#8473;</span>'),
        b.ℤ = b.integers = b.Integers = h(N, "ℤ", '<span style="font-famil:Symbola;">&#8484;</span>'),
        b.ℚ = b.rationals = b.Rationals = h(N, "ℚ", '<span style="font-family:Symbola;">&#8474;</span>'),
        b.ℝ = b.reals = b.Reals = h(N, "ℝ", '<span style="font-family:Symbola;">&#8477;</span>'),
        b.ℂ = b.complex = b.Complex = b.complexes = b.Complexes = b.complexplane = b.Complexplane = b.ComplexPlane = h(N, "ℂ", '<span style="font-family:Symbola;">&#8450;</span>'),
        b.ℍ = b.Hamiltonian = b.quaternions = b.Quaternions = h(N, "ℍ", '<span style="font-family:Symbola;">&#8461;</span>'),
        b.quad = b.emsp = h(N, "\\quad ", "    "),
        b.qquad = h(N, "\\qquad ", "        "),
        b.diamond = h(N, "\\diamond ", "&#9671;"),
        b.bigtriangleup = h(N, "\\bigtriangleup ", "&#9651;"),
        b.ominus = h(N, "\\ominus ", "&#8854;"),
        b.uplus = h(N, "\\uplus ", "&#8846;"),
        b.bigtriangledown = h(N, "\\bigtriangledown ", "&#9661;"),
        b.sqcap = h(N, "\\sqcap ", "&#8851;"),
        b.triangleleft = h(N, "\\triangleleft ", "&#8882;"),
        b.sqcup = h(N, "\\sqcup ", "&#8852;"),
        b.triangleright = h(N, "\\triangleright ", "&#8883;"),
        b.odot = b.circledot = h(N, "\\odot ", "&#8857;"),
        b.bigcirc = h(N, "\\bigcirc ", "&#9711;"),
        b.dagger = h(N, "\\dagger ", "&#0134;"),
        b.ddagger = h(N, "\\ddagger ", "&#135;"),
        b.wr = h(N, "\\wr ", "&#8768;"),
        b.amalg = h(N, "\\amalg ", "&#8720;"),
        b.models = h(N, "\\models ", "&#8872;"),
        b.prec = h(N, "\\prec ", "&#8826;"),
        b.succ = h(N, "\\succ ", "&#8827;"),
        b.preceq = h(N, "\\preceq ", "&#8828;"),
        b.succeq = h(N, "\\succeq ", "&#8829;"),
        b.simeq = h(N, "\\simeq ", "&#8771;"),
        b.mid = h(N, "\\mid ", "&#8739;"),
        b.ll = h(N, "\\ll ", "&#8810;"),
        b.gg = h(N, "\\gg ", "&#8811;"),
        b.parallel = h(N, "\\parallel ", "&#8741;"),
        b.nparallel = h(N, "\\nparallel ", "&#8742;"),
        b.bowtie = h(N, "\\bowtie ", "&#8904;"),
        b.sqsubset = h(N, "\\sqsubset ", "&#8847;"),
        b.sqsupset = h(N, "\\sqsupset ", "&#8848;"),
        b.smile = h(N, "\\smile ", "&#8995;"),
        b.sqsubseteq = h(N, "\\sqsubseteq ", "&#8849;"),
        b.sqsupseteq = h(N, "\\sqsupseteq ", "&#8850;"),
        b.doteq = h(N, "\\doteq ", "&#8784;"),
        b.frown = h(N, "\\frown ", "&#8994;"),
        b.vdash = h(N, "\\vdash ", "&#8870;"),
        b.dashv = h(N, "\\dashv ", "&#8867;"),
        b.nless = h(N, "\\nless ", "&#8814;"),
        b.ngtr = h(N, "\\ngtr ", "&#8815;"),
        b.triangleq = h(N, "\\triangleq ", "&#8796;"),
        b.wedgeeq = h(N, "\\wedgeeq ", "&#8793;"),
        b.backsimeqs = h(N, "\\backsimeqs ", "&#8780;"),
        b.longleftarrow = h(N, "\\longleftarrow ", "&#10229;"),
        b.longrightarrow = h(N, "\\longrightarrow ", "&#10230;"),
        b.Longleftarrow = h(N, "\\Longleftarrow ", "&#10232;"),
        b.Longrightarrow = h(N, "\\Longrightarrow ", "&#10233;"),
        b.longleftrightarrow = h(N, "\\longleftrightarrow ", "&#10231;"),
        b.updownarrow = h(N, "\\updownarrow ", "&#8597;"),
        b.Longleftrightarrow = h(N, "\\Longleftrightarrow ", "&#8660;"),
        b.Updownarrow = h(N, "\\Updownarrow ", "&#8661;"),
        b.mapsto = h(N, "\\mapsto ", "&#8614;"),
        b.nearrow = h(N, "\\nearrow ", "&#8599;"),
        b.hookleftarrow = h(N, "\\hookleftarrow ", "&#8617;"),
        b.hookrightarrow = h(N, "\\hookrightarrow ", "&#8618;"),
        b.searrow = h(N, "\\searrow ", "&#8600;"),
        b.leftharpoonup = h(N, "\\leftharpoonup ", "&#8636;"),
        b.rightharpoonup = h(N, "\\rightharpoonup ", "&#8640;"),
        b.swarrow = h(N, "\\swarrow ", "&#8601;"),
        b.leftharpoondown = h(N, "\\leftharpoondown ", "&#8637;"),
        b.rightharpoondown = h(N, "\\rightharpoondown ", "&#8641;"),
        b.nwarrow = h(N, "\\nwarrow ", "&#8598;"),
        b.neswarrow = h(N, "\\neswarrow ", "&#10530;"),
        b.swnearrow = h(N, "\\swnearrow ", "&#10529;"),
        b.smallleftright = h(N, "\\smallleftright ", "&#10564;"),
        b.leftrightsmall = h(N, "\\leftrightsmall ", "&#10562;"),
        b.rightleftarrows = h(N, "\\rightleftarrows ", "&#8644;"),
        b.leftrightarrows = h(N, "\\leftrightarrows ", "&#8646;"),
        b.ldots = h(N, "\\ldots ", "&#8230;"),
        b.cdots = h(N, "\\cdots ", "&#8943;"),
        b.centerdot = h(N, "\\centerdot ", "<span>.</span>"),
        b.vdots = h(N, "\\vdots ", "&#8942;"),
        b.iddots = h(N, "\\iddots ", "&#8944;"),
        b.ddots = h(N, "\\ddots ", "&#8945;"),
        b.surd = h(N, "\\surd ", "&#8730;"),
        b.triangle = h(N, "\\triangle ", "&#9651;"),
    b.ell = h(N, "\\ell ", "&#8467;"),
    b.top = h(N, "\\top ", "&#8868;"),
    b.flat = h(N, "\\flat ", "&#9837;"),
    b.natural = h(N, "\\natural ", "&#9838;"),
    b.sharp = h(N, "\\sharp ", "&#9839;"),
    b.wp = h(N, "\\wp ", "&#8472;"),
    b.bot = h(N, "\\bot ", "&#8869;"),
    b.clubsuit = h(N, "\\clubsuit ", "&#9827;"),
    b.diamondsuit = h(N, "\\diamondsuit ", "&#9826;"),
    b.heartsuit = h(N, "\\heartsuit ", "&#9825;"),
    b.spadesuit = h(N, "\\spadesuit ", "&#9824;"),
    b.parallelogram = h(N, "\\parallelogram ", "&#9649;"),
    b.oint = h(N, "\\oint ", "&#8750;"),
    b.bigcap = h(N, "\\bigcap ", "&bigcap;"),
    b.bigcup = h(N, "\\bigcup ", "&#8899;"),
    b.bigsqcup = h(N, "\\bigsqcup ", "&#8852;"),
    b.bigvee = h(N, "\\bigvee ", "&#8744;"),
    b.bigwedge = h(N, "\\bigwedge ", "&#8743;"),
    b.bigodot = h(N, "\\bigodot ", "&#8857;"),
    b.bigotimes = h(N, "\\bigotimes ", "&#8855;"),
    b.bigoplus = h(N, "\\bigoplus ", "&#8853;"),
    b.biguplus = h(N, "\\biguplus ", "&#8846;"),
    b.lfloor = h(N, "\\lfloor ", "&#8970;"),
    b.rfloor = h(N, "\\rfloor ", "&#8971;"),
    b.lceil = h(N, "\\lceil ", "&#8968;"),
    b.rceil = h(N, "\\rceil ", "&#8969;"),
    b.opencurlybrace = b.lbrace = h(N, "\\lbrace ", "{"),
    b.closecurlybrace = b.rbrace = h(N, "\\rbrace ", "}"),
    b.lbrack = h(N, "["),
    b.rbrack = h(N, "]"),
    b.slash = h(N, "/"),
    b.vert = h(N, "|"),
    b.perp = b.perpendicular = h(N, "\\perp ", "&perp;"),
    b.nabla = b.del = h(N, "\\nabla ", "&nabla;"),
    b.hbar = h(N, "\\hbar ", "&#8463;"),
    b.AA = b.Angstrom = b.angstrom = h(N, "\\text\\AA ", "&#8491;"),
    b.ring = b.circ = b.circle = h(N, "\\circ ", "&#8728;"),
    b.bull = b.bullet = h(N, "\\bullet ", "&bull;"),
    b.setminus = b.smallsetminus = h(N, "\\setminus ", "&#8726;"),
    b["¬"] = b.neg = h(N, "\\neg ", "&not;"),
    b["…"] = b.dots = b.ellip = b.hellip = b.ellipsis = b.hellipsis = h(N, "\\dots ", "&hellip;"),
    b.converges = b.darr = b.dnarr = b.dnarrow = b.downarrow = h(N, "\\downarrow ", "&darr;"),
    b.dArr = b.dnArr = b.dnArrow = b.Downarrow = h(N, "\\Downarrow ", "&dArr;"),
    b.diverges = b.uarr = b.uparrow = h(N, "\\uparrow ", "&uarr;"),
    b.uArr = b.Uparrow = h(N, "\\Uparrow ", "&uArr;"),
    b.to = h(W, "\\to ", "&rarr;"),
    b.rarr = b.rightarrow = h(N, "\\rightarrow ", "&rarr;"),
    b.implies = h(W, "\\Rightarrow ", "&rArr;"),
    b.rArr = b.Rightarrow = h(N, "\\Rightarrow ", "&rArr;"),
    b.gets = h(W, "\\gets ", "&larr;"),
    b.larr = b.leftarrow = h(N, "\\leftarrow ", "&larr;"),
    b.impliedby = h(W, "\\Leftarrow ", "&lArr;"),
    b.lArr = b.Leftarrow = h(N, "\\Leftarrow ", "&lArr;"),
    b.harr = b.lrarr = b.leftrightarrow = h(N, "\\leftrightarrow ", "&harr;"),
    b.iff = h(W, "\\Leftrightarrow ", "&hArr;"),
    b.hArr = b.lrArr = b.Leftrightarrow = h(N, "\\Leftrightarrow ", "&hArr;"),
    b.Re = b.Real = b.real = h(N, "\\Re ", "&real;"),
    b.Im = b.imag = b.image = b.imagin = b.imaginary = b.Imaginary = h(N, "\\Im ", "&image;"),
    b.part = b.partial = h(N, "\\partial ", "&part;"),
    b.infty = b.infin = b.infinity = h(N, "\\infty ", "&infin;"),
    b.alef = b.alefsym = b.aleph = b.alephsym = h(N, "\\aleph ", "&alefsym;"),
    b.xist = b.xists = b.exist = b.exists = h(N, "\\exists ", "&exist;"),
    b.nexists = b.nexist = h(N, "\\nexists ", "&#8708;"),
    b.and = b.land = b.wedge = h(W, "\\wedge ", "&and;"),
    b.or = b.lor = b.vee = h(W, "\\vee ", "&or;"),
    b.o = b.O = b.empty = b.emptyset = b.oslash = b.Oslash = b.nothing = b.varnothing = h(W, "\\varnothing ", "&empty;"),
    b.cup = b.union = h(W, "\\cup ", "&cup;"),
    b.cap = b.intersect = b.intersection = h(W, "\\cap ", "&cap;"),
    b.deg = b.degree = h(N, "\\degree ", "&deg;"),
    b.ang = b.angle = h(N, "\\angle ", "&ang;"),
    b.measuredangle = h(N, "\\measuredangle ", "&#8737;"),
    b.square = h(N, "\\square ", "&#x25A1;"),
    b.bigstar = h(N, "\\bigstar ", "&#x2605;"),
    b.complement = h(N, "\\complement ", "&#x2201;"),
    b.subsetneqq = h(N, "\\subsetneqq ", "&#x2ACB;"),
    b.leqslant = h(N, "\\leqslant ", "&#x2A7D;"),
    b.leqslant = h(N, "\\leqslant ", "&#x2A7D;"),
    b.geqslant = h(N, "\\geqslant ", "&#x2A7E;"),
    b.triangleleft = h(N, "\\triangleleft ", '<span class="mq-triangle">◁</span>'),
    b.triangleright = h(N, "\\triangleright ", '<span class="mq-triangle">▷</span>'),
    b.rightleftharpoons = h(N, "\\rightleftharpoons ", "&#8651;"),
    b.Downarrow = h(N, "\\Downarrow ", "&#x21D3;"),
    b.Uparrow = h(N, "\\Uparrow ", "&#x21D1;"),
    b.overrightarrow = h(N, "\\overrightarrow ", "&#x2192;"),
    b.overleftarrow = h(N, "\\overleftarrow ", "&#x2190;"),
    b.int = h(N, "\\int ", "&int;"),
    b.iint = h(N, "\\iint ", "∬"),
    b.iiint = h(N, "\\iiint ", "&#8749;"),
    b.iiiint = h(N, "\\iiiint ", "&#x222B;"),
    b.oint = h(N, "\\oint ", "&#8750;"),
    b.prod = h(N, "\\prod ", "&prod;"),
    b.coprod = h(N, "\\coprod ", "∐"),
    b.thicksim = h(N, "\\thicksim ", "~"),
    b.backsim = h(N, "\\backsim ", "∽");
    var J = p(N, (function(t, e) {
            t.createLeftOf = function(t) {
                t.options.autoSubscriptNumerals && t.parent !== t.parent.parent.sub && (t[f]instanceof Z && !1 !== t[f].isItalic || t[f]instanceof gt && t[f][f]instanceof Z && !1 !== t[f][f].isItalic) ? (b._().createLeftOf(t),
                    e.createLeftOf.call(this, t),
                    t.insRightOf(t.parent.parent)) : e.createLeftOf.call(this, t)
            }
        }
    ));
    b["text{}"] = V;
    var Z = p(P, (function(t, e) {
            t.init = function(t, n) {
                "TeX" == _.curFontFamily ? _.isSelectedItalic : _.isSelectedItalic,
                    e.init.call(this, t, "<var>" + (n || t) + "</var>")
            }
                ,
                t.text = function() {
                    var t = this.ctrlSeq;
                    return this.isPartOfOperator && ("\\" == t[0] ? t = t.slice(1, t.length) : " " == t[t.length - 1] && (t = t.slice(0, -1))),
                        t
                }
        }
    ));
    O.p.autoCommands = {
        _maxLength: 0
    },
        S.autoCommands = function(t) {
            if (!/^[a-z]+(?: [a-z]+)*$/i.test(t))
                throw '"' + t + '" not a space-delimited list of only letters';
            for (var e = t.split(" "), n = {}, s = 0, r = 0; r < e.length; r += 1) {
                var a = e[r];
                if (a.length < 2)
                    throw 'autocommand "' + a + '" not minimum length of 2';
                if (b[a] === rt)
                    throw '"' + a + '" is a built-in operator name';
                n[a] = 1,
                    s = i(s, a.length)
            }
            return n._maxLength = s,
                n
        }
    ;
    var tt = p(Z, (function(t, e) {
            function n(t) {
                return !t || t instanceof W || t instanceof bt
            }
            t.init = function(t) {
                return e.init.call(this, this.letter = t)
            }
                ,
                t.createLeftOf = function(t) {
                    e.createLeftOf.apply(this, arguments);
                    var n = t.options.autoCommands
                        , s = n._maxLength;
                    if (s > 0) {
                        for (var r = "", i = this, a = 0; i instanceof tt && i.ctrlSeq === i.letter && a < s; )
                            r = i.letter + r,
                                i = i[f],
                                a += 1;
                        for (; r.length; ) {
                            if (n.hasOwnProperty(r)) {
                                for (a = 1,
                                         i = this; a < r.length; a += 1,
                                         i = i[f])
                                    ;
                                return q(i, this).remove(),
                                    t[f] = i[f],
                                    b[r](r).createLeftOf(t)
                            }
                            r = r.slice(1)
                        }
                    }
                }
                ,
                t.italicize = function(t) {
                    return this.isItalic = t,
                        this.isPartOfOperator = !t,
                        this.jQ.toggleClass("mq-operator-name", !t),
                        this
                }
                ,
                t.finalizeTree = t.siblingDeleted = t.siblingCreated = function(t, e) {
                    e !== f && this[1]instanceof tt || this.autoUnItalicize(t)
                }
                ,
                t.autoUnItalicize = function(t) {
                    var e = t.autoOperatorNames;
                    if (0 !== e._maxLength) {
                        for (var s = this.letter, i = this[f]; i instanceof tt; i = i[f])
                            s = i.letter + s;
                        for (var a = this[1]; a instanceof tt; a = a[1])
                            s += a.letter;
                        q(i[1] || this.parent.ends[f], a[f] || this.parent.ends[1]).each((function(t) {
                                t.italicize(!0).jQ.removeClass("mq-first mq-last mq-followed-by-supsub"),
                                    t.ctrlSeq = t.letter
                            }
                        ));
                        t: for (var o = 0, l = i[1] || this.parent.ends[f]; o < s.length; o += 1,
                            l = l[1])
                            for (var c = r(e._maxLength, s.length - o); c > 0; c -= 1) {
                                var u = s.slice(o, o + c);
                                if (e.hasOwnProperty(u)) {
                                    for (var h = 0, p = l; h < c; h += 1,
                                        p = p[1]) {
                                        p.italicize(!1);
                                        var d = p
                                    }
                                    var m = et.hasOwnProperty(u);
                                    if (l.ctrlSeq = (m ? "\\" : "\\operatorname{") + l.ctrlSeq,
                                        d.ctrlSeq += m ? " " : "}",
                                    st.hasOwnProperty(u) && d[f][f][f].jQ.addClass("mq-last"),
                                    n(l[f]) || l.jQ.addClass("mq-first"),
                                        !n(d[1]))
                                        if (d[1]instanceof gt) {
                                            var v = d[1];
                                            (v.siblingCreated = v.siblingDeleted = function() {
                                                    v.jQ.toggleClass("mq-after-operator-name", !(v[1]instanceof jt))
                                                }
                                            )()
                                        } else
                                            d.jQ.toggleClass("mq-last", !(d[1]instanceof jt));
                                    o += c - 1,
                                        l = d;
                                    continue t
                                }
                            }
                    }
                }
        }
    ))
        , et = {}
        , nt = O.p.autoOperatorNames = {
        _maxLength: 9
    }
        , st = {
        limsup: 1,
        liminf: 1,
        projlim: 1,
        injlim: 1
    };
    !function() {
        for (var t = "arg deg det dim exp gcd hom inf ker lg lim ln log max min sup limsup liminf injlim projlim Pr".split(" "), e = 0; e < t.length; e += 1)
            et[t[e]] = nt[t[e]] = 1;
        var n = "sin cos tan arcsin arccos arctan sinh cosh tanh sec csc cot coth".split(" ");
        for (e = 0; e < n.length; e += 1)
            et[n[e]] = 1;
        var s = "sin cos tan sec cosec csc cotan cot ctg".split(" ");
        for (e = 0; e < s.length; e += 1)
            nt[s[e]] = nt["arc" + s[e]] = nt[s[e] + "h"] = nt["ar" + s[e] + "h"] = nt["arc" + s[e] + "h"] = 1;
        var r = "gcf hcf lcm proj span".split(" ");
        for (e = 0; e < r.length; e += 1)
            nt[r[e]] = 1
    }(),
        S.autoOperatorNames = function(t) {
            if (!/^[a-z]+(?: [a-z]+)*$/i.test(t))
                throw '"' + t + '" not a space-delimited list of only letters';
            for (var e = t.split(" "), n = {}, s = 0, r = 0; r < e.length; r += 1) {
                var a = e[r];
                if (a.length < 2)
                    throw '"' + a + '" not minimum length of 2';
                n[a] = 1,
                    s = i(s, a.length)
            }
            return n._maxLength = s,
                n
        }
    ;
    var rt = p(P, (function(t, e) {
            t.init = function(t) {
                this.ctrlSeq = t
            }
                ,
                t.createLeftOf = function(t) {
                    for (var e = this.ctrlSeq, n = 0; n < e.length; n += 1)
                        tt(e.charAt(n)).createLeftOf(t)
                }
                ,
                t.parser = function() {
                    for (var t = this.ctrlSeq, e = U(), n = 0; n < t.length; n += 1)
                        tt(t.charAt(n)).adopt(e, e.ends[1], 0);
                    return R.succeed(e.children())
                }
        }
    ));
    for (var it in nt)
        nt.hasOwnProperty(it) && (b[it] = rt);
    b.operatorname = p($, (function(t) {
            t.createLeftOf = a,
                t.numBlocks = function() {
                    return 1
                }
                ,
                t.parser = function() {
                    return M.block.map((function(t) {
                            return t.children()
                        }
                    ))
                }
        }
    )),
        b[" "] = b.space = h(N, "\\ ", "&nbsp;"),
        b.prime = h(N, "\\prime ", "&prime;"),
        b.Prime = b.dprime = h(N, "\\Prime ", "&Prime;"),
        b.backprime = h(N, "\\backprime ", "&#96;"),
        b.backslash = h(N, "\\backslash ", "\\"),
    w["\\"] || (w["\\"] = b.backslash),
        b.$ = h(N, "\\$", "$"),
        b["#"] = h(N, "\\#", "#");
    var at = p(P, (function(t, e) {
            t.init = function(t, n) {
                e.init.call(this, t, '<span class="mq-nonSymbola">' + (n || t) + "</span>")
            }
        }
    ));
    b["@"] = at,
        b["&"] = h(at, "\\&", "&amp;"),
        b["%"] = h(at, "\\%", "%"),
        b.alpha = b.beta = b.gamma = b.delta = b.zeta = b.eta = b.theta = b.iota = b.kappa = b.mu = b.nu = b.omicron = b.xi = b.rho = b.sigma = b.tau = b.chi = b.psi = b.omega = p(Z, (function(t, e) {
                t.init = function(t) {
                    e.init.call(this, "\\" + t + " ", "&" + t + ";")
                }
            }
        )),
        b.phi = h(Z, "\\phi ", "&#981;"),
        b.Phi = h(Z, "\\Phi ", "&#934;"),
        b.phiv = b.varphi = h(Z, "\\varphi ", "&#966;"),
        b.epsilon = h(Z, "\\epsilon ", "&#1013;"),
        b.epsiv = b.varepsilon = h(Z, "\\varepsilon ", "&epsilon;"),
        b.piv = b.varpi = h(Z, "\\varpi ", "&piv;"),
        b.sigmaf = b.sigmav = b.varsigma = h(Z, "\\varsigma ", "&sigmaf;"),
        b.thetav = b.vartheta = b.thetasym = h(Z, "\\vartheta ", "&thetasym;"),
        b.upsilon = b.upsi = h(Z, "\\upsilon ", "&upsilon;"),
        b.gammad = b.Gammad = b.digamma = h(Z, "\\digamma ", "&#989;"),
        b.kappav = b.varkappa = h(Z, "\\varkappa ", "&#1008;"),
        b.rhov = b.varrho = h(Z, "\\varrho ", "&#1009;"),
        b.pi = b["π"] = h(at, "\\pi ", "&pi;"),
        b.lambda = h(at, "\\lambda ", "&lambda;"),
        b.Upsilon = b.Upsi = b.upsih = b.Upsih = h(P, "\\Upsilon ", '<var style="font-family: serif">&upsih;</var>'),
        b.Gamma = b.Delta = b.Theta = b.Lambda = b.Xi = b.Pi = b.Sigma = b.Psi = b.Omega = b.forall = p(N, (function(t, e) {
                t.init = function(t) {
                    e.init.call(this, "\\" + t + " ", "&" + t + ";")
                }
            }
        ));
    var ot = p($, (function(t) {
            t.init = function(t) {
                this.latex = t
            }
                ,
                t.createLeftOf = function(t) {
                    var e = M.parse(this.latex);
                    e.children().adopt(t.parent, t[f], t[1]),
                        t[f] = e.ends[1],
                        e.jQize().insertBefore(t.jQ),
                        e.finalizeInsert(t.options, t),
                    e.ends[1][1].siblingCreated && e.ends[1][1].siblingCreated(t.options, f),
                    e.ends[f][f].siblingCreated && e.ends[f][f].siblingCreated(t.options, 1),
                        t.parent.bubble("reflow")
                }
                ,
                t.parser = function() {
                    var t = M.parse(this.latex).children();
                    return R.succeed(t)
                }
        }
    ));
    b["¹"] = h(ot, "^1"),
        b["²"] = h(ot, "^2"),
        b["³"] = h(ot, "^3"),
        b["¼"] = h(ot, "\\frac14"),
        b["½"] = h(ot, "\\frac12"),
        b["¾"] = h(ot, "\\frac34");
    var lt = p(W, (function(t) {
            t.init = N.prototype.init,
                t.contactWeld = t.siblingCreated = t.siblingDeleted = function(t, e) {
                    if (1 !== e)
                        return this.jQ[0].className = function t(e) {
                            return e[f] ? e[f]instanceof W || /^[,;:\(\[]$/.test(e[f].ctrlSeq) ? "" : "mq-binary-operator" : e.parent && e.parent.parent && e.parent.parent.isStyleBlock() ? t(e.parent.parent) : ""
                        }(this),
                            this
                }
        }
    ));
    b["+"] = h(lt, "+", "+"),
        b["–"] = b["-"] = h(lt, "-", "&minus;"),
        b["±"] = b.pm = b.plusmn = b.plusminus = h(lt, "\\pm ", "&plusmn;"),
        b.mp = b.mnplus = b.minusplus = h(lt, "\\mp ", "&#8723;"),
        b.sdot = b.cdot = h(W, "\\cdot ", "&middot;", "*"),
        w["*"] = h(W, "*", "*");
    var ct = p(W, (function(t, e) {
            t.init = function(t, n) {
                this.data = t,
                    this.strict = n;
                var s = n ? "Strict" : "";
                e.init.call(this, t["ctrlSeq" + s], t["html" + s], t["text" + s])
            }
                ,
                t.swap = function(t) {
                    this.strict = t;
                    var e = t ? "Strict" : "";
                    this.ctrlSeq = this.data["ctrlSeq" + e],
                        this.jQ.html(this.data["html" + e]),
                        this.textTemplate = [this.data["text" + e]]
                }
                ,
                t.deleteTowards = function(t, n) {
                    if (t === f && !this.strict)
                        return this.swap(!0),
                            void this.bubble("reflow");
                    e.deleteTowards.apply(this, arguments)
                }
        }
    ));
    b["<"] = b.lt = h(W, "\\lt ", "&lt;"),
        b[">"] = b.gt = h(W, "\\gt ", "&gt;"),
        b["≤"] = b.le = b.leq = h(ct, {
            ctrlSeq: "\\le ",
            html: "&le;",
            text: "≤",
            ctrlSeqStrict: "<",
            htmlStrict: "&lt;",
            textStrict: "<"
        }, !1),
        b["≥"] = b.ge = b.geq = h(ct, {
            ctrlSeq: "\\ge ",
            html: "&ge;",
            text: "≥",
            ctrlSeqStrict: ">",
            htmlStrict: "&gt;",
            textStrict: ">"
        }, !1);
    var ut = p(W, (function(t, e) {
            t.init = function() {
                e.init.call(this, "=", "=")
            }
                ,
                t.createLeftOf = function(t) {
                    if (t[f]instanceof ct && t[f].strict)
                        return t[f].swap(!1),
                            void t[f].bubble("reflow");
                    e.createLeftOf.apply(this, arguments)
                }
        }
    ));
    b["="] = ut,
        b["×"] = b.times = h(W, "\\times ", "&times;", "[x]"),
        b["÷"] = b.div = b.divide = b.divides = h(W, "\\div ", "&divide;", "[/]"),
        w["~"] = b.sim = h(W, "\\sim ", "~", "~");
    var ht, pt, ft = a, dt = document.createElement("div").style;
    for (var mt in {
        transform: 1,
        WebkitTransform: 1,
        MozTransform: 1,
        OTransform: 1,
        msTransform: 1
    })
        if (mt in dt) {
            pt = mt;
            break
        }
    pt ? ht = function(t, e, n) {
            t.css(pt, "scale(" + e + "," + n + ")")
        }
        : "filter"in dt ? (ft = function(t) {
                t.className = t.className
            }
                ,
                ht = function(t, e, n) {
                    e /= 1 + (n - 1) / 2,
                        t.css("fontSize", n + "em"),
                    t.hasClass("mq-matrixed-container") || t.addClass("mq-matrixed-container").wrapInner('<span class="mq-matrixed"></span>');
                    var s = t.children().css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + e + ",SizingMethod='auto expand')");
                    function r() {
                        t.css("marginRight", (s.width() - 1) * (e - 1) / e + "px")
                    }
                    r();
                    var i = setInterval(r);
                    d(window).load((function() {
                            clearTimeout(i),
                                r()
                        }
                    ))
                }
        ) : ht = function(t, e, n) {
            t.css("fontSize", n + "em")
        }
    ;
    var vt = p($, (function(t, e) {
            t.init = function(t, n, s) {
                e.init.call(this, t, "<" + n + " " + s + ">&0</" + n + ">")
            }
        }
    ));
    b.mathrm = h(vt, "\\mathrm", "span", 'class="mq-roman mq-font mq-mathrm"'),
        b.mathit = h(vt, "\\mathit", "i", 'class="mq-font"'),
        b.mathbf = h(vt, "\\mathbf", "span", 'class="mq-font mq-mathbf"'),
        b.mathsf = h(vt, "\\mathsf", "span", 'class="mq-sans-serif mq-font"'),
        b.mathtt = h(vt, "\\mathtt", "span", 'class="mq-monospace mq-font"'),
        b.start = p($, (function(t, e) {
                t.ctrlSeq = "\\start ",
                    t.htmlTemplate = '<span class="mq-non-leaf"></span>'
            }
        )),
        b.LineLine = p($, (function(t, e) {
                t.ctrlSeq = "\\LineLine",
                    t.htmlTemplate = '<span class="mq-non-leaf" style="margin: 0 1px;"><span style="letter-spacing:-1px">||</span><span>&0</span><span style="letter-spacing:-1px">||</span></span>'
            }
        )),
        b.Bracket = p($, (function(t, e) {
                t.ctrlSeq = "\\Bracket",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span style="letter-spacing:-1px">[[</span><span>&0</span><span style="letter-spacing:-1px">]]</span></span>'
            }
        )),
        b.leftlineline = p($, (function(t, e) {
                t.ctrlSeq = "\\leftlineline",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span>||</span><span>&0</span></span>'
            }
        )),
        b.rightlineline = p($, (function(t, e) {
                t.ctrlSeq = "\\rightlineline",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span>&0</span><span>||</span></span>'
            }
        )),
        b.llbracket = p($, (function(t, e) {
                t.ctrlSeq = "\\llbracket",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span style="letter-spacing:-1px">[[</span><span>&0</span></span>'
            }
        )),
        b.rrbracket = p($, (function(t, e) {
                t.ctrlSeq = "\\rrbracket",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span>&0</span><span style="letter-spacing:-1px">]]</span></span>'
            }
        )),
        b.underline = p($, (function(t, e) {
                t.ctrlSeq = "\\underline",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf"><span>&0</span><div style="border-top:1px solid;margin-top:1px;"></div></span>'
            }
        )),
        b["\\overline{\\overline{}}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\overline{\\overline{}}",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div style="border-top:1px solid;margin-bottom:3px;"></div><div style="border-top:1px solid;margin-bottom:5px;"></div><span>&0</span></span>',
                    t.latex = function() {
                        return "\\overline{\\overline{" + this.ends[f].latex() + "}}"
                    }
            }
        )),
        b.overline = b.bar = p($, (function(t, e) {
                t.ctrlSeq = "\\overline",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div style="border-top:1px solid;margin-bottom:3px;"></div><span>&0</span></span>'
            }
        )),
        b.overrightarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overrightarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="mq-overarrow mq-arrow-right"></div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overleftarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overleftarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="mq-overarrow mq-arrow-left"></div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overfrown = p($, (function(t, e) {
                t.ctrlSeq = "\\overfrown",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div style="transform:rotate(90deg);">(</div><span class="mq-under overfrown">&0</span></span>'
            }
        )),
        b.oversmile = p($, (function(t, e) {
                t.ctrlSeq = "\\oversmile",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div style="transform:rotate(90deg);">)</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overrarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overrarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="my-over">&#8594;</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overlarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overlarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="my-over">&#8592;</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overlrarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overlrarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="my-over">&#8596;</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overrharpoonup = p($, (function(t, e) {
                t.ctrlSeq = "\\overrharpoonup",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="my-over">&#8640;</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overlharpoonup = p($, (function(t, e) {
                t.ctrlSeq = "\\overlharpoonup",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="my-over">&#8636;</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.underrarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underrarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align: text-top;"><span>&0</span><div>&#8594;</div></span>'
            }
        )),
        b.underlarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underlarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align: text-top;"><span>&0</span><div>&#8592;</div></span>'
            }
        )),
        b.underlrarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underlrarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align: text-top;"><span>&0</span><div>&#8596;</div></span>'
            }
        )),
        b.underrharpoonup = p($, (function(t, e) {
                t.ctrlSeq = "\\underrharpoonup",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align: text-top;"><span>&0</span><div>&#8640;</div></span>'
            }
        )),
        b.underlharpoonup = p($, (function(t, e) {
                t.ctrlSeq = "\\underlharpoonup",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align: text-top;"><span>&0</span><div>&#8636;</div></span>'
            }
        )),
        b.overleftrightarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overleftrightarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="mq-overarrow mq-arrow-both"></div><span class="mq-under">&0</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.underleftrightarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underleftrightarrow",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf"><span class="mq-over">&0</span><div class="mq-overarrow mq-arrow-both"></div></span>',
                    t.textTemplate = [""]
            }
        )),
        b.overparen = p($, (function(t, e) {
                t.ctrlSeq = "\\overparen",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><div class="mq-over mq-overparen"></div><span>&0</span></span>'
            }
        )),
        b.underrightarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underrightarrow",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf"><span class="mq-over">&0</span><div class="mq-overarrow mq-arrow-right"></div></span>'
            }
        )),
        b.underleftarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underleftarrow",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf"><span class="mq-over">&0</span><div class="mq-overarrow mq-arrow-left"></div></span>'
            }
        )),
        b.underset = p($, (function(t, e) {
                t.ctrlSeq = "\\underset",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf"><span class="mq-over">&1</span><span class="mq-under">&0</span></span>',
                    t.textTemplate = ["[", "|", "]"],
                    t.finalizeTree = function() {
                        this.downInto = this.ends[f].upOutOf = this.ends[1],
                            this.upInto = this.ends[1].downOutOf = this.ends[f]
                    }
                    ,
                    t.reflow = function() {
                        var t = this.jQ;
                        t.find(".overset-rightleftarrows").length && t.css("vertical-align", "middle"),
                        t.find(".my-overset").length && t.css("vertical-align", "middle")
                    }
            }
        )),
        b.overset = p($, (function(t, e) {
                t.ctrlSeq = "\\overset",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><span class="mq-over my-overset">&0</span><span class="mq-under">&1</span></span>',
                    t.textTemplate = ["[", "|", "]"],
                    t.deleteTowards = function(t, n) {
                        this.downInto,
                            e.deleteTowards.apply(this, arguments)
                    }
                    ,
                    t.finalizeTree = function() {
                        this.downInto = this.ends[1].upOutOf = this.ends[f],
                            this.upInto = this.ends[f].downOutOf = this.ends[1]
                    }
            }
        )),
        b.overllrarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\overllrarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf"><span class="mq-over" style="margin-bottom: -0.3em;">&0</span><span style="font-size: 17px;">&#10231;</span></span>',
                    t.reflow = function() {
                        var t = this.ends[1].jQ.parents();
                        t.length && t[2] && t[2].classList.contains("mq-underset") && (t[2].style.verticalAlign = "middle")
                    }
            }
        )),
        b.underllrarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underllrarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align: text-top;"><div>&#10231;</div><span class="mq-under">&0</span></span>'
            }
        )),
        b.overrightleftarrows = p($, (function(t, e) {
                t.ctrlSeq = "\\overrightleftarrows",
                    t.htmlTemplate = '<span class="overset-rightleftarrows mq-overset mq-overunder mq-non-leaf"><span class="mq-over">&0</span><span class="mq-under" style="font-size: 18px;">&#8644;</span></span>'
            }
        )),
        b.underrightleftarrows = p($, (function(t, e) {
                t.ctrlSeq = "\\underrightleftarrows",
                    t.htmlTemplate = '<span class="underset-rightleftarrows mq-underset mq-overunder mq-non-leaf"><span class="mq-over" style="font-size: 18px;">&#8644;</span><span class="mq-under">&0</span></span>'
            }
        )),
        b.overrightleftharpoons = p($, (function(t, e) {
                t.ctrlSeq = "\\overrightleftharpoons",
                    t.htmlTemplate = '<span class="overset-rightleftarrows mq-overset mq-overunder mq-non-leaf"><span class="mq-over">&0</span><span class="mq-under" style="font-size: 18px;">&#8651;</span></span>'
            }
        )),
        b.underrightleftharpoons = p($, (function(t, e) {
                t.ctrlSeq = "\\underrightleftharpoons",
                    t.htmlTemplate = '<span class="underset-rightleftarrows mq-underset mq-overunder mq-non-leaf"><span class="mq-over" style="font-size: 18px;">&#8651;</span><span class="mq-under">&0</span></span>'
            }
        ));
    b.color = p($, (function(t, e) {
            t.setColor = function(t) {
                this.color = t,
                    this.htmlTemplate = '<span class="mq-textcolor" style="color:' + t + '">&0</span>'
            }
                ,
                t.latex = function() {
                    return "\\color{" + this.color + "}{" + this.blocks[0].latex() + "}"
                }
                ,
                t.parser = function() {
                    var t = this
                        , n = R.optWhitespace
                        , s = R.string
                        , r = R.regex;
                    return n.then(s("{")).then(r(/^[#\w\s.,()%-]*/)).skip(s("}")).then((function(n) {
                            return t.setColor(n),
                                e.parser.call(t)
                        }
                    ))
                }
                ,
                t.isStyleBlock = function() {
                    return !0
                }
        }
    )),
        b.boldsymbol = p($, (function(t, e) {
                t.setWeight = function() {
                    this.htmlTemplate = '<span class="mq-weight mq-boldsymbol" style="font-weight:700;">&0</span>'
                }
                    ,
                    t.latex = function() {
                        return "\\boldsymbol{" + this.blocks[0].latex() + "}"
                    }
                    ,
                    t.parser = function() {
                        var t = this;
                        return R.optWhitespace.then((function() {
                                return t.setWeight(),
                                    e.parser.call(t)
                            }
                        ))
                    }
                    ,
                    t.isStyleBlock = function() {
                        return !0
                    }
            }
        ));
    b.mathit = p($, (function(t, e) {
            t.setWeight = function() {
                this.htmlTemplate = '<span style="font-weight:normal;">&0</span>'
            }
                ,
                t.latex = function() {
                    return "\\mathit{" + this.blocks[0].latex() + "}"
                }
                ,
                t.parser = function() {
                    var t = this;
                    return R.optWhitespace.then((function() {
                            return t.setWeight(),
                                e.parser.call(t)
                        }
                    ))
                }
                ,
                t.isStyleBlock = function() {
                    return !0
                }
        }
    )),
        b["\\"] = p($, (function(t, e) {
                t.latex = function() {
                    return "\\\\"
                }
                    ,
                    t.parser = function() {
                        return this.htmlTemplate = '<span style="display:block;" class="mq-br"></span>>',
                            e.parser.call(this)
                    }
                    ,
                    t.isStyleBlock = function() {
                        return !0
                    }
            }
        ));
    b.class = p($, (function(t, e) {
            t.parser = function() {
                var t = this
                    , n = R.string
                    , s = R.regex;
                return R.optWhitespace.then(n("{")).then(s(/^[-\w\s\\\xA0-\xFF]*/)).skip(n("}")).then((function(n) {
                        return t.cls = n || "",
                            t.htmlTemplate = '<span class="mq-class ' + n + '">&0</span>',
                            e.parser.call(t)
                    }
                ))
            }
                ,
                t.latex = function() {
                    return "\\class{" + this.cls + "}{" + this.blocks[0].latex() + "}"
                }
                ,
                t.isStyleBlock = function() {
                    return !0
                }
        }
    ));
    var gt = p($, (function(t, e) {
            t.ctrlSeq = "_{}^{}",
                t.createLeftOf = function(t) {
                    if (this.replacedFragment || t[f] || !t.options.supSubsRequireOperand)
                        return e.createLeftOf.apply(this, arguments)
                }
                ,
                t.contactWeld = function(t) {
                    for (var e = f; e; e = e === f && 1)
                        if (this[e]instanceof gt) {
                            for (var n = "sub"; n; n = "sub" === n && "sup") {
                                var s = this[n]
                                    , r = this[e][n];
                                if (s) {
                                    if (r)
                                        if (s.isEmpty())
                                            a = m(r, 0, r.ends[f]);
                                        else {
                                            s.jQ.children().insAtDirEnd(-e, r.jQ);
                                            var i = s.children().disown()
                                                , a = m(r, i.ends[1], r.ends[f]);
                                            e === f ? i.adopt(r, r.ends[1], 0) : i.adopt(r, 0, r.ends[f])
                                        }
                                    else
                                        this[e].addBlock(s.disown());
                                    this.placeCursor = function(t, n) {
                                        return function(s) {
                                            s.insAtDirEnd(-e, t || n)
                                        }
                                    }(r, s)
                                }
                            }
                            this.remove(),
                            t && t[f] === this && (1 === e && a ? a[f] ? t.insRightOf(a[f]) : t.insAtLeftEnd(a.parent) : t.insRightOf(this[e]));
                            break
                        }
                }
                ,
                O.p.charsThatBreakOutOfSupSub = "",
                t.finalizeTree = function() {
                    this.ends[f].write = function(t, e) {
                        if (t.options.autoSubscriptNumerals && this === this.parent.sub) {
                            if ("_" === e)
                                return;
                            var n = this.chToCmd(e, t.options);
                            return n instanceof P ? t.deleteSelection() : t.clearSelection().insRightOf(this.parent),
                                n.createLeftOf(t.show())
                        }
                        t[f] && !t[1] && !t.selection && t.options.charsThatBreakOutOfSupSub.indexOf(e) > -1 && t.insRightOf(this.parent),
                            U.p.write.apply(this, arguments)
                    }
                }
                ,
                t.moveTowards = function(t, n, s) {
                    n.options.autoSubscriptNumerals && !this.sup ? n.insDirOf(t, this) : e.moveTowards.apply(this, arguments)
                }
                ,
                t.deleteTowards = function(t, n) {
                    if (n.options.autoSubscriptNumerals && this.sub) {
                        var s = this.sub.ends[-t];
                        s instanceof P ? s.remove() : s && s.deleteTowards(t, n.insAtDirEnd(-t, this.sub)),
                        this.sub.isEmpty() && (this.sub.deleteOutOf(f, n.insAtLeftEnd(this.sub)),
                        this.sup && n.insDirOf(-t, this))
                    } else
                        e.deleteTowards.apply(this, arguments)
                }
                ,
                t.latex = function() {
                    function t(t, e) {
                        var n = e && e.latex();
                        return e ? t + "{" + (n || "") + "}" : ""
                    }
                    return "\\lbrace " === this[-1].ctrlSeq ? t("", this.sup) + "\\\\" + t("", this.sub) + "\\\\\\end{cases}" : t("_", this.sub) + t("^", this.sup)
                }
                ,
                t.addBlock = function(t) {
                    "sub" === this.supsub ? (this.sup = this.upInto = this.sub.upOutOf = t,
                        t.adopt(this, this.sub, 0).downOutOf = this.sub,
                        t.jQ = d('<span class="mq-sup"/>').append(t.jQ.children()).attr(s, t.id).prependTo(this.jQ)) : (this.sub = this.downInto = this.sup.downOutOf = t,
                        t.adopt(this, 0, this.sup).upOutOf = this.sup,
                        t.jQ = d('<span class="mq-sub"></span>').append(t.jQ.children()).attr(s, t.id).appendTo(this.jQ.removeClass("mq-sup-only")));
                    for (var e = 0; e < 2; e += 1)
                        !function(t, e, n, s) {
                            t[e].deleteOutOf = function(r, i) {
                                if (i.insDirOf(this[r] ? -r : r, this.parent),
                                    !this.isEmpty()) {
                                    var a = this.ends[r];
                                    this.children().disown().withDirAdopt(r, i.parent, i[r], i[-r]).jQ.insDirOf(-r, i.jQ),
                                        i[-r] = a
                                }
                                t.supsub = n,
                                    delete t[e],
                                    delete t[s + "Into"],
                                    t[n][s + "OutOf"] = qt,
                                    delete t[n].deleteOutOf,
                                "sub" === e && d(t.jQ.addClass("mq-sup-only")[0].lastChild).remove(),
                                    this.remove()
                            }
                        }(this, "sub sup".split(" ")[e], "sup sub".split(" ")[e], "down up".split(" ")[e])
                }
        }
    ));
    function qt(t) {
        var e = this.parent
            , n = t;
        do {
            if (n[1])
                return t.insLeftOf(e);
            n = n.parent.parent
        } while (n !== e);
        t.insRightOf(e)
    }
    b.subscript = b._ = p(gt, (function(t, e) {
            t.supsub = "sub",
                t.htmlTemplate = '<span class="mq-supsub mq-non-leaf"><span class="mq-sub">&0</span><span style="display:inline-block;width:0">&#8203;</span></span>',
                t.textTemplate = ["_"],
                t.finalizeTree = function() {
                    this.downInto = this.sub = this.ends[f],
                        this.sub.upOutOf = qt,
                        e.finalizeTree.call(this)
                }
        }
    )),
        b.superscript = b.supscript = b["^"] = p(gt, (function(t, e) {
                t.supsub = "sup",
                    t.htmlTemplate = '<span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup">&0</span></span>',
                    t.textTemplate = ["^"],
                    t.finalizeTree = function() {
                        this.upInto = this.sup = this.ends[1],
                            this.sup.downOutOf = qt,
                            e.finalizeTree.call(this)
                    }
                    ,
                    t.reflow = function() {
                        var t = this.jQ;
                        this.blocks && this.blocks[0] && "\\circ " == this.blocks[0].latex() ? t.css("vertical-align", "0.4em") : t.css("vertical-align", "0.5em")
                    }
            }
        )),
        b["{}/{}"] = p(gt, (function(t, e) {
                t.htmlTemplate = '<span class="mq-non-leaf"><span>&0</span></span><span>/</span><span class="mq-non-leaf"><span >&1</span></span>',
                    t.textTemplate = ["{}/{}"],
                    t.latex = function() {
                        return "{" + this.ends[f].latex() + "}/{" + this.ends[1].latex() + "}"
                    }
            }
        ));
    var bt = p($, (function(t, e) {
            t.init = function(t, e) {
                var n = '<span class="mq-large-operator mq-non-leaf"><span class="mq-to"><span>&1</span></span><big>' + e + '</big><span class="mq-from"><span>&0</span></span></span>';
                P.prototype.init.call(this, t, n)
            }
                ,
                t.createLeftOf = function(t) {
                    e.createLeftOf.apply(this, arguments),
                    t.options.sumStartsWithNEquals && (tt("n").createLeftOf(t),
                        ut().createLeftOf(t))
                }
                ,
                t.latex = function() {
                    function t(t) {
                        return 1 === t.length ? t : "{" + (t || " ") + "}"
                    }
                    return this.ctrlSeq + "_" + t(this.ends[f].latex()) + "^" + t(this.ends[1].latex())
                }
                ,
                t.parser = function() {
                    for (var t = R.string, e = R.optWhitespace, n = R.succeed, s = M.block, r = this, i = r.blocks = [U(), U()], a = 0; a < i.length; a += 1)
                        i[a].adopt(r, r.ends[1], 0);
                    return e.then(t("_").or(t("^"))).then((function(t) {
                            var e = i["_" === t ? 0 : 1];
                            return s.then((function(t) {
                                    return t.children().adopt(e, e.ends[1], 0),
                                        n(r)
                                }
                            ))
                        }
                    )).many().result(r)
                }
                ,
                t.finalizeTree = function() {
                    this.downInto = this.ends[f],
                        this.upInto = this.ends[1],
                        this.ends[f].upOutOf = this.ends[1],
                        this.ends[1].downOutOf = this.ends[f]
                }
        }
    ));
    b.sum = h(N, "\\sum ", "&sum;"),
        b["\\sum_{}{}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\sum_{}{}",
                    t.htmlTemplate = '<span class="mq-non-leaf mq-fraction" style="vertical-align:-0.6em;"><span class="mq-scaled mq-scale mq-paren">&sum;</span><span class="mq-non-leaf"><span style="margin-left:0.4em;">&0</span><span class="mq-adFunction" style="width:10px;">&1</span></span></span>',
                    t.textTemplate = [""],
                    t.latex = function() {
                        return "\\sum_{" + this.ends[1].latex() + "}{" + this.ends[f].latex() + "}"
                    }
            }
        )),
        b.xrightarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\xrightarrow",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf" style="vertical-align:-0.4em;"><span class="mq-over" style="font-size:0.7em;">&0</span><div class="mq-overarrow mq-arrow-right"></div></span>',
                    t.textTemplate = [""],
                    t.parser = function() {
                        return M.optBlock.then((function(t) {
                                return M.block.map((function(e) {
                                        var n = wt();
                                        return n.blocks = [t, e],
                                            t.adopt(n, 0, 0),
                                            e.adopt(n, t, 0),
                                            n
                                    }
                                ))
                            }
                        )).or(e.parser.call(this))
                    }
            }
        ));
    var wt = b["\\xrightarrow[]{}"] = p($, (function(t, e) {
            t.ctrlSeq = "\\xrightarrow",
                t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align:-0.6em;"><span class="mq-over" style="font-size:0.7em;">&0</span><div class="mq-overarrow mq-arrow-right"></div><span class="mq-overunder mq-underset"><span class="mq-under">&1</span></span></span>',
                t.textTemplate = [""],
                t.latex = function() {
                    return "\\xrightarrow[" + this.ends[1].latex() + "]{" + this.ends[f].latex() + "}"
                }
        }
    ));
    b.overxrightarrow = p($, (function(t, e) {
            t.ctrlSeq = "\\overxrightarrow",
                t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align:-0.7em;"><div class="mq-overarrow mq-arrow-right"></div><span class="mq-overunder mq-underset"><span class="mq-under">&0</span></span></span>',
                t.textTemplate = [""]
        }
    )),
        b.underxleftarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\underxleftarrow",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align:-0.7em;"><div class="mq-overarrow mq-arrow-left"></div><span class="mq-overunder mq-underset"><span class="mq-under">&0</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.xleftarrow = p($, (function(t, e) {
                t.ctrlSeq = "\\xleftarrow",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf" style="vertical-align:-0.4em;"><span class="mq-over" style="font-size:0.7em;">&0</span><div class="mq-overarrow mq-arrow-left"></div></span>',
                    t.textTemplate = [""],
                    t.parser = function() {
                        return M.optBlock.then((function(t) {
                                return M.block.map((function(e) {
                                        var n = xt();
                                        return n.blocks = [t, e],
                                            t.adopt(n, 0, 0),
                                            e.adopt(n, t, 0),
                                            n
                                    }
                                ))
                            }
                        )).or(e.parser.call(this))
                    }
            }
        ));
    var xt = b["\\xleftarrow[]{}"] = p($, (function(t, e) {
            t.ctrlSeq = "\\xleftarrow[]{}",
                t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align:-0.7em;"><span class="mq-over">&0</span><div class="mq-overarrow mq-arrow-left"></div><span class="mq-overunder mq-underset"><span class="mq-under">&1</span></span></span>',
                t.textTemplate = [""],
                t.latex = function() {
                    return "\\xleftarrow[" + this.ends[1].latex() + "]{" + this.ends[f].latex() + "}"
                }
        }
    ));
    b["\\overset{}{\\longleftrightarrow}"] = p($, (function(t, e) {
            t.ctrlSeq = "\\overset{}{\\longleftrightarrow}",
                t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf" style="vertical-align:-0.2em;"><span class="mq-over">&0</span><div class="mq-overarrow mq-arrow-both"></div></span>',
                t.latex = function() {
                    return "\\overset{" + this.ends[f].latex() + "}{\\longleftrightarrow}"
                }
        }
    )),
        b["\\underset{}{\\longleftrightarrow}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\underset{}{\\longleftrightarrow}",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf" style="vertical-align:-0.6em;"><div class="mq-overarrow mq-arrow-both"></div><span class="mq-under">&0</span></span>',
                    t.latex = function() {
                        return "\\underset{" + this.ends[f].latex() + "}{\\longleftrightarrow}"
                    }
            }
        )),
        b["\\underset{}{\\overset{}{\\longleftrightarrow}}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\underset{}{\\overset{}{\\longleftrightarrow}}",
                    t.htmlTemplate = '<span class="mq-overset mq-overunder mq-non-leaf" style="vertical-align:-0.7em;"><span class="mq-over">&0</span><div class="mq-overarrow mq-arrow-both"></div><span class="mq-overunder mq-underset"><span class="mq-under">&1</span></span></span>',
                    t.latex = function() {
                        return "\\underset{" + this.ends[1].latex() + "}{\\overset{" + this.ends[f].latex() + "}{\\longleftrightarrow}}"
                    }
            }
        )),
        b["\\overset{}{\\leftrightarrows}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\overset{}{\\leftrightarrows}",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf" style="vertical-align:-0.3em;"><span class="mq-over">&0</span><span class="mq-under"><div class="mq-overarrow mq-arrow-right"></div><div class="mq-overarrow mq-arrow-left"></div></span></span>',
                    t.textTemplate = [""],
                    t.latex = function() {
                        return "\\overset{" + this.ends[f].latex() + "}{\\leftrightarrows}"
                    }
            }
        )),
        b["\\underset{}{\\leftrightarrows}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\underset{}{\\leftrightarrows}",
                    t.htmlTemplate = '<span class="mq-underset mq-overunder mq-non-leaf" style="vertical-align:-0.9em;"><span class="mq-over"><div class="mq-overarrow mq-arrow-right"></div><div class="mq-overarrow mq-arrow-left"></div></span><span class="mq-under">&0</span></span>',
                    t.textTemplate = [""],
                    t.latex = function() {
                        return "\\underset{" + this.ends[f].latex() + "}{\\leftrightarrows}"
                    }
            }
        )),
        b.lefttopbox = p($, (function(t, e) {
                t.ctrlSeq = "\\lefttopbox",
                    t.htmlTemplate = '<span class="mq-left-top-boxed"><span>&0</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.toprightbox = p($, (function(t, e) {
                t.ctrlSeq = "\\toprightbox",
                    t.htmlTemplate = '<span class="mq-top-right-boxed"><span>&0</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.leftbottombox = p($, (function(t, e) {
                t.ctrlSeq = "\\leftbottombox",
                    t.htmlTemplate = '<span class="mq-left-bottom-boxed"><span>&0</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.rightbottombox = p($, (function(t, e) {
                t.ctrlSeq = "\\rightbottombox",
                    t.htmlTemplate = '<span class="mq-right-bottom-boxed"><span>&0</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.boxed = p($, (function(t, e) {
                t.ctrlSeq = "\\boxed",
                    t.htmlTemplate = '<span class="mq-boxed"><span>&0</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.overcirc = p($, (function(t, e) {
                t.ctrlSeq = "\\overcirc",
                    t.htmlTemplate = '<span class="mq-overunder mq-overset mq-non-leaf" style="display: inline-block;margin-right: 0.5em;"><span class="mq-overunder mq-underset" style="display: inline-block;"><span class="mq-under" style="font-size: 1em;">&0</span><span class="my-sup">&#8728;</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.overprime = p($, (function(t, e) {
                t.ctrlSeq = "\\overprime",
                    t.htmlTemplate = '<span class="mq-overunder mq-overset mq-non-leaf" style="display: inline-block;"><span class="mq-overunder mq-underset" style="display: inline-block;"><span class="mq-under" style="font-size: 1em;">&0</span><span class="my-sup">&prime;</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.overpprime = p($, (function(t, e) {
                t.ctrlSeq = "\\overpprime",
                    t.htmlTemplate = '<span class="mq-overunder mq-overset mq-non-leaf" style="display: inline-block;margin-right: 0.6em;vertical-align: -0.1em;"><span class="mq-overunder mq-underset" style="display: inline-block;"><span class="mq-under" style="font-size: 1em;">&0</span><span class="my-sup2">&prime;&prime;</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.overppprime = p($, (function(t, e) {
                t.ctrlSeq = "\\overppprime",
                    t.htmlTemplate = '<span class="mq-overunder mq-overset mq-non-leaf" style="margin-right: 0.7em;vertical-align: -0.1em;"><span class="mq-overunder mq-underset" style="display: inline-block;"><span class="mq-under" style="font-size: 1em;">&0</span><span class="my-sup3">&prime;&prime;&prime;</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.overbackprime = p($, (function(t, e) {
                t.ctrlSeq = "\\overbackprime",
                    t.htmlTemplate = '<span class="mq-overunder mq-overset mq-non-leaf" style="margin-left: 0.3em;vertical-align: -0.1em;"><span class="my-back-sup">&#96;</span><span class="mq-overunder mq-underset" style="display: inline-block;"><span class="mq-under" style="font-size: 1em;">&0</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.dot = p($, (function(t, e) {
                t.ctrlSeq = "\\dot",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-dot-recurring-inner"><span class="mq-dot-recurring">&#x2d9;</span><span class="mq-dot-box">&0</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.ddot = p($, (function(t, e) {
                t.ctrlSeq = "\\ddot",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-dot-recurring-inner"><span class="mq-dot-recurring">&#x2d9;&#x2d9;</span><span class="mq-dot-box">&0</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.dddot = p($, (function(t, e) {
                t.ctrlSeq = "\\dddot",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-dot-recurring-inner"><span class="mq-dot-recurring">&#x2d9;&#x2d9;&#x2d9;</span><span class="mq-dot-box">&0</span></span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.underdot = p($, (function(t, e) {
                t.ctrlSeq = "\\underdot",
                    t.htmlTemplate = '<span class="mq-dot-underset mq-non-leaf"><span class="mq-dot-box">&0</span><span class="mq-dot-recurring">&#x2d9;</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.underddot = p($, (function(t, e) {
                t.ctrlSeq = "\\underddot",
                    t.htmlTemplate = '<span class="mq-dot-underset mq-non-leaf"><span class="mq-dot-box">&0</span><span class="mq-dot-recurring">&#x2d9;&#x2d9;</span></span>',
                    t.textTemplate = [""]
            }
        )),
        b.underdddot = p($, (function(t, e) {
                t.ctrlSeq = "\\underdddot",
                    t.htmlTemplate = '<span class="mq-dot-underset mq-non-leaf"><span class="mq-dot-box">&0</span><span class="mq-dot-recurring">&#x2d9;&#x2d9;&#x2d9;</span></span>',
                    t.textTemplate = [""]
            }
        ));
    var yt = b.frac = b.cfrac = b.fraction = p($, (function(t, e) {
            t.ctrlSeq = "\\frac",
                t.htmlTemplate = '<span class="mq-fraction mq-non-leaf"><span class="mq-numerator">&0</span><div  style="border-top:1px solid;"></div><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>',
                t.textTemplate = ["(", ")/(", ")"],
                t.finalizeTree = function() {
                    this.upInto = this.ends[1].upOutOf = this.ends[f],
                        this.downInto = this.ends[f].downOutOf = this.ends[1]
                }
        }
    ));
    b.dfrac = p($, (function(t, e) {
            t.ctrlSeq = "\\dfrac",
                t.htmlTemplate = '<span class="mq-fraction mq-non-leaf" style="font-size:100%;"><span class="mq-numerator">&0</span><div style="border-top:1px solid;"></div><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>',
                t.textTemplate = ["(", ")/(", ")"],
                t.finalizeTree = function() {
                    this.upInto = this.ends[1].upOutOf = this.ends[f],
                        this.downInto = this.ends[f].downOutOf = this.ends[1]
                }
        }
    )),
        b.tfrac = p($, (function(t, e) {
                t.ctrlSeq = "\\tfrac",
                    t.htmlTemplate = '<span class="mq-fraction mq-non-leaf" style="font-size:70%;"><span class="mq-numerator">&0</span><div style="border-top:1px solid;"></div><span class="mq-denominator">&1</span><span style="display:inline-block;width:0">&#8203;</span></span>',
                    t.textTemplate = ["(", ")/(", ")"],
                    t.finalizeTree = function() {
                        this.upInto = this.ends[1].upOutOf = this.ends[f],
                            this.downInto = this.ends[f].downOutOf = this.ends[1]
                    }
            }
        ));
    var Tt = b.over = p(yt, (function(t, e) {
            t.createLeftOf = function(t) {
                if (!this.replacedFragment) {
                    for (var n = t[f]; n && !(n instanceof W || n instanceof (b.text || a) || n instanceof bt || "\\ " === n.ctrlSeq || /^[,;:]$/.test(n.ctrlSeq)); )
                        n = n[f];
                    n instanceof bt && n[1]instanceof gt && (n = n[1])[1]instanceof gt && n[1].ctrlSeq != n.ctrlSeq && (n = n[1]),
                    n !== t[f] && (this.replaces(q(n[1] || t.parent.ends[f], t[f])),
                        t[f] = n)
                }
                e.createLeftOf.call(this, t)
            }
        }
    ));
    b["\\overset{}{\\overline{\\left){}\\right.}}"] = p($, (function(t, e) {
            t.ctrlSeq = "\\overset{}{\\overline{\\left){}\\right.}}",
                t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-numerator" style="width:20px;font-size:70%;margin-left:12px;">&0</span><span class="math-division">)</span><span class="mq-non-leaf mq-sqrt-stem">&1</span></span>',
                t.template = [""],
                t.latex = function() {
                    return "\\overset{" + this.ends[f].latex() + "}{\\overline{\\left){" + this.ends[1].latex() + "}\\right.}}"
                }
                ,
                t.reflow = function() {
                    var t = this.ends[1].jQ;
                    ht(t.prev(), 1, t.innerHeight() / +parseFloat(t.css("fontSize").slice(0, -2)) + .2)
                }
        }
    )),
        b.vertical = p($, (function(t, e) {
                t.ctrlSeq = "\\vertical",
                    t.htmlTemplate = '<span class="mq-vertical mq-non-leaf"><div class="mq-vertical-line"><span>)</span><span class="mq-vertical-under">&0</span></div></span>',
                    t.template = [""]
            }
        )),
        b["\\overline{\\left){}\\right.}"] = p($, (function(t, e) {
                t.ctrlSeq = "\\overline{\\left){}\\right.}",
                    t.htmlTemplate = '<span class="mq-non-leaf"><span class="math-division">)</span><span class="mq-non-leaf mq-sqrt-stem">&0</span></span>',
                    t.textTemplate = [""],
                    t.latex = function() {
                        return "\\overline{\\left){" + this.ends[f].latex() + "}\\right.}"
                    }
                    ,
                    t.reflow = function() {
                        var t = this.ends[1].jQ;
                        ht(t.prev(), 1, t.innerHeight() / +parseFloat(t.css("fontSize").slice(0, -2)) + .2)
                    }
            }
        )),
        b.overbrace = p($, (function(t, e) {
                t.ctrlSeq = "\\overbrace{}^{}",
                    t.htmlTemplate = '<span class="overbrace-box mq-overunder mq-overset mq-non-leaf" style="margin-right:5px;"><span class="mq-over">&1</span><div style="transform:rotate(90deg);">{</div><span class="mq-overunder mq-underset"><span class="mq-under" style="font-size:1em;margin:0;">&0</span></span></span>',
                    t.textTemplate = [""],
                    t.latex = function() {
                        return "\\overbrace{" + this.ends[f].latex() + "}^{" + this.ends[1].latex().substring(1) + "}"
                    }
            }
        )),
        b.underbrace = p($, (function(t, e) {
                t.ctrlSeq = "\\underbrace{}_{}",
                    t.htmlTemplate = '<span class="mq-overunder mq-overset mq-non-leaf" style="vertical-align:-1.86em;margin-right:5px;"><span class="mq-over" style="font-size:1em;margin:0;">&0</span><div style="transform:rotate(270deg);">{</div><span class="mq-overunder mq-underset"><span class="mq-under underbrace-under">&1</span></span></span>',
                    t.textTemplate = [""],
                    t.latex = function() {
                        return "\\underbrace{" + this.ends[f].latex() + "}_{" + this.ends[1].latex().substring(1) + "}"
                    }
            }
        )),
        b.not = p($, (function(t, e) {
                t.ctrlSeq = "\\not",
                    t.htmlTemplate = '<span style="position:relative;top:0;left:0;"><span >&0</span><span style="position:absolute;top:0px;left:3px;transform:scale(1.5,1.5)">/</span></span>',
                    t.textTemplate = ["not{", "}"],
                    t.latex = function() {
                        return "\\not{" + this.ends[f].latex() + "}"
                    }
            }
        ));
    b.sqrt = b["√"] = p($, (function(t, e) {
            t.ctrlSeq = "\\sqrt",
                t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-scaled mq-sqrt-prefix">&radic;</span><span class="mq-non-leaf mq-sqrt-stem">&0</span></span>',
                t.textTemplate = ["sqrt(", ")"],
                t.parser = function() {
                    return M.optBlock.then((function(t) {
                            return M.block.map((function(e) {
                                    var n = kt();
                                    return n.blocks = [t, e],
                                        t.adopt(n, 0, 0),
                                        e.adopt(n, t, 0),
                                        n
                                }
                            ))
                        }
                    )).or(e.parser.call(this))
                }
                ,
                t.reflow = function() {
                    var t = this.ends[1].jQ;
                    ht(t.prev(), 1, t.innerHeight() / +t.css("fontSize").slice(0, -2) - .1)
                }
        }
    )),
        b.hat = b.widehat = p($, (function(t, e) {
                t.ctrlSeq = "\\hat",
                    t.htmlTemplate = '<span class="mq-hat mq-non-leaf"><span class="mq-hat-prefix" style="font-family:monospace;">^</span><span class="mq-hat-stem">&0</span></span>',
                    t.textTemplate = ["hat(", ")"]
            }
        ));
    var kt = b["\\nthroot"] = p($, (function(t, e) {
            t.ctrlSeq = "\\nthroot{}",
                t.htmlTemplate = '<sup class="mq-nthroot mq-non-leaf">&0</sup><span class="mq-scaled"><span class="mq-sqrt-prefix mq-scaled">&radic;</span><span class="mq-sqrt-stem mq-non-leaf">&1</span></span>',
                t.textTemplate = ["sqrt[", "](", ")"],
                t.latex = function() {
                    return "\\sqrt[" + this.ends[f].latex() + "]{" + this.ends[1].latex() + "}"
                }
        }
    ))
        , Ot = p($, (function(t, e) {
            t.init = function(t, n, s) {
                var r = '<span class="mq-overset mq-overunder mq-non-leaf"><span class="mq-over"><span class="special mq-undefined-symbol">' + n + '</span></span><span class="mq-under">&0</span></span>';
                e.init.call(this, t, r, s)
            }
        }
    ));
    function St(t, e) {
        t.jQadd = function() {
            e.jQadd.apply(this, arguments),
                this.delimjQs = this.jQ.children(":first").add(this.jQ.children(":last")),
                this.contentjQ = this.jQ.children(":eq(1)")
        }
            ,
            t.reflow = function() {
                var t = this.contentjQ.outerHeight() / parseFloat(this.contentjQ.css("fontSize"));
                /^⟨/.test(this.jQ.children(":first").html()) || /⟩$/.test(this.jQ.children(":last").html()) ? ht(this.delimjQs, r(1 + .2 * (t - 1), 1.2), 1.3 * t) : ht(this.delimjQs, r(1 + .2 * (t - 1), 1.2), 1 * t)
            }
    }
    b.vec = h(Ot, "\\vec", "&rarr;", ["vec(", ")"]),
        b.tilde = b.widetilde = h(Ot, "\\tilde", "~", ["tilde(", ")"]);
    var jt = p(p($, St), (function(e, n) {
            e.init = function(e, s, r, i, a) {
                n.init.call(this, "\\left" + i, t, [s, r]),
                    this.side = e,
                    this.sides = {},
                    this.sides[f] = {
                        ch: s,
                        ctrlSeq: i
                    },
                    this.sides[1] = {
                        ch: r,
                        ctrlSeq: a
                    }
            }
                ,
                e.numBlocks = function() {
                    return 1
                }
                ,
                e.html = function() {
                    return this.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-scaled mq-paren' + (1 === this.side ? " mq-ghost" : "") + '">' + this.sides[f].ch + '</span><span class="mq-non-leaf">&0</span><span class="mq-scaled mq-paren' + (this.side === f ? " mq-ghost" : "") + '">' + this.sides[1].ch + "</span></span>",
                        n.html.call(this)
                }
                ,
                e.latex = function() {
                    return "\\left" + this.sides[f].ctrlSeq + " " + this.ends[f].latex() + "\\right" + this.sides[1].ctrlSeq
                }
                ,
                e.matchBrack = function(t, e, n) {
                    return n instanceof jt && n.side && n.side !== -e && (!t.restrictMismatchedBrackets || Qt[this.sides[this.side].ch] === n.sides[n.side].ch || {
                        "(": "]",
                        "[": ")"
                    }[this.sides[f].ch] === n.sides[1].ch) && n
                }
                ,
                e.closeOpposing = function(t) {
                    t.side = 0,
                        t.sides[this.side] = this.sides[this.side],
                        t.delimjQs.eq(this.side === f ? 0 : 1).removeClass("mq-ghost").html(this.sides[this.side].ch)
                }
                ,
                e.createLeftOf = function(t) {
                    if (!this.replacedFragment) {
                        var e = t.options;
                        if ("|" === this.sides[f].ch)
                            var s = this.matchBrack(e, 1, t[1]) || this.matchBrack(e, f, t[f]) || this.matchBrack(e, 0, t.parent.parent);
                        else
                            s = this.matchBrack(e, -this.side, t[-this.side]) || this.matchBrack(e, -this.side, t.parent.parent)
                    }
                    if (s) {
                        var r = this.side = -s.side;
                        this.closeOpposing(s),
                        s === t.parent.parent && t[r] && q(t[r], t.parent.ends[r], -r).disown().withDirAdopt(-r, s.parent, s, s[r]).jQ.insDirOf(r, s.jQ),
                            s.bubble("reflow")
                    } else
                        r = (s = this).side,
                            s.replacedFragment ? s.side = 0 : t[-r] && (s.replaces(q(t[-r], t.parent.ends[-r], r)),
                                t[-r] = 0),
                            n.createLeftOf.call(s, t);
                    r === f ? t.insAtLeftEnd(s.ends[f]) : t.insRightOf(s)
                }
                ,
                e.placeCursor = a,
                e.unwrap = function() {
                    this.ends[f].children().disown().adopt(this.parent, this, this[1]).jQ.insertAfter(this.jQ),
                        this.remove()
                }
                ,
                e.deleteSide = function(t, e, n) {
                    var s = this.parent
                        , r = this[t]
                        , i = s.ends[t];
                    if (t === this.side)
                        return this.unwrap(),
                            void (r ? n.insDirOf(-t, r) : n.insAtDirEnd(t, s));
                    var a = n.options
                        , o = !this.side;
                    if (this.side = -t,
                        this.matchBrack(a, t, this.ends[f].ends[this.side])) {
                        this.closeOpposing(this.ends[f].ends[this.side]);
                        var l = this.ends[f].ends[t];
                        this.unwrap(),
                        l.siblingCreated && l.siblingCreated(n.options, t),
                            r ? n.insDirOf(-t, r) : n.insAtDirEnd(t, s)
                    } else {
                        if (this.matchBrack(a, t, this.parent.parent))
                            this.parent.parent.closeOpposing(this),
                                this.parent.parent.unwrap();
                        else {
                            if (e && o)
                                return this.unwrap(),
                                    void (r ? n.insDirOf(-t, r) : n.insAtDirEnd(t, s));
                            this.sides[t] = {
                                ch: Qt[this.sides[this.side].ch],
                                ctrlSeq: Qt[this.sides[this.side].ctrlSeq]
                            },
                                this.delimjQs.removeClass("mq-ghost")
                        }
                        if (r) {
                            l = this.ends[f].ends[t];
                            q(r, i, -t).disown().withDirAdopt(-t, this.ends[f], l, 0).jQ.insAtDirEnd(t, this.ends[f].jQ.removeClass("mq-empty")),
                            l.siblingCreated && l.siblingCreated(n.options, t),
                                n.insDirOf(-t, r)
                        } else
                            e ? n.insDirOf(t, this) : n.insAtDirEnd(t, this.ends[f])
                    }
                }
                ,
                e.deleteTowards = function(t, e) {
                    this.deleteSide(-t, !1, e)
                }
                ,
                e.finalizeTree = function() {
                    this.ends[f].deleteOutOf = function(t, e) {
                        this.parent.deleteSide(t, !0, e)
                    }
                        ,
                        this.finalizeTree = this.intentionalBlur = function() {
                            this.delimjQs.eq(this.side === f ? 1 : 0).removeClass("mq-ghost"),
                                this.side = 0
                        }
                }
                ,
                e.siblingCreated = function(t, e) {
                    e === -this.side && this.finalizeTree()
                }
        }
    ))
        , Qt = {
        "(": ")",
        ")": "(",
        "[": "]",
        "]": "[",
        "{": "}",
        "}": "{",
        "\\{": "\\}",
        "\\}": "\\{",
        "&lang;": "&rang;",
        "&rang;": "&lang;",
        "\\langle ": "\\rangle ",
        "\\rangle ": "\\langle ",
        "|": "|",
        "\\lVert ": "\\rVert ",
        "\\rVert ": "\\lVert "
    };
    b.lVert = h(N, "\\lVert", "||"),
        b.rVert = h(N, "\\rVert", "||"),
        b.langle = h(N, "\\langle", "⟨"),
        b.rangle = h(N, "\\rangle", "⟩"),
        b.left = p($, (function(t) {
                t.parser = function() {
                    var t = R.regex
                        , e = R.string
                        , n = (R.succeed,
                        R.optWhitespace);
                    return n.then(t(/^(?:[\]\.\)([|]|\\\{|\\\||\\langle|\\lVert\b)/)).then((function(s) {
                            var r = "\\" === s.charAt(0) ? s.slice(1) : s;
                            return "." == s && (r = "",
                                s += " "),
                            "\\langle" == s && (r = "&lang;",
                                s += " "),
                            "\\lVert" == s && (r = "||",
                                s += " "),
                                M.then((function(i) {
                                        return e("\\right").skip(n).then(t(/^(?:[\[\]\.)|]|\\\}|\\rangle|\\rVert\b)/)).map((function(t) {
                                                var e = "\\" === t.charAt(0) ? t.slice(1) : t;
                                                "." == t && (e = "",
                                                    t += " "),
                                                "\\rangle" == t && (e = "&rang;",
                                                    t += " "),
                                                "\\rVert" == t && (e = "||",
                                                    t += " ");
                                                var n = jt(0, r, e, s, t);
                                                return n.blocks = [i],
                                                    i.adopt(n, 0, 0),
                                                    n
                                            }
                                        ))
                                    }
                                ))
                        }
                    ))
                }
            }
        )),
        b.right = p($, (function(t) {
                t.parser = function() {
                    return R.fail("unmatched \\right")
                }
            }
        ));
    var Ct = b.binom = b.binomial = p(p($, St), (function(t, e) {
            t.ctrlSeq = "\\binom",
                t.htmlTemplate = '<span class="mq-non-leaf"><span class="mq-paren mq-scaled">(</span><span class="mq-non-leaf"><span class="mq-array mq-non-leaf"><span>&0</span><span>&1</span></span></span><span class="mq-paren mq-scaled">)</span></span>',
                t.textTemplate = ["choose(", ",", ")"]
        }
    ));
    b.choose = p(Ct, (function(t) {
            t.createLeftOf = Tt.prototype.createLeftOf
        }
    ));
    b.editable = b.MathQuillMathField = p($, (function(t, e) {
            t.ctrlSeq = "\\MathQuillMathField",
                t.htmlTemplate = '<span class="mq-editable-field"><span class="mq-root-block">&0</span></span>',
                t.parser = function() {
                    var t = this
                        , n = R.string
                        , s = R.regex
                        , r = R.succeed;
                    return n("[").then(s(/^[a-z][a-z0-9]*/i)).skip(n("]")).map((function(e) {
                            t.name = e
                        }
                    )).or(r()).then(e.parser.call(t))
                }
                ,
                t.finalizeTree = function(t) {
                    var e = T(this.ends[f], this.jQ, t);
                    e.KIND_OF_MQ = "MathField",
                        e.editable = !0,
                        e.createTextarea(),
                        e.editablesTextareaEvents(),
                        e.cursor.insAtRightEnd(e.root),
                        z(e.root)
                }
                ,
                t.registerInnerField = function(t, e) {
                    t.push(t[this.name] = e(this.ends[f].controller))
                }
                ,
                t.latex = function() {
                    return this.ends[f].latex()
                }
                ,
                t.text = function() {
                    return this.ends[f].text()
                }
        }
    ));
    var _t = b.embed = p(P, (function(t, e) {
            t.setOptions = function(t) {
                function e() {
                    return ""
                }
                return this.text = t.text || e,
                    this.htmlTemplate = t.htmlString || "",
                    this.latex = t.latex || e,
                    this
            }
                ,
                t.parser = function() {
                    var t = this
                        , e = R.string
                        , n = R.regex
                        , s = R.succeed;
                    return e("{").then(n(/^[a-z][a-z0-9]*/i)).skip(e("}")).then((function(r) {
                            return e("[").then(n(/^[-\w\s]*/)).skip(e("]")).or(s()).map((function(e) {
                                    return t.setOptions(Q[r](e))
                                }
                            ))
                        }
                    ))
                }
        }
    ))
        , Dt = {};
    b.begin = p($, (function(t, e) {
            t.parser = function() {
                var t = R.string
                    , e = R.regex;
                return t("{").then(e(/^[a-z]+/i)).skip(t("}")).then((function(e) {
                        return (Dt[e] ? Dt[e]().parser() : R.fail("unknown environment type: " + e)).skip(t("\\end{" + e + "}"))
                    }
                ))
            }
        }
    ));
    var Et = p($, (function(t, e) {
            t.template = [["\\begin{", "}"], ["\\end{", "}"]],
                t.wrappers = function() {
                    return [t.template[0].join(this.environment), t.template[1].join(this.environment)]
                }
        }
    ))
        , Lt = p($, (function(t, e) {
            t.template = [["\\begin{", "}{c} "], [" \\end{", "}"]],
                t.wrappers = function(e) {
                    return e = e || "",
                        t.template[0][1] = "}{" + e + "} ",
                        [t.template[0].join(this.environment), t.template[1].join(this.environment)]
                }
        }
    ))
        , At = Dt.matrix = p(Et, (function(t, e) {
            var n = "&"
                , i = "\\\\";
            t.parentheses = {
                left: null,
                right: null
            },
                t.environment = "matrix",
                t.reflow = function() {
                    var t = this.jQ.children("table")
                        , e = t.outerHeight() / +t.css("fontSize").slice(0, -2)
                        , n = this.jQ.children(".mq-paren");
                    n.length && ht(n, r(1 + .2 * (e - 1), 1.2), 1.05 * e)
                }
                ,
                t.latex = function() {
                    var t, e = "";
                    return this.eachChild((function(s) {
                            void 0 !== t && (e += t !== s.row ? i : n),
                                t = s.row,
                                e += s.latex()
                        }
                    )),
                        this.wrappers().join(e)
                }
                ,
                t.html = function() {
                    var t, n = [], s = "", r = 0;
                    function i(t) {
                        return t ? '<span class="mq-scaled mq-paren">' + t + "</span>" : ""
                    }
                    return this.eachChild((function(e) {
                            t !== e.row && (t = e.row,
                                s += "<tr>$tds</tr>",
                                n[t] = []),
                                n[t].push('<td class="">&' + r++ + "</td>")
                        }
                    )),
                        this.htmlTemplate = '<span class="mq-matrix mq-non-leaf">' + i(this.parentheses.left) + '<table class="mq-non-leaf" cellspacing="10">' + s.replace(/\$tds/g, (function() {
                                return n.shift().join("")
                            }
                        )) + "</table>" + i(this.parentheses.right) + "</span>",
                        e.html.call(this)
                }
                ,
                t.createBlocks = function() {
                    this.blocks = [zt(0, this), zt(0, this), zt(1, this), zt(1, this)]
                }
                ,
                t.parser = function() {
                    var t = this
                        , e = R.optWhitespace
                        , s = R.string;
                    return e.then(s(n).or(s(i)).or(M.block)).many().skip(e).then((function(e) {
                            var n = []
                                , s = 0;
                            function r() {
                                t.blocks.push(zt(s, t, n)),
                                    n = []
                            }
                            t.blocks = [];
                            for (var a = 0; a < e.length; a += 1)
                                e[a]instanceof U ? n.push(e[a]) : (r(),
                                e[a] === i && (s += 1));
                            return r(),
                                t.autocorrect(),
                                R.succeed(t)
                        }
                    ))
                }
                ,
                t.finalizeTree = function() {
                    var t = this.jQ.find("table");
                    t.toggleClass("mq-rows-1", 1 === t.find("tr").length),
                        this.relink()
                }
                ,
                t.getEntryPoint = function(t, e, n) {
                    return "up" === n ? t === f ? this.blocks[this.rowSize - 1] : this.blocks[0] : t === f ? this.blocks[this.blocks.length - 1] : this.blocks[this.blocks.length - this.rowSize]
                }
                ,
                t.atExitPoint = function(t, e) {
                    var n = this.blocks.indexOf(e.parent);
                    return t === f ? n % this.rowSize == 0 : (n + 1) % this.rowSize == 0
                }
                ,
                t.moveTowards = function(t, e, n) {
                    var s = n && this.getEntryPoint(t, e, n);
                    e.insAtDirEnd(-t, s || this.ends[-t])
                }
                ,
                t.relink = function() {
                    var t, e, n, s = this.blocks, r = [];
                    this.rowSize = s.length;
                    for (var i = 0; i < s.length; i += 1)
                        t !== (n = s[i]).row && (1 === n.row && (this.rowSize = e),
                            r[t = n.row] = [],
                            e = 0),
                            r[t][e] = n,
                            n[1] = s[i + 1],
                            n[f] = s[i - 1],
                        r[t - 1] && r[t - 1][e] && (n.upOutOf = r[t - 1][e],
                            r[t - 1][e].downOutOf = n),
                            e += 1;
                    this.ends[f] = s[0],
                        this.ends[1] = s[s.length - 1]
                }
                ,
                t.autocorrect = function(t) {
                    var e, n, s, r, i, a = [], o = (t = [],
                        this.blocks);
                    for (i = 0; i < o.length; i += 1)
                        t[r = o[i].row] = t[r] || [],
                            t[r].push(o[i]),
                            a[r] = t[r].length;
                    if ((e = Math.max.apply(null, a)) !== Math.min.apply(null, a)) {
                        for (i = 0; i < t.length; i += 1)
                            for (n = e - t[i].length; n; )
                                s = e * i + t[i].length,
                                    o.splice(s, 0, zt(i, this)),
                                    n -= 1;
                        this.relink()
                    }
                }
                ,
                t.deleteCell = function(t) {
                    var e, n, s = [], r = [], i = [], a = [], o = this.blocks;
                    function l(t) {
                        for (var e = [], n = 0; n < t.length; n += 1)
                            t[n].isEmpty() && e.push(t[n]);
                        return e.length === t.length
                    }
                    function c(t) {
                        for (var e = 0; e < t.length; e += 1)
                            o.indexOf(t[e]) > -1 && (t[e].remove(),
                                o.splice(o.indexOf(t[e]), 1))
                    }
                    this.eachChild((function(o) {
                            e !== o.row && (e = o.row,
                                s[e] = [],
                                n = 0),
                                r[n] = r[n] || [],
                                r[n].push(o),
                                s[e].push(o),
                            o === t && (i = s[e],
                                a = r[n]),
                                n += 1
                        }
                    )),
                    l(i) && a.length > 1 && (e = s.indexOf(i),
                        this.eachChild((function(t) {
                                t.row > e && (t.row -= 1)
                            }
                        )),
                        c(i),
                        this.jQ.find("tr").eq(e).remove()),
                    l(a) && i.length > 1 && c(a),
                        this.finalizeTree()
                }
                ,
                t.addRow = function(t) {
                    var e, n, r = [], i = [], a = [], o = d("<tr></tr>"), l = t.row, c = 0;
                    this.eachChild((function(e) {
                            e.row <= l && r.push(e),
                            e.row === l && (e === t && (n = c),
                                c += 1),
                            e.row > l && (e.row += 1,
                                a.push(e))
                        }
                    ));
                    for (var u = 0; u < c; u += 1)
                        (e = zt(l + 1)).parent = this,
                            i.push(e),
                            e.jQ = d('<td class="mq-empty">').attr(s, e.id).appendTo(o);
                    return this.jQ.find("tr").eq(l).after(o),
                        this.blocks = r.concat(i, a),
                        i[n]
                }
                ,
                t.addColumn = function(t) {
                    var e, n, r = [], i = [];
                    this.eachChild((function(n) {
                            r[n.row] = r[n.row] || [],
                                r[n.row].push(n),
                            n === t && (e = r[n.row].length)
                        }
                    ));
                    for (var a = 0; a < r.length; a += 1)
                        (n = zt(a)).parent = this,
                            i.push(n),
                            r[a].splice(e, 0, n),
                            n.jQ = d('<td class="mq-empty">').attr(s, n.id);
                    return this.jQ.find("tr").each((function(t) {
                            d(this).find("td").eq(e - 1).after(r[t][e].jQ)
                        }
                    )),
                        this.blocks = [].concat.apply([], r),
                        i[t.row]
                }
                ,
                t.insert = function(t, e) {
                    var n = this[t](e);
                    this.cursor = this.cursor || this.parent.cursor,
                        this.finalizeTree(),
                        this.bubble("reflow").cursor.insAtRightEnd(n)
                }
                ,
                t.backspace = function(t, e, n, s) {
                    var r = t[e];
                    if (t.isEmpty()) {
                        for (this.deleteCell(t); r && r[e] && -1 === this.blocks.indexOf(r); )
                            r = r[e];
                        r && n.insAtDirEnd(-e, r),
                        1 === this.blocks.length && this.blocks[0].isEmpty() && (s(),
                            this.finalizeTree()),
                            this.bubble("edited")
                    }
                }
        }
    ));
    Dt.array = p(Lt, (function(t, e) {
            var n = {
                column: "&",
                row: "\\\\",
                alignResult: ""
            };
            t.parentheses = {
                left: null,
                right: null
            },
                t.environment = "array",
                t.reflow = function() {
                    var t = this.jQ.children("table")
                        , e = t.outerHeight() / +t.css("fontSize").slice(0, -2)
                        , n = this.jQ.children(".mq-paren");
                    n.length && ht(n, r(1 + .2 * (e - 1), 1.2), 1.05 * e)
                }
                ,
                t.latex = function() {
                    var t, e = "";
                    return this.eachChild((function(s) {
                            void 0 !== t && (e += t !== s.row ? n.row : n.column),
                                t = s.row,
                                e += "{" + s.latex() + "}"
                        }
                    )),
                        this.wrappers(n.alignResult).join(e)
                }
                ,
                t.html = function() {
                    var t, n = [], s = "", r = 0;
                    function i(t) {
                        return t ? '<span class="mq-scaled mq-paren">' + t + "</span>" : ""
                    }
                    return this.eachChild((function(e) {
                            t !== e.row && (t = e.row,
                                s += "<tr>$tds</tr>",
                                n[t] = []),
                                n[t].push('<td class="">&' + r++ + "</td>")
                        }
                    )),
                        this.htmlTemplate = '<span class="mq-matrix mq-non-leaf">' + i(this.parentheses.left) + '<table class="mq-non-leaf" cellspacing="10">' + s.replace(/\$tds/g, (function() {
                                return n.shift().join("")
                            }
                        )) + "</table>" + i(this.parentheses.right) + "</span>",
                        e.html.call(this)
                }
                ,
                t.createBlocks = function() {
                    this.blocks = [zt(0, this), zt(0, this), zt(1, this), zt(1, this)]
                }
                ,
                t.parser = function() {
                    var t = this
                        , e = R.optWhitespace
                        , s = R.string;
                    return e.then(s(n.column).or(s(n.row)).or(M.block)).many().skip(e).then((function(e) {
                            var s = []
                                , r = 0;
                            function i() {
                                t.blocks.push(zt(r, t, s)),
                                    s = []
                            }
                            t.blocks = [],
                                n.alignResult = e[0].ends[1].ctrlSeq;
                            for (var a = 1; a < e.length; a += 1)
                                e[a]instanceof U ? s.push(e[a]) : (i(),
                                e[a] === n.row && (r += 1));
                            return i(),
                                t.autocorrect(),
                                R.succeed(t)
                        }
                    ))
                }
                ,
                t.finalizeTree = function() {
                    var t = this.jQ.find("table");
                    t.toggleClass("mq-rows-1", 1 === t.find("tr").length),
                        this.relink()
                }
                ,
                t.getEntryPoint = function(t, e, n) {
                    return "up" === n ? t === f ? this.blocks[this.rowSize - 1] : this.blocks[0] : t === f ? this.blocks[this.blocks.length - 1] : this.blocks[this.blocks.length - this.rowSize]
                }
                ,
                t.atExitPoint = function(t, e) {
                    var n = this.blocks.indexOf(e.parent);
                    return t === f ? n % this.rowSize == 0 : (n + 1) % this.rowSize == 0
                }
                ,
                t.moveTowards = function(t, e, n) {
                    var s = n && this.getEntryPoint(t, e, n);
                    e.insAtDirEnd(-t, s || this.ends[-t])
                }
                ,
                t.relink = function() {
                    var t, e, n, s = this.blocks, r = [];
                    this.rowSize = s.length;
                    for (var i = 0; i < s.length; i += 1)
                        t !== (n = s[i]).row && (1 === n.row && (this.rowSize = e),
                            r[t = n.row] = [],
                            e = 0),
                            r[t][e] = n,
                            n[1] = s[i + 1],
                            n[f] = s[i - 1],
                        r[t - 1] && r[t - 1][e] && (n.upOutOf = r[t - 1][e],
                            r[t - 1][e].downOutOf = n),
                            e += 1;
                    this.ends[f] = s[0],
                        this.ends[1] = s[s.length - 1]
                }
                ,
                t.autocorrect = function(t) {
                    var e, n, s, r, i, a = [], o = (t = [],
                        this.blocks);
                    for (i = 0; i < o.length; i += 1)
                        t[r = o[i].row] = t[r] || [],
                            t[r].push(o[i]),
                            a[r] = t[r].length;
                    if ((e = Math.max.apply(null, a)) !== Math.min.apply(null, a)) {
                        for (i = 0; i < t.length; i += 1)
                            for (n = e - t[i].length; n; )
                                s = e * i + t[i].length,
                                    o.splice(s, 0, zt(i, this)),
                                    n -= 1;
                        this.relink()
                    }
                }
                ,
                t.deleteCell = function(t) {
                    var e, n, s = [], r = [], i = [], a = [], o = this.blocks;
                    function l(t) {
                        for (var e = [], n = 0; n < t.length; n += 1)
                            t[n].isEmpty() && e.push(t[n]);
                        return e.length === t.length
                    }
                    function c(t) {
                        for (var e = 0; e < t.length; e += 1)
                            o.indexOf(t[e]) > -1 && (t[e].remove(),
                                o.splice(o.indexOf(t[e]), 1))
                    }
                    this.eachChild((function(o) {
                            e !== o.row && (e = o.row,
                                s[e] = [],
                                n = 0),
                                r[n] = r[n] || [],
                                r[n].push(o),
                                s[e].push(o),
                            o === t && (i = s[e],
                                a = r[n]),
                                n += 1
                        }
                    )),
                    l(i) && a.length > 1 && (e = s.indexOf(i),
                        this.eachChild((function(t) {
                                t.row > e && (t.row -= 1)
                            }
                        )),
                        c(i),
                        this.jQ.find("tr").eq(e).remove()),
                    l(a) && i.length > 1 && c(a),
                        this.finalizeTree()
                }
                ,
                t.addRow = function(t) {
                    var e, n, r = [], i = [], a = [], o = d("<tr></tr>"), l = t.row, c = 0;
                    this.eachChild((function(e) {
                            e.row <= l && r.push(e),
                            e.row === l && (e === t && (n = c),
                                c += 1),
                            e.row > l && (e.row += 1,
                                a.push(e))
                        }
                    ));
                    for (var u = 0; u < c; u += 1)
                        (e = zt(l + 1)).parent = this,
                            i.push(e),
                            e.jQ = d('<td class="mq-empty">').attr(s, e.id).appendTo(o);
                    return this.jQ.find("tr").eq(l).after(o),
                        this.blocks = r.concat(i, a),
                        i[n]
                }
                ,
                t.addColumn = function(t) {
                    var e, n, r = [], i = [];
                    this.eachChild((function(n) {
                            r[n.row] = r[n.row] || [],
                                r[n.row].push(n),
                            n === t && (e = r[n.row].length)
                        }
                    ));
                    for (var a = 0; a < r.length; a += 1)
                        (n = zt(a)).parent = this,
                            i.push(n),
                            r[a].splice(e, 0, n),
                            n.jQ = d('<td class="mq-empty">').attr(s, n.id);
                    return this.jQ.find("tr").each((function(t) {
                            d(this).find("td").eq(e - 1).after(r[t][e].jQ)
                        }
                    )),
                        this.blocks = [].concat.apply([], r),
                        i[t.row]
                }
                ,
                t.insert = function(t, e) {
                    var n = this[t](e);
                    this.cursor = this.cursor || this.parent.cursor,
                        this.finalizeTree(),
                        this.bubble("reflow").cursor.insAtRightEnd(n)
                }
                ,
                t.backspace = function(t, e, n, s) {
                    var r = t[e];
                    if (t.isEmpty()) {
                        for (this.deleteCell(t); r && r[e] && -1 === this.blocks.indexOf(r); )
                            r = r[e];
                        r && n.insAtDirEnd(-e, r),
                        1 === this.blocks.length && this.blocks[0].isEmpty() && (s(),
                            this.finalizeTree()),
                            this.bubble("edited")
                    }
                }
        }
    )),
        Dt.cases = p(Dt.array, (function(t, e) {
                t.environment = "cases",
                    t.parentheses = {
                        left: "{",
                        right: ""
                    }
            }
        )),
        Dt.pmatrix = p(At, (function(t, e) {
                t.environment = "pmatrix",
                    t.parentheses = {
                        left: "(",
                        right: ")"
                    }
            }
        )),
        Dt.bmatrix = p(At, (function(t, e) {
                t.environment = "bmatrix",
                    t.parentheses = {
                        left: "[",
                        right: "]"
                    }
            }
        )),
        Dt.Bmatrix = p(At, (function(t, e) {
                t.environment = "Bmatrix",
                    t.parentheses = {
                        left: "{",
                        right: "}"
                    }
            }
        )),
        Dt.vmatrix = p(At, (function(t, e) {
                t.environment = "vmatrix",
                    t.parentheses = {
                        left: "|",
                        right: "|"
                    }
            }
        )),
        Dt.Vmatrix = p(At, (function(t, e) {
                t.environment = "Vmatrix",
                    t.parentheses = {
                        left: "&#8214;",
                        right: "&#8214;"
                    }
            }
        ));
    var zt = p(U, (function(t, e) {
            t.init = function(t, n, s) {
                if (e.init.call(this),
                    this.row = t,
                n && this.adopt(n, n.ends[1], 0),
                    s)
                    for (var r = 0; r < s.length; r++)
                        s[r].children().adopt(this, this.ends[1], 0)
            }
                ,
                t.keystroke = function(t, n, s) {
                    switch (t) {
                        case "Shift-Spacebar":
                            return n.preventDefault(),
                                this.parent.insert("addColumn", this);
                        case "Shift-Enter":
                            return this.parent.insert("addRow", this)
                    }
                    return e.keystroke.apply(this, arguments)
                }
                ,
                t.deleteOutOf = function(t, n) {
                    var s = this
                        , r = arguments;
                    this.parent.backspace(this, t, n, (function() {
                            return e.deleteOutOf.apply(s, r)
                        }
                    ))
                }
                ,
                t.moveOutOf = function(t, e, n) {
                    !(n && this.parent.atExitPoint(t, e)) && this[t] ? e.insAtDirEnd(-t, this[t]) : e.insDirOf(t, this.parent)
                }
        }
    ))
        , It = L(1);
    for (var Rt in It)
        !function(t, e) {
            "function" == typeof e ? (_[t] = function() {
                return C(),
                    e.apply(this, arguments)
            }
                ,
                _[t].prototype = e.prototype) : _[t] = e
        }(Rt, It[Rt])
}();
