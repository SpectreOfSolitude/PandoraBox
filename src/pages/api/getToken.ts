import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import randomizer from '../../components/randomizer'
import sendMail from '../../components/sendMail';


// Tentukan tipe untuk body request
interface UpdateTokenRequestBody {
    nim: any;
    TOKEN: any; // Ubah tipe TOKEN menjadi any
}

type ExtendedRequest = NextApiRequest & {
    body: UpdateTokenRequestBody;
};

export default async function handler(req: ExtendedRequest, res: NextApiResponse) {
    const db = await dbConnect(); // Koneksi ke MongoDB
    const mahasiswa = db.collection('mahasiswa');

    if (req.method === 'PUT') {
        const { NIM, EMAIL } = req.query; // Ambil NIM dan EMAIL dari query parameter
        const TOKEN = randomizer();
        console.log({ TOKEN })
        console.log(req.query)

        if (!NIM || TOKEN === undefined) {
            return res.status(400).json({ success: false, error: 'NIM dan TOKEN harus disediakan' });
        }

        try {
            const updatedDocument = await mahasiswa.findOneAndUpdate(
                { NIM }, // Filter berdasarkan NIM
                { $set: { TOKEN } }, // Update field TOKEN
                { returnDocument: 'after' } // Mengembalikan dokumen terbaru setelah update
            );

            if (!updatedDocument) {
                return res.status(404).json({ success: false, error: 'Data dengan NIM tersebut tidak ditemukan' });
            }

            await sendMail(EMAIL, TOKEN);

            res.status(200).json({ success: true, data: updatedDocument });
        } catch (error: any) {
            res.status(500).json({ success: false, error: 'Kesalahan Server', details: error.message });
        }
    } else {
        res.status(405).json({ success: false, error: 'Metode tidak diizinkan' });
    }
}