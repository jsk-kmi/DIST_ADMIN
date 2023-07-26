"use strict";

/*
	= Common
*/

var isContainElement = function isContainElement(element) {
  return element === document.body ? false : document.body.contains(element);
};

// + openUserControl
var openUserControl = function openUserControl() {
  $('.btn-open-usercontrol').on('click', function () {
    $('.user-control').toggleClass('on');
  });
};

/*
 = Side Navigation
 */
// + menu Toggle
var menuToggle = function menuToggle() {
  var sideNav = $('#sideNav');
  var contentsWrap = $('.content-wrapper');
  var headerWrap = $('.header .wrap');
  var sidebarWidth = 220;
  $('.sidebar-toggle').on('click', function () {
    if ($(sideNav).hasClass('closed') === true) {
      sideNav.removeClass('closed');
      contentsWrap.css('padding-left', sidebarWidth);
      headerWrap.css('padding-left', sidebarWidth);
    } else {
      sideNav.addClass('closed');
      contentsWrap.css('padding-left', 0);
      headerWrap.css('padding-left', 0);
    }
  });
};

// + sideMenuToggle

var sideNavigation = document.querySelector('#sideNav');
var sideMenuToggle = function sideMenuToggle() {
  var sideMenuLink = document.querySelectorAll('.sidebar-menu > li > a');
  var sideMenuLinkArr = [],
    menuLength = sideMenuLink.length;
  for (var i = 0; i < menuLength; i++) {
    sideMenuLinkArr.push(sideMenuLink[i]);
  }
  Array.prototype.forEach.call(sideMenuLink, function (selectedLink) {
    selectedLink.addEventListener('click', function () {
      var extraSideMenuList = sideMenuLinkArr.filter(function (restLinks) {
        return restLinks !== selectedLink;
      });
      Array.prototype.forEach.call(extraSideMenuList, function (link) {
        link.classList.remove('on');
      });
      setTimeout(function () {
        selectedLink.classList.toggle('on');
      }, 200);
    });
  });
};
isContainElement(sideNavigation) ? sideMenuToggle() : false;

/*
			= Form control
	*/

// + input file
var selectedInputFile = function selectedInputFile() {
  $('.c-input-file').on('change', function (e) {
    var seletedFile = $(e.currentTarget),
      selectedFileList = seletedFile.closest('.c-input-file-group').next('.c-input-file-list');
    var fileName = seletedFile.val().split('\\').pop(),
      listHtml = "<li><div class=\"file-info\"><p class=\"name\">".concat(fileName, "</p>\n\t\t<button type=\"button\" class=\"btn-del\"><span class=\"skip\">\uC0AD\uC81C</span></button>\n\t</div></li>");
    selectedFileList.append(listHtml);
  });
};
var selectedListDelFile = function selectedListDelFile() {
  $('.c-input-file-list .btn-del').on('click', function (e) {
    var target = $(e.currentTarget);
    target.closest('li').remove();
  });
};

// + tabContentsView
var tabContentsView = function tabContentsView() {
  $('.c-tab-list').on('click', 'li', function (e) {
    var target = $(e.currentTarget),
      tabList = target.siblings('li'),
      selectedTab = target.children('a').attr('aria-controls'),
      seletedContent = $('.tab-cont').siblings("#".concat(selectedTab)),
      tabContents = seletedContent.siblings('.tab-cont');
    tabList.removeClass('on').find('a').attr('aria-selected', false);
    target.addClass('on').find('a').attr('aria-selected', true);

    // tabContents.hide();
    // seletedContent.show();

    tabContents.removeClass('on');
    seletedContent.addClass('on');
  });
};

// + 검진항목 테이블 bg
var tableCheckBg = function tableCheckBg() {
  $('.tbl-chkup-category').children('tbody').find('td:first-child input').on('change', function () {
    // $(this).closest('tr').toggleClass('highlight', this.checked);

    var $row = $(this).closest('tr');
    var row = $row.index();
    var rowspan = $row.find('td[rowspan]').attr('rowspan') || 0;
    var $rows = $row.parent().children().slice(1, row + rowspan);
    row--;
    $rows.each(function (i) {
      var $tr = $(this);
      var rowspan = $tr.find('td[rowspan]').attr('rowspan') || 0;
      if (i < row && rowspan + i > row || i > row) {
        $row = $row.add($tr);
      }
    });
    if ($(this).is(':checked')) {
      $row.addClass('highlight');
    } else if (!$(this).is(':checked')) {
      $row.removeClass('highlight');
    }
  });
};

// + 검진항목 전체 선택 시 Background 제어
var tableAllCheckBg = function tableAllCheckBg() {
  $('.allchk-chkup-tbl').on('change', function (e) {
    var target = $(e.currentTarget),
      targetTblList = target.closest('thead').next('tbody');
    if (target.is(':checked')) {
      console.log('checked');
      targetTblList.find('tr').addClass('highlight');
    } else if (!target.is(':checked')) {
      targetTblList.find('tr').removeClass('highlight');
    }
  });
};

// 검진 예약 상세보기
var floatingRightBox = function floatingRightBox() {
  var fixHeaderHeight = $('.header').height(),
    currentLayoutOffsetY = $('.reservation-detail').offset().top,
    panelMargin = 40;
  $(window).on('scroll', function () {
    var nowScrollY = $(window).scrollTop() + fixHeaderHeight;
    var topPos = parseInt(nowScrollY - 156);
    if (nowScrollY > currentLayoutOffsetY) {
      $('.c-floating-box').stop().animate({
        top: topPos
      }, 300, 'linear');
    } else if (nowScrollY <= currentLayoutOffsetY) {
      $('.c-floating-box').stop().animate({
        top: 0
      }, 300, 'linear');
    }
  });
};

// 고객사 상세보기 (CT_01_002)
var memoDetailToggle = function memoDetailToggle() {
  $('.c-memo-card > a').on('click', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget),
      curContent = target.children('.col-cont'),
      defaultContHeight = 24,
      detailContent = curContent.find('.detail-cont').height();
    if (detailContent > defaultContHeight) {
      if (!curContent.hasClass('on')) {
        curContent.addClass('on').stop().animate({
          height: detailContent
        }, 300);
        target.attr('aria-expanded', true).attr('title', '내용 접기');
      } else {
        curContent.removeClass('on').stop().animate({
          height: defaultContHeight
        }, 300);
        target.attr('aria-expanded', false).attr('title', '내용 펼치기');
      }
    }
  });
};
// init
function memoCardDetail() {
  $('.c-memo-card').find('.detail-cont').each(function (e) {
    var detailHeight = $(this).height();
    if (detailHeight > 24) {
      $(this).addClass('on');
    } else {
      $(this).removeClass('on');
    }
  });
}

// =  toggleAccordion
var toggleAccordion = function toggleAccordion() {
  $('.co-accrodion-list').on('click', 'a.btn-accrodion', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget),
      accordionBox = target.closest('.co-accordion'),
      accordionPanel = target.next('.accrodion-panel'),
      accordionList = target.closest('.co-accrodion-list');
    if (accordionBox.hasClass('on') && accordionPanel.is(':visible')) {
      accordionBox.removeClass('on').find('.is-blind').text('접기');
      accordionPanel.stop().slideUp(350);
    } else {
      //  only-spread
      if (accordionList.hasClass('only-spread')) {
        accordionList.find('.co-accordion').removeClass('on').children('.accrodion-panel').stop().slideUp(350);
      }
      accordionBox.addClass('on').find('.is-blind').text('펼치기');
      accordionPanel.stop().slideDown(350);
    }
  });
};
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}

// + 메모리스트 아코디언
var toggleMemoAccordion = function toggleMemoAccordion() {
  var memoContBtn = document.querySelectorAll('.memo-cont-btn');
  var memoContList = document.querySelectorAll('.memo-list');
  var memoSkipTxt = document.querySelectorAll('.memo-cont-btn .skip');
  Array.prototype.forEach.call(memoContBtn, function (btn, index) {
    btn.addEventListener('click', function (e) {
      var target = e.currentTarget,
        memoList = target.closest('.memo-list');
      memoList.classList.toggle('active');
      Array.prototype.forEach.call(memoContList, function (memoList, index2) {
        if (index !== index2) {
          memoList.classList.remove('active');
        }
      });
      Array.prototype.forEach.call(memoSkipTxt, function (txt, index) {
        memoContList[index].classList.contains('active') ? txt.innerText = '메모이력접기' : txt.innerText = '메모이력보기';
      });
    });
  });
};
// =  toggleAccordion

// + side Notify Toggle
var closeNoticeSideBar = function closeNoticeSideBar() {
  var noticeSideNav = $('#noticeSideNav');
  $('.btn-close-notice-sidebar').on('click', function () {
    noticeSideNav.removeClass('open');
  });
};
var openNoticeSideBar = function openNoticeSideBar() {
  var noticeSideNav = $('#noticeSideNav');
  $('.btn-open-notice-sidebar').on('click', function () {
    noticeSideNav.addClass('open');
  });
};
var modRsvScrollbarCustom = function modRsvScrollbarCustom() {
  var temsScrollCnt = $('.rsvdtl-popup-type01 .modrsv-scroll').length;
  if (temsScrollCnt > 0) {
    for (var i = 0; i < temsScrollCnt; i++) {
      $('.rsvdtl-popup-type01 .modrsv-scroll').eq(i).children('.inner').addClass("scroll-effect".concat(i));
      window.Scrollbar.init(document.querySelector(".scroll-effect".concat(i)));
    }
  }
};

// + 예약 진행 현황 (예약 변경 설정)
var modRsvScrollbarStatus = function modRsvScrollbarStatus() {
  var temsScrollCnt02 = $('.reservation-dtl-status-layout .modrsv-scroll').length;
  if (temsScrollCnt02 > 0) {
    for (var j = 0; j < temsScrollCnt02; j++) {
      $('.reservation-dtl-status-layout .modrsv-scroll').eq(j).children('.inner').addClass("scroll-effect".concat(j));
      window.Scrollbar.init(document.querySelector(".scroll-effect".concat(j)));
    }
  }
};

// + 공지하기 등록
var noticeEnrollment = function noticeEnrollment() {
  var Scrollbar = window.Scrollbar;
  Scrollbar.init(document.querySelector('.list-send-person'));
};

// + Table Vh Scroll
var tableVhScroll = function tableVhScroll() {
  var table = document.querySelector('.c-table-field');
  if (table === null) {
    return 0;
  } else {
    if (table.classList.contains('c-tbl-vh-field')) {
      var tableField = document.querySelector('.c-tbl-vh-field');
      var theadwidth = tableField.querySelector('thead').clientWidth;
      document.querySelector('.c-table').addEventListener('scroll', function () {
        tableField.querySelector('thead').classList.add('scroll');
        tableField.querySelector('thead').style.width = theadwidth;
      });
    }
  }
};

// + Form Element Align
var formElemAlign = function formElemAlign() {
  var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var target = arguments.length > 1 ? arguments[1] : undefined;
  console.log(elem);
  var addWrapSelector = '',
    inputListSelecotor = '.c-article.input-list',
    inputListSelecotor02 = '.c-article.input-list02';

  // modal 내 input 요소 처리

  if (elem === 'default') {
    addWrapSelector = 'section.contents';
    if (document.querySelectorAll(inputListSelecotor).length > 0) {
      console.log('input List 존재');
      document.querySelector(addWrapSelector).classList.add('type-horizontal');
    }
  } else if (elem === 'modal') {
    addWrapSelector = "#".concat(target);
    if (document.querySelectorAll(inputListSelecotor).length > 0 || document.querySelectorAll(inputListSelecotor02).length > 0) {
      document.querySelector(addWrapSelector).classList.add('type-horizontal');
    }
  }
};

// window.addEventListener('DOMContentLoaded', () => {
//   formElemAlign();

//   // 모달 있는 경우
//   if (document.querySelectorAll('[data-toggle="modal"]').length > 0) {
//     document.querySelector('[data-toggle="modal"]').addEventListener('click', (e) => {
//       let elem = e.currentTarget,
//         curElemTarget = elem.dataset.target.replace('#', '');
//       console.log(curElemTarget);

//       formElemAlign('modal', curElemTarget);
//     });
//   }
// });

// + 개인정보수집 약관 modal
var modalBtn = document.querySelectorAll('.c-modal-btn');
var modalCont = document.querySelector('.c-modal-cont');
var modalCloseBtn = document.querySelectorAll('.c-modal-wrap .c-popup-close-btn');

// modal open
Array.prototype.forEach.call(modalBtn, function (btn) {
  btn.addEventListener('click', function (e) {
    var modalDataSet = e.currentTarget.dataset.modal;
    var modalDataValue = document.querySelector(modalDataSet);
    modalDataValue.parentNode.classList.add('open');
    modalDataValue.setAttribute('aria-hidden', false);
  });
});

// modal close
Array.prototype.forEach.call(modalCloseBtn, function (item) {
  item.addEventListener('click', function (e) {
    var modalDataSet2 = e.currentTarget.closest('.c-modal-cont');
    var modalDataSetValue = modalDataSet2.parentNode;
    modalDataSetValue.classList.remove('open');
    modalDataSet2.setAttribute('aria-hidden', true);
  });
});

// + DataTable Library Control
var DefaultDateOptionBasic = {
  scrollX: true,
  paging: false,
  searching: false,
  ordering: false,
  reponsive: true,
  info: false,
  autoWitdh: false,
  language: {
    zeroRecords: '데이터가 없습니다.',
    loadingRecods: '로딩중...',
    processing: '처리중',
    infoEmpty: '데이터가 없습니다.'
  }
};

// + 연기 검사 팝업
var delayExamModal = document.querySelector('.delayexamination-info-popup'),
  delayPopupStyle = 'display:block; z-index:1049';
var initDelayExamModal = function initDelayExamModal() {
  delayExamModal.style.cssText = 'display:block; z-index: -1';
  document.querySelector('.btn-open-delayexam-popup').addEventListener('click', function () {
    var showBoolean = delayExamModal.classList.contains('show');
    if (!showBoolean) {
      delayExamModal.style.cssText = delayPopupStyle;
    } else {
      delayExamModal.style.cssText = '';
    }
  });
};

// = function list
openUserControl();
menuToggle();
tabContentsView();
memoDetailToggle();
tableCheckBg();
openNoticeSideBar();
closeNoticeSideBar();
// basicScrollbarCustom();
modRsvScrollbarCustom();
tableVhScroll();
//# sourceMappingURL=maps/common.js.map
