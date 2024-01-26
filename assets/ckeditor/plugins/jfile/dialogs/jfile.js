/**
 * @package     jfile
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

CKEDITOR.dialog.add('jfileDialog', function(editor) {

    var thumb_alt = 'Thumbnail preview of the file.';

    //var file_input = '<div class="controls"><div id="field-media-wrapper" class="field-media-wrapper" data-basepath="' + window.location.origin + '/" data-url="index.php?option=com_media&amp;view=images&amp;tmpl=component&amp;asset=com_menus&amp;author=&amp;fieldid={field-media-id}&amp;ismoo=0&amp;folder=downloads/" data-modal=".modal" data-modal-width="100%" data-modal-height="645px" data-input=".field-media-input" data-button-select=".button-select" data-button-clear=".button-clear" data-button-save-selected=".button-save-selected" data-preview="false" data-preview-as-tooltip="false" data-preview-container=".field-media-preview" data-preview-width="200" data-preview-height="200"><div id="fileModal_jfile_href" tabindex="-1" class="modal hide fade"><div class="modal-header"><button type="button" class="close novalidate" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h3>Change File</h3></div><div class="modal-body"></div></div><div class="input-append"><input type="text" name="jfile_href" id="jfile_href" value="" readonly="readonly" class="input-small hasTooltip field-media-input" data-original-title="" title=""><button type="button" class="btn button-select">Select</button><button type="button" class="btn hasTooltip button-clear" title="" aria-label="Clear" data-original-title="Clear"><span class="icon-remove" aria-hidden="true"></span></button></div></div></div>';
    var file_input = `
<form id="file_input_form">
<label class="cke_dialog_ui_labeled_label" for="jfile_href">File</label>
</form>
<div class="controls">
    <joomla-field-media
        class="field-media-wrapper"
        type="image"
        base-path="${window.location.origin}/"
        root-folder="assets/downloads"
        url="/administrator/index.php?option=com_media&amp;view=media&amp;tmpl=component&amp;mediatypes=0,1,2,3&amp;asset=com_content&amp;author=&amp;fieldid={field-media-id}&amp;path="
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
        supported-extensions="{&quot;images&quot;:[&quot;bmp&quot;,&quot;gif&quot;,&quot;jpg&quot;,&quot;png&quot;],&quot;audios&quot;:[&quot;mp3&quot;],&quot;videos&quot;:[],&quot;documents&quot;:[&quot;doc&quot;,&quot;docx&quot;,&quot;xls&quot;,&quot;xlsx&quot;,&quot;pdf&quot;,&quot;ppt&quot;,&quot;pptx&quot;]}"
    >
        <div
            id="fileModal_jfile_href"
            data-test="test"
            role="dialog"
            tabindex="-1"
            class="joomla-modal modal fade"
            data-url="/administrator/index.php?option=com_media&amp;view=media&amp;tmpl=component&amp;mediatypes=0&amp;asset=com_content&amp;author=&amp;fieldid={field-media-id}&amp;path="
            data-iframe="<iframe class=&quot;iframe&quot; src=&quot;/administrator/index.php?option=com_media&amp;amp;view=media&amp;amp;tmpl=component&amp;amp;mediatypes=0,1,2,3&amp;amp;asset=com_content&amp;amp;author=&amp;amp;fieldid={field-media-id}&amp;amp;path=&quot; name=&quot;Change File&quot; title=&quot;Change File&quot; height=&quot;100%&quot; width=&quot;100%&quot;></iframe>"
        >
            <div class="modal-dialog modal-lg jviewport-width80">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Change File</h3>
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
            <input type="text" name="jfile_href" id="jfile_href" value="" class="form-control field-media-input" form="file_input_form">
            <button type="button" class="btn btn-success button-select">Select</button>
            <button type="button" class="btn btn-danger button-clear" style="display: none;"><span class="icon-times" aria-hidden="true"></span><span class="visually-hidden">Clear</span></button>
        </div>
    </joomla-field-media>
</div>`;

    var mimes = {
        'doc'  : 'application/msword',
        'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'pdf'  : 'application/pdf',
        'ppt'  : 'application/vnd.ms-powerpoint',
        'pptx' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'xls'  : 'application/vnd.ms-excel',
        'xlsx' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'zip'  : 'application/zip'
    }

    return {
        title: 'File',
        minWidth: 400,
        minHeight: 200,

        jfile: {},
        contents: [
            {
                id: 'tab--settings',
                label: 'Settings',
                elements: [
                    {
                        id: 'href',
                        type: 'html',
                        html: file_input,
                        onLoad: function() {
                            var el = this;

                            jQuery('#jfile_href').change(function () {
                                var href = this.value;
                                if (href != '') {
                                    let img_src = window.location.origin + '/' + href + '.png';
                                    el.setValue('/' + href);
                                    //console.log(el, href);

                                    var JoomlaFieldMedia = jQuery('#jfile_href').parents('joomla-field-media')[0];

                                    // Can't update the preview separate to the value, so fudging it:
                                    JoomlaFieldMedia.previewElement.innerHTML = '';
                                    let previewElement = new Image();
                                    previewElement.src = img_src;
                                    previewElement.setAttribute('alt', '');

                                    JoomlaFieldMedia.previewElement.style.width = JoomlaFieldMedia.previewWidth;
                                    JoomlaFieldMedia.previewElement.appendChild(previewElement);
                                }
                            });
                        },
                        onShow: function() {
                            // Update the url so that the correct folder is loaded into the
                            // modal for better UX for existing files:
                            var modal_el = jQuery('#fileModal_jfile_href')[0];
                            var input_el = jQuery('#jfile_href')[0];

                            //console.log('input_el.value', input_el.value);

                            if (input_el.value == '') {
                                // No value so we're adding a new file, so use root downloads folder.
                                var new_path = modal_el.dataset.iframe.replace(/&amp;path=[^"]*"/, '&amp;path=local-assets:/downloads"');
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
                        setup: function (jfile_data) {
                            //console.log('jfile_data', jfile_data);
                            this.setValue(jfile_data.href);
                            let JoomlaFieldMedia = jQuery('#jfile_href').parents('joomla-field-media')[0];
                            JoomlaFieldMedia.setValue(jfile_data.href);

                            //console.log('jfile_data.href', jfile_data.href);
                            // Can't update the preview separate to the value, so fudging it:
                            JoomlaFieldMedia.previewElement.innerHTML = '';
                            let previewElement = new Image();
                            previewElement.src = jfile_data.href + '.png';
                            previewElement.setAttribute('alt', '');

                            JoomlaFieldMedia.previewElement.style.width = JoomlaFieldMedia.previewWidth;
                            JoomlaFieldMedia.previewElement.appendChild(previewElement);
                            //JoomlaFieldMedia.setValue(jfile_data.href + '.png');
                            //JoomlaFieldMedia.updatePreview();
                            //JoomlaFieldMedia.setValue(jfile_data.href);
                        }
                    },
                    {
                        id: 'text',
                        type: 'text',
                        label: 'Link text',
                        inputStyle: 'margin: 0',
                        'default': '',
                        validate: CKEDITOR.dialog.validate.notEmpty( 'The Text field cannot be empty.' ),
                        setup: function(jfile_data) {
                            this.setValue(jfile_data.text);
                        }
                    },
                    {
                        id: 'thumbSize',
                        type: 'select',
                        label: 'Thumbnail size',
                        items: [ [ 'None', 'none' ], [ 'Small', '150' ], [ 'Medium', '300' ], [ 'Large', '600' ] ],
                        controlStyle: 'width: 8em; display: inline-block; vertical-align: middle;',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        'default': 'none',
                        setup: function(jfile_data) {
                            this.setValue(jfile_data.thumbSize);
                        }
                    },
                    {
                        id: 'thumbOnly',
                        type: 'checkbox',
                        label: 'Thumbnail only?',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        setup: function(jfile_data) {
                            this.setValue(jfile_data.thumbOnly);
                        },
                        commit: function(jfile_data) {
                            jfile_data.thumbOnly = this.getValue();
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            // Reset the jfile data:
            this.definition.jfile = {};

            this.insertMode = true;

            var dialog     = this;
            var definition = dialog.definition;
            var jfile_data = definition.jfile;

            var selection    = editor.getSelection();
            var element      = selection.getStartElement();

            //console.log('Onshow element', element);

            if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                // Widget selected, look for a jfile:
                var links            = element.find('a[href][type]');
                var jfile            = links.toArray()[0];
                var jfile_thumb      = element.findOne('img[src^="/"]');
                var jfile_thumb_only = element.getText() == '';
                //var jfile_thumb_only = (links.count() == 1 && jfile_thumb);

                //console.log('Onshow jfile_thumb', jfile);

                if (jfile) {
                    // We're in Edit mode:
                    this.insertMode = false;

                    jfile_data.href = jfile.getAttribute('href');

                    jfile_data.text = element.getText() == ''
                                    ? jfile_thumb.getAttribute('alt').replace('. ' + thumb_alt, '')
                                    : element.getText();

                    jfile_data.thumbSize = jfile_thumb
                                         ? jfile_thumb.getAttribute('width')
                                         : 'none';

                    jfile_data.thumbOnly = jfile_thumb_only;

                    var JoomlaFieldMedia = jQuery('#jfile_href').parents('joomla-field-media')[0];

                    // Use the correct method to set the value (and thus preview) by appending the
                    // png suffix:
                    ////JoomlaFieldMedia.setValue(jfile_data.href + '.png');
                    // Then insert the 'real' file name for the input value only:
                    ////JoomlaFieldMedia.inputElement.value = jfile_data.href;
                }
            }

            //console.log('jfile_data', jfile_data);

            // Remove cke_reset_all
            jQuery('.cke_dialog_container').removeClass('cke_reset_all');

            if (!this.insertMode) {
                this.setupContent(jfile_data);
            }
        },

        onHide: function() {
            // Clean up:
            this.definition.jfile = {};
            // Make sure the joomla href is cleared:
            jQuery('#jfile_href').val('');
            this.setValueOf('tab--settings', 'href', '');
            // Clear the preview:
            var JoomlaFieldMedia = jQuery('#jfile_href').parents('joomla-field-media')[0];
            JoomlaFieldMedia.clearValue();
            JoomlaFieldMedia.updatePreview();
        },

        onOk: function() {
            var dialog = this;
            var jfile_href = dialog.getValueOf('tab--settings', 'href');

            //console.log('INFO', jfile_href);

            // Check we have an href - can't continue without that.
            if (typeof(jfile_href) == 'undefined' || jfile_href == '') {
                return;
            }

            var jfile_text      = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'text'));
            var jfile_thumbsize = CKEDITOR.tools.trim(dialog.getValueOf('tab--settings', 'thumbSize'));
            var jfile_thumbonly = dialog.getValueOf('tab--settings', 'thumbOnly');

            if (jfile_href != '') {
                var data_modified_time = '';

                var file_path = window.location.origin + '/' + jfile_href.replace(window.location.origin, '').replace(/^\/|\/$/g, '');
                //console.log('file_path', file_path);
                var file_info = JSON.parse(CKEDITOR.ajax.load(file_path + '.json'));
                //console.log('INFO', file_info);

                if (file_info) {
                    if (typeof file_info.modified_time !== 'undefined') {
                        data_modified_time = ' data-modified-time="' + file_info.modified_time + '"';
                    }
                }

                var jfile_html = [];

                jfile_html.push('<span data-contains="download"' + data_modified_time + '>');

                var type = mimes[jfile_href.split('.').pop()];
                var a = '<a href="' + jfile_href + '" type="' + type + '"';

                if (jfile_thumbsize == 'none') {
                    // No thumbnail:
                    jfile_html.push(a + '>');
                    jfile_html.push(jfile_text);
                    jfile_html.push('</a>');
                } else {
                    jfile_html.push(a + ' data-contains="thumbnail">');

                    var alt = jfile_thumbonly
                            ? jfile_text + '. '
                            : '';

                    var img_info = JSON.parse(CKEDITOR.ajax.load(file_path + '.png.preview.json'));
                    //console.log('IMG INFO', img_info);
                    img_info.image_ratio = img_info.image_width / img_info.image_height;
                    img_info.adj_width = jfile_thumbsize;
                    var minmax = '';

                    img_info.adj_height = Math.round(img_info.adj_width / img_info.image_ratio);
                    if (img_info.image_width < img_info.image_height) {
                        minmax = '&m=1';
                    }

                    jfile_html.push('<img alt="' + alt + thumb_alt + '" src="' + file_path + '.png?s=' + jfile_thumbsize + minmax + '" width="' + img_info.adj_width + '" height="' + img_info.adj_height + '">');

                    if (!jfile_thumbonly) {
                        jfile_html.push('<br>');
                        jfile_html.push('<span>' + jfile_text + '</span>');
                    }
                }
                jfile_html.push('</a>');
                jfile_html.push('</span>');

                editor.insertHtml(CKEDITOR.tools.trim(jfile_html.join("")));
            } else {
                editor.insertHtml('');
            }
        }
    };
});
