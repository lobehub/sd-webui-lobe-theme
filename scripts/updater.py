from dataclasses import dataclass
import os
from pathlib import Path
import shutil
from modules import scripts

@dataclass
class DefaultFile:
    """Move file to location as filename"""
    og_file:str
    current_path:str
    dir:str
    save_as_filename:str


#class UpdateInstructions:
#    @staticmethod
#    def instructions(other_clss):
#        #Create new folder
#        in_root_folders = ["static"]
#        #in_extension_folder = []
#        for f_name in in_root_folders:
#            other_clss.check_folder


class BasicUpdater:

    def __init__(self):
        #sd-web-ui-qkcss dir
        self.extensions_dir = scripts.basedir()

        self.root_dir = Path(self.extensions_dir).parents[1]
        self.static_dir = os.path.join(self.root_dir, "static")

        self.style_folder = os.path.join(self.extensions_dir, "style_choices") 
        self.logos_folder = os.path.join(self.extensions_dir, "logos")
        self.favicon_folder = os.path.join(self.extensions_dir, "favicons")
        self.backgrounds_folder = os.path.join(self.extensions_dir, "backgrounds")
        self.effects_folder = os.path.join(self.extensions_dir, "effects")
        self.javascript_folder = os.path.join(self.extensions_dir, "javascript")

        self.file_defaults = [
            DefaultFile(og_file="logo.png", current_path=self.logos_folder, dir=self.static_dir, save_as_filename="logo.png"),
            DefaultFile(r"favicon Original.svg", self.favicon_folder, self.static_dir, "favicon.svg"),
            DefaultFile("blankbackground.png", self.backgrounds_folder, self.static_dir, "background.png")
        ]

        self.updater_file = os.path.join(self.extensions_dir, "update")
        if os.path.exists(self.updater_file):
            self.check_folders(self.static_dir)
            for fd in self.file_defaults:
                self.clone_file(fd)
            #UpdateInstructions.instructions(self)
            os.remove(self.updater_file)

    
    def check_folders(self, folder_path):
        if not os.path.exists(folder_path):
            os.mkdir(folder_path)
    
    def clone_file(self, defaults_object:DefaultFile):
        from_file = os.path.join(defaults_object.current_path, defaults_object.og_file)
        to_file = os.path.join(defaults_object.dir, defaults_object.save_as_filename)
        if not os.path.exists(to_file):
            shutil.copy(from_file, to_file)

BasicUpdater()