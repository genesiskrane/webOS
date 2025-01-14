const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const app = express();
// HTTPS Redirect
app.use((req, res, next) => {
	if (process.env.NODE_ENV == "production")
		if (req.headers["x-forwarded-proto"] !== "https") {
			return res.redirect(`https://${req.headers.host}${req.url}`);
		}
	next();
});

app.set("trust proxy", true);

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch All
app.all("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server Started @ ${PORT}`));
