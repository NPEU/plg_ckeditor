/**
 * @package     youtube
 *
 * @copyright   Copyright (C) NPEU 2020.
 * @license     MIT License; see LICENSE.md
 */

'use strict';

CKEDITOR.dialog.add('youtubeDialog', function(editor) {

    var caption_html = '';
    var width        = 560;
    var height       = 315;

    return {
        title: 'YouTube',

        youtube: {},
        contents: [
            {
                id: 'tab--settings',
                label: 'Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'title',
                        label: 'YouTube video Title',
                        inputStyle: 'margin: 0',
                        setup: function(youtube_data) {
                            this.setValue(youtube_data.title);
                        }
                    },
                    {
                        type: 'text',
                        id: 'src',
                        label: 'YouTube video URL',
                        inputStyle: 'margin: 0',
                        default: 'https://www.youtube.com/embed/YOUTUBE_ID_HERE',
                        setup: function(youtube_data) {
                            this.setValue(youtube_data.src);
                        }
                    },
                    {
                        id: 'hasCaption',
                        type: 'checkbox',
                        label: 'Include caption?',
                        inputStyle: 'margin: 0; vertical-align: middle',
                        labelStyle: 'vertical-align: middle; width: 10em',
                        setup: function(youtube_data) {
                            this.setValue(youtube_data.hasCaption);
                        },
                        commit: function(youtube_data) {
                            youtube_data.hasCaption = this.getValue();
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            // Reset the youtube data:
            this.definition.youtube = {};

            this.insertMode = true;

            var dialog       = this;
            var definition   = dialog.definition;
            var youtube_data = definition.youtube;

            var selection    = editor.getSelection();
            var element      = selection.getStartElement();

            if (element.getAttribute('data-cke-widget-wrapper') === '1') {
                // Widget selected, look for a youtube:
                var youtube = element.findOne('[data-contains~="youtube"]');

                if (youtube) {
                    // We're in Edit mode:
                    this.insertMode = false;

                    var youtube__iframe = element.findOne('iframe');

                    // Remove any query string:
                    youtube_data.src = CKEDITOR.tools.trim(youtube__iframe.getAttribute('src')).split('?')[0];

                    youtube_data.title = youtube__iframe.getAttribute('title');


                    /*
                    Establish more data here if necessary.
                    */

                    // Assume there's no caption:
                    youtube_data.hasCaption = false;
                    caption_html = '';

                    var caption = element.findOne('figcaption');
                    if (caption) {
                        var caption_contents = CKEDITOR.tools.trim(caption.getText());

                        if (caption_contents !== '') {
                            youtube_data.hasCaption = true;
                            caption_html = caption.getHtml();
                        }
                    }

                }
            }

            // Remove cke_reset_all
            jQuery('.cke_dialog_container').removeClass('cke_reset_all');

            if (!this.insertMode) {
                this.setupContent(youtube_data);
            }
        },

        onHide: function() {
            // Clean up:
            this.definition.youtube = {};
        },

        onOk: function() {
            var dialog = this;
            var youtube_src = dialog.getValueOf('tab--settings', 'src');

            // Check we have a src - can't continue without that.
            if (typeof(youtube_src) == 'undefined' || youtube_src == '') {
                return;
            }
            youtube_src = CKEDITOR.tools.trim(youtube_src).split('?')[0];

            var youtube_title = dialog.getValueOf('tab--settings', 'title');

            var youtube_width  = width;
            var youtube_height = height;

            /*
            Retrieve more data here if necessary.
            */

            var youtube_caption  = dialog.getValueOf('tab--settings', 'hasCaption');

            var contains = "video youtube"

            if (youtube_src != '') {
                var youtube_html = [];

                youtube_html.push('<figure data-contains="' + contains + '">');

                youtube_html.push('  <div class="embed-container">');

                youtube_html.push('    <iframe allowfullscreen="" frameborder="0" height="' + youtube_height + '" width="' + youtube_width + '" title="' + youtube_title + '" src="' + youtube_src + '" ></iframe>');

                youtube_html.push('  </div>');

                /*
                Add more HTML if necessary
                */

                if (youtube_caption) {
                    youtube_html.push('<figcaption>' + caption_html + '</figcaption>');
                }

                youtube_html.push('</figure>');

                editor.insertHtml(youtube_html.join("\n"));
            } else {
                editor.insertHtml('');
            }
        }
    };
});
