<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors.CKEditor
 *
 * @copyright   Copyright (C) NPEU 2024.
 * @license     MIT License; see LICENSE.md
 */

namespace NPEU\Plugin\Editors\CKEditor\Extension;

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Event\Event;
use Joomla\Event\SubscriberInterface;

use NPEU\Plugin\Editors\CKEditor\PluginTraits\DisplayTrait;
use NPEU\Plugin\Editors\CKEditor\PluginTraits\XTDButtonsTrait;
use NPEU\Plugin\Editors\CKEditor\Provider\CKEditorProvider;

/**
 * CKEditor for Joomla
 */
class CKEditor extends CMSPlugin implements SubscriberInterface
{
    use DisplayTrait;
    use XTDButtonsTrait;

    protected $autoloadLanguage = true;

    /**
     * An internal flag whether plugin should listen any event.
     *
     * @var bool
     *
     * @since   4.3.0
     */
    protected static $enabled = false;

    /**
     * Constructor
     *
     */
    public function __construct($subject, array $config = [], bool $enabled = true)
    {
        // The above enabled parameter was taken from teh Guided Tour plugin but it ir always seems
        // to be false so I'm not sure where this param is passed from. Overriding it for now.
        $enabled = true;


        #$this->loadLanguage();
        $this->autoloadLanguage = $enabled;
        self::$enabled = $enabled;

        parent::__construct($subject, $config);
    }

    /**
     * function for getSubscribedEvents : new Joomla 4 feature
     *
     * @return array
     *
     * @since   4.3.0
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onEditorSetup' => 'onEditorSetup'
        ];
    }

    /**
     * Register Editor instance
     *
     * @param EditorSetupEvent $event
     *
     * @return void
     *
     * @since   5.0.0
     */
    public function onEditorSetup(\Joomla\CMS\Event\Editor\EditorSetupEvent $event)
    {
        $this->loadLanguage();

        $this->onInit();

        $event->getEditorsRegistry()
            ->add(new CKEditorProvider($this->params, $this->getApplication(), $this->getDispatcher()));
    }
}