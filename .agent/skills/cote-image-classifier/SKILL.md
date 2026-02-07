---
name: cote-image-classifier
description: Classifies Classroom of the Elite images into specific naming conventions (a*, c*, w*) based on dimensions and content.
---

# COTE Image Classification Skill

This skill helps categorize and rename images for the Classroom of the Elite project based on specific visual and dimensional criteria.

## Naming Conventions

### 1. The `a` Series (Vertical Events)
*   **Prefix**: `a` (e.g., `a1.jpg`, `a2.jpg`)
*   **Dimensions**: Vertical / Portrait (Height > Width)
*   **Content**: Depicts **Major Events** or **Confrontations**.
    *   *Examples*: Ayanokoji vs Sakayanagi, Hosen vs Ayanokoji, momentous plot points.
*   **Usage**: Use these for high-tension narrative sections (like "The Psychological Descent").

### 2. The `c` Series (Vertical Characters)
*   **Prefix**: `c` (e.g., `c1.jpg`, `c2.jpg`)
*   **Dimensions**: Vertical / Portrait (Height > Width)
*   **Content**: Depicts **Single Characters** or **Character Portraits**.
    *   *Examples*: Sakayanagi, Ayanokoji, Horikita, Ryuen posing or standing.
*   **Usage**: Use these for character galleries, profiles, or introductions.

### 3. The `w` Series (Horizontal Wide Events)
*   **Prefix**: `w` (e.g., `w1.jpg`, `w2.jpg`)
*   **Dimensions**: Horizontal / Landscape (Width > Height)
*   **Quality**: MUST be **High Quality** and capable of fitting the full screen.
*   **Content**: Depicts **Events** or **Scenery**.
    *   *Examples*: Ayanokoji training Horikita, Kushida vs Ayanokoji, scenic shots.
*   **Usage**: Use these for Hero sections, backgrounds, or full-width cinematic scrolls.

### 4. Rejects
*   **Criteria**: Low quality, or images that do not fit the above content/dimension rules.
*   **Action**: Do not rename to `a`, `c`, or `w`. Leave as is or move to a `rejects` folder.

## Instructions for Use

1.  **Analyze Dimensions**: Check if the image is Portrait (H > W) or Landscape (W > H).
2.  **Analyze Content**:
    *   Is it an Event/Fight? -> `a` (if Vertical) or `w` (if Horizontal).
    *   Is it a Character Portrait? -> `c` (if Vertical).
3.  **Check Quality**: For `w` images, verify high resolution.
4.  **Rename**: rename the file to the next available number in the series (e.g., if `a10` exists, use `a11`).

## Python Script (Optional Helper)

You can use a script to check dimensions automatically:
```python
from PIL import Image
import os

def classify_image(path):
    with Image.open(path) as img:
        width, height = img.size
        print(f"Image: {path} | W: {width} H: {height} | Ratio: {width/height:.2f}")
        if height > width:
            print("-> Potential 'a' (Event) or 'c' (Character)")
        else:
            print("-> Potential 'w' (Event/Landscape)")
```
