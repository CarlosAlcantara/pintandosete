/* Ícones da interface (SVG). Cores fixas, contorno escuro, sem texto. */
(function () {
  'use strict';
  var A = '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" stroke="#2b2d42" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">';
  var Z = '</svg>';
  window.ICO = {
    casa: A + '<path d="M6 24L24 8l18 16" fill="none"/><path d="M11 21v19h26V21L24 10z" fill="#ffd166"/><rect x="20" y="28" width="8" height="12" fill="#ef476f"/>' + Z,
    voltar: A + '<path d="M28 9L12 24l16 15" fill="none" stroke-width="5"/><path d="M28 9L12 24l16 15" fill="none" stroke="#fff" stroke-width="1.6"/>' + Z,
    desfazer: A + '<path d="M14 18h16a10 10 0 0 1 0 20H18" fill="none" stroke-width="4.5"/><path d="M19 9l-9 9 9 9z" fill="#2b2d42"/>' + Z,
    lixo: A + '<rect x="12" y="15" width="24" height="26" rx="3" fill="#ef476f"/><path d="M8 15h32M19 15v-5h10v5M19 21v14M24 21v14M29 21v14" fill="none"/>' + Z,
    salvar: A + '<path d="M5 14v24a3 3 0 0 0 3 3h32a3 3 0 0 0 3-3V18a3 3 0 0 0-3-3H23l-4-5H8a3 3 0 0 0-3 3z" fill="#06d6a0"/><path d="M24 20l2.6 5.4 5.9.8-4.3 4.1 1 5.8L24 33.3l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" fill="#ffd166" stroke-width="1.8"/>' + Z,
    baixar: A + '<path d="M24 6v24M14 20l10 10 10-10" fill="none" stroke-width="4.5"/><path d="M8 32v8h32v-8" fill="none" stroke-width="4"/>' + Z,
    balde: A + '<path d="M10 20l14-10 14 14-14 10z" fill="#fff"/><path d="M10 20l14 14 14-10" fill="none"/><path d="M14 10l6 6" fill="none"/><path d="M38 26c3 4 5 7 5 9a4 4 0 0 1-8 0c0-2 1-5 3-9z" fill="currentColor"/><path d="M10 20c-2 4-1 8 3 9" fill="none"/>' + Z,
    magico: A + '<path d="M10 42c-3-3 0-8 4-9l3 4c-1 3-4 6-7 5z" fill="currentColor"/><path d="M15 33L33 13l4 4-18 20z" fill="#c9a26b"/><path d="M38 4l1.5 3.5L43 9l-3.5 1.5L38 14l-1.5-3.5L33 9l3.5-1.5z" fill="#ffd166" stroke-width="1.6"/><path d="M27 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#ffd166" stroke-width="1.2"/>' + Z,
    lapis: A + '<path d="M8 40l3-10L32 9l7 7-21 21z" fill="#ffd166"/><path d="M8 40l3-10 7 7z" fill="#f4d9b0"/><path d="M8 40l1.5-5 3.5 3.5z" fill="currentColor"/><path d="M28 13l7 7" fill="none"/>' + Z,
    borracha: A + '<path d="M6 32l16-16 14 14-10 10H14z" fill="#f78fb3"/><path d="M22 16l8-8 14 14-8 8z" fill="#fff"/><path d="M14 40h28" fill="none"/>' + Z,
    dado: A + '<rect x="7" y="7" width="34" height="34" rx="8" fill="#fff"/><g fill="#2b2d42" stroke="none"><circle cx="16" cy="16" r="3.4"/><circle cx="32" cy="16" r="3.4"/><circle cx="24" cy="24" r="3.4"/><circle cx="16" cy="32" r="3.4"/><circle cx="32" cy="32" r="3.4"/></g>' + Z,
    pasta: A + '<path d="M5 14v24a3 3 0 0 0 3 3h32a3 3 0 0 0 3-3V18a3 3 0 0 0-3-3H23l-4-5H8a3 3 0 0 0-3 3z" fill="#ffd166"/><rect x="13" y="20" width="22" height="15" rx="2" fill="#fff"/><path d="M15 33l6-7 4 4 3-3 5 6" fill="none" stroke-width="2"/><circle cx="29" cy="24" r="2" fill="#ef476f" stroke="none"/>' + Z,
    somOn: A + '<path d="M8 19h7l10-8v26l-10-8H8z" fill="#fff"/><path d="M31 17a9 9 0 0 1 0 14M35 12a15 15 0 0 1 0 24" fill="none"/>' + Z,
    somOff: A + '<path d="M8 19h7l10-8v26l-10-8H8z" fill="#fff"/><path d="M32 18l10 12M42 18L32 30" fill="none" stroke="#ef476f" stroke-width="3.5"/>' + Z,
    professor: A + '<circle cx="24" cy="24" r="17" fill="#fff"/><path d="M24 22v11" fill="none" stroke-width="4"/><circle cx="24" cy="15" r="2.6" fill="#2b2d42"/>' + Z,
    sim: A + '<path d="M10 25l9 9 19-20" fill="none" stroke="#fff" stroke-width="6"/>' + Z,
    nao: A + '<path d="M13 13l22 22M35 13L13 35" fill="none" stroke="#fff" stroke-width="6"/>' + Z,
    todos: A + '<circle cx="15" cy="15" r="6" fill="#ef476f"/><circle cx="33" cy="15" r="6" fill="#ffd166"/><circle cx="15" cy="33" r="6" fill="#06d6a0"/><circle cx="33" cy="33" r="6" fill="#118ab2"/>' + Z,
    pessoas: A + '<circle cx="17" cy="17" r="6" fill="#ffd166"/><circle cx="32" cy="19" r="5" fill="#06d6a0"/><path d="M6 40c0-9 5-13 11-13s11 4 11 13zM24 40c0-8 3-12 8-12s9 4 9 12z" fill="#fff"/>' + Z,
    pergunta: A + '<circle cx="24" cy="18" r="9" fill="#ffd166"/><path d="M8 44c0-10 7-16 16-16s16 6 16 16" fill="#118ab2"/><path d="M38 4c4 0 6 2 6 5s-3 4-4 6M40 19v0" fill="none" stroke-width="2.4"/>' + Z,
    lapisPeq: A + '<path d="M8 40l3-10L32 9l7 7-21 21z" fill="#ffd166"/><path d="M28 13l7 7" fill="none"/>' + Z,
    estrela: function (cheia) { return A + '<path d="M24 5l5.6 11.8 12.9 1.6-9.5 8.9 2.4 12.8L24 33.8l-11.4 6.3 2.4-12.8-9.5-8.9 12.9-1.6z" fill="' + (cheia ? '#ffd166' : '#fff') + '"/>' + Z; },
    paleta: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" stroke="#2b2d42" stroke-width="2.4"><path d="M24 5C12 5 4 13 4 23c0 9 7 15 13 15 4 0 4-3 3-5-2-3 0-6 4-6h6c8 0 14-4 14-11C44 10 35 5 24 5z" fill="#fff"/><circle cx="14" cy="20" r="4" fill="#ef476f"/><circle cx="22" cy="12" r="4" fill="#ffd166"/><circle cx="33" cy="13" r="4" fill="#06d6a0"/><circle cx="37" cy="23" r="4" fill="#118ab2"/></svg>'
  };
})();
