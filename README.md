# FVTT Better Text Drawings
Module for Foundry VTT that adds more options to text drawings, allowing multi-line text as well as configurable stroke width, color, and text alignment.

⚠ This module is unmaintained, and there are no plans to update it to support Foundry v10 or newer. It has been superseded by other modules such as [Advanced Drawing Tools](https://github.com/dev7355608/advanced-drawing-tools).

[![License](https://img.shields.io/github/license/ruipin/fvtt-better-text-drawings)](LICENSE)
[![Build Release](https://github.com/ruipin/fvtt-better-text-drawings/workflows/Build%20Release/badge.svg)](https://github.com/ruipin/fvtt-better-text-drawings/releases/latest)
[![Version (latest)](https://img.shields.io/github/v/release/ruipin/fvtt-better-text-drawings)](https://github.com/ruipin/fvtt-better-text-drawings/releases/latest)
[![Foundry Version](https://img.shields.io/badge/dynamic/json.svg?url=https://github.com/ruipin/fvtt-better-text-drawings/releases/latest/download/module.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=blueviolet)](https://github.com/ruipin/fvtt-better-text-drawings/releases/latest)
[![GitHub downloads (latest)](https://img.shields.io/badge/dynamic/json?label=Downloads@latest&query=assets[?(@.name.includes('zip'))].download_count&url=https://api.github.com/repos/ruipin/fvtt-better-text-drawings/releases/latest&color=green)](https://github.com/ruipin/fvtt-better-text-drawings/releases/latest)
[![Forge Install Base](https://img.shields.io/badge/dynamic/json?label=Forge%20Install%20Base&query=package.installs&suffix=%&url=https://forge-vtt.com/api/bazaar/package/better-text-drawings&colorB=brightgreen)](https://forge-vtt.com/)
[![GitHub issues](https://img.shields.io/github/issues-raw/ruipin/fvtt-better-text-drawings)](https://github.com/ruipin/fvtt-better-text-drawings/issues)
[![Ko-fi](https://img.shields.io/badge/-buy%20me%20a%20coffee-%23FF5E5B?logo=Ko-fi&logoColor=white)](https://ko-fi.com/ruipin)


## Features

* Allows multi-line text in drawings.

* Allows configuring the text stroke color and width in drawings, as well as the text alignment.


## Installation
1. Copy this link and use it in Foundry's Module Manager to install the Module

    > https://github.com/ruipin/fvtt-better-text-drawings/releases/latest/download/module.json

2. Enable the Module in your World's Module Settings


### libWrapper

This module uses the [libWrapper](https://github.com/ruipin/fvtt-better-text-drawings) library for wrapping core methods. While this is not a hard dependency, it is recommended to install it for the best experience and compatibility with other modules.