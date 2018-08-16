#!/bin/sh
npm run build
rm -rf ~/fullstackopen/puhelinluetteloBackend/build
cp -r build ~/fullstackopen/puhelinluetteloBackend
