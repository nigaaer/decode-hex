document.getElementById('decodeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const base64Key = document.getElementById('key').value;
    const base64Kid = document.getElementById('kid').value;
    const errorMessageElement = document.getElementById('errorMessage');

    // Clear previous error message
    errorMessageElement.textContent = '';

    // Function to decode base64 and convert to hex
    function base64ToHex(base64Str) {
        try {
            // Replace characters for proper base64 decoding
            base64Str = base64Str.replace(/_/g, '/').replace(/-/g, '+');
            const decoded = atob(base64Str);
            let hex = '';
            for (let i = 0; i < decoded.length; i++) {
                hex += decoded.charCodeAt(i).toString(16).padStart(2, '0');
            }
            return hex;
        } catch (error) {
            return null;
        }
    }

    // Decode the inputs
    const hexKey = base64ToHex(base64Key);
    const hexKid = base64ToHex(base64Kid);

    if (!hexKey || !hexKid) {
        // Display error if base64 decoding fails
        errorMessageElement.textContent = 'Invalid Base64 input! Please check your values.';
        document.getElementById('hexKey').textContent = '';
        document.getElementById('hexKid').textContent = '';
        return;
    }

    // Display the decoded results
    document.getElementById('hexKey').textContent = hexKey;
    document.getElementById('hexKid').textContent = hexKid;

    // Enable buttons for copy and download
    document.getElementById('copyBtn').disabled = false;
    document.getElementById('downloadBtn').disabled = false;
});

// Copy to clipboard functionality
document.getElementById('copyBtn').addEventListener('click', function() {
    const hexKey = document.getElementById('hexKey').textContent;
    const hexKid = document.getElementById('hexKid').textContent;

    const textToCopy = `Key (Hex): ${hexKey}\nKeyID (Hex): ${hexKid}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Decoded results copied to clipboard!');
    }).catch((err) => {
        console.error('Failed to copy: ', err);
    });
});

// Download decoded results as a text file
document.getElementById('downloadBtn').addEventListener('click', function() {
    const hexKey = document.getElementById('hexKey').textContent;
    const hexKid = document.getElementById('hexKid').textContent;

    const textToDownload = `Key (Hex): ${hexKey}\nKeyID (Hex): ${hexKid}`;
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'decoded_results.txt';
    link.click();
});
