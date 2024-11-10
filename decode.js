document.getElementById('decodeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const base64Key = document.getElementById('key').value;
    const base64Kid = document.getElementById('kid').value;

    // Function to decode base64 and convert to hex
    function base64ToHex(base64Str) {
        // Replace characters for proper base64 decoding
        base64Str = base64Str.replace(/_/g, '/').replace(/-/g, '+');
        const decoded = atob(base64Str);
        let hex = '';
        for (let i = 0; i < decoded.length; i++) {
            hex += decoded.charCodeAt(i).toString(16).padStart(2, '0');
        }
        return hex;
    }

    // Decode the inputs
    const hexKey = base64ToHex(base64Key);
    const hexKid = base64ToHex(base64Kid);

    // Display the decoded results
    document.getElementById('hexKey').textContent = hexKey;
    document.getElementById('hexKid').textContent = hexKid;
});
