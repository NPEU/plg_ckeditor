/**
 * @package     jimage
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

CKEDITOR.dialog.add('jimageDialog', function(editor) {

    var placeholder = "https://via.placeholder.com/150?text=No+image+selected";
    var caption_html = '';

        //var file_input = '<div style="width: 150px; height: 150px;"><img id="jimage_thumb" src="' + placeholder + '" style="max-width: 100%; max-height: 100%;"></div><div class="controls"><div class="field-media-wrapper" data-basepath="' + window.location.origin + '/" data-url="index.php?option=com_media&amp;view=images&amp;tmpl=component&amp;asset=com_menus&amp;author=&amp;fieldid={field-media-id}&amp;ismoo=0&amp;folder=images" data-modal=".modal" data-modal-width="100%" data-modal-height="645px" data-input=".field-media-input" data-button-select=".button-select" data-button-clear=".button-clear" data-button-save-selected=".button-save-selected" data-preview="false" data-preview-as-tooltip="false" data-preview-container=".field-media-preview" data-preview-width="200" data-preview-height="200"><div id="imageModal_jimage_src" tabindex="-1" class="modal hide fade"><div class="modal-header"><button type="button" class="close novalidate" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h3>Change Image</h3></div><div class="modal-body"></div></div><div class="input-prepend input-append"><span rel="popover" class="add-on pop-helper field-media-preview" title="" data-content="No image selected." data-original-title="Selected image." data-trigger="hover"><span class="icon-eye" aria-hidden="true"></span></span><input type="text" name="jimage_src" id="jimage_src" value="" readonly="readonly" class="input-small hasTooltip field-media-input" data-original-title="" title=""><button type="button" class="btn button-select">Select</button><button type="button" class="btn hasTooltip button-clear" title="" aria-label="Clear" data-original-title="Clear"><span class="icon-remove" aria-hidden="true"></span></button></div></div></div>';
        var image_input = `
<form id="image_input_form">
<label class="cke_dialog_ui_labeled_label" for="jimage_src">Image</label>
</form>
<div class="controls">
    <joomla-field-media
        class="field-media-wrapper"
        type="image"
        base-path="${window.location.origin}/"
        root-folder="/assets/images"
        url="/administrator/index.php?option=com_media&amp;view=media&amp;tmpl=component&amp;mediatypes=0&amp;asset=com_content&amp;author=&amp;fieldid={field-media-id}&amp;path="
        modal-container=".modal"
        modal-width="100%"
        modal-height="400px"
        input=".field-media-input"
        button-select=".button-select"
        button-clear=".button-clear"
        button-save-selected=".button-save-selected"
        preview="static"
        preview-container=".field-media-preview"
        preview-width="200"
        preview-height="200"
        supported-extensions="{&quot;images&quot;:[&quot;bmp&quot;,&quot;gif&quot;,&quot;jpg&quot;,&quot;png&quot;,&quot;doc&quot;,&quot;docx&quot;,&quot;xls&quot;,&quot;xlsx&quot;,&quot;pdf&quot;,&quot;ppt&quot;,&quot;pptx&quot;,&quot;.mp3&quot;],&quot;audios&quot;:[],&quot;videos&quot;:[],&quot;documents&quot;:[]}"
    >
        <div
            id="imageModal_jimage_src"
            data-test="test"
            role="dialog"
            tabindex="-1"
            class="joomla-modal modal fade"
            data-url="/administrator/index.php?option=com_media&amp;view=media&amp;tmpl=component&amp;mediatypes=0&amp;asset=com_content&amp;author=&amp;fieldid={field-media-id}&amp;path="
            data-iframe="<iframe class=&quot;iframe&quot; src=&quot;/administrator/index.php?option=com_media&amp;amp;view=media&amp;amp;tmpl=component&amp;amp;mediatypes=0&amp;amp;asset=com_content&amp;amp;author=&amp;amp;fieldid={field-media-id}&amp;amp;path=&quot; name=&quot;Change Image&quot; title=&quot;Change Image&quot; height=&quot;100%&quot; width=&quot;100%&quot;></iframe>"
        >
            <div class="modal-dialog modal-lg jviewport-width80">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Change Image</h3>
                        <button type="button" class="btn-close novalidate" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body jviewport-height60">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success button-save-selected">Select</button><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="field-media-preview"><span class="field-media-preview-icon"></span></div>
        <div class="input-group">
            <input type="text" name="jimage_src" id="jimage_src" value="" class="form-control field-media-input" form="image_input_form">
            <button type="button" class="btn btn-success button-select">Select</button>
            <button type="button" class="btn btn-danger button-clear" style="display: none;"><span class="icon-times" aria-hidden="true"></span><span class="visually-hidden">Clear</span></button>
        </div>
    </joomla-field-media>
</div>`;


    return {
        title: 'Image',
        minWidth: 400,
        minHeight: 200,

        jimage: {},
        contents: [
            {
                id: 'tab--settings',
                label: 'Settings',
                elements: [
                    {
                        id: 'src',
                        type: 'html',
                        html: image_input,
                        onLoad: function() {
                            var el = this;

                            jQuery('#jimage_src').change(function () {
                                //var src = this.value;
                                // Remove png suffix and other J4 stuff:
                                var src = this.value.replace(/#.*$/, '');

                                if (src == '') {
                                    el.setValue(src);
                                    jQuery('#jimage_thumb').attr('src', placeholder);
                                } else {
                                    el.setValue('/' + src);
                                    jQuery('#jimage_thumb').attr('src', '/' + src);
                                }
                            });
                        },
                        onShow: function() {
                            // Update the url so that the correct folder is loaded into the
                            // modal for better UX for existing files:
                            var modal_el = jQuery('#imageModal_jimage_src')[0];
                            var input_el = jQuery('#jimage_src')[0];

                            //console.log('input_el.value', input_el.value);

                            if (input_el.value == '') {
                                // No value so we're adding a new file, so use root downloads folder.
                                var new_path = modal_el.dataset.iframe.replace(/&amp;path=[^"]*"/, '&amp;path=local-assets:/images"');
                            } else {
                                // We must be editing a file so use the folder it's contained in.
                                var t1 = input_el.value.split('/');
                                var t1a = t1.pop();
                                var t1a = t1.shift();
                                var t1a = t1.shift();
                                t1 = t1.join('/');
                                var new_path = modal_el.dataset.iframe.replace(/&amp;path=[^"]*"/, '&amp;path=local-assets:/' + t1 + '"');
                            }
                            //console.log('new_path', new_path);
                            modal_el.dataset.iframe = new_path;
                        },
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.src);
                        }
                    },
                    {
                        type: 'text',
                        id: 'alt',
                        label: 'Alternative text',
                        inputStyle: 'margin: 0',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.alt);
                        }
                    },
                    {
                        type: 'text',
                        id: 'link',
                        label: 'Link URL',
                        inputStyle: 'margin: 0',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.link);
                        }
                    },
                    {
                        type: 'radio',
                        id: 'person_portrait',
                        label: 'Portrait of a person?',
                        items: [ [ 'Yes', 'yes' ], [ 'No', 'no' ] ],
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'no',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.person_portrait);
                        }
                    },
                    {
                        type: 'select',
                        id: 'logo',
                        label: 'Logo?',
                        items: [ [ 'No', 'no' ], [ 'Extra-small (relative height)', 'xsmall' ], [ 'Small (relative height)', 'small' ], [ 'Medium (relative height)', 'medium' ], [ 'Large (relative height)', 'large' ], [ 'X-large (relative height)', 'xlarge' ],[ 'XX-large (relative height)', 'xxlarge' ], [ 'XXX-large (relative height)', 'xxxlarge' ] ],
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'no',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.logo);
                        }
                    },
                    {
                        type: 'select',
                        id: 'width',
                        label: 'Width',
                        items: [ [ 'Full-width', 'one-whole' ], [ 'Two-thirds', 'two-thirds' ], [ 'One-half', 'one-half' ], [ 'One-third', 'one-third' ], [ 'One-quarter', 'one-quarter' ] ],
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'one-whole',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.width);
                        }
                    },
                    {
                        type: 'select',
                        id: 'position',
                        label: 'Position',
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        items: [ [ 'Image centre (no wrap)', 'center' ], [ 'Image left', 'left' ], [ 'Image right', 'right' ] ],
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'center',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.position);
                        }
                    },
                    {
                        type: 'select',
                        id: 'border',
                        label: 'Border',
                        items: [ [ 'Tight', 'tight' ], [ 'Spaced', 'spaced' ], [ 'None', 'none' ] ],
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'tight',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.border);
                        }
                    },
                    {
                        id: 'hasCaption',
                        type: 'checkbox',
                        label: 'Include caption?',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.hasCaption);
                        },
                        commit: function(jimage_data) {
                            jimage_data.hasCaption = this.getValue();
                        }
                    },
                    {
                        type: 'radio',
                        id: 'no_height_limit',
                        label: 'Remove height limit?',
                        items: [ [ 'Yes', 'yes' ], [ 'No', 'no' ] ],
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'no',
                        setup: function(jimage_data) {
                            this.setValue(jimage_data.no_height_limit);
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            // Reset the jimage data:
            this.definition.jimage = {};

            this.insertMode = true;

            var dialog      = this;
            var definition  = dialog.definition;
            var jimage_data = definition.jimage;

            var selection    = editor.getSelection();
            var element      = selection.getStartElement();

            if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                // Widget selected, look for a jimage:
                var jimage_container = element.findOne('[data-display-is]');
                var jimage           = element.findOne('[data-contains~="image"]');

                if (jimage) {
                    // We're in Edit mode:
                    this.insertMode = false;


                    var jimage__data_display_is = jimage_container.getAttribute('data-display-is');
                    var jimage__data_contains   = jimage.getAttribute('data-contains');
                    var jimage__image           = element.findOne('img');
                    var jimage__a               = element.findOne('a[href]');

                    // Remove any query string:
                    jimage_data.src = CKEDITOR.tools.trim(jimage__image.getAttribute('src')).split('?')[0];

                    // Ensure we convert any SVG's back to PNG's:
                    jimage_data.src = jimage_data.src.replace(/\.svg$/, '.png');

                    var src = jimage_data.src;
                    if (src == '') {
                        src = placeholder;
                    }
                    jQuery('#jimage_thumb').attr('src', src);
                    //jQuery('#jimage_src').attr('value', src);
                    var JoomlaFieldMedia = jQuery('#jimage_src').parents('joomla-field-media')[0];
                    JoomlaFieldMedia.setValue(src);


                    jimage_data.alt = jimage__image.getAttribute('alt');

                    jimage_data.link = jimage__a ? jimage__a.getAttribute('href') : '';

                    jimage_data.person_portrait = (jimage__data_contains.indexOf('portrait') !== -1) ? 'yes' : 'no';
                    jimage_data.no_height_limit = (jimage__data_contains.indexOf('no-height-limit') !== -1) ? 'yes' : 'no';

                    jimage_data.logo = 'no';
                    if (jimage__data_contains.match('logo')) {
                        jimage_data.logo = jimage__data_contains.match(/logo-(.*?)(\s|$)/)[1];
                    }


                    jimage_data.width = jimage__data_display_is.match(/width-(.*?)(\s|$)/)[1];

                    jimage_data.position = jimage__data_display_is.match(/pulled-(.*?)(\s|$)/)[1];

                    jimage_data.border = (jimage.findOne('b')) ? 'tight' : 'none';
                    jimage_data.border = (jimage.findOne('i')) ? 'spaced' : jimage_data.border;

                    // Assume there's no caption:
                    jimage_data.hasCaption = false;
                    caption_html = '';

                    var caption = element.findOne('figcaption');
                    if (caption) {
                        var caption_contents = CKEDITOR.tools.trim(caption.getText());

                        if (caption_contents !== '') {
                            jimage_data.hasCaption = true;
                            caption_html = caption.getHtml();
                        }
                    }


                }
            }

            // Remove cke_reset_all
            jQuery('.cke_dialog_container').removeClass('cke_reset_all');

            if (!this.insertMode) {
                this.setupContent(jimage_data);
            }
        },

        onHide: function() {
            // Clean up:
            this.definition.jimage = {};
            // Make sure the joomla image src is cleared:
            jQuery('#jimage_thumb').attr('src', placeholder);
            jQuery('#jimage_src').val('');
            this.setValueOf('tab--settings', 'src', '');

            // Clear the preview:
            var JoomlaFieldMedia = jQuery('#jimage_src').parents('joomla-field-media')[0];
            JoomlaFieldMedia.clearValue();
            JoomlaFieldMedia.updatePreview();
        },

        onOk: function() {
            var dialog = this;
            var jimage_src = dialog.getValueOf('tab--settings', 'src');

            // Check we have a src - can't continue without that.
            if (typeof(jimage_src) == 'undefined' || jimage_src == '') {
                return;
            }
            jimage_src = CKEDITOR.tools.trim(jimage_src).split('?')[0];

            var jimage_alt             = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'alt'));
            var jimage_link            = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'link'));
            var jimage_portrait        = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'person_portrait'));
            var jimage_no_height_limit = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'no_height_limit'));
            var jimage_logo            = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'logo'));
            var jimage_width           = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'width'));
            var jimage_position        = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'position'));
            var jimage_border          = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'border'));
            var jimage_caption         = dialog.getValueOf('tab--settings', 'hasCaption');

            var contains = "image"

            if (jimage_portrait == 'yes') {
                contains += ' portrait';
            }

            if (jimage_no_height_limit == 'yes') {
                contains += ' no-height-limit';
            }

            if (jimage_logo != 'no') {
                contains += ' logo';
                contains += ' logo-' + jimage_logo;
            }

            if (jimage_src != '') {
                var jimage_html = [];

                jimage_html.push('<figure data-display-is="width-' + jimage_width + '  pulled-' + jimage_position + '">');

                if (jimage_link !== '') {
                    var rel = '';

                    // Force local URLs to be relative, Trim slashes:
                    var href = jimage_link.replace(window.location.origin, '').replace(/^\/+|\/+$/g, '');

                    // If the URL still begins with 'http', it must be external:
                    if (href.match(/^http/)) {
                        rel = ' rel="external"';
                    } else {
                        href = '/' + href;
                    }

                    jimage_html.push('<a data-contains="' + contains + '" href="' + href + '"' + rel +'><span>');
                } else {
                    jimage_html.push('<span data-contains="' + contains + '">');
                }

                if (jimage_border == 'tight') {
                    jimage_html.push('  <b>');
                } else if (jimage_border == 'spaced') {
                    jimage_html.push('  <b><i>');
                }

                // Image:
                var is_svg = false;

                // Get image info:
                var img_info = JSON.parse(CKEDITOR.ajax.load(jimage_src + '.json'));
                img_info.image_ratio = img_info.image_width / img_info.image_height;

                // If the image is PNG, look to see if there's an SVG equivalent:
                if (jimage_src.match(/\.png$/)) {
                    var jimage_svg_src = jimage_src.replace(/\.png$/, '.svg');
                    var svg = CKEDITOR.ajax.load(jimage_svg_src);

                    if (svg !== null && svg.match(/^<svg/)) {
                        img_info.adj_height = 80;
                        img_info.adj_width = Math.round(img_info.adj_height * img_info.image_ratio);

                        jimage_html.push('  <img src="' + jimage_svg_src + '" onerror="this.src=\'' + jimage_src + '\'; this.onerror=null;" alt="' + jimage_alt + '" width="' + img_info.adj_width + '" height="' + img_info.adj_height + '">');
                        is_svg = true;
                    }
                }

                if (!is_svg) {
                    img_info.adj_width = 300;
                    var minmax = '';

                    img_info.adj_height = Math.round(img_info.adj_width / img_info.image_ratio);
                    if (img_info.image_width < img_info.image_height) {
                        minmax = '&m=1';
                    }

                    jimage_html.push('  <img src="' + jimage_src + '?s=300' + minmax +'" sizes="100vw" srcset="' + jimage_src + '?s=700' + minmax +' 700w, ' + jimage_src + '?s=300' + minmax +' 300w" alt="' + jimage_alt + '" width="' + img_info.adj_width + '" height="' + img_info.adj_height + '">');
                }


                if (jimage_border == 'tight') {
                    jimage_html.push('  </b>');
                } else if (jimage_border == 'spaced') {
                    jimage_html.push('  </i></b>');
                }

                if (jimage_link !== '') {
                    jimage_html.push('</span></a>');
                } else {
                    jimage_html.push('</span>');
                }

                if (jimage_caption) {
                    jimage_html.push('<figcaption>' + caption_html + '</figcaption>');
                }

                jimage_html.push('</figure>');

                editor.insertHtml(jimage_html.join("\n\n"));
            } else {
                editor.insertHtml('');
            }
        }
    };
});
