// ui.js

declare const set_theme: (theme: string) => void;
declare const all_gallery_buttons: () => Element[];
declare const selected_gallery_button: () => Element | null;
declare const selected_gallery_index: () => number;
declare const extract_image_from_gallery: (gallery: Element[]) => Element[];
declare const arguments_to_array: (arguments_: IArguments) => any[];
declare const switch_to_txt2img: () => any[];
declare const switch_to_img2img_tab: (no: number) => void;
declare const switch_to_img2img: () => any[];
declare const switch_to_sketch: () => any[];
declare const switch_to_inpaint_sketch: () => any[];
declare const switch_to_inpaint: () => any[];
declare const switch_to_extras: () => any[];
declare const get_tab_index: (tabId: string) => number;
declare const create_tab_index_arguments: (tabId: string, arguments_: any[]) => any[];
declare const get_img2img_tab_index: () => any[];
declare const create_submit_arguments: (arguments_: any[]) => any[];
declare const showSubmitButtons: (tabname: string, show: boolean) => void;
declare const submit: () => any[];
declare const submit_img2img: () => any[];
declare const modelmerger: () => any[];
declare const ask_for_style_name: (
  argument0: any,
  prompt_text: string,
  negative_prompt_text: string,
) => [string, string, string];
declare const confirm_clear_prompt: (prompt: string, negative_prompt: string) => [string, string];
declare const recalculatePromptTokens: (name: string) => void;
declare const recalculate_prompts_txt2img: () => any[];
declare const recalculate_prompts_img2img: () => any[];
declare const update_txt2img_tokens: (...arguments_: any[]) => any;
declare const update_img2img_tokens: (...arguments_: any[]) => any;
declare const restart_reload: () => any[];
declare const updateInput: (target: Element) => void;
declare const selectCheckpoint: (name: string) => void;
declare const getTranslation: (text: string) => string;
