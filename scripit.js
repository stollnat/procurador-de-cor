const colorPicker = document.getElementById('colorPicker');
const hexValue = document.getElementById('hewValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');

colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    hexValue.textContent = color;

    // Convert HEX to RGB 
    const rgb = hexToRgb(color);
    rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    // Convert RGB to HSL
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
});

// Função para converter HEX para RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Função paa converter RGB para HSL 
function rgbToHsl(r, g, b) {
    r /=255, g/=255, b/=255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d +  2; break;
            case b: h = (r - g) / d +  4; break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}