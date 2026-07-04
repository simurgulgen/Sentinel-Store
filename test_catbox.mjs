import fs from 'fs';
import path from 'path';

async function testUpload() {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  
  // Create a small test file
  const testFileContent = 'Hello Catbox!';
  const blob = new Blob([testFileContent], { type: 'text/plain' });
  formData.append('fileToUpload', blob, 'test.txt');

  try {
    console.log('Uploading...');
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });
    
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testUpload();
