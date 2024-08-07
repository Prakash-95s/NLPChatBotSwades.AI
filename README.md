MachineLearning how to use.ipynb(Backend API)
Please use Jupyter notebook to run all cells (Use CUDA GPU especially for Llam2 fine tuning and ensure storage space is 500 gb (SDD) availability about 250GB is required for the commonspeech dataset training using Wav2Vec model by facebook for audio processing.We can skip the training for lack of space and time .Its already pretrained model on basic speech.But to avail all languages I have given this functionality for better voice clarity noise reduction in model.

Also finetuning with llama langchain will be heavy on GPU H-100s are required.skip the cell if used in colab

I have used some cells that can be skipped (mentioned as test)

Finally the API cell will generate a ngrok public url for each of server instances.You need to change this every time in the react app in audioresponse.js.And also in app.js for text message chatbox.
------------------------------------------------------------------------------------------------

React App Requirements:

   Make sure you have installed npm and also installed react -min 12.6 or any even versions like 14 or 16 or 18

   Need to install certain libraries by NPM install the list of them are:

npm install react-mic --force
npm install react-loader-spinner --force
