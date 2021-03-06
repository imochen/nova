/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

"use strict";

(function () {
  var e, t, n;(function () {
    function n(e) {
      this.tokens = [], this.tokens.links = {}, this.options = e || h.defaults, this.rules = t.normal, this.options.gfm && (this.options.tables ? this.rules = t.tables : this.rules = t.gfm);
    }function i(e, t) {
      this.options = t || h.defaults, this.links = e, this.rules = r.normal, this.renderer = this.options.renderer || new s(), this.renderer.options = this.options;if (!this.links) throw new Error("Tokens array requires a `links` property.");this.options.gfm ? this.options.breaks ? this.rules = r.breaks : this.rules = r.gfm : this.options.pedantic && (this.rules = r.pedantic);
    }function s(e) {
      this.options = e || {};
    }function o(e) {
      this.tokens = [], this.token = null, this.options = e || h.defaults, this.options.renderer = this.options.renderer || new s(), this.renderer = this.options.renderer, this.renderer.options = this.options;
    }function u(e, t) {
      return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }function a(e) {
      return e.replace(/&([#\w]+);/g, function (e, t) {
        return (t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "");
      });
    }function f(e, t) {
      return (e = e.source, t = t || "", function n(r, i) {
        return r ? (i = i.source || i, i = i.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, i), n) : new RegExp(e, t);
      });
    }function l() {}function c(e) {
      var t = 1,
          n,
          r;for (; t < arguments.length; t++) {
        n = arguments[t];for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }return e;
    }function h(e, t, r) {
      if (r || typeof t == "function") {
        r || (r = t, t = null), t = c({}, h.defaults, t || {});var i = t.highlight,
            s,
            a,
            f = 0;try {
          s = n.lex(e, t);
        } catch (l) {
          return r(l);
        }a = s.length;var p = function p(e) {
          if (e) return (t.highlight = i, r(e));var n;try {
            n = o.parse(s, t);
          } catch (u) {
            e = u;
          }return (t.highlight = i, e ? r(e) : r(null, n));
        };if (!i || i.length < 3) return p();delete t.highlight;if (!a) return p();for (; f < s.length; f++) (function (e) {
          return e.type !== "code" ? --a || p() : i(e.text, e.lang, function (t, n) {
            if (t) return p(t);if (n == null || n === e.text) return --a || p();e.text = n, e.escaped = !0, --a || p();
          });
        })(s[f]);return;
      }try {
        return (t && (t = c({}, h.defaults, t)), o.parse(n.lex(e, t), t));
      } catch (l) {
        l.message += "\nPlease report this to https://github.com/chjj/marked.";if ((t || h.defaults).silent) return "<p>An error occured:</p><pre>" + u(l.message + "", !0) + "</pre>";throw l;
      }
    }var t = { newline: /^\n+/, code: /^( {4}[^\n]+\n*)+/, fences: l, hr: /^( *[-*_]){3,} *(?:\n+|$)/, heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/, nptable: l, lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/, blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/, list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/, html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/, def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/, table: l, paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/, text: /^[^\n]+/ };t.bullet = /(?:[*+-]|\d+\.)/, t.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, t.item = f(t.item, "gm")(/bull/g, t.bullet)(), t.list = f(t.list)(/bull/g, t.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + t.def.source + ")")(), t.blockquote = f(t.blockquote)("def", t.def)(), t._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", t.html = f(t.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, t._tag)(), t.paragraph = f(t.paragraph)("hr", t.hr)("heading", t.heading)("lheading", t.lheading)("blockquote", t.blockquote)("tag", "<" + t._tag)("def", t.def)(), t.normal = c({}, t), t.gfm = c({}, t.normal, { fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/, paragraph: /^/, heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/ }), t.gfm.paragraph = f(t.paragraph)("(?!", "(?!" + t.gfm.fences.source.replace("\\1", "\\2") + "|" + t.list.source.replace("\\1", "\\3") + "|")(), t.tables = c({}, t.gfm, { nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/, table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/ }), n.rules = t, n.lex = function (e, t) {
      var r = new n(t);return r.lex(e);
    }, n.prototype.lex = function (e) {
      return (e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0));
    }, n.prototype.token = function (e, n, r) {
      var e = e.replace(/^ +$/gm, ""),
          i,
          s,
          o,
          u,
          a,
          f,
          l,
          c,
          h;while (e) {
        if (o = this.rules.newline.exec(e)) e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({ type: "space" });if (o = this.rules.code.exec(e)) {
          e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({ type: "code", text: this.options.pedantic ? o : o.replace(/\n+$/, "") });continue;
        }if (o = this.rules.fences.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: "code", lang: o[2], text: o[3] || "" });continue;
        }if (o = this.rules.heading.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: "heading", depth: o[1].length, text: o[2] });continue;
        }if (n && (o = this.rules.nptable.exec(e))) {
          e = e.substring(o[0].length), f = { type: "table", header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: o[3].replace(/\n$/, "").split("\n") };for (c = 0; c < f.align.length; c++) /^ *-+: *$/.test(f.align[c]) ? f.align[c] = "right" : /^ *:-+: *$/.test(f.align[c]) ? f.align[c] = "center" : /^ *:-+ *$/.test(f.align[c]) ? f.align[c] = "left" : f.align[c] = null;for (c = 0; c < f.cells.length; c++) f.cells[c] = f.cells[c].split(/ *\| */);this.tokens.push(f);continue;
        }if (o = this.rules.lheading.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: "heading", depth: o[2] === "=" ? 1 : 2, text: o[1] });continue;
        }if (o = this.rules.hr.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: "hr" });continue;
        }if (o = this.rules.blockquote.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: "blockquote_start" }), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, n, !0), this.tokens.push({ type: "blockquote_end" });continue;
        }if (o = this.rules.list.exec(e)) {
          e = e.substring(o[0].length), u = o[2], this.tokens.push({ type: "list_start", ordered: u.length > 1 }), o = o[0].match(this.rules.item), i = !1, h = o.length, c = 0;for (; c < h; c++) f = o[c], l = f.length, f = f.replace(/^ *([*+-]|\d+\.) +/, ""), ~f.indexOf("\n ") && (l -= f.length, f = this.options.pedantic ? f.replace(/^ {1,4}/gm, "") : f.replace(new RegExp("^ {1," + l + "}", "gm"), "")), this.options.smartLists && c !== h - 1 && (a = t.bullet.exec(o[c + 1])[0], u !== a && !(u.length > 1 && a.length > 1) && (e = o.slice(c + 1).join("\n") + e, c = h - 1)), s = i || /\n\n(?!\s*$)/.test(f), c !== h - 1 && (i = f.charAt(f.length - 1) === "\n", s || (s = i)), this.tokens.push({ type: s ? "loose_item_start" : "list_item_start" }), this.token(f, !1, r), this.tokens.push({ type: "list_item_end" });this.tokens.push({ type: "list_end" });continue;
        }if (o = this.rules.html.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: this.options.sanitize ? "paragraph" : "html", pre: !this.options.sanitizer && (o[1] === "pre" || o[1] === "script" || o[1] === "style"), text: o[0] });continue;
        }if (!r && n && (o = this.rules.def.exec(e))) {
          e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = { href: o[2], title: o[3] };continue;
        }if (n && (o = this.rules.table.exec(e))) {
          e = e.substring(o[0].length), f = { type: "table", header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */), align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n") };for (c = 0; c < f.align.length; c++) /^ *-+: *$/.test(f.align[c]) ? f.align[c] = "right" : /^ *:-+: *$/.test(f.align[c]) ? f.align[c] = "center" : /^ *:-+ *$/.test(f.align[c]) ? f.align[c] = "left" : f.align[c] = null;for (c = 0; c < f.cells.length; c++) f.cells[c] = f.cells[c].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);this.tokens.push(f);continue;
        }if (n && (o = this.rules.paragraph.exec(e))) {
          e = e.substring(o[0].length), this.tokens.push({ type: "paragraph", text: o[1].charAt(o[1].length - 1) === "\n" ? o[1].slice(0, -1) : o[1] });continue;
        }if (o = this.rules.text.exec(e)) {
          e = e.substring(o[0].length), this.tokens.push({ type: "text", text: o[0] });continue;
        }if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
      }return this.tokens;
    };var r = { escape: /^\\([\\`*{}\[\]()#+\-.!_>])/, autolink: /^<([^ >]+(@|:\/)[^ >]+)>/, url: l, tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/, link: /^!?\[(inside)\]\(href\)/, reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/, nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/, strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/, em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/, code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, br: /^ {2,}\n(?!\s*$)/, del: l, text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/ };r._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, r._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, r.link = f(r.link)("inside", r._inside)("href", r._href)(), r.reflink = f(r.reflink)("inside", r._inside)(), r.normal = c({}, r), r.pedantic = c({}, r.normal, { strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/ }), r.gfm = c({}, r.normal, { escape: f(r.escape)("])", "~|])")(), url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, del: /^~~(?=\S)([\s\S]*?\S)~~/, text: f(r.text)("]|", "~]|")("|", "|https?://|")() }), r.breaks = c({}, r.gfm, { br: f(r.br)("{2,}", "*")(), text: f(r.gfm.text)("{2,}", "*")() }), i.rules = r, i.output = function (e, t, n) {
      var r = new i(t, n);return r.output(e);
    }, i.prototype.output = function (e) {
      var t = "",
          n,
          r,
          i,
          s;while (e) {
        if (s = this.rules.escape.exec(e)) {
          e = e.substring(s[0].length), t += s[1];continue;
        }if (s = this.rules.autolink.exec(e)) {
          e = e.substring(s[0].length), s[2] === "@" ? (r = s[1].charAt(6) === ":" ? this.mangle(s[1].substring(7)) : this.mangle(s[1]), i = this.mangle("mailto:") + r) : (r = u(s[1]), i = r), t += this.renderer.link(i, null, r);continue;
        }if (!this.inLink && (s = this.rules.url.exec(e))) {
          e = e.substring(s[0].length), r = u(s[1]), i = r, t += this.renderer.link(i, null, r);continue;
        }if (s = this.rules.tag.exec(e)) {
          !this.inLink && /^<a /i.test(s[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(s[0]) && (this.inLink = !1), e = e.substring(s[0].length), t += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(s[0]) : u(s[0]) : s[0];continue;
        }if (s = this.rules.link.exec(e)) {
          e = e.substring(s[0].length), this.inLink = !0, t += this.outputLink(s, { href: s[2], title: s[3] }), this.inLink = !1;continue;
        }if ((s = this.rules.reflink.exec(e)) || (s = this.rules.nolink.exec(e))) {
          e = e.substring(s[0].length), n = (s[2] || s[1]).replace(/\s+/g, " "), n = this.links[n.toLowerCase()];if (!n || !n.href) {
            t += s[0].charAt(0), e = s[0].substring(1) + e;continue;
          }this.inLink = !0, t += this.outputLink(s, n), this.inLink = !1;continue;
        }if (s = this.rules.strong.exec(e)) {
          e = e.substring(s[0].length), t += this.renderer.strong(this.output(s[2] || s[1]));continue;
        }if (s = this.rules.em.exec(e)) {
          e = e.substring(s[0].length), t += this.renderer.em(this.output(s[2] || s[1]));continue;
        }if (s = this.rules.code.exec(e)) {
          e = e.substring(s[0].length), t += this.renderer.codespan(u(s[2], !0));continue;
        }if (s = this.rules.br.exec(e)) {
          e = e.substring(s[0].length), t += this.renderer.br();continue;
        }if (s = this.rules.del.exec(e)) {
          e = e.substring(s[0].length), t += this.renderer.del(this.output(s[1]));continue;
        }if (s = this.rules.text.exec(e)) {
          e = e.substring(s[0].length), t += this.renderer.text(u(this.smartypants(s[0])));continue;
        }if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
      }return t;
    }, i.prototype.outputLink = function (e, t) {
      var n = u(t.href),
          r = t.title ? u(t.title) : null;return e[0].charAt(0) !== "!" ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, u(e[1]));
    }, i.prototype.smartypants = function (e) {
      return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e;
    }, i.prototype.mangle = function (e) {
      if (!this.options.mangle) return e;var t = "",
          n = e.length,
          r = 0,
          i;for (; r < n; r++) i = e.charCodeAt(r), Math.random() > .5 && (i = "x" + i.toString(16)), t += "&#" + i + ";";return t;
    }, s.prototype.code = function (e, t, n) {
      if (this.options.highlight) {
        var r = this.options.highlight(e, t);r != null && r !== e && (n = !0, e = r);
      }return t ? "<pre><code class=\"" + this.options.langPrefix + u(t, !0) + "\">" + (n ? e : u(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : u(e, !0)) + "\n</code></pre>";
    }, s.prototype.blockquote = function (e) {
      return "<blockquote>\n" + e + "</blockquote>\n";
    }, s.prototype.html = function (e) {
      return e;
    }, s.prototype.heading = function (e, t, n) {
      return "<h" + t + " id=\"" + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + "\">" + e + "</h" + t + ">\n";
    }, s.prototype.hr = function () {
      return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }, s.prototype.list = function (e, t) {
      var n = t ? "ol" : "ul";return "<" + n + ">\n" + e + "</" + n + ">\n";
    }, s.prototype.listitem = function (e) {
      return "<li>" + e + "</li>\n";
    }, s.prototype.paragraph = function (e) {
      return "<p>" + e + "</p>\n";
    }, s.prototype.table = function (e, t) {
      return "<table>\n<thead>\n" + e + "</thead>\n" + "<tbody>\n" + t + "</tbody>\n" + "</table>\n";
    }, s.prototype.tablerow = function (e) {
      return "<tr>\n" + e + "</tr>\n";
    }, s.prototype.tablecell = function (e, t) {
      var n = t.header ? "th" : "td",
          r = t.align ? "<" + n + " style=\"text-align:" + t.align + "\">" : "<" + n + ">";return r + e + "</" + n + ">\n";
    }, s.prototype.strong = function (e) {
      return "<strong>" + e + "</strong>";
    }, s.prototype.em = function (e) {
      return "<em>" + e + "</em>";
    }, s.prototype.codespan = function (e) {
      return "<code>" + e + "</code>";
    }, s.prototype.br = function () {
      return this.options.xhtml ? "<br/>" : "<br>";
    }, s.prototype.del = function (e) {
      return "<del>" + e + "</del>";
    }, s.prototype.link = function (e, t, n) {
      if (this.options.sanitize) {
        try {
          var r = decodeURIComponent(a(e)).replace(/[^\w:]/g, "").toLowerCase();
        } catch (i) {
          return "";
        }if (r.indexOf("javascript:") === 0 || r.indexOf("vbscript:") === 0) return "";
      }var s = "<a href=\"" + e + "\"";return (t && (s += " title=\"" + t + "\""), s += ">" + n + "</a>", s);
    }, s.prototype.image = function (e, t, n) {
      var r = "<img src=\"" + e + "\" alt=\"" + n + "\"";return (t && (r += " title=\"" + t + "\""), r += this.options.xhtml ? "/>" : ">", r);
    }, s.prototype.text = function (e) {
      return e;
    }, o.parse = function (e, t, n) {
      var r = new o(t, n);return r.parse(e);
    }, o.prototype.parse = function (e) {
      this.inline = new i(e.links, this.options, this.renderer), this.tokens = e.reverse();var t = "";while (this.next()) t += this.tok();return t;
    }, o.prototype.next = function () {
      return this.token = this.tokens.pop();
    }, o.prototype.peek = function () {
      return this.tokens[this.tokens.length - 1] || 0;
    }, o.prototype.parseText = function () {
      var e = this.token.text;while (this.peek().type === "text") e += "\n" + this.next().text;return this.inline.output(e);
    }, o.prototype.tok = function () {
      switch (this.token.type) {case "space":
          return "";case "hr":
          return this.renderer.hr();case "heading":
          return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);case "code":
          return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);case "table":
          var e = "",
              t = "",
              n,
              r,
              i,
              s,
              o;i = "";for (n = 0; n < this.token.header.length; n++) s = { header: !0, align: this.token.align[n] }, i += this.renderer.tablecell(this.inline.output(this.token.header[n]), { header: !0, align: this.token.align[n] });e += this.renderer.tablerow(i);for (n = 0; n < this.token.cells.length; n++) {
            r = this.token.cells[n], i = "";for (o = 0; o < r.length; o++) i += this.renderer.tablecell(this.inline.output(r[o]), { header: !1, align: this.token.align[o] });t += this.renderer.tablerow(i);
          }return this.renderer.table(e, t);case "blockquote_start":
          var t = "";while (this.next().type !== "blockquote_end") t += this.tok();return this.renderer.blockquote(t);case "list_start":
          var t = "",
              u = this.token.ordered;while (this.next().type !== "list_end") t += this.tok();return this.renderer.list(t, u);case "list_item_start":
          var t = "";while (this.next().type !== "list_item_end") t += this.token.type === "text" ? this.parseText() : this.tok();return this.renderer.listitem(t);case "loose_item_start":
          var t = "";while (this.next().type !== "list_item_end") t += this.tok();return this.renderer.listitem(t);case "html":
          var a = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;return this.renderer.html(a);case "paragraph":
          return this.renderer.paragraph(this.inline.output(this.token.text));case "text":
          return this.renderer.paragraph(this.parseText());}
    }, l.exec = l, h.options = h.setOptions = function (e) {
      return (c(h.defaults, e), h);
    }, h.defaults = { gfm: !0, tables: !0, breaks: !1, pedantic: !1, sanitize: !1, sanitizer: null, mangle: !0, smartLists: !1, silent: !1, highlight: null, langPrefix: "lang-", smartypants: !1, headerPrefix: "", renderer: new s(), xhtml: !1 }, h.Parser = o, h.parser = o.parse, h.Renderer = s, h.Lexer = n, h.lexer = n.lex, h.InlineLexer = i, h.inlineLexer = i.output, h.parse = h, typeof module != "undefined" && typeof exports == "object" ? module.exports = h : e = (function () {
      return h;
    })();
  }).call((function () {
    return this || (typeof window != "undefined" ? window : global);
  })()), !(function (e) {
    "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function () {
      return window.hljs;
    }));
  })(function (e) {
    function t(e) {
      return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }function n(e) {
      return e.nodeName.toLowerCase();
    }function r(e, t) {
      var n = e && e.exec(t);return n && 0 == n.index;
    }function i(e) {
      return /^(no-?highlight|plain|text)$/i.test(e);
    }function s(e) {
      var t,
          n,
          r,
          s = e.className + " ";if ((s += e.parentNode ? e.parentNode.className : "", n = /\blang(?:uage)?-([\w-]+)\b/i.exec(s))) return w(n[1]) ? n[1] : "no-highlight";for (s = s.split(/\s+/), t = 0, r = s.length; r > t; t++) if (w(s[t]) || i(s[t])) return s[t];
    }function o(e, t) {
      var n,
          r = {};for (n in e) r[n] = e[n];if (t) for (n in t) r[n] = t[n];return r;
    }function u(e) {
      var t = [];return ((function r(e, i) {
        for (var s = e.firstChild; s; s = s.nextSibling) 3 == s.nodeType ? i += s.nodeValue.length : 1 == s.nodeType && (t.push({ event: "start", offset: i, node: s }), i = r(s, i), n(s).match(/br|hr|img|input/) || t.push({ event: "stop", offset: i, node: s }));return i;
      })(e, 0), t);
    }function a(e, r, i) {
      function s() {
        return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r;
      }function o(e) {
        function r(e) {
          return " " + e.nodeName + "=\"" + t(e.value) + "\"";
        }l += "<" + n(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
      }function u(e) {
        l += "</" + n(e) + ">";
      }function a(e) {
        ("start" == e.event ? o : u)(e.node);
      }for (var f = 0, l = "", c = []; e.length || r.length;) {
        var h = s();if ((l += t(i.substr(f, h[0].offset - f)), f = h[0].offset, h == e)) {
          c.reverse().forEach(u);do a(h.splice(0, 1)[0]), h = s(); while (h == e && h.length && h[0].offset == f);c.reverse().forEach(o);
        } else "start" == h[0].event ? c.push(h[0].node) : c.pop(), a(h.splice(0, 1)[0]);
      }return l + t(i.substr(f));
    }function f(e) {
      function t(e) {
        return e && e.source || e;
      }function n(n, r) {
        return new RegExp(t(n), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
      }function r(i, s) {
        if (!i.compiled) {
          if ((i.compiled = !0, i.k = i.k || i.bK, i.k)) {
            var u = {},
                a = function a(t, n) {
              e.cI && (n = n.toLowerCase()), n.split(" ").forEach(function (e) {
                var n = e.split("|");u[n[0]] = [t, n[1] ? Number(n[1]) : 1];
              });
            };"string" == typeof i.k ? a("keyword", i.k) : Object.keys(i.k).forEach(function (e) {
              a(e, i.k[e]);
            }), i.k = u;
          }i.lR = n(i.l || /\b\w+\b/, !0), s && (i.bK && (i.b = "\\b(" + i.bK.split(" ").join("|") + ")\\b"), i.b || (i.b = /\B|\b/), i.bR = n(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = n(i.e)), i.tE = t(i.e) || "", i.eW && s.tE && (i.tE += (i.e ? "|" : "") + s.tE)), i.i && (i.iR = n(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []);var f = [];i.c.forEach(function (e) {
            e.v ? e.v.forEach(function (t) {
              f.push(o(e, t));
            }) : f.push("self" == e ? i : e);
          }), i.c = f, i.c.forEach(function (e) {
            r(e, i);
          }), i.starts && r(i.starts, s);var l = i.c.map(function (e) {
            return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
          }).concat([i.tE, i.i]).map(t).filter(Boolean);i.t = l.length ? n(l.join("|"), !0) : { exec: function exec() {
              return null;
            } };
        }
      }r(e);
    }function l(e, n, i, s) {
      function o(e, t) {
        for (var n = 0; n < t.c.length; n++) if (r(t.c[n].bR, e)) return t.c[n];
      }function u(_x, _x2) {
        var _again = true;

        _function: while (_again) {
          var e = _x,
              t = _x2;
          _again = false;
          if (r(e.eR, t)) {
            for (; e.endsParent && e.parent;) e = e.parent;return e;
          }if (e.eW) {
            _x = e.parent;
            _x2 = t;
            _again = true;
            continue _function;
          } else {
            return void 0;
          }
        }
      }function a(e, t) {
        return !i && r(t.iR, e);
      }function h(e, t) {
        var n = b.cI ? t[0].toLowerCase() : t[0];return e.k.hasOwnProperty(n) && e.k[n];
      }function p(e, t, n, r) {
        var i = r ? "" : E.classPrefix,
            s = "<span class=\"" + i,
            o = n ? "" : "</span>";return (s += e + "\">", s + t + o);
      }function d() {
        if (!T.k) return t(k);var e = "",
            n = 0;T.lR.lastIndex = 0;for (var r = T.lR.exec(k); r;) {
          e += t(k.substr(n, r.index - n));var i = h(T, r);i ? (L += i[1], e += p(i[0], t(r[0]))) : e += t(r[0]), n = T.lR.lastIndex, r = T.lR.exec(k);
        }return e + t(k.substr(n));
      }function v() {
        var e = "string" == typeof T.sL;if (e && !S[T.sL]) return t(k);var n = e ? l(T.sL, k, !0, N[T.sL]) : c(k, T.sL.length ? T.sL : void 0);return (T.r > 0 && (L += n.r), e && (N[T.sL] = n.top), p(n.language, n.value, !1, !0));
      }function m() {
        return void 0 !== T.sL ? v() : d();
      }function g(e, n) {
        var r = e.cN ? p(e.cN, "", !0) : "";e.rB ? (C += r, k = "") : e.eB ? (C += t(n) + r, k = "") : (C += r, k = n), T = Object.create(e, { parent: { value: T } });
      }function y(e, n) {
        if ((k += e, void 0 === n)) return (C += m(), 0);var r = o(n, T);if (r) return (C += m(), g(r, n), r.rB ? 0 : n.length);var i = u(T, n);if (i) {
          var s = T;s.rE || s.eE || (k += n), C += m();do T.cN && (C += "</span>"), L += T.r, T = T.parent; while (T != i.parent);return (s.eE && (C += t(n)), k = "", i.starts && g(i.starts, ""), s.rE ? 0 : n.length);
        }if (a(n, T)) throw new Error("Illegal lexeme \"" + n + "\" for mode \"" + (T.cN || "<unnamed>") + "\"");return (k += n, n.length || 1);
      }var b = w(e);if (!b) throw new Error("Unknown language: \"" + e + "\"");f(b);var x,
          T = s || b,
          N = {},
          C = "";for (x = T; x != b; x = x.parent) x.cN && (C = p(x.cN, "", !0) + C);var k = "",
          L = 0;try {
        for (var A, O, M = 0;;) {
          if ((T.t.lastIndex = M, A = T.t.exec(n), !A)) break;O = y(n.substr(M, A.index - M), A[0]), M = A.index + O;
        }for (y(n.substr(M)), x = T; x.parent; x = x.parent) x.cN && (C += "</span>");return { r: L, value: C, language: e, top: T };
      } catch (_) {
        if (-1 != _.message.indexOf("Illegal")) return { r: 0, value: t(n) };throw _;
      }
    }function c(e, n) {
      n = n || E.languages || Object.keys(S);var r = { r: 0, value: t(e) },
          i = r;return (n.forEach(function (t) {
        if (w(t)) {
          var n = l(t, e, !1);n.language = t, n.r > i.r && (i = n), n.r > r.r && (i = r, r = n);
        }
      }), i.language && (r.second_best = i), r);
    }function h(e) {
      return (E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, t) {
        return t.replace(/\t/g, E.tabReplace);
      })), E.useBR && (e = e.replace(/\n/g, "<br>")), e);
    }function p(e, t, n) {
      var r = t ? x[t] : n,
          i = [e.trim()];return (e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(r) && i.push(r), i.join(" ").trim());
    }function d(e) {
      var t = s(e);if (!i(t)) {
        var n;E.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e;var r = n.textContent,
            o = t ? l(t, r, !0) : c(r),
            f = u(n);if (f.length) {
          var d = document.createElementNS("http://www.w3.org/1999/xhtml", "div");d.innerHTML = o.value, o.value = a(f, u(d), r);
        }o.value = h(o.value), e.innerHTML = o.value, e.className = p(e.className, t, o.language), e.result = { language: o.language, re: o.r }, o.second_best && (e.second_best = { language: o.second_best.language, re: o.second_best.r });
      }
    }function v(e) {
      E = o(E, e);
    }function m() {
      if (!m.called) {
        m.called = !0;var e = document.querySelectorAll("pre code");Array.prototype.forEach.call(e, d);
      }
    }function g() {
      addEventListener("DOMContentLoaded", m, !1), addEventListener("load", m, !1);
    }function y(t, n) {
      var r = S[t] = n(e);r.aliases && r.aliases.forEach(function (e) {
        x[e] = t;
      });
    }function b() {
      return Object.keys(S);
    }function w(e) {
      return (e = (e || "").toLowerCase(), S[e] || S[x[e]]);
    }var E = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
        S = {},
        x = {};return (e.highlight = l, e.highlightAuto = c, e.fixMarkup = h, e.highlightBlock = d, e.configure = v, e.initHighlighting = m, e.initHighlightingOnLoad = g, e.registerLanguage = y, e.listLanguages = b, e.getLanguage = w, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: "\"", e: "\"", i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/ }, e.C = function (t, n, r) {
      var i = e.inherit({ cN: "comment", b: t, e: n, c: [] }, r || {});return (i.c.push(e.PWM), i.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), i);
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e);
  }), hljs.registerLanguage("nginx", function (e) {
    var t = { cN: "variable", v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: "[\\$\\@]" + e.UIR }] },
        n = { eW: !0, l: "[a-z/_]+", k: { built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll" }, r: 0, i: "=>", c: [e.HCM, { cN: "string", c: [e.BE, t], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }] }, { cN: "url", b: "([a-z]+):/", e: "\\s", eW: !0, eE: !0, c: [t] }, { cN: "regexp", c: [e.BE, t], v: [{ b: "\\s\\^", e: "\\s|{|;", rE: !0 }, { b: "~\\*?\\s+", e: "\\s|{|;", rE: !0 }, { b: "\\*(\\.[a-z\\-]+)+" }, { b: "([a-z\\-]+\\.)+\\*" }] }, { cN: "number", b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b" }, { cN: "number", b: "\\b\\d+[kKmMgGdshdwy]*\\b", r: 0 }, t] };return { aliases: ["nginxconf"], c: [e.HCM, { b: e.UIR + "\\s", e: ";|{", rB: !0, c: [{ cN: "title", b: e.UIR, starts: n }], r: 0 }], i: "[^\\s\\}]" };
  }), hljs.registerLanguage("cs", function (e) {
    var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
        n = e.IR + "(<" + e.IR + ">)?";return { aliases: ["csharp"], k: t, i: /::/, c: [e.C("///", "$", { rB: !0, c: [{ cN: "xmlDocTag", v: [{ b: "///", r: 0 }, { b: "<!--|-->" }, { b: "</?", e: ">" }] }] }), e.CLCM, e.CBCM, { cN: "preprocessor", b: "#", e: "$", k: "if else elif endif define undef warning error line region endregion pragma checksum" }, { cN: "string", b: "@\"", e: "\"", c: [{ b: "\"\"" }] }, e.ASM, e.QSM, e.CNM, { bK: "class interface", e: /[{;=]/, i: /[^\s:]/, c: [e.TM, e.CLCM, e.CBCM] }, { bK: "namespace", e: /[{;=]/, i: /[^\s:]/, c: [{ cN: "title", b: "[a-zA-Z](\\.?\\w)*", r: 0 }, e.CLCM, e.CBCM] }, { bK: "new return throw await", r: 0 }, { cN: "function", b: "(" + n + "\\s+)+" + e.IR + "\\s*\\(", rB: !0, e: /[{;=]/, eE: !0, k: t, c: [{ b: e.IR + "\\s*\\(", rB: !0, c: [e.TM], r: 0 }, { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, k: t, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] }, e.CLCM, e.CBCM] }] };
  }), hljs.registerLanguage("diff", function (e) {
    return { aliases: ["patch"], c: [{ cN: "chunk", r: 10, v: [{ b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ }, { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }] }, { cN: "header", v: [{ b: /Index: /, e: /$/ }, { b: /=====/, e: /=====$/ }, { b: /^\-\-\-/, e: /$/ }, { b: /^\*{3} /, e: /$/ }, { b: /^\+\+\+/, e: /$/ }, { b: /\*{5}/, e: /\*{5}$/ }] }, { cN: "addition", b: "^\\+", e: "$" }, { cN: "deletion", b: "^\\-", e: "$" }, { cN: "change", b: "^\\!", e: "$" }] };
  }), hljs.registerLanguage("bash", function (e) {
    var t = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
        n = { cN: "string", b: /"/, e: /"/, c: [e.BE, t, { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] }] },
        r = { cN: "string", b: /'/, e: /'/ };return { aliases: ["sh", "zsh"], l: /-?[a-z\.]+/, k: { keyword: "if then else elif fi for while in do done case esac function", literal: "true false", built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp", operator: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "shebang", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })], r: 0 }, e.HCM, e.NM, n, r, t] };
  }), hljs.registerLanguage("markdown", function (e) {
    return { aliases: ["md", "mkdown", "mkd"], c: [{ cN: "header", v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }] }, { b: "<", e: ">", sL: "xml", r: 0 }, { cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+" }, { cN: "strong", b: "[*_]{2}.+?[*_]{2}" }, { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", r: 0 }] }, { cN: "blockquote", b: "^>\\s+", e: "$" }, { cN: "code", v: [{ b: "`.+?`" }, { b: "^( {4}| )", e: "$", r: 0 }] }, { cN: "horizontal_rule", b: "^[-\\*]{3,}", e: "$" }, { b: "\\[.+?\\][\\(\\[].*?[\\)\\]]", rB: !0, c: [{ cN: "link_label", b: "\\[", e: "\\]", eB: !0, rE: !0, r: 0 }, { cN: "link_url", b: "\\]\\(", e: "\\)", eB: !0, eE: !0 }, { cN: "link_reference", b: "\\]\\[", e: "\\]", eB: !0, eE: !0 }], r: 10 }, { b: "^\\[.+\\]:", rB: !0, c: [{ cN: "link_reference", b: "\\[", e: "\\]:", eB: !0, eE: !0, starts: { cN: "link_url", e: "$" } }] }] };
  }), hljs.registerLanguage("javascript", function (e) {
    return { aliases: ["js"], k: { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" }, c: [{ cN: "pi", r: 10, b: /^\s*['"]use (strict|asm)['"]/ }, e.ASM, e.QSM, { cN: "string", b: "`", e: "`", c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }] }, e.CLCM, e.CBCM, { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 }, { b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: />\s*[);\]]/, r: 0, sL: "xml" }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: [e.CLCM, e.CBCM] }], i: /\[|%/ }, { b: /\$[(.]/ }, { b: "\\." + e.IR, r: 0 }, { bK: "import", e: "[;$]", k: "import from as", c: [e.ASM, e.QSM] }, { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] }], i: /#/ };
  }), hljs.registerLanguage("ini", function (e) {
    var t = { cN: "string", c: [e.BE], v: [{ b: "'''", e: "'''", r: 10 }, { b: "\"\"\"", e: "\"\"\"", r: 10 }, { b: "\"", e: "\"" }, { b: "'", e: "'" }] };return { aliases: ["toml"], cI: !0, i: /\S/, c: [e.C(";", "$"), e.HCM, { cN: "title", b: /^\s*\[+/, e: /\]+/ }, { cN: "setting", b: /^[a-z0-9\[\]_-]+\s*=\s*/, e: "$", c: [{ cN: "value", eW: !0, k: "on off true false yes no", c: [{ cN: "variable", v: [{ b: /\$[\w\d"][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] }, t, { cN: "number", b: /([\+\-]+)?[\d]+_[\d_]+/ }, e.NM], r: 0 }] }] };
  }), hljs.registerLanguage("apache", function (e) {
    var t = { cN: "number", b: "[\\$%]\\d+" };return { aliases: ["apacheconf"], cI: !0, c: [e.HCM, { cN: "tag", b: "</?", e: ">" }, { cN: "keyword", b: /\w+/, r: 0, k: { common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername" }, starts: { e: /$/, r: 0, k: { literal: "on off all" }, c: [{ cN: "sqbracket", b: "\\s\\[", e: "\\]$" }, { cN: "cbracket", b: "[\\$%]\\{", e: "\\}", c: ["self", t] }, t, e.QSM] } }], i: /\S/ };
  }), hljs.registerLanguage("sql", function (e) {
    var t = e.C("--", "$");return { cI: !0, i: /[<>{}*]/, c: [{ cN: "operator", bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke", e: /;/, eW: !0, k: { keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek", literal: "true false null", built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void" }, c: [{ cN: "string", b: "'", e: "'", c: [e.BE, { b: "''" }] }, { cN: "string", b: "\"", e: "\"", c: [e.BE, { b: "\"\"" }] }, { cN: "string", b: "`", e: "`", c: [e.BE] }, e.CNM, e.CBCM, t] }, e.CBCM, t] };
  }), hljs.registerLanguage("makefile", function (e) {
    var t = { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] };return { aliases: ["mk", "mak"], c: [e.HCM, { b: /^\w+\s*\W*=/, rB: !0, r: 0, starts: { cN: "constant", e: /\s*\W*=/, eE: !0, starts: { e: /$/, r: 0, c: [t] } } }, { cN: "title", b: /^[\w]+:\s*$/ }, { cN: "phony", b: /^\.PHONY:/, e: /$/, k: ".PHONY", l: /[\.\w]+/ }, { b: /^\t+/, e: /$/, r: 0, c: [e.QSM, t] }] };
  }), hljs.registerLanguage("css", function (e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        n = { cN: "function", b: t + "\\(", rB: !0, eE: !0, e: "\\(" },
        r = { cN: "rule", b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: /\S/, e: ":", eE: !0, starts: { cN: "value", eW: !0, eE: !0, c: [n, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "hexcolor", b: "#[0-9A-Fa-f]+" }, { cN: "important", b: "!important" }] } }] };return { cI: !0, i: /[=\/|'\$]/, c: [e.CBCM, { cN: "id", b: /\#[A-Za-z0-9_-]+/ }, { cN: "class", b: /\.[A-Za-z0-9_-]+/ }, { cN: "attr_selector", b: /\[/, e: /\]/, i: "$" }, { cN: "pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/ }, { cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { cN: "at_rule", b: "@", e: "[{;]", c: [{ cN: "keyword", b: /\S+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [n, e.ASM, e.QSM, e.CSSNM] }] }, { cN: "tag", b: t, r: 0 }, { cN: "rules", b: "{", e: "}", i: /\S/, c: [e.CBCM, r] }] };
  }), hljs.registerLanguage("xml", function (e) {
    var t = "[A-Za-z0-9\\._:-]+",
        n = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php" },
        r = { eW: !0, i: /</, r: 0, c: [n, { cN: "attribute", b: t, r: 0 }, { b: "=", r: 0, c: [{ cN: "value", c: [n], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"], cI: !0, c: [{ cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, e.C("<!--", "-->", { r: 10 }), { cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { title: "style" }, c: [r], starts: { e: "</style>", rE: !0, sL: "css" } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { title: "script" }, c: [r], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars"] } }, n, { cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10 }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "title", b: /[^ \/><\n\t]+/, r: 0 }, r] }] };
  }), hljs.registerLanguage("ruby", function (e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
        r = { cN: "doctag", b: "@[A-Za-z]+" },
        i = { cN: "value", b: "#<", e: ">" },
        s = [e.C("#", "$", { c: [r] }), e.C("^\\=begin", "^\\=end", { c: [r], r: 10 }), e.C("^__END__", "\\n$")],
        o = { cN: "subst", b: "#\\{", e: "}", k: n },
        u = { cN: "string", c: [e.BE, o], v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: /`/, e: /`/ }, { b: "%[qQwWx]?\\(", e: "\\)" }, { b: "%[qQwWx]?\\[", e: "\\]" }, { b: "%[qQwWx]?{", e: "}" }, { b: "%[qQwWx]?<", e: ">" }, { b: "%[qQwWx]?/", e: "/" }, { b: "%[qQwWx]?%", e: "%" }, { b: "%[qQwWx]?-", e: "-" }, { b: "%[qQwWx]?\\|", e: "\\|" }, { b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }] },
        a = { cN: "params", b: "\\(", e: "\\)", k: n },
        f = [u, i, { cN: "class", bK: "class module", e: "$|;", i: /=/, c: [e.inherit(e.TM, { b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), { cN: "inheritance", b: "<\\s*", c: [{ cN: "parent", b: "(" + e.IR + "::)?" + e.IR }] }].concat(s) }, { cN: "function", bK: "def", e: "$|;", c: [e.inherit(e.TM, { b: t }), a].concat(s) }, { cN: "constant", b: "(::)?(\\b[A-Z]\\w*(::)?)+", r: 0 }, { cN: "symbol", b: e.UIR + "(\\!|\\?)?:", r: 0 }, { cN: "symbol", b: ":", c: [u, { b: t }], r: 0 }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { cN: "variable", b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" }, { b: "(" + e.RSR + ")\\s*", c: [i, { cN: "regexp", c: [e.BE, o], i: /\n/, v: [{ b: "/", e: "/[a-z]*" }, { b: "%r{", e: "}[a-z]*" }, { b: "%r\\(", e: "\\)[a-z]*" }, { b: "%r!", e: "![a-z]*" }, { b: "%r\\[", e: "\\][a-z]*" }] }].concat(s), r: 0 }].concat(s);o.c = f, a.c = f;var l = "[>?]>",
        c = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
        h = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
        p = [{ b: /^\s*=>/, cN: "status", starts: { e: "$", c: f } }, { cN: "prompt", b: "^(" + l + "|" + c + "|" + h + ")", starts: { e: "$", c: f } }];return { aliases: ["rb", "gemspec", "podspec", "thor", "irb"], k: n, i: /\/\*/, c: s.concat(p).concat(f) };
  }), hljs.registerLanguage("objectivec", function (e) {
    var t = { cN: "built_in", b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+" },
        n = { keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required", literal: "false true FALSE TRUE nil YES NO NULL", built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once" },
        r = /[a-zA-Z@][a-zA-Z0-9_]*/,
        i = "@interface @class @protocol @implementation";return { aliases: ["mm", "objc", "obj-c"], k: n, l: r, i: "</", c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, { cN: "string", v: [{ b: "@\"", e: "\"", i: "\\n", c: [e.BE] }, { b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" }] }, { cN: "preprocessor", b: "#", e: "$", c: [{ cN: "title", v: [{ b: "\"", e: "\"" }, { b: "<", e: ">" }] }] }, { cN: "class", b: "(" + i.split(" ").join("|") + ")\\b", e: "({|$)", eE: !0, k: i, l: r, c: [e.UTM] }, { cN: "variable", b: "\\." + e.UIR, r: 0 }] };
  }), hljs.registerLanguage("python", function (e) {
    var t = { cN: "prompt", b: /^(>>>|\.\.\.) / },
        n = { cN: "string", c: [e.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, c: [t], r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, c: [t], r: 10 }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/ }, { b: /(b|br)"/, e: /"/ }, e.ASM, e.QSM] },
        r = { cN: "number", r: 0, v: [{ b: e.BNR + "[lLjJ]?" }, { b: "\\b(0o[0-7]+)[lLjJ]?" }, { b: e.CNR + "[lLjJ]?" }] },
        i = { cN: "params", b: /\(/, e: /\)/, c: ["self", t, r, n] };return { aliases: ["py", "gyp"], k: { keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False", built_in: "Ellipsis NotImplemented" }, i: /(<\/|->|\?)/, c: [t, r, n, e.HCM, { v: [{ cN: "function", bK: "def", r: 10 }, { cN: "class", bK: "class" }], e: /:/, i: /[${=;\n,]/, c: [e.UTM, i] }, { cN: "decorator", b: /^[\t ]*@/, e: /$/ }, { b: /\b(print|exec)\(/ }] };
  }), hljs.registerLanguage("coffeescript", function (e) {
    var t = { keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not", literal: "true false null undefined yes no on off", built_in: "npm require console print module global window document" },
        n = "[A-Za-z$_][0-9A-Za-z$_]*",
        r = { cN: "subst", b: /#\{/, e: /}/, k: t },
        i = [e.BNM, e.inherit(e.CNM, { starts: { e: "(\\s*/)?", r: 0 } }), { cN: "string", v: [{ b: /'''/, e: /'''/, c: [e.BE] }, { b: /'/, e: /'/, c: [e.BE] }, { b: /"""/, e: /"""/, c: [e.BE, r] }, { b: /"/, e: /"/, c: [e.BE, r] }] }, { cN: "regexp", v: [{ b: "///", e: "///", c: [r, e.HCM] }, { b: "//[gim]*", r: 0 }, { b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }] }, { cN: "property", b: "@" + n }, { b: "`", e: "`", eB: !0, eE: !0, sL: "javascript" }];r.c = i;var s = e.inherit(e.TM, { b: n }),
        o = "(\\(.*\\))?\\s*\\B[-=]>",
        u = { cN: "params", b: "\\([^\\(]", rB: !0, c: [{ b: /\(/, e: /\)/, k: t, c: ["self"].concat(i) }] };return { aliases: ["coffee", "cson", "iced"], k: t, i: /\/\*/, c: i.concat([e.C("###", "###"), e.HCM, { cN: "function", b: "^\\s*" + n + "\\s*=\\s*" + o, e: "[-=]>", rB: !0, c: [s, u] }, { b: /[:\(,=]\s*/, r: 0, c: [{ cN: "function", b: o, e: "[-=]>", rB: !0, c: [u] }] }, { cN: "class", bK: "class", e: "$", i: /[:="\[\]]/, c: [{ bK: "extends", eW: !0, i: /[:="\[\]]/, c: [s] }, s] }, { cN: "attribute", b: n + ":", e: ":", rB: !0, rE: !0, r: 0 }]) };
  }), hljs.registerLanguage("perl", function (e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        n = { cN: "subst", b: "[$@]\\{", e: "\\}", k: t },
        r = { b: "->{", e: "}" },
        i = { cN: "variable", v: [{ b: /\$\d/ }, { b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/ }, { b: /[\$%@][^\s\w{]/, r: 0 }] },
        s = [e.BE, n, i],
        o = [i, e.HCM, e.C("^\\=\\w", "\\=cut", { eW: !0 }), r, { cN: "string", c: s, v: [{ b: "q[qwxr]?\\s*\\(", e: "\\)", r: 5 }, { b: "q[qwxr]?\\s*\\[", e: "\\]", r: 5 }, { b: "q[qwxr]?\\s*\\{", e: "\\}", r: 5 }, { b: "q[qwxr]?\\s*\\|", e: "\\|", r: 5 }, { b: "q[qwxr]?\\s*\\<", e: "\\>", r: 5 }, { b: "qw\\s+q", e: "q", r: 5 }, { b: "'", e: "'", c: [e.BE] }, { b: "\"", e: "\"" }, { b: "`", e: "`", c: [e.BE] }, { b: "{\\w+}", c: [], r: 0 }, { b: "-?\\w+\\s*\\=\\>", c: [], r: 0 }] }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*", k: "split return print reverse grep", r: 0, c: [e.HCM, { cN: "regexp", b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*", r: 10 }, { cN: "regexp", b: "(m|qr)?/", e: "/[a-z]*", c: [e.BE], r: 0 }] }, { cN: "sub", bK: "sub", e: "(\\s*\\(.*?\\))?[;{]", r: 5 }, { cN: "operator", b: "-\\w\\b", r: 0 }, { b: "^__DATA__$", e: "^__END__$", sL: "mojolicious", c: [{ b: "^@@.*", e: "$", cN: "comment" }] }];return (n.c = o, r.c = o, { aliases: ["pl"], k: t, c: o });
  }), hljs.registerLanguage("cpp", function (e) {
    var t = { cN: "keyword", b: "\\b[a-z\\d_]*_t\\b" },
        n = { cN: "string", v: [e.inherit(e.QSM, { b: "((u8?|U)|L)?\"" }), { b: "(u8?|U)?R\"", e: "\"", c: [e.BE] }, { b: "'\\\\?.", e: "'", i: "." }] },
        r = { cN: "number", v: [{ b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)" }, { b: e.CNR }] },
        i = { cN: "preprocessor", b: "#", e: "$", k: "if else elif endif define undef warning error line pragma ifdef ifndef", c: [{ b: /\\\n/, r: 0 }, { bK: "include", e: "$", c: [n, { cN: "string", b: "<", e: ">", i: "\\n" }] }, n, r, e.CLCM, e.CBCM] },
        s = e.IR + "\\s*\\(",
        o = { keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong", built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf", literal: "true false nullptr NULL" };return { aliases: ["c", "cc", "h", "c++", "h++", "hpp"], k: o, i: "</", c: [t, e.CLCM, e.CBCM, r, n, i, { b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<", e: ">", k: o, c: ["self", t] }, { b: e.IR + "::", k: o }, { bK: "new throw return else", r: 0 }, { cN: "function", b: "(" + e.IR + "[\\*&\\s]+)+" + s, rB: !0, e: /[{;=]/, eE: !0, k: o, i: /[^\w\s\*&]/, c: [{ b: s, rB: !0, c: [e.TM], r: 0 }, { cN: "params", b: /\(/, e: /\)/, k: o, r: 0, c: [e.CLCM, e.CBCM, n, r] }, e.CLCM, e.CBCM, i] }] };
  }), hljs.registerLanguage("http", function (e) {
    return { aliases: ["https"], i: "\\S", c: [{ cN: "status", b: "^HTTP/[0-9\\.]+", e: "$", c: [{ cN: "number", b: "\\b\\d{3}\\b" }] }, { cN: "request", b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$", rB: !0, e: "$", c: [{ cN: "string", b: " ", e: " ", eB: !0, eE: !0 }] }, { cN: "attribute", b: "^\\w", e: ": ", eE: !0, i: "\\n|\\s|=", starts: { cN: "string", e: "$" } }, { b: "\\n\\n", starts: { sL: [], eW: !0 } }] };
  }), hljs.registerLanguage("json", function (e) {
    var t = { literal: "true false null" },
        n = [e.QSM, e.CNM],
        r = { cN: "value", e: ",", eW: !0, eE: !0, c: n, k: t },
        i = { b: "{", e: "}", c: [{ cN: "attribute", b: "\\s*\"", e: "\"\\s*:\\s*", eB: !0, eE: !0, c: [e.BE], i: "\\n", starts: r }], i: "\\S" },
        s = { b: "\\[", e: "\\]", c: [e.inherit(r, { cN: null })], i: "\\S" };return (n.splice(n.length, 0, i, s), { c: n, k: t, i: "\\S" });
  }), hljs.registerLanguage("java", function (e) {
    var t = e.UIR + "(<" + e.UIR + ">)?",
        n = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
        r = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        i = { cN: "number", b: r, r: 0 };return { aliases: ["jsp"], k: n, i: /<\/|#/, c: [e.C("/\\*\\*", "\\*/", { r: 0, c: [{ cN: "doctag", b: "@[A-Za-z]+" }] }), e.CLCM, e.CBCM, e.ASM, e.QSM, { cN: "class", bK: "class interface", e: /[{;=]/, eE: !0, k: "class interface", i: /[:"\[\]]/, c: [{ bK: "extends implements" }, e.UTM] }, { bK: "new throw return else", r: 0 }, { cN: "function", b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(", rB: !0, e: /[{;=]/, eE: !0, k: n, c: [{ b: e.UIR + "\\s*\\(", rB: !0, r: 0, c: [e.UTM] }, { cN: "params", b: /\(/, e: /\)/, k: n, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] }, e.CLCM, e.CBCM] }, i, { cN: "annotation", b: "@[A-Za-z]+" }] };
  }), hljs.registerLanguage("php", function (e) {
    var t = { cN: "variable", b: "\\$+[a-zA-Z-ÿ][a-zA-Z0-9-ÿ]*" },
        n = { cN: "preprocessor", b: /<\?(php)?|\?>/ },
        r = { cN: "string", c: [e.BE, n], v: [{ b: "b\"", e: "\"" }, { b: "b'", e: "'" }, e.inherit(e.ASM, { i: null }), e.inherit(e.QSM, { i: null })] },
        i = { v: [e.BNM, e.CNM] };return { aliases: ["php3", "php4", "php5", "php6"], cI: !0, k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally", c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", { c: [{ cN: "doctag", b: "@[A-Za-z]+" }, n] }), e.C("__halt_compiler.+?;", !1, { eW: !0, k: "__halt_compiler", l: e.UIR }), { cN: "string", b: /<<<['"]?\w+['"]?$/, e: /^\w+;?$/, c: [e.BE, { cN: "subst", v: [{ b: /\$\w+/ }, { b: /\{\$/, e: /\}/ }] }] }, n, t, { b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ }, { cN: "function", bK: "function", e: /[;{]/, eE: !0, i: "\\$|\\[|%", c: [e.UTM, { cN: "params", b: "\\(", e: "\\)", c: ["self", t, e.CBCM, r, i] }] }, { cN: "class", bK: "class interface", e: "{", eE: !0, i: /[:\(\$"]/, c: [{ bK: "extends implements" }, e.UTM] }, { bK: "namespace", e: ";", i: /[\.']/, c: [e.UTM] }, { bK: "use", e: ";", c: [e.UTM] }, { b: "=>" }, r, i] };
  }), t = undefined, (function () {
    (function (r, i) {
      typeof exports == "object" ? module.exports = i(e, t) : n = (function (e, t) {
        return typeof i == "function" ? i(e, t) : i;
      })(e, t);
    })(this, function (e, t) {
      function n(n) {
        return ({ "components/nova-markdown/marked": e, "components/nova-markdown/highlight.pack": t })[n];
      }var r = undefined;NovaExports.__fixedUglify = "script>", NovaExports.exports = {};var i = NovaExports({ is: "nova-markdown", props: { content: String, hljs: Object }, createdHandler: function createdHandler() {
          this.on("_contentChanged", this.contentChanged);var e = this.querySelector("script");this.content = e ? e.innerHTML : this.innerHTML;
        }, contentChanged: function contentChanged() {
          this.innerHTML = marked(this.content), this.hljs && hljs.configure(hljs);var e = Array.prototype.slice.call(this.querySelectorAll("pre code"));e.forEach(function (e, t) {
            hljs.highlightBlock(e);
          });
        } });return i;
    });
  }).call(window);
})();