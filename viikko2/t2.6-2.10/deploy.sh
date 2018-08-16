#!/bin/sh
npm run build
rm -rf ~/fullstackBE/puhelinluetteloBackend/build
cp -r build ~/fullstackBE/puhelinluetteloBackend
