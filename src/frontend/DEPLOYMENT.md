# Deployment Checklist for RashidaAi Bootcamp Landing Page

This document provides a step-by-step checklist for deploying the RashidaAi bootcamp landing page to production and verifying that all critical flows work correctly on the live URL.

## Pre-Deployment Checklist

### 1. Build Verification
- [ ] Run `npm run build` locally to ensure the frontend builds without errors
- [ ] Verify that all assets are correctly referenced in the build output
- [ ] Check that the `dist/` directory contains all expected files
- [ ] Confirm that environment configuration (`env.json`) is properly copied to `dist/`

### 2. Asset Verification
- [ ] Verify all generated assets are present in `frontend/public/assets/generated/`:
  - `rashidaai-logo.dim_512x512.png`
  - `rashidaai-hero-bg.dim_1920x1080.png`
  - `rashidaai-favicon.dim_64x64.png`
  - `rashidaai-chat-icon.dim_256x256.png`
- [ ] Confirm favicon is correctly linked in `index.html`
- [ ] Test that images load correctly in local build preview

### 3. Backend Canister Verification
- [ ] Ensure backend canister is deployed and running
- [ ] Verify canister ID is correctly configured in frontend
- [ ] Test backend connectivity with `dfx canister call backend getWaitlist`
- [ ] Confirm access control system is initialized

## Deployment Steps

### 1. Deploy to Internet Computer
