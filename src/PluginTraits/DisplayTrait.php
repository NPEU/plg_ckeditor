<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors.CKEditor
 *
 * @copyright   Copyright (C) NPEU 2024.
 * @license     MIT License; see LICENSE.md
 */

namespace NPEU\Plugin\Editors\CKEditor\PluginTraits;

defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Editor\Editor;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\Event\Event;

/**
 * Handles the onDisplay event for the JCE editor.
 *
 * @since  3.9.59
 */
trait DisplayTrait
{
    /**
     * Base path for editor files
     */
    protected $_basePath = 'plugins/editors/ckeditor/assets';


    protected static $instances = array();

    /*protected function getEditorInstance()
    {
        // pass config to WFEditor
        $config = array(
            'profile_id' => $this->params->get('profile_id', 0),
            'plugin' => $this->params->get('plugin', '')
        );

        $signature = md5(serialize($config));

        if (empty(self::$instances[$signature])) {
            // load base file
            require_once JPATH_ADMINISTRATOR . '/components/com_jce/includes/base.php';

            // create editor
            self::$instances[$signature] = new \WFEditor($config);
        }

        return self::$instances[$signature];
    }*/

    /**
     * Method to handle the onInit event.
     *  - Initializes the JCE WYSIWYG Editor.
     *
     * @param   $toString Return javascript and css as a string
     *
     * @return string JavaScript Initialization string
     *
     * @since   1.5
     */
    public function onInit()
    {
        $language = Factory::getLanguage();
        $document = Factory::getDocument();
        $app      = Factory::getApplication();

        $document->addScript(Uri::root() . '/media/vendor/jquery/js/jquery.min.js');
        if (!$app->isClient('administrator')) {
            #$document->addScript(Uri::root() . '/media/vendor/jquery/js/jquery.min.js');
            HTMLHelper::_('script', 'media/mediafield.min.js', array('version' => 'auto', 'relative' => true));
        }
        //$document->addStyleSheet(Uri::root() . $this->_basePath . '/ckeditor.css');
        $script = array();
        if (strpos(JPATH_BASE, 'administrator') === false) {
            $script[] =  "\n\n";
            $script[] = '    var ready = function(fn) {';
            $script[] = '        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {';
            $script[] = '            fn();';
            $script[] = '        } else {';
            $script[] = '            document.addEventListener(\'DOMContentLoaded\', fn);';
            $script[] = '        }';
            $script[] = '    }';
            $script[] =  "\n\n";
            $script[] = '    ready(function() {';
            $script[] = '        var editors_i = 0;';
            $script[] = '        var editors_l = editors.length;';
            $script[] = '        for (editors_i; editors_i < editors_l; editors_i++) {';
            $script[] = '            CKEDITOR.replace(editors[editors_i], {   ';
            $script[] = '                customConfig: \'customConfig.js\',';
            $script[] = '            });';
            $script[] = '        }';
            $script[] = '    })';
        }

        $script = implode("\n", $script);

        $script .= file_get_contents(dirname(dirname(__DIR__)) . '/assets/setup.js');
        $document->addScriptDeclaration($script);


        $document->addScript(Uri::root() . $this->_basePath . '/ckeditor/ckeditor.js');
        $document->addScript(Uri::root() . $this->_basePath . '/jplugins.js');
        // Add sticky js
        #$document->addScript(Uri::root() . 'js/vendor/sticky.js');
        // Add any custom JS files:
        $js_files = $this->params->get('jsfiles', '');

        //$js_files = '__DIR__/ck_wym/ck_wym.js';
        //$js_files = '__DIR__/ck_extras/ck_extras.js';

        //__DIR__/ck_wym/ck_wym.js __DIR__/ck_extras/ck_extras.js
        //echo '<pre>'; var_dump($js_files); echo '</pre>';exit;
        //return '';
        if (!empty($js_files)) {
            $js_files = explode("\n", str_replace("\r", '', $js_files));
            foreach ($js_files as $file) {
                if ($file = realpath(str_replace('__DIR__', dirname(dirname(__DIR__)), $file))) {
                    $file = str_replace([JPATH_ROOT, '//', ':/'], [Uri::root(), '/', '://'], $file);
                    $document->addScript($file);
                }
            }
        }

        return '';

        /*if (!ComponentHelper::isEnabled('com_jce')) {
            return false;
        }

        $language = Factory::getLanguage();
        $document = Factory::getDocument();

        $language->load('plg_editors_jce', JPATH_ADMINISTRATOR);
        $language->load('com_jce', JPATH_ADMINISTRATOR);

        $editor = $this->getEditorInstance();
        $editor->init();

        foreach ($editor->getScripts() as $script => $type) {
            $document->addScript($script, array(), array('type' => $type));
        }

        foreach ($editor->getStyleSheets() as $style) {
            $document->addStylesheet($style);
        }

        $document->addScriptDeclaration(implode("\n", $editor->getScriptDeclaration()));*/
    }

    /**
     * JCE WYSIWYG Editor - Display the editor area.
     *
     * @param   string   $name     The name of the editor area.
     * @param   string   $content  The content of the field.
     * @param   string   $width    The width of the editor area.
     * @param   string   $height   The height of the editor area.
     * @param   int      $col      The number of columns for the editor area.
     * @param   int      $row      The number of rows for the editor area.
     * @param   boolean  $buttons  True and the editor buttons will be displayed.
     * @param   string   $id       An optional ID for the textarea. If not supplied the name is used.
     * @param   string   $asset    The object asset
     * @param   object   $author   The author.
     * @param   array    $params   Associative array of editor parameters.
     *
     * @return  string
     */
    public function onDisplay($name, $content, $width, $height, $col, $row, $buttons = true, $id = null, $asset = null, $author = null, $params = array())
    {
        #echo '<pre>'; var_dump(func_get_args()); echo '</pre>';exit;
        $return = '';
        require(dirname(dirname(__DIR__)) . '/assets/js-vars.php');
        //$jplugins_path = JUri::root() . $this->_basePath . '/plugins';

        if ((int) $width) {
            $width .= 'px';
        }
        if ((int) $height) {
            $height .= 'px';
        }
        $return .= '<textarea name="'.$name.'" id="'.$id.'" cols="'.$col.'" rows="'.$row.'" style="width:'.$width.'; height:'.$height.'">' . $content . '</textarea>' . "\n";

        $options = [
            'editorId' => $id,
            'asset' => $asset,
            'author' => $author
        ];
        $return .= $this->displayButtons($buttons, $options);
        #$return .= $this->displayButtons($id, $buttons, $asset, $author);

        $return .= "<script type=\"text/javascript\">\n";
        #echo '<pre>'; var_dump(get_defined_constants(true)); echo '</pre>';exit;
        if (strpos(JPATH_BASE, 'administrator') !== false) {
            $script = '';
            /*foreach ($vars as $name => $value) {
                $script .= "var $name = $value;\n";
            }*/
            $script .= "    CKEDITOR.timestamp='202406121106';
        jQuery(function() {
        var editor = CKEDITOR.replace('" . $name . "', {
            customConfig: 'customConfig.js',
        });
        // Hmm not sure this is the right way to go - looks like a rabbit hole:
        editor.getValue = function() {
            return this.getData();
        };
        editor.replaceSelection = function(html) {
            return this.insertHtml(html);
        }
        Joomla.editors.instances['" . $id . "'] = editor;
    });";
        } else {
            $script = '';
            foreach ($vars as $name => $value) {
                $script .= "if (typeof(editors) == 'undefined') {var editors = [];}\n
editors.push(" . $value . ");\n";
            }
        }
        $return .= $script;
        $return .= "</script>\n";
        return $return;

        /*if (empty($id)) {
            $id = $name;
        }

        // Only add "px" to width and height if they are not given as a percentage
        if (is_numeric($width)) {
            $width .= 'px';
        }

        if (is_numeric($height)) {
            $height .= 'px';
        }

        if (empty($id)) {
            $id = $name;
        }

        $editor = $this->getEditorInstance();

        // Remove any non-alphanumeric characters from the id
        $id = preg_replace('/(\s|[^A-Za-z0-9_])+/', '_', $id);

        $buttonsStr = '';

        if ($editor->hasProfile()) {
            if (!$editor->hasPlugin('joomla')) {
                if ((bool) $editor->getParam('editor.xtd_buttons', 1)) {
                    $buttonsStr = $this->displayXtdButtons($id, $buttons, $asset, $author);
                }
            } else {
                $list = $this->getXtdButtonsList($id, $buttons, $asset, $author);

                if (!empty($list)) {
                    $options = array(
                        'joomla_xtd_buttons' => $list,
                    );

                    Factory::getDocument()->addScriptOptions('plg_editor_jce', $options, true);
                }

                // render empty container for dynamic buttons
                $buttonsStr = LayoutHelper::render('joomla.editors.buttons', array());
            }
        }

        $displayData = [
            'name'    => $name,
            'id'      => $id,
            'class'   => 'mce_editable wf-editor',
            'cols'    => $col,
            'rows'    => $row,
            'width'   => $width,
            'height'  => $height,
            'content' => $content,
            'buttons' => $buttonsStr,
        ];

        // Render Editor markup
        return LayoutHelper::render('editor.jce', $displayData, JPATH_PLUGINS . '/editors/jce/layouts');*/
    }


    /**
     * Get the editor content
     *
     * @param   string  $editor  The name of the editor
     *
     * @return  string
     */
    public function onGetContent($editor) {
        return " CKEDITOR.instances.$editor.getData(); ";
    }

    /**
     * Set the editor content
     *
     * @param   string  $editor  The name of the editor
     * @param   string  $html    The html to place in the editor
     *
     * @return  string
     */
    public function onSetContent($editor, $html) {
        return " CKEDITOR.instances.$editor.setData($html); ";
    }

    /**
     * Copy editor content to form field
     *
     * @param   string  $editor  The name of the editor
     *
     * @return  string
     */
    public function onSave($editor) {
        return '';
        //return 'if (tinyMCE.get("' . $editor . '").isHidden()) {tinyMCE.get("' . $editor . '").show()}; tinyMCE.get("' . $editor . '").save();';
    }

    /**
     * Inserts html code into the editor
     *
     * @param   string  $name  The name of the editor
     *
     * @return  boolean
     */
    public function onGetInsertMethod($name) {
        $document =  Factory::getDocument();

        $url = str_replace('administrator/', '', Uri::base() );
        $js = "
            function IeCursorFix()
            {
                /*
                This function is called onclick set on buttons in: /layouts/joomla/editors/buttons/button.php
                Need to the editor with IE to see if I need to implement anything here.
                */
                return true;
            }

            function jInsertEditorText(text, editor) {
                text = text.replace( /<img src=\"/, '<img src=\"".$url."' );
                //console.log(CKEDITOR.instances[editor]);
                //console.log(text);
                CKEDITOR.instances[editor].insertHtml(text);
           }";
        $document->addScriptDeclaration($js);

        return true;
    }

    /**
     * Displays the editor buttons.
     *
     * Helper method for rendering the editor buttons.
     *
     * @param   mixed   $buttons  Array with button names to be excluded. Empty array or boolean true to display all buttons.
     * @param   array   $options  Associative array with additional parameters
     *
     * @return  string
     *
     * @return  string|void
     */
    protected function displayButtons($buttons, array $options = [])
    {
        if (is_array($buttons) || (is_bool($buttons) && $buttons)) {
            $buttonsEvent = new Event(
                'getButtons',
                [
                    'editor'  => $options['editorId'],
                    'buttons' => $buttons,
                ]
            );

            $buttonsResult = $this->getDispatcher()->dispatch('getButtons', $buttonsEvent);
            $buttons       = $buttonsResult['result'];

            return LayoutHelper::render('joomla.editors.buttons', $buttons);
        }
    }
}
