const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { authenticateToken } = require("./middlewares/auth");

const app = express();

app.use(cors());

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5005",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
  }),
);

// Cours proxy
app.use(
  "/api/cours",
  authenticateToken,
  createProxyMiddleware({
    target: "http://localhost:5006",
    changeOrigin: true,
    pathRewrite: {
      "^/api/cours": "", 
    },
  }),
);

app.use(
  "/api/feedback",
  authenticateToken,
  createProxyMiddleware({
    target: "http://localhost:5007",
    changeOrigin: true,
    pathRewrite: {
      "^/api/feedback": "", 
    },
  }),
);
const PORT = process.env.PORT_GATEWAY || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
