<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors.CKEditor
 *
 * @copyright   Copyright (C) NPEU 2024.
 * @license     MIT License; see LICENSE.md
 */

namespace NPEU\Plugin\Editors\CKEditor\Provider;

defined('_JEXEC') or die;

use Joomla\CMS\Application\CMSApplicationInterface;
use Joomla\CMS\Editor\AbstractEditorProvider;
use Joomla\Event\DispatcherInterface;
use Joomla\Registry\Registry;

use NPEU\Plugin\Editors\CKEditor\PluginTraits\DisplayTrait;
use NPEU\Plugin\Editors\CKEditor\PluginTraits\XTDButtonsTrait;

/**
 * Editor provider class
 *
 * @since   5.0.0
 */
class CKEditorProvider extends AbstractEditorProvider
{
    use DisplayTrait;
    use XTDButtonsTrait;

    /**
     * A Registry object holding the parameters for the plugin
     *
     * @var    Registry
     * @since  5.0.0
     */
    protected $params;

    /**
     * The application object
     *
     * @var    CMSApplicationInterface
     *
     * @since  5.0.0
     */
    protected $application;

    /**
     * Class constructor
     *
     * @param   Registry                 $params
     * @param   CMSApplicationInterface  $application
     * @param   DispatcherInterface      $dispatcher
     *
     * @since  5.0.0
     */
    public function __construct(Registry $params, CMSApplicationInterface $application, DispatcherInterface $dispatcher)
    {
        $this->params = $params;
        $this->application = $application;

        $this->setDispatcher($dispatcher);
    }

    /**
     * Gets the editor HTML markup
     *
     * @param   string  $name        Input name.
     * @param   string  $content     The content of the field.
     * @param   array   $attributes  Associative array of editor attributes.
     * @param   array   $params      Associative array of editor parameters.
     *
     * @return  string  The HTML markup of the editor
     *
     * @since   5.0.0
     */
    public function display(string $name, string $content = '', array $attributes = [], array $params = []): string
    {
        extract($attributes);
        extract($params);

        return $this->onDisplay($name, $content, $width, $height, $col, $row, $buttons, $id, $asset, $author, $params);
    }

    /**
     * Return Editor name, CMD string.
     *
     * @return string
     * @since   5.0.0
     */
    public function getName(): string
    {
        return 'ckeditor';
    }
}
