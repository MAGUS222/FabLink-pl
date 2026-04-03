import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for GUS/NIP lookup using White List API (MF)
  app.get('/api/gus/:nip', async (req, res) => {
    const { nip } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    try {
      console.log(`Fetching data for NIP: ${nip} on date: ${today}`);
      const response = await fetch(`https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${today}`);
      
      if (!response.ok) {
        throw new Error(`MF API returned status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result && data.result.subject) {
        const subject = data.result.subject;
        
        // Map MF data to our application format
        const companyData = {
          name: subject.name,
          location: subject.workingAddress || subject.residenceAddress || '',
          nip: subject.nip,
          status: subject.statusVat,
          // Extract postal code from address if possible
          postalCode: (subject.workingAddress || subject.residenceAddress || '').match(/\d{2}-\d{3}/)?.[0] || '',
        };
        
        res.json(companyData);
      } else {
        res.status(404).json({ error: 'Nie znaleziono firmy o podanym numerze NIP.' });
      }
    } catch (error) {
      console.error('Error fetching GUS data:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych z serwera MF.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
