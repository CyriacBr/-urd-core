'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Parser = /*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
(function() {

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = 'SyntaxError';

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },

      class: function(expectation) {
        var escapedParts = '',
          i;

        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts +=
            expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + '-' + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
        }

        return '[' + (expectation.inverted ? '^' : '') + escapedParts + ']';
      },

      any: function(expectation) {
        return 'any character';
      },

      end: function(expectation) {
        return 'end of input';
      },

      other: function(expectation) {
        return expectation.description;
      }
    };

    function hex(ch) {
      return ch
        .charCodeAt(0)
        .toString(16)
        .toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g, function(ch) {
          return '\\x0' + hex(ch);
        })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return '\\x' + hex(ch);
        });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/\]/g, '\\]')
        .replace(/\^/g, '\\^')
        .replace(/-/g, '\\-')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g, function(ch) {
          return '\\x0' + hex(ch);
        })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return '\\x' + hex(ch);
        });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
        i,
        j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + ' or ' + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(', ') + ', or ' + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? '"' + literalEscape(found) + '"' : 'end of input';
    }

    return 'Expected ' + describeExpected(expected) + ' but ' + describeFound(found) + ' found.';
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};

    var peg$FAILED = {},
      peg$startRuleFunctions = { Content: peg$parseContent },
      peg$startRuleFunction = peg$parseContent,
      peg$c0 = '\n',
      peg$c1 = peg$literalExpectation('\n', false),
      peg$c2 = function(startTag, content, endTag) {
        let s = typeof startTag === 'string' ? startTag : startTag.name;
        if (s.replace(/\:.+/i, '') != endTag) {
          throw new Error('Expected </' + startTag + '> but </' + endTag + '> found.');
        }

        let toString = '';
        if (typeof startTag === 'string') {
          toString = '<' + startTag + '>\n';
        } else {
          toString = '<' + startTag.name + ':' + startTag.arg + '>\n';
        }
        const textContent = content.map(v => (typeof v === 'string' ? v.trim() : v.toString)).join('\n');
        if (textContent.trim()) {
          toString += textContent + (textContent.endsWith('\n') ? '' : '\n');
        }
        toString += '</' + endTag + '>';
        return {
          type: 'tag',
          tag: startTag,
          content: content.map(v => (typeof v === 'string' ? v.trim() : v)),
          toString
        };
      },
      peg$c3 = ':',
      peg$c4 = peg$literalExpectation(':', false),
      peg$c5 = /^[^\n]/,
      peg$c6 = peg$classExpectation(['\n'], true, false),
      peg$c7 = function(space1, name, space2, space3, value) {
        return {
          type: 'prop',
          prop: name,
          value: value.join(''),
          toString: space1.join('') + name + space2.join('') + ':' + space3.join('') + value.join('')
        };
      },
      peg$c8 = '<',
      peg$c9 = peg$literalExpectation('<', false),
      peg$c10 = '>',
      peg$c11 = peg$literalExpectation('>', false),
      peg$c12 = function(name) {
        return name;
      },
      peg$c13 = /^[^><]/,
      peg$c14 = peg$classExpectation(['>', '<'], true, false),
      peg$c15 = function(name, chars) {
        return {
          name: name,
          arg: chars.join('').trim()
        };
      },
      peg$c16 = '</',
      peg$c17 = peg$literalExpectation('</', false),
      peg$c18 = /^[a-z0-9\-_!$@]/i,
      peg$c19 = peg$classExpectation([['a', 'z'], ['0', '9'], '-', '_', '!', '$', '@'], false, true),
      peg$c20 = function(chars) {
        return chars.join('');
      },
      peg$c21 = /^[^<]/,
      peg$c22 = peg$classExpectation(['<'], true, false),
      peg$c23 = /^[ \/t\/r]/,
      peg$c24 = peg$classExpectation([' ', '/', 't', '/', 'r'], false, false),
      peg$currPos = 0,
      peg$posDetailsCache = [{ line: 1, column: 1 }],
      peg$maxFailPos = 0,
      peg$maxFailExpected = [],
      peg$result;

    if ('startRule' in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: 'literal', text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: 'class', parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$endExpectation() {
      return { type: 'end' };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
        p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }

    function peg$parseContent() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseExpression();
      if (s1 === peg$FAILED) {
        s1 = peg$parseElement();
        if (s1 === peg$FAILED) {
          s1 = peg$parseText();
          if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
              s1 = peg$c0;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              {
                peg$fail(peg$c1);
              }
            }
          }
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseExpression();
        if (s1 === peg$FAILED) {
          s1 = peg$parseElement();
          if (s1 === peg$FAILED) {
            s1 = peg$parseText();
            if (s1 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s1 = peg$c0;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                {
                  peg$fail(peg$c1);
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseElement() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseStartTag();
      if (s1 === peg$FAILED) {
        s1 = peg$parseStartTagWithArg();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseContent();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseEndTag();
          if (s3 !== peg$FAILED) {
            s1 = peg$c2(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseExpression() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 10) {
        s1 = peg$c0;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        {
          peg$fail(peg$c1);
        }
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTagName();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseSpace();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s5 = peg$c3;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                {
                  peg$fail(peg$c4);
                }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseSpace();
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  if (peg$c5.test(input.charAt(peg$currPos))) {
                    s8 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      if (peg$c5.test(input.charAt(peg$currPos))) {
                        s8 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        {
                          peg$fail(peg$c6);
                        }
                      }
                    }
                  } else {
                    s7 = peg$FAILED;
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 10) {
                      s8 = peg$c0;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      {
                        peg$fail(peg$c1);
                      }
                    }
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c7(s2, s3, s4, s6, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseStartTag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseSpace();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c8;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          {
            peg$fail(peg$c9);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTagName();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s4 = peg$c10;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              {
                peg$fail(peg$c11);
              }
            }
            if (s4 !== peg$FAILED) {
              s1 = peg$c12(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseStartTagWithArg() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseSpace();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c8;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          {
            peg$fail(peg$c9);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseTagName();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c3;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              {
                peg$fail(peg$c4);
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = [];
              if (peg$c13.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                {
                  peg$fail(peg$c14);
                }
              }
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  if (peg$c13.test(input.charAt(peg$currPos))) {
                    s6 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    {
                      peg$fail(peg$c14);
                    }
                  }
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                  s6 = peg$c10;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  {
                    peg$fail(peg$c11);
                  }
                }
                if (s6 !== peg$FAILED) {
                  s1 = peg$c15(s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseEndTag() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c16) {
        s1 = peg$c16;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        {
          peg$fail(peg$c17);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseTagName();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            {
              peg$fail(peg$c11);
            }
          }
          if (s3 !== peg$FAILED) {
            s1 = peg$c12(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTagName() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c18.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        {
          peg$fail(peg$c19);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c18.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            {
              peg$fail(peg$c19);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c20(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseText() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c21.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        {
          peg$fail(peg$c22);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c21.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            {
              peg$fail(peg$c22);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c20(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseSpace() {
      var s0, s1;

      s0 = [];
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        {
          peg$fail(peg$c24);
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          {
            peg$fail(peg$c24);
          }
        }
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
})();

var Urd = /** @class */ (function () {
    function Urd() {
    }
    Urd.parse = function (input) {
        var result = Parser.parse(input);
        var object = {};
        var fill = function (obj, set) {
            set = set.filter(function (i) { return !!i; });
            obj.$text = [];
            for (var _i = 0, set_1 = set; _i < set_1.length; _i++) {
                var data = set_1[_i];
                if (data.type === 'prop') {
                    obj[data.prop] = data.value;
                }
                else if (data.type === 'tag') {
                    if (typeof data.tag === 'object') {
                        obj[data.tag.name] = {
                            $param: data.tag.arg,
                            $toString: data.toString
                        };
                        fill(obj[data.tag.name], data.content || []);
                    }
                    else {
                        obj[data.tag] = {
                            $toString: data.toString
                        };
                        fill(obj[data.tag], data.content || []);
                    }
                }
                else if (typeof data === 'string') {
                    obj.$text.push(data);
                }
            }
            obj.$text = obj.$text.join('\n');
        };
        fill(object, result);
        return object;
    };
    Urd.makePatterns = function (model) {
        var modelPatterns = [];
        var makePattern = function (data, iniPath) {
            if (data === void 0) { data = model; }
            if (iniPath === void 0) { iniPath = '__root__'; }
            var path = iniPath;
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                var id = value.display || key;
                if (typeof value === 'object') {
                    modelPatterns.push({
                        id: id,
                        path: path,
                        type: value.type,
                        desc: value.desc,
                        realKey: key,
                        context: value.context,
                        suggestions: value.suggestions
                    });
                    if ('fields' in value) {
                        path += '.' + id;
                        makePattern(value.fields, path);
                    }
                }
            }
        };
        makePattern();
        return modelPatterns;
    };
    Urd.makePaths = function (text) {
        var paths = ['__root__'];
        var lines = text.split('\n');
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var match = this.matchBlock(line);
            if (match.starting) {
                paths.push(match.prop);
            }
            else if (match.ending) {
                paths.pop();
            }
        }
        return paths;
    };
    Urd.matchBlock = function (str) {
        var res = { match: false };
        if (str.match(/^(\s*[^<]+)(:)(.+[^>])/i)) {
            res = {
                match: true,
                prop: RegExp.$1.trim(),
                propPosition: RegExp.$1.length - RegExp.$1.trim().length,
                propValue: RegExp.$3,
                inline: true
            };
        }
        else if (str.match(/^(\s*<)([^\/:]+)(>)/i)) {
            var prop = RegExp.$2;
            if (prop.startsWith('!')) {
                prop = prop.substr(1, prop.length - 1);
                res.isEval = true;
            }
            res = __assign({}, res, { match: true, starting: true, prop: prop, propPosition: RegExp.$1.length });
        }
        else if (str.match(/^(\s*<)([^\/]+)(:)(.+)(>)/i)) {
            var prop = RegExp.$2;
            if (prop.startsWith('!')) {
                prop = prop.substr(1, prop.length - 1);
                res.isEval = true;
            }
            res = __assign({}, res, { match: true, starting: true, prop: prop, propPosition: RegExp.$1.length, parameter: RegExp.$4 });
        }
        else if (str.match(/^(\s*<\/)([^:]+)(>)/i)) {
            res = {
                match: true,
                ending: true,
                prop: RegExp.$2,
                propPosition: RegExp.$1.length
            };
        }
        return res;
    };
    return Urd;
}());

exports.Urd = Urd;
