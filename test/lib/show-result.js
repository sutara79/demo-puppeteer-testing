// レポートが作成されていることを確認する
const mocha = document.getElementById('mocha');
if (!mocha.hasChildNodes()) {
  console.error('Test was failed unexpectedly.');
  exit();
}

// 要約を表示する
const stats = document.querySelector('#mocha-stats');
console.log(
  stats.querySelectorAll('.passes')[0].textContent + ', ' +
  stats.querySelectorAll('.failures')[0].textContent + ', ' +
  stats.querySelectorAll('.duration')[0].textContent
);


/**
 * .report を検索する
 *
 * @param  {object} elem DOM要素
 */
const findReport = (elem) => {
  let children = elem.children;
  for (var i = 0; i < children.length; i++) {
    // .pass か?
    if (children[i].classList.contains('pass')) {
      showPass(children[i]);
    }

    // .fail か?
    if (children[i].classList.contains('fail')) {
      showFail(children[i]);
    }

    // .suite か?
    if (children[i].classList.contains('suite')) {
      showSuite(children[i]);
    }
  }
};

/**
 * .suite を表示する
 *
 * @param  {object} elem DOM要素
 */
const showSuite = (elem) => {
  let children = elem.children;
  for (var i = 0; i < children.length; i++) {
    // 題名を表示
    // if (children[i].tagName == ('H1' || 'H2' || 'H3' || 'H4' || 'H5' || 'H6')) {
    if (
      children[i].tagName == 'H1' ||
      children[i].tagName == 'H2' ||
      children[i].tagName == 'H3' ||
      children[i].tagName == 'H4' ||
      children[i].tagName == 'H5' ||
      children[i].tagName == 'H6'
    ) {
      showText(children[i].textContent);
    }

    if (children[i].tagName == 'UL') {
      nest++;
      findReport(children[i]);
    }
  }
};


/**
 * 文字列を表示する
 *
 * @param  {string} text 表示する文字列
 */
const showText = (text) => {
  console.log(' '.repeat(nest * 2) + text);
};

/**
 * .pass を表示する
 *
 * @param  {object} elem DOM要素
 */
const showPass = (elem) => {
  let children = elem.children;
  for (var i = 0; i < children.length; i++) {
    // 題名を表示
    // if (children[i].tagName == ('H1' || 'H2' || 'H3' || 'H4' || 'H5' || 'H6')) {
    if (
      children[i].tagName == 'H1' ||
      children[i].tagName == 'H2' ||
      children[i].tagName == 'H3' ||
      children[i].tagName == 'H4' ||
      children[i].tagName == 'H5' ||
      children[i].tagName == 'H6'
    ) {
      showText('✓ ' + children[i].textContent);
    }
  }
};

/**
 * .fail を表示する
 *
 * @param  {object} elem DOM要素
 */
const showFail = (elem) => {
  let children = elem.children;
  for (var i = 0; i < children.length; i++, nest++) {
    // 題名を表示
    // if (children[i].tagName == ('H1' || 'H2' || 'H3' || 'H4' || 'H5' || 'H6')) {
    if (
      children[i].tagName == 'H1' ||
      children[i].tagName == 'H2' ||
      children[i].tagName == 'H3' ||
      children[i].tagName == 'H4' ||
      children[i].tagName == 'H5' ||
      children[i].tagName == 'H6' 
    ) {
      showText('✖ ' + children[i].textContent);
    }

    if (children[i].classList.contains('error')) {
      showText(children[i].textContent);
    }
  }
};

const report = document.getElementById('mocha-report');
let nest = 0;
findReport(report);
