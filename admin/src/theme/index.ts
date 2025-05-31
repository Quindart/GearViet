const color = {
  indigo: '#405189',
  dark_indigo: '#364574',
  white: '#ffffff',
  gray: '#878a99',
  gray_light: '#f3f3f9',
  gray_dark: '#343a40',
  gray_100: '#f3f6f9',
  gray_200: '#eff2f7',
  gray_300: '#e9ebec',
  gray_400: '#ced4da',
  gray_500: '#adb5bd',
  gray_600: '#878a99',
  gray_700: '#495057',
  gray_800: '#343a40',
  gray_900: '#212529',
  black: '#000000',
  green: '#0ab39c',
  dark_green: '#099885',
  light_green: '#dbecf0',
  blue: '#3577f1',
  light_blue: '#299cdb',
  dark_blue: '#2385ba',
  light_sky: '#abb9e8',
  purple: '#6559cc',
  pink: '#f672a7',
  red: '#f06548',
  dark_red: '#cc563d',
  orange: '#f1963b',
  yellow: '#f7b84b',
  dark_yellow: '#c6933c',
  teal: '#02a8b5',
  cyan: '#299cdb',
};

const theme = {
  //background
  bg_side_bar: color.indigo,
  bg_side_bar_item_hover: color.light_sky,
  bg_side_bar_item_active: color.light_sky,
  bg_side_bar_scroll: color.light_sky,

  bg_auth: color.gray_100,
  bg_app: color.gray_100,

  //navbar
  bg_navbar: color.white,
  bg_navbar_avatar: color.gray_light,
  bg_navbar_hover: color.gray_100,
  bg_hover: color.light_blue,
  bg_navbar_scroll: color.gray_300,
  notification_bg_color: color.red,

  //text
  text_gray: color.gray,
  text_sidebar: color.light_sky,
  text_sidebar_item_active: color.indigo,
  text_navbar_heading: color.gray,
  text_navbar_item: color.gray_900,
  text_rubric: color.gray_700,
  text_sub_rubric: color.gray_600,
  text_heading: color.gray_700,
  text_label: color.gray_700,
  text_dialog_title: color.gray_700,
  text_black: color.black,
  text_white: color.white,
  text_table_cell: color.gray_900,
  text_table_heading: color.gray_600,
  text_table_footer_status: color.gray_600,

  //button
  button_auth_bg: color.green,
  button_auth_bg_hover: color.light_green,
  //primary
  button_primary_outlined_text: color.indigo,
  button_primary_outlined_border: color.indigo,
  button_primary_outlined_bg_hover: color.indigo,

  button_primary_contained_bg: color.indigo,
  button_primary_contained_bg_hover: color.dark_indigo,
  //success
  button_success_outlined_text: color.green,
  button_success_outlined_border: color.green,
  button_success_outlined_bg_hover: color.green,

  button_success_contained_bg: color.green,
  button_success_contained_bg_hover: color.dark_green,
  //info
  button_info_outlined_text: color.light_blue,
  button_info_outlined_bg_hover: color.light_blue,
  button_info_outlined_border: color.light_blue,

  button_info_contained_bg: color.light_blue,
  button_info_contained_bg_hover: color.dark_blue,
  //warning
  button_warning_outlined_text: color.yellow,
  button_warning_outlined_bg_hover: color.yellow,
  button_warning_outlined_border: color.yellow,

  button_warning_contained_bg: color.yellow,
  button_warning_contained_bg_hover: color.dark_yellow,

  //danger
  button_danger_outlined_text: color.red,
  button_danger_outlined_bg_hover: color.red,
  button_danger_outlined_border: color.red,

  button_danger_contained_bg: color.red,
  button_danger_contained_bg_hover: color.dark_red,
  // common colors:
  primary: color.indigo,
  secondary: color.blue,
  white: color.white,
  black: color.black,

  //select
  select_item_active: color.gray_200,

  //table
  table_header_bg: color.gray_100,
  table_border_right: color.gray_200,
  table_border_bottom: color.gray_400,
  star_icon: color.yellow,
  table_checkbox_border: color.gray_400,
  table_checkbox_checked: color.indigo,
  bg_table_pagination: color.white,
  action_view: color.green,
  action_edit: color.yellow,
  action_delete: color.red,
  bg_table_scroll: color.gray_400,

  //Dialog
  bg_dialog: color.gray_light,

  //common
  success: color.green,
  success_outlined: color.green,
  info: color.cyan,
  warning: color.orange,
  error: color.red,
  require: color.red,
  disabled: color.gray_100,
  // icon
  icon_bg_hover: '#eaf1fe',
  icon_hover: color.blue,
  icon: color.gray_800,
  //box shadow
  shadow: '0 1px 2px rgb(56 65 74 / 15%)',
  shadow_hover: '0 5px 10px rgb(30 32 37 / 12%)',

  //border:
  border: color.gray_300,
  border_input: color.gray_400,
  border_pagination: color.gray_300,
  border_select: color.gray_400,
  border_select_active: color.gray_500,
};

export default theme;
