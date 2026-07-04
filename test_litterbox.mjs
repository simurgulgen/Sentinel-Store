import fs from 'fs';

async function testLitterbox() {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('time', '12h');
  
  const blob = new Blob(['Hello Litterbox API endpoint!'], { type: 'text/plain' });
  formData.append('fileToUpload', blob, 'test.txt');

  try {
    const url = 'https://litterbox.catbox.moe/resources/internals/api.php';
    console.log(`Testing ${url}...`);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    console.log(`Status for ${url}:`, response.status);
    if (response.ok) {
      console.log('Response:', await response.text());
    } else {
      console.log('Error:', await response.text());
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

testLitterbox();
