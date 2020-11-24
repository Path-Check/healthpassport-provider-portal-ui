# Health Passport Health Provider Portal React UI

This is a React interface for a Health Provider portal to manage and sign Vaccination Certificates. 

The API part is [here](https://github.com/vitorpamplona/healthpassport-provider-portal-api). 
A Demo hot deployed from staging is [here](https://healthpassport.vitorpamplona.com/). 

<img src="./docs/ProviderPortalPreview.png" data-canonical-src="./docs/ProviderPortalPreview.png"/>

## Behaviour

1. Health Provider Signs UP for the service. 
2. Health Provider creates a Vaccination Program. 
3. Health Provider generates a QR code, prints and places it visible for patients to scan. 

4. Patiens scan the QR Code after testing. 
5. QR Code takes patients to this portal, where. 
5.1. Users add their name to the certificate
5.2. Press button to generate and download. 
5. Portal generates que QR code text, signs and starts downloading the QR code with the Vaccine Certification. 

6. Users load on their signed certificate to the [Health Passport Reader app](https://github.com/vitorpamplona/healthpassport-reader-app). 

## Features / TO-DO List

- [x] Health Provider Sign Up
- [x] Health Provider Login 
- [x] Home Page
- [x] New Vaccination Programs
- [x] Listing Vaccination Programs on Home Page
- [x] Make VaccinationPrograms belong to a user and properly filter in the UI.
- [x] Must be logged in to access VaccinationPrograms 
- [x] Generate and Sign Vaccination Program QR Code to Print
- [x] Accept patient access to ask for their Name and sign the QR Code with Provider's Primary Key
- [x] Generate and Download Patient's signed Certificate. 
- [x] Make sure the Home Page is only accessible when Signed in
- [x] Sign the Vaccination Program QR Code on the server
- [x] Sign the Certificate of Vaccination QR Code on the server
- [x] User's public key download
- [x] Percent-encoding and Base64 for signatures
- [x] Staging deployed [here](https://healthpassport.vitorpamplona.com/)
- [ ] Add Logout Route
- [ ] Health Provider's Password recovery (Forgot My Password logic)
- [ ] Edit Vaccination Program
- [ ] Dockerize it
- [ ] Reduce amount of data on QRCodes

## Running

Make sure you have everything you need to run a React service. 

Install modules:
`yarn install`

Start UI
`yarn start`

## Staging Server

This project is deployed to [https://healthpassportprovider.herokuapp.com/](https://healthpassportprovider.herokuapp.com/) at every commit. 