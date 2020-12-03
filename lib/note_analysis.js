"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractTagsFromMarkdown = extractTagsFromMarkdown;
exports.extractLinksFromMarkdown = extractLinksFromMarkdown;
exports.getMarkdownFromHtml = getMarkdownFromHtml;
exports.getResourcesFromHtml = getResourcesFromHtml;
exports.REGEXP_TAG = void 0;
// 规则: 在一行內，#在一个单词开头，表示标签开始。如果在行尾，找不到单词结尾+#，则表示标签以空格结束。
// Tag 不能太长，限定在 25 个字符以内
var REGEXP_TAG = /(^|[\t\f\v ])#(?!#|\s)(([^#\r\n]{0,25}[^#\s]#)|([^#\s]{0,25}$)|(\S{0,25}(\S|$)))/gm; // 规则: [[xxxx]] 提取出xxxx

exports.REGEXP_TAG = REGEXP_TAG;
var REGEXP_LINK = /\[{2}[^\[\]]*\]{2}/g;

function clearCodeFromMarkdown(markdown) {
  var codeReg = /```[^`]*```/g;
  return markdown.replace(codeReg, '');
}

function clearCodeInLineFromMarkdown(markdown) {
  var codeReg = /`.*?`/g;
  return markdown.replace(codeReg, '\n');
}

function clearLinkFromMarkdown(markdown) {
  var linkReg = /\[[^[\]]*]\([^()\r\n]*\)/g;
  return markdown.replace(linkReg, '\n');
}

function extractTagsFromMarkdown(markdown) {
  // 规则: 在一行內，#在一个单词开头，表示标签开始。如果在行尾，找不到单词结尾+#，则表示标签以空格结束。
  // 如果找到单词+#结尾，则标签以单词结尾+#结束
  // #test1 #test2 xxxx, xxx, xxx => ['test1', 'test2']
  // #test test sss#, #test xxx -> ['test test sss', 'test']
  var str = markdown;
  str = clearCodeFromMarkdown(str);
  str = clearCodeInLineFromMarkdown(str);
  str = clearLinkFromMarkdown(str);
  var matches = str.match(REGEXP_TAG);

  if (!matches) {
    return [];
  }

  var matchSet = new Set();
  matches.forEach(function (s) {
    var tag = s.replace(/#/g, '').trim().toLowerCase();

    if (tag) {
      matchSet.add(tag);
    }
  });
  var result = Array.from(matchSet);
  return result.sort();
}

function extractLinksFromMarkdown(markdown) {
  // 规则: [[xxxx]] 提取出xxxx
  var matches = clearCodeFromMarkdown(markdown).match(REGEXP_LINK);

  if (!matches) {
    return [];
  }

  var matchSet = new Set();
  matches.forEach(function (s) {
    var link = s.replace(/\[|\]/g, '').trim();

    if (link) {
      matchSet.add(link);
    }
  });
  var result = Array.from(matchSet);
  return result.sort();
}

function getMarkdownFromHtml(html) {
  var from = html.indexOf('<pre>');
  var to = html.lastIndexOf('</pre>');

  if (from === -1 || to === -1 || from > to) {
    return '';
  } //


  var text = html.substr(from + 5, to - from - 5);
  var result = text.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  return result;
}

function parseIncludeResourcesForMarkdown(markdown) {
  var map = {};
  var result = [];

  if (!markdown) {
    return result;
  }

  var resourceReg = /!\[[^\]]*]\(index_files\/([^)]*)/gi;

  for (;;) {
    var file = resourceReg.exec(markdown);

    if (!file) {
      break;
    }

    var fileName = file[1].replace(/\s=[^.]*$/, '');

    if (!map[fileName]) {
      map[fileName] = true;
      result.push({
        name: fileName
      });
    }
  }

  return result;
}

function getResourcesFromHtml(html) {
  var markdown = getMarkdownFromHtml(html);
  markdown = clearCodeFromMarkdown(markdown);
  markdown = clearCodeInLineFromMarkdown(markdown);
  return parseIncludeResourcesForMarkdown(markdown);
}