echo ...de
call handlebars ./handlebars/de -a -b -e html -f ./www/app/handlebars/de.js

echo ...de-de
call handlebars ./handlebars/de-de -b -a -e html -f ./www/app/handlebars/de-de.js

echo ...en
call handlebars ./handlebars/en -a -b -e html -f ./www/app/handlebars/en.js

echo ... all
call handlebars ./handlebars/all -a -b -e html -f ./www/app/handlebars/all.js

echo ... fertig
