import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import randomizer from '../../components/randomizer';
import sendMail from '../../components/sendMail';

interface UpdateTokenRequestBody {
    nim: string;
    token: string;
}

type ExtendedRequest = NextApiRequest & {
    body: UpdateTokenRequestBody;
};

export default async function handler(req: ExtendedRequest, res: NextApiResponse) {
    const db = await dbConnect(); // Koneksi ke MongoDB
    const mahasiswa = db.collection('mahasiswa');

    if (req.method === 'PUT') {
        const { TOKEN } = req.query; // Ambil TOKEN dari query parameter

        if (!TOKEN) {
            return res.status(400).json({ success: false, error: 'TOKEN harus disediakan' });
        }

        try {
            // Temukan data berdasarkan TOKEN
            const document = await mahasiswa.findOne({ TOKEN });

            if (!document) {
                return res.status(404).json({ success: false, error: 'Data dengan TOKEN tersebut tidak ditemukan' });
            }

            // Update STATUS_VOTE menjadi true jika TOKEN ditemukan
            const updatedDocument = await mahasiswa.findOneAndUpdate(
                { TOKEN }, // Filter berdasarkan TOKEN
                { $set: { STATUS_VOTE: true } }, // Update field STATUS_VOTE
                { returnDocument: 'after' } // Mengembalikan dokumen terbaru setelah update
            );

            // if (!updatedDocument || !updatedDocument.value) {
            //   console.log(updatedDocument)
            //   console.log(updatedDocument.value)
            //     return res.status(500).json({ success: false, error: 'Gagal mengupdate STATUS_VOTE' });
            // }

            res.status(200).json({ success: true, data: updatedDocument.value });
        } catch (error: any) {
            res.status(500).json({ success: false, error: 'Kesalahan Server', details: error.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Metode tidak diizinkan' });
    }
}