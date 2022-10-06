#!/bin/sh

cd $1

git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

# git remote remove origin
# git remote add origin $2

git filter-branch --env-filter '

OLD_EMAIL1="litian19901120@gmail.com"
OLD_EMAIL2="alexandru.gherghel@users.noreply.github.com"

NEW_NAME="zyan-dev"
NEW_EMAIL="zyan.dev101@gmail.com"
 
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL1" ] || [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL2" ]
then
export GIT_COMMITTER_NAME="$NEW_NAME"
export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL1" ] || [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL2" ]
then
export GIT_AUTHOR_NAME="$NEW_NAME"
export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi

' --tag-name-filter cat -- --branches --tags

# git push origin master --force

cd ..
