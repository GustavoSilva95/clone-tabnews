function status(request, response) {
  response.status(200).json({ online: true, hora: new Date().toISOString() });
}

export default status;
