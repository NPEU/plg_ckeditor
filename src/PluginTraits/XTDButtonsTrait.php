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

use Joomla\CMS\Editor\Editor;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Uri\Uri;

trait XTDButtonsTrait
{
    private function getXtdButtonsList($name, $buttons, $asset, $author)
    {
        $list = [
            $name => [],
        ];

        $excluded = ['readmore', 'pagebreak'];

        if (!is_array($buttons)) {
            $buttons = !$buttons ? false : $excluded;
        } else {
            $buttons = array_merge($buttons, $excluded);
        }

        // easiest way to get buttons across versions
        $buttons = Editor::getInstance('ckeditor')->getButtons($name, $buttons);

        if (!empty($buttons)) {
            foreach ($buttons as $i => $button) {
                if ($button->get('name')) {
                    $id = $name . '_' . $button->name;

                    if (version_compare(JVERSION, '4', 'ge')) {
                        $button->id = $id . '_modal';
                        echo LayoutHelper::render('joomla.editors.buttons.modal', $button);
                    }

                    // create icon class
                    $icon = 'none icon-' . $button->get('icon', $button->get('name'));

                    // set href value
                    if ($button->get('link') !== '#') {
                        $href = Uri::base() . $button->get('link');
                    } else {
                        $href = '';
                    }

                    $options = [
                        'name' => $button->get('text'),
                        'id' => $id,
                        'title' => $button->get('text'),
                        'icon' => $icon,
                        'href' => $href,
                        'onclick' => $button->get('onclick', ''),
                        'svg' => $button->get('iconSVG'),
                        'options' => $button->get('options', []),
                    ];

                    $list[$name][] = $options;
                }
            }
        }

        return $list;
    }

    protected function displayXtdButtons($name, $buttons, $asset, $author)
    {
        if (method_exists($this, 'displayButtons')) {
            return $this->displayButtons($buttons, ['asset' => $asset, 'author' => $author, 'editorId' => $name]);
        }

        // easiest way to get buttons across versions
        $buttons = Editor::getInstance('ckeditor')->getButtons($name, $buttons);

        if (!empty($buttons)) {
            // fix some legacy buttons
            array_walk($buttons, function ($button) {
                $cls = $button->get('class', '');

                if (empty($cls) || strpos($cls, 'btn') === false) {
                    $cls .= ' btn';
                    $button->set('class', trim($cls));
                }
            });

            return LayoutHelper::render('joomla.editors.buttons', $buttons);
        }
    }
}
