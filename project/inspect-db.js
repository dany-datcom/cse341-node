const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function inspectDatabase() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    console.log('🔍 Inspeccionando base de datos...\n');
    
    // Listar todas las bases de datos
    const databases = await client.db().admin().listDatabases();
    console.log('📚 Bases de datos disponibles:');
    databases.databases.forEach(db => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
    });
    
    // Para cada base de datos, listar sus colecciones
    for (const dbInfo of databases.databases) {
      if (dbInfo.name !== 'admin' && dbInfo.name !== 'local') {
        const db = client.db(dbInfo.name);
        const collections = await db.listCollections().toArray();
        
        if (collections.length > 0) {
          console.log(`\n📁 Base de datos: ${dbInfo.name}`);
          for (const collection of collections) {
            const count = await db.collection(collection.name).countDocuments();
            console.log(`   📄 Colección: ${collection.name} (${count} documentos)`);
            
            // Mostrar primeros 3 documentos si existen
            if (count > 0) {
              const samples = await db.collection(collection.name).find().limit(3).toArray();
              console.log(`   📝 Muestra de datos:`);
              samples.forEach((doc, i) => {
                console.log(`      ${i+1}.`, JSON.stringify(doc, null, 2).substring(0, 200));
              });
            }
          }
        }
      }
    }
    
    await client.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

inspectDatabase();