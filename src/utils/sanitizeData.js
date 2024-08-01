function sanitizeData(data) {
    const seen = new WeakSet();

    function clean(obj) {
        if (obj && typeof obj === 'object') {
            if (seen.has(obj)) {
                return;
            }
            seen.add(obj);

            Object.keys(obj).forEach(key => {
                if (typeof obj[key] === 'object') {
                    clean(obj[key]);
                }
            });

            // Return a plain object with only the necessary properties
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === 'object' ? clean(v) : v]));
        }
        return obj;
    }

    return clean(data);
}

module.exports = sanitizeData;