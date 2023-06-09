# -*- coding: utf-8 -*-
"""skin-disease-detection.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1-3P6JTNATlqz4IDqmAsaxIW9lhUCc_Ae

# UV skin disease detector using our own CNN model
"""

# Required libraries
import tensorflow as tf
import os
import numpy as np
from matplotlib import pyplot as plt
import cv2

# Tensor flow and keras libraries
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Conv2D #images are 2D, videos are 3D
from keras.layers import MaxPooling2D
from keras.layers import Flatten
from keras.layers import Dense

from keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator

from google.colab import drive
drive.mount('/content/driver')

cd /content/driver/My Drive/Colab Notebooks/data/test/malignant/

"""Data Exploration"""

# Reads in RGB format (while open cv reads in BGR format) --> turns image color into blueish
plt.imshow(cv2.imread("/content/driver/My Drive/Colab Notebooks/data/test/malignant/1027.jpg"))

# Reads in RGB format (while open cv reads in BGR format) --> turns image color into blueish
plt.imshow(cv2.imread("/content/driver/My Drive/Colab Notebooks/data/test/benign/1.jpg"))

# Reads in RGB format (while open cv reads in BGR format) --> turns image color into blueish
plt.imshow(cv2.imread("/content/driver/My Drive/Colab Notebooks/data/test/skinburn/img1134.jpg"))

"""Data Preparation"""

image_size = 224
trainGen = ImageDataGenerator(rescale = 1./255,
                              shear_range = 0.2,
                              zoom_range = 0.2,
                              horizontal_flip = True)

# change the class_mode into sparse for multiclass classification (beinign, malignannt, normal skin)
# batch size significantly determines the accuracy of your model, higher batch size the better

trainSet = trainGen.flow_from_directory("/content/driver/My Drive/Colab Notebooks/data/train",
                                        target_size = (image_size, image_size),
                                        batch_size = 64,
                                        class_mode = 'categorical')

image_size = 224
testGen = ImageDataGenerator(rescale = 1./255,
                              shear_range = 0.2,
                              zoom_range = 0.2,
                              horizontal_flip = True)

# change the class_mode into sparse for multiclass classification (beinign, malignannt, normal skin)
# batch size significantly determines the accuracy of your model, higher batch size the better
testSet = testGen.flow_from_directory("/content/driver/My Drive/Colab Notebooks/data/test",
                                        target_size = (image_size, image_size),
                                        batch_size = 64,
                                        class_mode = 'categorical')

"""Modelling"""

model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32,(3,3),strides=(1, 1),activation='relu',padding='same', input_shape=(224, 224, 3)),
    tf.keras.layers.MaxPooling2D(pool_size=(2,2)),

    tf.keras.layers.Conv2D(64,(3,3),strides=(1, 1) ,padding='same',activation='relu'),
    tf.keras.layers.MaxPooling2D(pool_size=(2,2)),

    tf.keras.layers.Conv2D(128,(3,3),strides=(1, 1),padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D(pool_size=(2,2)),

    tf.keras.layers.Conv2D(256,(3,3),strides=(1, 1),padding='same', activation='relu'),
    tf.keras.layers.MaxPooling2D(pool_size=(2,2)),


    tf.keras.layers.Flatten(),

    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid'),
])

# epochs does not matter that much stick with one or two should be fine (validation testing)
# model.compile needs some fixing
# change the learning rate to 0.001
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
history=model.fit(trainSet, validation_data=testSet, epochs= 12)

import keras
# Read the image
image = tf.keras.utils.load_img('/content/driver/My Drive/Colab Notebooks/data/train/skinburn/img1042.jpg')

# Convert the image to a NumPy array
image_array = tf.keras.utils.img_to_array(image)

# Resize the image to the size of the images the model was trained on
image_array = tf.image.resize(image_array, (224, 224))

# Reshape the image array so that the batch size is the first dimension
#image_array = tf.reshape(image_array, (-1, *image_array.shape[1:]))

image_array = tf.reshape(image_array, (-1, 224, 224, 3))

image_array = image_array.numpy()

# Predict the classes
# Predict the classes
classes = np.argmax(model.predict(image_array), axis=-1)

# Print the classes
print("hello")
print(classes)

import numpy as np
import keras.utils as image
# testing the image requires some fixing
test_image = image.load_img('/content/driver/My Drive/Colab Notebooks/data/test/benign/1118.jpg', target_size = (224, 224))
test_image = image.img_to_array(test_image)
test_image = np.expand_dims(test_image, axis = 0)
result = model.predict(test_image)
trainSet.class_indices
print(trainSet.class_indices)
print(result)
if result[0]==1:
    print("You have malignant Skin cancer")
else:
    print("You have benign(Not harmful) Skin cancer")

import numpy as np
import keras.utils as image # OLD API doesnt work anymore

test_image = image.load_img('/content/driver/My Drive/Colab Notebooks/data/train/skinburn/img1042.jpg', target_size = (224, 224))
test_image = image.img_to_array(test_image)
test_image = np.expand_dims(test_image, axis = 0)
result = model.predict(test_image)
trainSet.class_indices
print(result)
'''
if result[0]==1:
    print("You have malignant Skin cancer")
else:
    print("You have benign(Not harmful) Skin cancer")
'''

import numpy as np
import keras.utils as image # OLD API doesnt work anymore

test_image = image.load_img('/content/driver/My Drive/Colab Notebooks/data/test/malignant/1027.jpg', target_size = (224, 224))
test_image = image.img_to_array(test_image)
test_image = np.expand_dims(test_image, axis = 0)
result = model.predict(test_image)
trainSet.class_indices
print(result)
if result[0]==1:
    print("You have malignant Skin cancer")
else:
    print("You have benign(Not harmful) Skin cancer")

"""# UV Skin Disease Detection using Transfer Learning from Tensorflow hub"""

# Enter the code for transfer learning in Tensorflow hub
import numpy as np
import cv2

import PIL.Image as Image
import matplotlib.pylab as plt

import tensorflow as tf
import tensorflow_hub as hub

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

IMAGE_SHAPE = (224,224)

classifier = tf.keras.Sequential([
    hub.KerasLayer("https://tfhub.dev/google/tf2-preview/mobilenet_v2/classification/4", input_shape=IMAGE_SHAPE+(3,))
])

from google.colab import drive
drive.mount('/content/driver')

cd /content/drive/My Drive/Colab Notebooks/data/test/malignant/

benign_img = Image.open("/content/driver/MyDrive/ColabNotebooks/data/test/benign/1.jpg").resize(IMAGE_SHAPE)
benign_img

benign_img = np.array(benign_img) / 255.0
benign_img.shape

import pathlib

data_dir = pathlib.Path("/content/driver/MyDrive/ColabNotebooks/data/train")
data_dir

print(list(data_dir.glob('*/*.jpg')))

image_count = len(list(data_dir.glob('*/*.jpg')))
print(image_count)

# create a dictionary for labels

skind_images_dict = {
    'Benign': list(data_dir.glob('benign/*')),
    'Malignant': list(data_dir.glob('malignant/*')),
    'Skinburn': list(data_dir.glob('skinburn/*')),

}

skind_labels_dict = {
    'Benign': 0,
    'Malignant': 1,
    'Skinburn' : 2,
}

str(skind_images_dict['Skinburn'][0])

img = cv2.imread(str(skind_images_dict['Skinburn'][0]))
img.shape

# resizing the image

cv2.resize(img, IMAGE_SHAPE).shape

# It takes 15-16 minutes for this code to run (grab your popcorns!)

x, y = [], []

for skin_name, images in skind_images_dict.items():
  for image in images:
    img = cv2.imread(str(image))
    resized_img = cv2.resize(img, IMAGE_SHAPE)
    x.append(resized_img)
    y.append(skind_labels_dict[skin_name])

x = np.array(x)
y = np.array(y)

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x,y,random_state = 0)

# Preprocessing: scale images
x_train_scaled = x_train / 255
x_test_scaled = x_test / 255

x0_resized = cv2.resize(x[0], IMAGE_SHAPE)
x1_resized = cv2.resize(x[1], IMAGE_SHAPE)
x2_resized = cv2.resize(x[2], IMAGE_SHAPE)

plt.axis('off')
plt.imshow(x[0])

plt.axis('off')
plt.imshow(x[1])

plt.axis('off')
plt.imshow(x[2])

predicted = classifier.predict(np.array([x[0], x[1], x[2]]))
predicted = np.argmax(predicted, axis=1)
predicted

feature_extractor_model = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4"

pretrained_model_without_top_layer = hub.KerasLayer(
    feature_extractor_model, input_shape=(224, 224, 3), trainable=False)

num_of_skins = 3

model = tf.keras.Sequential([
  pretrained_model_without_top_layer,
  tf.keras.layers.Dense(num_of_skins)
])

model.summary()

model.compile(
  optimizer="adam",
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['acc'])

model.fit(x_train_scaled, y_train, epochs=5)

model.evaluate(x_test_scaled,y_test)

predictions = model.predict(x_test)

labels = np.argmax(predictions, axis = 1)

for i in labels:
  if i == 0:
    print("Benign")
  elif i == 1:
    print("Malignant")
  else:
    print("Skinburn")

# turning the image from the selected image path into a vector for the tensorflow to analyze
def preprocess_image(image_path):
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = image / 255.0  # Normalize pixel values between 0 and 1
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

image_path = "/content/driver/MyDrive/ColabNotebooks/data/test/benign/1.jpg"

# To label the class of the predicted image and calculate its probability
def prediction_image(preprocessed_image):
    predictions = model.predict(preprocessed_image)
    class_labels = ['benign', 'malignant', 'skinburn']
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_label = class_labels[predicted_class_index]
    predicted_probability = predictions[0][predicted_class_index] * 100
    return print(predicted_class_label, predicted_probability, "%")

prediction_image(preprocess_image(image_path))

"""# Flask & HTML are used to create the UI of this skin analysis app"""

from google.colab import drive
drive.mount('/content/driver')

# Commented out IPython magic to ensure Python compatibility.
# create a new file in the Drive directory called templates
# %mkdir templates -p

# Commented out IPython magic to ensure Python compatibility.
# %%writefile templates/index.html
# <!DOCTYPE html>
# <html>
# <head>
#     <title>Skin Health Analysis</title>
#     <style>
#       .body{
#         background-color: GhostWhite;
#       }
# 
#       h1.title {
#         text-align: center;
#         color: blue;
#       }
# 
#       .container{
#         display: flex;
#         flex-direction: row;
#         justify-content: center;
#       }
# 
#       .motion{
#         display: flex;
#         flex-direction: row;
#         justify-content: center;
#       }
#     </style>
# </head>
# <body>
#     <h1 class = title>Skin Health Analysis</h1>
#     <div class = "container">
#       <form action="/upload" method="post" enctype="multipart/form-data">
#           <input type="file" name="file" accept="image/*">
#           <input type="submit" value="Upload">
#       </form>
#     </div>
#     <div class = "motion">
#       <canvas id="canvas"></canvas>
#     </div>
# 
#     <div id ="predictedClass"></div>
# 
#     <script>
#         function loadPreview(event) {
#             var canvas = document.getElementById('canvas');
#             var ctx = canvas.getContext('2d');
#             var img = new Image();
#             img.src = URL.createObjectURL(event.target.files[0]);
#             img.onload = function() {
#                 ctx.clearRect(0, 0, canvas.width, canvas.height);
#                 canvas.width = img.width;
#                 canvas.height = img.height;
#                 ctx.drawImage(img, 0, 0);
#             };
#         }
#         document.querySelector('input[type="file"]').addEventListener('change', loadPreview);
# 
#         function showPrediction(prediction) {
#           var predictedClass = document.getElementById('predictedClass');
#           predictedClass.innerText = 'Predicted Class: ' + prediction;
#         };
# 
#     </script>
# 
# </body>
# </html>
#

# still need to install flask_ngrok module
!pip install flask_ngrok
!pip install pyngrok
from flask_ngrok import run_with_ngrok
from pyngrok import ngrok
import os
import threading

os.environ["FLASK_ENV"] = "development"

# I cant use render_template in this case..... Need to use the whole flask to finish this job!
from flask import Flask, render_template
import cv2
import numpy as np


port_no = 5000
app = Flask(__name__)

# 2QoCeDpr5nKJEhb0A4ocPSAmsaO_2QTWQp3pX48sDZLjNfJeH
ngrok.set_auth_token("2QoCeDpr5nKJEhb0A4ocPSAmsaO_2QTWQp3pX48sDZLjNfJeH")

public_url = ngrok.connect(port_no).public_url

app.config["BASE_URL"] = public_url

@app.route('/')
def home():
    return render_template('index.html')

# analyzing the upload picture of the model
@app.route('/upload', methods=['POST'])
def upload():
    # Return the analysis or prediction result
    return f"Predicted Class: {prediction_image(preprocess_image(image_path))}"

threading.Thread(target=app.run, kwargs={"use_reloader" : False}).start()

print(f"To access the global link pls click {public_url}")

#app.run(port=port_no)