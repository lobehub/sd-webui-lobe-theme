import gradio as gr
import modules.scripts as scripts
from modules import script_callbacks, shared
import os
import shutil
from pathlib import Path

basedir = scripts.basedir()


class MyTab():
    
    def __init__(self, basedir):
        #This extensions directory
        self.extensiondir = basedir
        #Up two directories, webui root
        self.webui_dir = Path(self.extensiondir).parents[1]


        self.style_folder = os.path.join(basedir, "style_choices")
        self.backgrounds_folder = os.path.join(self.extensiondir, "backgrounds")
        self.logos_folder = os.path.join(self.extensiondir, "logos")
        self.favicon_folder = os.path.join(self.extensiondir, "favicons")
        self.effects_folder = os.path.join(self.extensiondir, "effects")
        self.javascript_folder = os.path.join(self.extensiondir, "javascript")
        self.static_folder = os.path.join(self.webui_dir, "static")

        self.favicon_workaround = gr.HTML(value='<div class="icon-container"></div>', render=False)


        self.styles_list = self.get_files(self.style_folder)
        self.backgrounds_list = self.get_files(self.backgrounds_folder)
        self.logos_list = self.get_files(self.logos_folder)
        self.favicon_list = self.get_files(self.favicon_folder)
        self.effects_list = self.get_files(self.javascript_folder, file_filter=["quickcss.js", "utility.js", "background.js"], split=True)


        self.styles_dropdown = gr.Dropdown(label="Styles", render=False, interactive=True, choices=self.styles_list, type="value")
        self.background_dropdown = gr.Dropdown(label="Background", render=False, interactive=True, choices=self.backgrounds_list, type="value")
        self.logos_dropdown = gr.Dropdown(label="Logos", render=False, interactive=True, choices=self.logos_list, type="value")
        self.favicon_dropdown = gr.Dropdown(label="Favicon", render=False, interactive=True, choices=self.favicon_list, type="value")
        self.effects_dropdown = gr.Dropdown(label="Effects (on until refresh)", render=False, interactive=True, choices=self.effects_list, type="value")
        

        self.apply_style_bttn = gr.Button(value="Apply Style", render=False)
        self.apply_background_bttn = gr.Button(value="Apply (Reload UI)", render=False)
        #TODO: background off button to swap image in folder to blankbackground and disable style rule
        self.refresh_bkcgrnd_droplist_button = gr.Button(value="Refresh List", render=False)
        self.apply_logo_bttn = gr.Button(value="Apply Logo", render=False)
        self.apply_favicon_bttn = gr.Button(value="Apply Favicon (edit webui.py to see)", render=False)
        self.effects_button = gr.Button(value="Activate Selected Script", render=False)
        self.effects_off_button = gr.Button(value="Deactivate Selected Script", render=False)


        self.logo_image = gr.Image(render=False)
        self.favicon_image = gr.Image(render=False)


        self.import_style_file = gr.File(render=False, label="Import CSS file")
        self.import_background_file = gr.File(render=False, label="Import Background Images")
        self.import_logo_file = gr.File(render=False, label="Import Logo's (png)")
        self.import_favicon_file = gr.File(render=False, label="Import favicons (svg)")


        self.restart_bttn = gr.Button(value="Apply changes (Reload UI)", render=False, variant="primary")

        self.remove_style = gr.Button(value="Remove Stylesheet", render=False)


        # BEGIN CSS COLORPICK COMPONENTS
        self.save_as_filename = gr.Text(label="Save Name", visible=False, render=False)
        self.save_button = gr.Button(value="Save", visible=False, render=False, variant="primary")

        #Test for file being set
        self.file_exists = False
        self.style_path = os.path.join(self.extensiondir, "style.css")
        self.start_position_for_save = 0
        self.insert_colorpicker_break_rule_for_save = 0
        self.insert_break_rule_for_save = 0
        if os.path.exists(self.style_path):
            self.file_exists = True #Conditional for creating inputs
            self.lines = []
            line = ""
            self.dynamic_compatible = False
            with open(self.style_path, 'r', encoding='utf-8') as cssfile:
                try:
                    for i, line in enumerate(cssfile):
                        line = line.strip()
                        if "/*BREAKFILEREADER*/" in line:
                            self.insert_break_rule_for_save = i - self.start_position_for_save
                            break
                        elif "/*ENDCOLORPICKERS*/" in line:
                            self.insert_colorpicker_break_rule_for_save = i - self.start_position_for_save
                            continue
                        if "quickcss_target" in line:
                            self.dynamic_compatible = True
                            self.start_position_for_save = i+1
                            continue
                        if self.dynamic_compatible:
                            if len(line) > 0:
                                self.lines.append(line.split(":"))
                except UnicodeDecodeError as error:
                    print(f"{error}\nCheck style.css in this extensions folder.")


            if self.dynamic_compatible:
                self.dynamically_generated_components = [gr.ColorPicker(label=x[0].replace("-", "").replace("_", " ").title(), render=False, elem_id="quikcss_colorpicker", value=x[1].replace(";", "").strip()) 
                                                            if i < self.insert_colorpicker_break_rule_for_save else 
                                                            gr.Slider(minimum=0, maximum=100, step=1, label=x[0].replace("-", "").replace("_", " ").title(), render=False, elem_id="quikcss_slider", value=x[1].replace(";", "").strip())
                                                            for i,x in enumerate(self.lines)
                                                            ] 
            else:
                self.dynamically_generated_components = []

            # hidden_vals acts like an index, holds int values that are used in js
            self.hidden_vals = [gr.Text(value=str(x), render=False, visible=False) for x in range(len(self.dynamically_generated_components))]

            # length_of_colors similar to hidden vals, but provides length so js knows the limit when parsing rules
            self.length_of_colors = gr.Text(value=len(self.dynamically_generated_components), visible=False, render=False)

            # used as padding so we don't list index error or http 500 internal server, or http 422 forEach can't over undefined (promise pending)
            self.dummy_picker = gr.Text(visible=False, render=False, elem_id="hidden")

            # Acts like catcher, actual values store in list
            self.js_result_component = gr.Text(render=False, interactive=False)
        
        #dummy component for general purpose, currently used for _js effects; holds no relevant data, just for input/output element quota
        self._dummy = gr.Text(value="", visible=False, render=False, show_label=False, interactive=False)

    def ui(self, *args, **kwargs):
        with gr.Blocks(analytics_enabled=False) as ui:
            self.favicon_workaround.render()
            with gr.Accordion(label="Some instructions", open=False):
                gr.Markdown(value="""<center>This is a mix from old style to new style. It is not in it's finished state</center>
<center>To see effects, you must use dropdown, select as sheet, click apply, click restart. More options will be available on restart</center>
<center>I know it lives as a tab, but this was meant to be a demo at first, now it's growing to something more</center>

<center>To see favicon take affect, you will need to add `favicon_path="favicon.svg"` to webui.py</center>
<center>To do this, open file, search for `prevent_thread_lock` add comma, paste in text, save.</center>

<center>You may need to undo this for an update, if you have git issues and don't know how to deal with them</center>
<center>This won't break your system, if you find you can't update, try `git checkout webui.py` ~~`git fetch --all` `git reset --hard origin/master`~~</center>

<center>Once again, this `dynamic` demo has not removed/re-implemented all features present</center>
""")
            if self.file_exists and self.dynamic_compatible:
                with gr.Row(equal_height=True):
                        self.save_as_filename.render()
                        self.save_button.render()
                #Necessary for values being accessible
                self.length_of_colors.render()
                self.dummy_picker.render()
                self.js_result_component.render()
                #Render hidden vals that serve as indices to map
                for h in self.hidden_vals:
                    h.render()
                with gr.Row():
                    #Render adjusters
                    for c in self.dynamically_generated_components:
                        with gr.Column(elem_id="quickcss_colorpicker"):
                            c.render()
            
            with gr.Row():
                with gr.Column():
                    self.styles_dropdown.render()
                    self.apply_style_bttn.render()
                with gr.Column():
                    self.background_dropdown.render()
                    with gr.Row():
                        self.apply_background_bttn.render()
                        self.refresh_bkcgrnd_droplist_button.render()
                with gr.Column():
                    self.logos_dropdown.render()
                    self.apply_logo_bttn.render()
                with gr.Column():
                    self.favicon_dropdown.render()
                    self.apply_favicon_bttn.render()
                with gr.Column():
                    self.effects_dropdown.render()
                    with gr.Row():
                        self.effects_button.render()
                        self.effects_off_button.render()
            
            with gr.Accordion(label="Import Files", open=False):
                with gr.Row():
                    with gr.Column():
                        self.import_style_file.render()
                    with gr.Column():
                        self.import_background_file.render()
                    with gr.Column():
                        self.import_logo_file.render()
                    with gr.Column():
                        self.import_favicon_file.render()
            
            with gr.Row():
                self.restart_bttn.render()
                self.remove_style.render()
            
            with gr.Row():
                self.logo_image.render()
                self.favicon_image.render()
                self._dummy.render()

            # Handlers
            #Generate colorpickers and sliders handlers
            if self.file_exists:
                for comp,val in zip(self.dynamically_generated_components, self.hidden_vals):
                    comp.change(
                        fn = lambda *x: self.process_for_save(*x),
                        _js = "quickcssFormatRule",
                        inputs = [comp, val, self.length_of_colors],
                        outputs = [self.js_result_component] + [self.save_as_filename, self.dummy_picker]
                    )
                self.save_as_filename.change(
                    fn = lambda x: gr.update(visible=bool(x)),
                    inputs = self.save_as_filename,
                    outputs = self.save_button
                )
                self.save_button.click(
                    fn = self.save,
                    inputs = [self.js_result_component, self.save_as_filename],
                    outputs = [self.js_result_component, self.styles_dropdown]
                )

            #Handler cont.
            #Common interface
            #NOTE: These dropdowns affect image placeholders
            self.logos_dropdown.change(
                fn = lambda x: self.get_image(x, folder = "logos"), 
                inputs = self.logos_dropdown,
                outputs = self.logo_image
            )

            self.favicon_dropdown.change(
                fn = lambda x: self.get_image(x, folder = "favicons"), 
                inputs = self.favicon_dropdown,
                outputs = self.favicon_image
            )

            #buttons
            self.apply_style_bttn.click(
                fn = self.apply_choice_wrapper(self.style_folder, self.extensiondir, "style.css"),
                inputs = self.styles_dropdown
            )

            self.apply_background_bttn.click(
                fn = self.apply_choice_wrapper(self.backgrounds_folder, self.static_folder, "background.png"),#TODO: MAYBE: delete file extension
                _js = "injectBackground.refreshImage",
                inputs = self.background_dropdown,
                outputs=self._dummy
            )

            self.refresh_bkcgrnd_droplist_button.click(
                fn = lambda: self.refresh_list(self.refresh_bkcgrnd_droplist_button, self.backgrounds_folder, self.background_dropdown),
                outputs=self.background_dropdown
            )

            self.apply_logo_bttn.click(
                fn = self.apply_choice_wrapper(self.logos_folder, self.static_folder, "logo.png"),#TODO Update css files and change dir to static
                inputs = self.logos_dropdown,
            )

            self.apply_favicon_bttn.click(
                fn = self.apply_choice_wrapper(self.favicon_folder, self.static_folder, "favicon.svg"),#TODO update css files and change dir to static
                inputs = self.favicon_dropdown
            )

            self.effects_button.click(
                fn = None,
                _js = "launchEffect",
                inputs = self.effects_dropdown,
                outputs = self._dummy
            )

            self.effects_off_button.click(
                fn = None,
                _js = "destroyEffect",
                inputs = self.effects_dropdown,
                outputs = self._dummy
            )

            self.remove_style.click(
                fn = lambda: self.delete_style()
            )

            self.restart_bttn.click(fn=self.local_request_restart, _js='restart_reload', inputs=[], outputs=[])

            #File Importers
            self.import_style_file.change(
                fn = lambda tmp_file: self.import_file_from_path(tmp_file, target_folder="style_choices", comp = self.styles_dropdown, func = self.get_files, folder=self.style_folder, focus_list=self.styles_list),
                inputs=self.import_style_file,
                outputs=self.styles_dropdown
            )

            self.import_background_file.change(
                fn = lambda tmp_file: self.import_file_from_path(tmp_file, target_folder="backgrounds", comp = self.background_dropdown, func = self.get_files, folder=self.backgrounds_folder, focus_list=self.backgrounds_list),
                inputs=self.import_background_file,
                outputs=self.background_dropdown
            )

            self.import_logo_file.change(
                fn = lambda tmp_file: self.import_file_from_path(tmp_file, target_folder="logos", comp = self.logos_dropdown, func = self.get_files, folder=self.logos_folder, focus_list=self.logos_list),
                inputs=self.import_logo_file,
                outputs=self.logos_dropdown
            )


            self.import_favicon_file.change(
                fn = lambda tmp_file: self.import_file_from_path(tmp_file, target_folder="favicons", comp = self.favicon_dropdown, func = self.get_files, folder=self.favicon_folder, focus_list=self.favicon_list),
                inputs=self.import_favicon_file,
                outputs=self.favicon_dropdown
            )


        return [(ui, "Theme", "theme")]
    

    def import_file_from_path(self, tmp_file_obj, target_folder, comp, func, **kwargs):
        if tmp_file_obj:
            shutil.copy(tmp_file_obj.name, os.path.join(self.extensiondir, target_folder, tmp_file_obj.orig_name))
            # Update appropriate list 
            # Make backend the same as front-end so it matches when selected
            comp.choices = func(**kwargs)
            tmp_file_obj.flush()
            # return sends update to front-end
        return gr.update(choices=comp.choices)


    def get_files(self, folder, focus_list=[], file_filter=[], split=False):
        focus_list = [file_name if not split else os.path.splitext(file_name)[0] for file_name in os.listdir(folder) if os.path.isfile(os.path.join(folder, file_name)) and file_name not in file_filter] 
        return focus_list


    def apply_choice_wrapper(self, src_base_path, dst_base_path, name):
        """Encapsulation so I don't need a different function for each type"""
        def apply_choice(selection):
            shutil.copy(os.path.join(src_base_path, selection), os.path.join(dst_base_path, name))
        return apply_choice


    def get_image(self, name, folder):
        return os.path.join(self.extensiondir, folder, name)


    def refresh_list(self, component, folder, focus_list, file_filter=[]):
        component.choices = self.get_files(folder, focus_list, file_filter)
        return gr.update(choices=component.choices)


    
    def delete_style(self):
        try:
            os.remove(os.path.join(self.extensiondir, "style.css"))
        except FileNotFoundError:
            pass


    def local_request_restart(self):
        "Restart button"
        shared.state.interrupt()
        shared.state.need_restart = True
    

    def process_for_save(self, x, *y):
        return [x] + [gr.update(visible=True), None]
    

    def save(self, js_cmp_val, filename):
        rules = [f"   {e};\n" for e in js_cmp_val[1:-1].split(";")][:-1]
        #issue, save button needs to stay hidden until some color change
        rules.insert(self.insert_colorpicker_break_rule_for_save, "    /*ENDCOLORPICKERS*/\n")
        rules.insert(self.insert_break_rule_for_save, "    /*BREAKFILEREADER*/\n")
        with open(self.style_path, 'r+') as file:
            lines = file.readlines()
            start_pos = self.start_position_for_save
            for i, rule in enumerate(rules):
                lines[start_pos + i] = rule
            file.seek(0)
            file.writelines(lines)
        self.styles_dropdown.choices.insert(0, f"{filename}.css")
        shutil.copy(self.style_path, os.path.join(self.style_folder, f"{filename}.css"))
        return ["Saved", gr.update(choices=self.styles_dropdown.choices, value=self.styles_dropdown.choices[0])]



tab = MyTab(basedir)        
script_callbacks.on_ui_tabs(tab.ui)
