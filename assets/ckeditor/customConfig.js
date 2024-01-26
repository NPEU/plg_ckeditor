/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

// Disable version check as the endpoint 404's (CKEditor org at fault most likely)
CKEDITOR.config.versionCheck = false;

//console.log( CKEDITOR.dtd[ 'a' ] );
//CKEDITOR.dtd.$block.i = true;
//console.log( !!CKEDITOR.dtd[ 'i' ][ 'br' ] );
//console.log( CKEDITOR.dtd.$block );
//console.log( CKEDITOR.dtd.$inline );

//CKEDITOR.dtd.$blockLimit['blockquote'] = 1;
//CKEDITOR.dtd.i.br = 1;

// Allow sections to be blocks so we can use those as wrappers, otherwise paragraphs are created
// when pressing ENTER, and paragaphs can't wrap FIGURES, which are often used as wrappers by
// modules, so when using {loadposition} we get p > figure, which isn't allowed.
// Example on page: https://www.npeu.ox.ac.uk/maathri/research/repeated-monthly-survey-of-severe-maternal-complications

// NOTE this is still a bit broken, but it's possible to get the desired markup by wrapping the
// {loadposition} text in a noraml P, wrap that in a box, then change the P to a WRAPPER.

//CKEDITOR.dtd.$inline['section'] = 1;
//CKEDITOR.dtd.$blockLimit['div'] = 0;

// Allow <div>s inside <a>s (for SVG pattern):
CKEDITOR.dtd.a.div = 1;

//console.log(CKEDITOR.dtd.blockquote);
//console.log(!!CKEDITOR.dtd[ 'blockquote' ][ 'p' ]);
//console.log('custom');
CKEDITOR.editorConfig = function( config ) {
    //filebrowserBrowseUrl: '/browser/browse.php?type=Files',
    //console.log('config: ', config);
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for a single toolbar row.
    /*config.toolbarGroups = [
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'forms' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' },
        { name: 'about' }
    ];*/
    /*config.toolbarGroups = [
        { name: 'editing',     groups: [ 'undo', 'find', 'selection', 'spellchecker' ] },
        { name: 'clipboard',   groups: [ 'clipboard' ] },
        { name: 'forms' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'align', 'bidi' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'styles' },
        { name: 'wymstyles' },
        { name: 'colors' },
        { name: 'blocks' },
        { name: 'others' },
        { name: 'tools' },
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'about' }
    ];*/


    config.toolbar = [
        { name: 'Editing',   items: [ 'Undo', 'Redo' ] },
        { name: 'Align',     items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
        { name: 'Inline',    items: [ 'Link', 'Unlink', '-', 'Superscript', 'Subscript', '-', 'SpecialChar' ] },
        { name: 'Lists',     items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'DescriptionList' ] },
        { name: 'Blocks',    items: [ 'Blockquote', '-', 'Box', 'CreateDiv', '-', 'Expander', '-', 'Contact', '-', 'Table' ] },
        { name: 'Media',     items: [ 'JImage', '-', 'JFile', '-', 'YouTube' ] },
        { name: 'Footnotes', items: [ 'Footnotes' ] },
        { name: 'Styles',    items: [ 'Styles--B', 'Styles--I' ] },
        { name: 'Maximise',  items: [ 'Maximize' ] },
        { name: 'Source',    items: [ 'Source' ] }

    ];


    /*
        { name: 'Links', items: [ 'Link', 'Unlink' ] },
        { name: 'Position', items: [ 'Superscript', 'Subscript' ] },
        { name: 'Special', items: [ 'SpecialChar' ] },
    */

    /*config.toolbarGroups = [
        { name: 'editing',     groups: [ 'undo', 'find', 'selection', 'spellchecker' ] },
        { name: 'forms' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'align', 'bidi' ] },
        { name: 'links' },
        { name: 'insert',      groups: ['blocks'] },
        { name: 'styles' },
        { name: 'wymstyles' },
        { name: 'colors' },
        { name: 'others' },
        { name: 'tools' },
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
    ];*/
    // The default plugins included in the basic setup define some buttons that
    // are not needed in a basic editor. They are removed here.
    // ** FOR LIVE, for now, REMOVE IMAGE BUTTON **
    config.removeButtons = 'Cut,Copy,Paste,Italic,Bold,Underline,Strike,Anchor,Styles,Image';

    // Dialog windows are also simplified.
    //config.removeDialogTabs = 'link:advanced;link:target;editdiv:advanced';
    //config.removeDialogTabs = 'link:advanced;link:target;creatediv:advanced;editdiv:advanced';

    // ** FOR LIVE, for now, REMOVE LINK TABS **
    config.removeDialogTabs = 'div:advanced;link:advanced;link:target;link:upload';


    //config.stylesSet = 'div_styles';

    //config.extraPlugins = 'stylescombo_b,stylescombo_i,simplebox,inlinebox,inlineextra';
    //config.extraPlugins = 'stylescombo_b,stylescombo_i,simplebox,inlineextra,blockextra';
    //config.extraPlugins = 'stylescombo_b,stylescombo_i,footnotes';
    //config.extraPlugins = 'stylescombo_b,stylescombo_i';

    config.bodyClass = 'c-user-content';

    config.contentsCss = [
        //CKEDITOR.getUrl( 'contents.css' ),
        CKEDITOR.getUrl( '../editor-contents-user.css' )
        //CKEDITOR.getUrl( '../ck_npeu/contents_npeu.css' )
    ];

    //config.autoGrow_maxHeight = 400;
    //config.filebrowserBrowseUrl = '/plugins/editors/ckeditorbasic/ckfinder/ckfinder.html';
    //config.filebrowserUploadUrl = '/plugins/editors/ckeditorbasic/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';

    // Note some of these can be deleted once development is complete and the build up to date:
    // Plugins that aren't released on the CKEditor site still need to be here as they can't be
    // packaged up into main build.

    //config.extraPlugins  = 'youtube';
    // Note div here is my modified version!!!
    config.extraPlugins  = 'contact,deleteblock,descriptionlist,div,expander,footnotes,footnotesfromword,jfile,jimage,listsort,tidy,youtube';
    //config.extraPlugins  = 'collapse';
    //Sticky//config.extraPlugins  = 'footnotes,footnotesfromword,autogrow';
    //config.extraPlugins  = 'footnotes,footnotesfromword,collapse';
    //config.extraPlugins  = 'footnotes,footnotesfromword,svgobj,flash';
    //config.removePlugins = 'link,fakeobjects';
    //config.removePlugins = 'stylescombo,format';
    config.removePlugins = 'image,image2,pastetext,preview,uploadfile.uploadimage';

    //Sticky//config.removePlugins = 'resize';

    //Sticky//config.autoGrow_onStartup = true;


    //config.image2_alignClasses = [ 'image-left', 'image-center', 'image-right' ];

    // @TODO - tighten this up to specify all actual attributes for video markup.
    //console.log(CKEDITOR);#
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/gQ6hYUJ3MEg" frameborder="0" allowfullscreen></iframe>
    config.extraAllowedContent =
      '* [id,title,tabindex,hidden,aria-hidden,itemid,itemprop,itemref,itemscope,itemtype,role,data-content,data-contains,data-display-as,data-display-is,data-modified-time];'

      + 'small span div;'

      + 'article section aside header footer figure figcaption;'
      + 'dl dt dd;'
      + 'details summary;'

      + 'a[!href,rel,title,download,type];'
      + 'img[!src,srcset,sizes,alt,width,height,title,onerror];'

      + 'video[controls,poster,height,width];'
      + 'source[src,type];'

      + 'iframe[width,height,src,frameborder,allowfullscreen];'

      + 'object[data,type,height,width];'
      + 'param[name,value];'
      + 'svg[display];'
      + 'use[xlink*];'
      + 'image[!src,alt,width,height,title];'

      + 'table caption col colgroup thead tbody tfoot tr;'
      + 'th[colspan,rowspan,headers,scope];'
      + 'td[colspan,rowspan,headers];'

      // Allow all classes. Note this isn't great, ideally in the CSS re-write I can change this
      // to only allow 'u-' prefixed classes.
      + '* (*)';

    config.stylesSet = 'div_styles';

    //config.format_blockquote = { element: 'blockquote' };
    //config.format_tags = 'p;h2;h3;h4;h5;h6;pre;address;div;blockquote';


    config.specialChars = [
        ['&le;', "Less-than or equal to"], ['&ge;', "Greater-than or equal to"], '&times;', '&divide;', ['&plusmn;', "Plus-minus"], '&asymp;', ['&ne;', "Not equal to"], ['&#x2243;', " Asymptotically equal to"], '&deg;',
        '&euro;', '&cent;',
        '&ndash;', '&mdash;', '&hellip;', ['&#x22ee;', 'Vertical ellipsis'], '&iexcl;', '&iquest;',
        '&copy;', '&reg;', '&trade;', '&laquo;', '&raquo;', '&micro;', '&sect;', '&para;', '&middot;', '&frac14;', '&frac12;', '&frac34;', '&#9658;', '&bull;', ['&#9632;', "Black square"], ['&#9633;', "White square"], ['&#10003;', "Check mark"],
        '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&OElig;', '&oelig;', '&#372;', '&#374', '&#373', '&#375;',
        ['&#8304;', "Superscript zero"], '&sup1;', '&sup2;', '&sup3;', ['&#8308;', "Superscript four"], ['&#8309;', "Superscript five"], ['&#8310;', "Superscript six"], ['&#8311;', "Superscript seven"], ['&#8312;', "Superscript eight"], ['&#8313;', "Superscript nine"],
        ['&#7491;', "Superscript a"], ['&#7495;', "Superscript b"], ['&#7580;', "Superscript c"], ['&#7496;', "Superscript d"], ['&#7497;', "Superscript e"], ['&#7584;', "Superscript f"], ['&#7501;', "Superscript g"]
    ];

    // It's a shame it's not easy to convert these to data- attributes. Leaving them as classes for now.
    config.justifyClasses = [ 'u-text-align--left', 'u-text-align--center', 'u-text-align--right', 'u-text-align--justify' ];

    // This would be useful if you could exclude elements (such as li, dl, dt) but you can only
    // exclude attributes.
    //config.magicline_everywhere = true;
    // Changes the keyboard shortcut to Ctrl + ".".
    //CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.ALT + CKEDITOR.CTRL + 40;

    // Changes the keyboard shortcut to Ctrl + ",".
    //CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.ALT + CKEDITOR.CTRL + 38;

    //{table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1}
    //config.magicline.triggers = {figure:1,table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1};

    //var specialCharsLang = CKEDITOR.plugins.getLang("specialchar","en-gb");
    //console.log(specialCharsLang);

    //config.pasteFilter = 'semantic-content';
    //config.pasteFilter = 'plain-text';
    //config.pasteFromWordPromptCleanup = true;
    config.pasteFromWordRemoveStyles = true;
    config.pasteFromWord_inlineImages = false;

    config.entities_additional = '';
    config.ignoreEmptyParagraph = false;
    config.fillEmptyBlocks = true;

    //jQuery('head').append('<link rel="stylesheet" type="text/css" href="/plugins/editors/ckeditorbasic/editor.css' + '">');
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "/plugins/editors/ckeditorbasic/editor.css";

    head.appendChild(link);
    console.log(head);
};


/*
CKEDITOR.stylesSet.add( 'block_styles', [
    // Block-level styles
    { name: 'Paragraph' ,  element: 'p',  attributes: { 'class': '' } },
    { name: 'Heading 2',   element: 'h2', attributes: { 'class': 'h2', 'data-varient': ''} },
    { name: 'Heading 3',   element: 'h3', attributes: { 'class': 'h3', 'data-varient': ''} },
    { name: 'Heading 4',   element: 'h4', attributes: { 'class': 'h4', 'data-varient': ''} },
    { name: 'Heading 5',   element: 'h5', attributes: { 'class': 'h5', 'data-varient': ''} },
    { name: 'Heading 6',   element: 'h6', attributes: { 'class': 'h6', 'data-varient': ''} },
    { name: 'Strapline' ,  element: 'p',  attributes: { 'class': 'user-strapline', 'data-varient': 'Strapline', 'data-display-as': 'strapline' } },
    { name: 'Smallprint' , element: 'p',  attributes: { 'class': 'user-smallprint', 'data-varient': 'Smallprint', 'data-display-as': 'smallprint' } }
]);
*/

CKEDITOR.stylesSet.add( 'block_styles', [
    // Block-level styles
    { name: 'Paragraph' ,  element: 'p' },
    { name: 'Heading 2',   element: 'h2' },
    { name: 'Heading 3',   element: 'h3' },
    { name: 'Heading 4',   element: 'h4' },
    { name: 'Heading 5',   element: 'h5' },
    { name: 'Heading 6',   element: 'h6' },
    { name: 'Strapline' ,  element: 'p', attributes: { 'data-display-as': 'strapline' } },
    { name: 'Smallprint' , element: 'p', attributes: { 'data-display-as': 'smallprint' } },
    { name: 'Wrapper' ,    element: 'section' }
]);

CKEDITOR.stylesSet.add( 'inline_styles', [
    // Inline styles
    { name: 'Emphasised',          element: 'em' },
    { name: 'Strongly emphasised', element: 'strong' },
    { name: 'Stylistic italic',    element: 'i' },
    { name: 'Stylistic bold',      element: 'b' }
]);

CKEDITOR.stylesSet.add( 'div_styles', [
    // Div-level styles
    { name: 'Notice Box',               element: 'div', attributes: { 'data-display-as': 'notice-box' } },
    { name: 'Pale Box',                 element: 'div', attributes: { 'data-display-as': 'pale-box' } },
    { name: 'Themed Box (background)',  element: 'div', attributes: { 'data-display-as': 'themed-box--background' } },
    { name: 'Themed Box (border)',      element: 'div', attributes: { 'data-display-as': 'themed-box--border' } },
    { name: 'Breakout Box',             element: 'div', attributes: { 'data-display-as': 'breakout-box' } },
    { name: 'Blocks Container',         element: 'div', attributes: { 'data-display-as': 'blocks' } },
    { name: 'Blocks Container (large)', element: 'div', attributes: { 'data-display-as': 'blocks blocks-large' } }

]);


