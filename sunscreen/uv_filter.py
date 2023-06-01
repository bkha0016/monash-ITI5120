import cv2
import numpy as np

# works better alone in a room

def apply_uv_filter(frame):
    
    # converting the frame to a HSV color space
    hsv_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Defining the lower and upper UV range
    lower_uv = np.array([0,50,50]) #0 50 50
    upper_uv = np.array([30, 255, 255]) #30 255 255
    
    # creating the mask to filter our the UV from the camera
    uv_mask = cv2.inRange(hsv_frame, lower_uv, upper_uv)
    
    # Apply the mask to the frame
    filtered_frame = cv2.bitwise_and(frame, frame, mask=uv_mask)
    
    return filtered_frame



# opening the web camera
video_capture = cv2.VideoCapture(0)

# Set the video width and height
video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Process each frame from the web camera
while True:
    # Read a frame from the web camera
    ret, frame = video_capture.read()

    # Apply the UV filter to the frame
    filtered_frame = apply_uv_filter(frame)

    # Display the filtered frame
    cv2.imshow('UV Filter', filtered_frame)

    # Exit the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break



# Release the web camera
video_capture.release()

# Destroy all OpenCV windows
cv2.destroyAllWindows()