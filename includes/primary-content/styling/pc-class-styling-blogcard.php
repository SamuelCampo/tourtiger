<?php
/* ===========================
 * Blog Card Class Extend
 * ======================== */
 
class BlogCard extends StylingCard {

	/**
	 * Return Fields 
	 * @return array
	 */
	function return_acf_group( $i = '', $c = '' ) {

		$cc_options_array = array (
			'key' => $this->slug . $i . '_58370b89b275c',
			'label' => 'Styles group',
			'name' => $this->slug . '_style-' . $c,
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'collapsed' => '',
			'min' => 1,
			'max' => 1,
			'layout' => 'row',
			'button_label' => 'Add Row',
			'sub_fields' => array (
				array (
					'key' => $this->slug . $i . '58370e6c298c3',
					'label' => 'Title',
					'name' => '',
					'type' => 'tab',
					'instructions' => '',
					'required' => '',
					'conditional_logic' => '',
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'placement' => 'left',
					'endpoint' => 0,
				),
				array (
					'key' => $this->slug . $i . '58370bc1b275d',
					'label' => 'Title',
					'name' => 'bc_style__title',
					'type' => 'typography',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'show_font_familys' => 1,
					'font-family' => '',
					'show_font_weight' => 1,
					'font-weight' => 400,
					'show_backup_font' => 1,
					'backup-font' => 'Arial, Helvetica, sans-serif',
					'show_text_align' => 1,
					'text_align' => 'left',
					'show_text_direction' => 0,
					'direction' => 'ltr',
					'show_font_size' => 1,
					'font_size' => 20,
					'show_line_height' => 1,
					'line_height' => 25,
					'show_letter_spacing' => 1,
					'letter_spacing' => 0,
					'show_color_picker' => 0,
					'text_color' => '#000000',
					'show_font_style' => 1,
					'font_style' => 'normal',
					'show_preview_text' => 0,
					'default_value' => '',
					'new_lines' => '',
					'maxlength' => '',
					'placeholder' => '',
					'readonly' => 0,
					'disabled' => 0,
					'rows' => '',
					'font_familys' => self::get_available_fonts(),
					'stylefont' => array (
						100 => 100,
						300 => 300,
						400 => 400,
						600 => 600,
						700 => 700,
						800 => 800,
					),
					'backupfont' => self::BACK_FONTS,
				),
				array (
					'key' => $this->slug . $i . '584e990889f75',
					'label' => 'Title color',
					'name' => 'bc_style__title-color',
					'type' => 'rgba_color',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => '',
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'rgba' => '',
					'return_value' => 0,
					'ext_value' => array (
					),
				),
				array (
					'key' => $this->slug . $i . '5837pos5btitl',
					'label' => 'Title position',
					'name' => 'bc_style__title-pos',
					'type' => 'radio',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array (
						'normal' => 'Below Image',
						'image' => 'On bottom of Image',
						'image-top' => 'On top of Image'
					),
					'allow_null' => 0,
					'other_choice' => 0,
					'save_other_choice' => 0,
					'default_value' => '',
					'layout' => 'horizontal',
				),
				array (
					'key' => $this->slug . $i . '58370e85298c4',
					'label' => 'Excerpt',
					'name' => 'excerpt',
					'type' => 'tab',
					'instructions' => '',
					'required' => '',
					'conditional_logic' => '',
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'placement' => 'left',
					'endpoint' => 0,
				),
				array (
					'key' => $this->slug . $i . '58370c19b275e',
					'label' => 'Excerpt',
					'name' => 'bc_style__excerpt',
					'type' => 'typography',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'show_font_familys' => 1,
					'font-family' => '',
					'show_font_weight' => 1,
					'font-weight' => 400,
					'show_backup_font' => 1,
					'backup-font' => 'Arial, Helvetica, sans-serif',
					'show_text_align' => 1,
					'text_align' => 'left',
					'show_text_direction' => 0,
					'direction' => 'ltr',
					'show_font_size' => 1,
					'font_size' => 20,
					'show_line_height' => 1,
					'line_height' => 25,
					'show_letter_spacing' => 1,
					'letter_spacing' => 0,
					'show_color_picker' => 0,
					'text_color' => '#000000',
					'show_font_style' => 1,
					'font_style' => 'normal',
					'show_preview_text' => 0,
					'default_value' => '',
					'new_lines' => '',
					'maxlength' => '',
					'placeholder' => '',
					'readonly' => 0,
					'disabled' => 0,
					'rows' => '',
					'font_familys' => self::get_available_fonts(),
					'stylefont' => array (
						100 => 100,
						300 => 300,
						400 => 400,
						600 => 600,
						700 => 700,
						800 => 800,
					),
					'backupfont' => self::BACK_FONTS,
				),
				array (
					'key' => $this->slug . $i . '584e995389f76',
					'label' => 'Excerpt color',
					'name' => 'bc_style__excerpt-color',
					'type' => 'rgba_color',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'rgba' => '',
					'return_value' => 0,
					'ext_value' => array (
					),
				),
				array (
					'key' => $this->slug . $i . '58370ea1298c5',
					'label' => 'Date',
					'name' => '',
					'type' => 'tab',
					'instructions' => '',
					'required' => 1,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'placement' => 'left',
					'endpoint' => 0,
				),
				array (
					'key' => $this->slug . $i . '58370c2fb275f',
					'label' => 'Date',
					'name' => 'bc_style__date',
					'type' => 'typography',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'show_font_familys' => 1,
					'font-family' => '',
					'show_font_weight' => 1,
					'font-weight' => 400,
					'show_backup_font' => 1,
					'backup-font' => 'Arial, Helvetica, sans-serif',
					'show_text_align' => 1,
					'text_align' => 'left',
					'show_text_direction' => 0,
					'direction' => 'ltr',
					'show_font_size' => 1,
					'font_size' => 20,
					'show_line_height' => 1,
					'line_height' => 25,
					'show_letter_spacing' => 1,
					'letter_spacing' => 0,
					'show_color_picker' => 0,
					'text_color' => '#000000',
					'show_font_style' => 1,
					'font_style' => 'normal',
					'show_preview_text' => 0,
					'default_value' => '',
					'new_lines' => '',
					'maxlength' => '',
					'placeholder' => '',
					'readonly' => 0,
					'disabled' => 0,
					'rows' => '',
					'font_familys' => self::get_available_fonts(),
					'stylefont' => array (
						100 => 100,
						300 => 300,
						400 => 400,
						600 => 600,
						700 => 700,
						800 => 800,
					),
					'backupfont' => self::BACK_FONTS,
				),
				array (
					'key' => $this->slug . $i . '584e9a2089f77',
					'label' => 'Date color',
					'name' => 'bc_style__date-color',
					'type' => 'rgba_color',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'rgba' => '',
					'return_value' => 0,
					'ext_value' => array (
					),
				),
				array (
					'key' => $this->slug . $i . 'datebgblogf77',
					'label' => 'Date background color',
					'name' => 'bc_style__date-bg-color',
					'type' => 'rgba_color',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'rgba' => '',
					'return_value' => 0,
					'ext_value' => array (
					),
				),
				array (
					'key' => $this->slug . $i . '58370c65b2760',
					'label' => 'Date Position',
					'name' => 'bc_style__date-pos',
					'type' => 'radio',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array (
						'top-left' => 'Top Left Of Image',
						'top-right' => 'Top Right Of Image',
						'above' => 'Above Title',
						'beneath' => 'Beneath Description',
					),
					'allow_null' => 0,
					'other_choice' => 0,
					'save_other_choice' => 0,
					'default_value' => '',
					'layout' => 'horizontal',
				),
				array (
					'key' => $this->slug . $i . '58370ecb298c6',
					'label' => 'Button',
					'name' => 'button',
					'type' => 'tab',
					'instructions' => '',
					'required' => '',
					'conditional_logic' => '',
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'placement' => 'left',
					'endpoint' => 0,
				),
				array (
					'key' => $this->slug . $i . 'btbt0ecb298c6',
					'label' => 'Button text',
					'name' => 'bc_style__button_text',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 'Read article',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
					'readonly' => 0,
					'disabled' => 0,
				),
				array (
					'key' => 'fblog_58370ecb298c6',
					'label' => 'Button type',
					'name' => 'bc_type__button',
					'type' => 'radio',
					'instructions' => 'Square means non-rounded edges. Round means fully round edges. Rounded corner just means slightly rounded edges.',
					'required' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array (
						'text' => 'Text',
						'square' => 'Square',
						'round' => 'Round',
						'corner' => 'Rounded Corner',
					),
					'allow_null' => 0,
					'other_choice' => 0,
					'save_other_choice' => 0,
					'default_value' => 'text',
					'layout' => 'horizontal',
				),
				array (
					'key' => 'fblog_5837mous298c6',
					'label' => 'Button Mouseover effect',
					'name' => 'bc_type__button_hover',
					'type' => 'checkbox',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array (
						'invert' => 'Color Invert',
						'decor' => 'Text Decoration',
					),
					'default_value' => array (
					),
					'layout' => 'horizontal',
					'toggle' => 1,
				),
				array (
					'key' => $this->slug . $i . '58370cdfb2761',
					'label' => 'Button',
					'name' => 'bc_style__button',
					'type' => 'typography',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'show_font_familys' => 1,
					'font-family' => '',
					'show_font_weight' => 1,
					'font-weight' => 400,
					'show_backup_font' => 1,
					'backup-font' => 'Arial, Helvetica, sans-serif',
					'show_text_align' => 0,
					'text_align' => 0,
					'show_text_direction' => 0,
					'direction' => 'ltr',
					'show_font_size' => 1,
					'font_size' => 20,
					'show_line_height' => 1,
					'line_height' => 25,
					'show_letter_spacing' => 1,
					'letter_spacing' => 0,
					'show_color_picker' => 0,
					'text_color' => '#000000',
					'show_font_style' => 1,
					'font_style' => 'normal',
					'show_preview_text' => 0,
					'default_value' => '',
					'new_lines' => '',
					'maxlength' => '',
					'placeholder' => '',
					'readonly' => 0,
					'disabled' => 0,
					'rows' => '',
					'font_familys' => self::get_available_fonts(),
					'stylefont' => array (
						100 => 100,
						300 => 300,
						400 => 400,
						600 => 600,
						700 => 700,
						800 => 800,
					),
					'backupfont' => self::BACK_FONTS,
				),
				array (
					'key' => $this->slug . $i . '584e9a7989f78',
					'label' => 'Button color',
					'name' => 'bc_style__button-color',
					'type' => 'rgba_color',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'rgba' => '',
					'return_value' => 0,
					'ext_value' => array (
					),
				),
				array (
					'key' => $this->slug . $i . 'bgce9a7989f78',
					'label' => 'Button background color',
					'name' => 'bc_style__button-bg-color',
					'type' => 'rgba_color',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array(
						array (
							array (
								'field' => 'fblog_58370ecb298c6',
								'operator' => '!=',
								'value' => 'text',
							),
						),
					),
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'rgba' => '',
					'return_value' => 0,
					'ext_value' => array (
					),
				),
				array (
					'key' => $this->slug . $i . 'buttdw7989f78',
					'label' => 'Button Dropshadow',
					'name' => 'bc_style__button_drop',
					'type' => 'true_false',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array (
						array (
							array (
								'field' => 'fblog_58370ecb298c6',
								'operator' => '!=',
								'value' => 'text',
							),
						),
					),
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'message' => 'Enable Dropshadow',
					'default_value' => 0,
				),
				array (
					'key' => $this->slug . $i . 'buttbr7989f78',
					'label' => 'Button Border',
					'name' => 'bc_style__button_bor',
					'type' => 'radio',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => array (
						array (
							array (
								'field' => 'fblog_58370ecb298c6',
								'operator' => '!=',
								'value' => 'text',
							),
						),
					),
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array (
						'no' => 'No',
						'yes' => 'Yes',
						'hover' => 'On Mouseover',
					),
					'allow_null' => 0,
					'other_choice' => 0,
					'save_other_choice' => 0,
					'default_value' => 'no',
					'layout' => 'horizontal',
				),
				array (
					'key' => 'fblog_borthicb298c6',
					'label' => 'Button Border Thickness',
					'name' => 'bc_style__button_thi',
					'type' => 'number',
					'instructions' => 'The border color will be the same as the button font color.',
					'required' => 0,
					'conditional_logic' => array (
						array (
							array (
								'field' => 'field_buttbr7989f78',
								'operator' => '!=',
								'value' => 'no',
							),
						),
					),
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 1,
					'placeholder' => '',
					'prepend' => '',
					'append' => 'px',
					'min' => 1,
					'max' => 5,
					'step' => '',
					'readonly' => 0,
					'disabled' => 0,
				),
			),
		);	

		return $cc_options_array;

	}
	
}

new BlogCard( 'Blog Card', 1 );

?>