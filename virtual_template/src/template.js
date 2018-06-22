const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  
  
  const noMatch = /(.)^/;
  
  const templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  

  const escaper = /\\|'|\r|\n|\u2028|\u2029/g;
  
  const escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  const escapeChar = function (match) {
    return '\\' + escapes[match];
  };
  
  const createEscaper = function (map) {
    let escaper = function (match) {
      return map[match];
    };
    let source = '(?:' + Object.keys(map).join('|') + ')';
    let testRegexp = RegExp(source);
    let replaceRegexp = RegExp(source, 'g');
    return function (string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  
  
  const escape = createEscaper(escapeMap);
  
  
  /**
   * 编译模板
   * @param {String} template 模板
   */
  function template(text, settings) {
    settings = Object.assign({}, settings, templateSettings);

    let matcher = RegExp(
      [
        // 注意下 pattern 的 source 属性
        // |$用来匹配模板最后空字符
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
      ].join('|') + '|$',
      'g'
    );
    let index = 0;
    let source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;
      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
  
      return match;
    });
  
    source += "';\n";
  
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
  
    source =
      "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source +
      'return __p;\n';
  
    let render;
    try {
      render = new Function(settings.variable || 'obj', 'escape', source);
    } catch (e) {
      e.source = source;
      throw e;
    }
  
    let template = function (data) {
      return render.call(this, data, escape);
    };
  
    let argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';
    return template;
  }

  module.exports = template;

  