
# Image Processing with Python and OpenCV

---------------------------------------------------------

By [Muhammad Dawood](https://github.com/mdawoodaslam)

Date: 9 December 2023

## Python, OpenCV & NumPy

Today, we embark on a thrilling journey into image processing using OpenCV, a powerful library for computer vision tasks. I will unravel the secrets behind reading, resizing, blurring, and sharpening images.

## Reading and Displaying Images

With just a few lines of code, we can read and display an image like a work of art. Take a look at this snippet:

```python
import cv2

# Read an image
image = cv2.imread('bird.jpg')

# Display the image
cv2.imshow('Original Image', image)
cv2.waitKey(0)
```

<img width="988" alt="Screenshot 2023-12-11 at 18 45 18" src="https://github.com/23W-GBAC/blog-muhammad-dawood/assets/103655524/2673fb9f-64d4-4220-adf9-fb9294594d5f">

1. **Read an image:** This line uses the cv2. imread function to read an image file named
"bird.jpg' and load it into memory. The result is stored in the variable image.
2. **Display the original image:** The 'cv2.imshow' function is employed to display the image in a graphical window. The window's title is set to 'Original Image', and the image data comes from the "image" variable.
3. **Wait for a key press:** The cv2 waitKey (0) • line pauses the program, waiting for a key press. The argument "O' means it will wait indefinitely until any key is pressed.
This is commonly used to keep the image window open until the user decides to close it by pressing a key.

In summary, this code snippet is a basic example of reading and displaying an image using OpenCV. It's a foundational step in any image processing pipeline, allowing you to inspect the input image before proceeding with further manipulations.

## Resizing Images

Imagine having the power to reshape your visual creations at will. Enter the realm of image resizing! Behold this enchanting code snippet:

```python

import cv2

def resize_image(image, width, height):
    # Resize the input image to the specified width and height
    resized_image = cv2.resize(image, (width, height))
    return resized_image

# Example usage:
# Set the path of the image file
image_path = 'bird.jpg'

# Read the image using OpenCV
image = cv2.imread(image_path)

# Resize the image to a width of 1280 pixels and a height of 960 pixels
resized_image = resize_image(image, 1280, 960)

# Display the resized image in a graphical window titled 'Resized Image'
cv2.imshow('Resized Image', resized_image)

# Wait for a key press to close the window
cv2.waitKey(0)

# Close all OpenCV windows
cv2.destroyAllWindows()

```

<img width="661" alt="Screenshot 2023-12-11 at 18 48 00" src="https://github.com/23W-GBAC/blog-muhammad-dawood/assets/103655524/06e6bf87-71b8-414b-a577-bb2a71035faf">

1. **Import OpenCV:** The 'import cv2' statement brings the OpenCV library into the Python script, allowing access to its functions for computer vision and image processing.
2. **Define a function for image resizing:** The resize_image function takes an image and the desired width and height as parameters, then uses cv2.resize to perform the resizing. The resized image is returned.
3. **Example usage:**
• 'image_path' is set to the file path of the image (bird.jpg').
• cv2.imread reads the image from the specified path, and the result is stored in the variable image'
• resize_image is called to resize the image to a width of 1280 pixels and a height of 960 pixels, and the result is stored in 'resized_image'.
• cv2. imshow' displays the resized image in a graphical window titled 'Resized
Image'.
• cv2.waitkey(0) ' pauses the script until a key is pressed (0 means waiting indefinitely).
• cv2.destroyAllWindows() ' closes all OpenCV windows.

This code demonstrates a simple image resizing process using OpenCV, providing a glimpse into the world of image manipulation in Python.

## Blur the image

Sometimes, a touch of mystery is needed. Enter the captivating world of image blurring:

```python
    import cv2

def blur_image(image):
    # Define a list of kernel sizes for blurring
    kernels = [13, 5, 9, 131]

    # Iterate over each kernel size
    for k in kernels:
        # Apply blur to the image using the current kernel size
        blurred_image = cv2.blur(image, (k, k))

        # Display the blurred image in a window titled with the kernel size
        cv2.imshow(str(k), blurred_image)

    # Wait for a key press to close the displayed images
    cv2.waitKey(0)

# Example usage:
# Set the path of the image file
image_path = 'bird.jpg'

# Read the image using OpenCV
image = cv2.imread(image_path)

# Check if the image was successfully loaded
if image is not None:
    # Call the blur_image function with the loaded image
    blur_image(image)
else:
    # Display an error message if the image is not found
    print(f"Error: Image not found at path {image_path}")

```
<img width="759" alt="Screenshot 2023-12-11 at 18 54 38" src="https://github.com/23W-GBAC/blog-muhammad-dawood/assets/103655524/09d4821d-6870-48cb-aeec-b5ceb0d15275">


1. **Import OpenCV:** The 'import cv2 statement brings the OpenCV library into the
Python script.
2. **Define a function for image blurring:** The 'blur image' function takes an image as input and applies different blur effects using specified kernel sizes. The results are displayed in separate windows titled with the respective kernel sizes.
3. **Example usage:**
' 'image_path' is set to the file path of the image (bird.jpg').
• cv2. imread reads the image from the specified path, and the result is stored in the variable 'image.
• The script checks if the image is successfully loaded, and if so, it calls the blur_image function.
• If the image is not found, an error message is displayed.
4. **Displaying blurred images:** The script showcases the effect of blurring on the image by displaying multiple versions with different kernel sizes in separate windows.
5. **Wait for a key press to close windows:** The cv2 waitkey (0) ' line pauses the script until a key is pressed (O means waiting indefinitely), allowing the user to inspect the blurred images.

This code provides a hands-on demonstration of image blurring using various kernel sizes in OpenCV, offering insights into the versatility of image processing techniques.

## Sharpening Images

Now, let's add a touch of sharpness to our artistic endeavours:

```python
import cv2
import numpy as np

def sharpen_image(image):
    # Define a sharpening kernel
    kernel = np.array([[0, -1, 0],
                       [-1, 5, -1],
                       [0, -1, 0]])

    # Apply the sharpening kernel to the image using filter2D
    sharpened_image = cv2.filter2D(image, -1, kernel)

    # Display the sharpened image in a window titled 'Sharpened Image'
    cv2.imshow('Sharpened Image', sharpened_image)

    # Wait for a key press to close the displayed image
    cv2.waitKey(0)

# Example usage:
# Set the path of the image file
image_path = 'bird.jpg'

# Read the image using OpenCV
image = cv2.imread(image_path)

# Check if the image was successfully loaded
if image is not None:
    # Call the sharpen_image function with the loaded image
    sharpen_image(image)
else:
    # Display an error message if the image is not found
    print(f"Error: Image not found at path {image_path}")
```
<img width="841" alt="Screenshot 2023-12-11 at 18 57 01" src="https://github.com/23W-GBAC/blog-muhammad-dawood/assets/103655524/a423e1c8-3fa9-43c6-8870-e96e46e863ba">


1. **Import OpenCV and NumPy:** The 'import cv2 and 'import numpy as np' statements bring the OpenCV and NumPy libraries into the script.
2. **Define a function for image sharpening:** The sharpen_image function takes an image as input and applies a specified sharpening kernel using cv2. filter2D'. The result is displayed in a window titled 'Sharpened Image'.
3. **Example usage:**
• 'image_path' is set to the file path of the image (bird.jpg').
• cv2.imread reads the image from the specified path, and the result is stored in the variable 'image.
• The script checks if the image is successfully loaded, and if so, it calls the sharpen_image' function.
• If the image is not found, an error message is displayed.
4. **Displaying the sharpened image:** The script showcases the effect of sharpening on the image by displaying the result in a window.
5. **Wait for a key press to close the window:** The cv2 waitkey(0) * line pauses the script until a key is pressed (0 means waiting indefinitely), allowing the user to inspect the sharpened image.
   
This code provides a practical illustration of image sharpening using a specified kernel in OpenCV, demonstrating the transformative power of image processing techniques.
