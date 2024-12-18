import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await dbConnect(); // Koneksi ke MongoDB
  const mahasiswaCollection = db.collection('Vote');
  console.log('Using collection:', mahasiswaCollection.collectionName);
  if (req.method === 'POST') {
    try {
      const { choice_id } = req.body;
console.log(choice_id)
      // Validasi input
      if ( !choice_id) {
        return res.status(400).json({ error: 'Nama dan choice_id harus diisi' });
      }

      // Menyimpan data mahasiswa ke koleksi 'mahasiswa'
      const result = await mahasiswaCollection.insertOne({ choice_id });
      console.log('Insert Result:', result); // Tambahkan logging di sini
      if (result.acknowledged) {
        const newMahasiswa = await mahasiswaCollection.findOne({ _id: result.insertedId });
        console.log('Inserted Data:', newMahasiswa); // Periksa data yang berhasil disimpan
        return res.status(201).json({ success: true, data: newMahasiswa });
      } else {
        console.error('Insert operation failed, acknowledged is false');
        return res.status(500).json({ error: 'Gagal menyimpan data mahasiswa' });
      }
    } catch (error: any) {
      console.error('Error inserting mahasiswa:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    // Menangani metode HTTP selain POST
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}