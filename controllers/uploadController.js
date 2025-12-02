// controllers/uploadController.js
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    res.json({
      url: req.file.path,
      public_id: req.file.filename,
      message: 'Imagen subida exitosamente'
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.params;
    
    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result === 'ok') {
      res.json({ message: 'Imagen eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Imagen no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ error: 'Error al eliminar imagen' });
  }
};