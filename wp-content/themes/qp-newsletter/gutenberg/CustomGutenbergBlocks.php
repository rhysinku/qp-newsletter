<?php
/**
 * Controller for the Marameo Design custom Gutenberg blocks
 */

namespace MMD\Blocks;

class CustomGutenbergBlocks {

  private static ?CustomGutenbergBlocks $instance = NULL;
  private $custom_block_categories = [];

  /**
   * Instance
   */
  public static function get_instance(): self {
    if (is_null(self::$instance)) {
      self::$instance = new self();
    }

    return self::$instance;
  }

  /**
   * Init
   */
  public static function init() {
    self::get_instance()->hooks();
  }

  /**
   * Run hooks
   */
  private function hooks() {
    add_action('after_setup_theme', [$this, 'remove_core_block_patterns']);
    $this->register_block_pattern_categories();
    add_action('init', [$this, 'register_blocks']);
    add_filter('block_categories_all', [$this, 'block_categories'], 10, 2);
    add_filter('render_block', [$this, 'block_visibility'], 10, 3);

    // Add "mod--theme--light" to editor body
    add_filter('admin_body_class', function ($classes) {
      $screen = get_current_screen();
      if ($screen && $screen->is_block_editor) {
        $classes .= ' mod--theme--light';
      }
      return $classes;
    });
  }

  /**
   * Handle the registration of custom blocks
   */
  public function register_blocks() {
    $client_blocks_dir = MMD_BLOCKS_BUILD_DIR;

    // Check if the blocks directory exists
    if (!is_dir($client_blocks_dir)) {
      return; // Exit early if directory doesn't exist
    }

    $scandir_result = scandir($client_blocks_dir);
    
    // Check if scandir was successful
    if ($scandir_result === false) {
      return; // Exit early if scandir failed
    }

    $block_dirs = array_filter($scandir_result, function ($dir) {
      return $dir !== '.' && $dir !== '..';
    });

    $child_parent_dirs = [
      '',
      '/child/',
      '/child1/',
      '/child2/',
    ];

    foreach ($block_dirs as $block_dir) {
      foreach ($child_parent_dirs as $child_parent_dir) {
        $base_dir = trailingslashit("{$client_blocks_dir}{$block_dir}{$child_parent_dir}");

        $block_json_file = $base_dir . 'block.json';
        $block_php_file = $base_dir . 'index.php';
        $ris_php_file = $base_dir . 'ris.php';
  
        if (file_exists($block_json_file)) {
          $metadata = json_decode(file_get_contents($block_json_file), TRUE);
  
          if (file_exists($ris_php_file)) {
            require_once $ris_php_file;
          }
  
          if (file_exists($block_php_file)) {
            $metadata['block_php_file'] = $block_php_file;
            require_once $block_php_file;
          }
  
          $args = [];
  
          if (isset($metadata['render_callback'])) {
            $args['render_callback'] = $metadata['render_callback'];
          }
  
          register_block_type_from_metadata($block_json_file, $args);
        }
  
      }
    }
  }

  /**
   * Handle the showing or hiding of blocks in the front-end
   */
  public function block_visibility($block_content, $block) {
    if (!isset($block['attrs']['isVisible'])) {
      $block['attrs']['isVisible'] = TRUE;
    }

    return !$block['attrs']['isVisible'] ? '' : $block_content;
  }

  /**
   * Handle the registration of block categories
   */
  public function block_categories($categories, $post) {
    return array_merge($this->custom_block_categories, $categories);
  }

  /**
   * Register block categories
   */
  public function add_block_category($slug, $title, $icon = 'awards') {
    $this->custom_block_categories[] = [
      'slug' => $slug,
      'title' => $title,
      'icon' => $icon,
    ];
  }

  /**
   * Register block pattern categories
   */
  public function register_block_pattern_categories() {
    register_block_pattern_category(
      'mmd-block-patterns',
      [
        'label' => COMPANY_NAME . ' Block Patterns',
      ],
    );
  }

  public function remove_core_block_patterns() {
    remove_theme_support('core-block-patterns');
  }
}
