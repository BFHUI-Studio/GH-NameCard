import express from 'express';
import winston from 'winston';
import session from 'express-session';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import fetch from 'node-fetch'; // Importing fetch
import path from 'path'; // Import path module

const app = express();
const port = 3006;

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

// Configure session
app.use(session({ secret: 'xxx', resave: false, saveUninitialized: true }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure GitHub strategy
passport.use(new GitHubStrategy({
    clientID: 'xxx',
    clientSecret: 'xxx',
    callbackURL: 'xxx'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Serve static files
app.use(express.static('public'));

// Root path to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// GitHub authentication routes
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/'
}), (req, res) => {
    // Successful authentication, redirect to generate with user info
    const name = req.user.name; // GitHub username
    const description = req.user.bio; // You can customize this
    const avatar = req.user._json.avatar_url; // GitHub avatar URL

    // Redirect to the generate endpoint with parameters
    res.redirect(`/generate?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&avatar=${encodeURIComponent(avatar)}`);
});

// Endpoint to generate SVG
app.get('/generate', async (req, res) => {
    const { name, description, avatar } = req.query;

    // Fetch avatar and convert to Base64
    let base64Avatar;
    try {
        const response = await fetch(avatar, {
            method: 'GET',
            headers: {
                "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
            },
            redirect: 'follow'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        base64Avatar = buffer.toString('base64');
    } catch (error) {
        logger.error('Error fetching avatar', { error: error.message, avatar });
        return res.status(500).send('Error fetching avatar: ' + error.message);
    }

    const svg = generateSVG(name, description, `data:image/png;base64,${base64Avatar}`);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);

    // Log the request
    logger.info('SVG generated', { name, description, avatar });
});

// Function to generate SVG
function generateSVG(name, description, avatar) {
    return `
    <svg width="480" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="rgba(255, 255, 255, 0.861)" rx="20" ry="20"/>
        <g transform="translate(40, 10)">
            <rect x="0" y="20" width="140" height="140" rx="20" ry="20" fill="none" stroke="none"/>
            <image href="${avatar}" x="0" y="20" height="140" width="140" clip-path="url(#clip)"/>
            <defs>
                <clipPath id="clip">
                    <rect x="0" y="20" width="140" height="140" rx="20" ry="20"/>
                </clipPath>
            </defs>
            <text x="171" y="85" font-size="35" font-family="Arial" font-weight="bold" fill="black" text-anchor="start">${name}</text>
            <text x="171" y="127" font-size="27" font-family="Arial" fill="gray" text-anchor="start">${description}</text>
        </g>
    </svg>
    `;
}

// Endpoint to view logs
app.get('/logs', (req, res) => {
    res.sendFile(new URL('./logs/app.log', import.meta.url));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
