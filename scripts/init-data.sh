#!/bin/bash

mongorestore  --db storytelling-dev --collection slides ../dump/storytelling-dev/slides.bson
mongorestore  --db storytelling-dev --collection images ../dump/storytelling-dev/images.bson

mongorestore  --db storytelling --collection slides ../dump/storytelling-dev/slides.bson
mongorestore  --db storytelling --collection images ../dump/storytelling-dev/images.bson
