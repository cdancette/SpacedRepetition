echo "Building"

mkdir -p builds
cp -r package.json dist builds/
mkdir builds/node_modules
cp -r node_modules/nedb builds/node_modules
cd builds
zip -r ../${PWD##*/}.nw *
mv ../builds.nw ../spaced-repetition.nw
rm -rf builds/*

