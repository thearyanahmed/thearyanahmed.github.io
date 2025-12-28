## The ProblemShell RC file এর থাকা Secret Token বা API Key কি git এ commit করেন? করলে github/lab এর flag করার কথা। কিছু API key/token shell file এ থাকা লাগে often (কিছু program আছে যেটা environment variable থেকে নিয়ে । আর প্রতিবার env variable pass করা ঝামেলা । Alternative option হলো something like 1password open করে copy paste করা । Not a fan of that.

যেমন, DigitalOcean API গুলোতে curl request দেয়া আছে যেটা **DIGITALOCEAN_TOKEN** নিয়ে কাজ করে । Env এ setup করা থাকলে curl request টা শুধু copy করলেই হয়ে যায়।

আমার বেশ কয়েকবার এরকম হয়েছে যে নতুন environment এ বা ২ টা machine থেকে কাজ করতে গিয়ে .bashrc বা .zshrc file হারিয়ে গেছে । আর তখন ( বা অনেক সময় ) খেয়াল থাকে না কি কি environment variable ছিলো । আবার আগের মত setup এর জন্য একি variable name করতে হয় । যেটা আরেকটা hassle.

At least আমার কাছে hassle. তাই আমি ভাবছিলাম, dot files গুলোর সাথে যদি একটা private file ও commit করা যেতো, যেটাতে আমার secret env variable গুলো থাকবে । কিন্ত value commit করতে চাচ্ছি না ।

## The Solution (kinda)তাই একটা bash script add করেছি, যেটা git এর pre-commit hook এ run করে KEY গুলো রেখে value গুলো strip করে ফেলে । আর commit হলে গেলে, আরেকটা post-commit hook এর মাধ্যমে original value টা আবার restore করে দেয় ।

আর আমার local এ private.original একটা file এ original file টা রেখে দেয়, যেটা থেকে আবার restore করতে পারে । private.original টা .gitignore এ রাখা। So, no keys are pushed to version control.

Not that fancy, but আমার জন্য, একটা problem এর solution. :D

যদি আপনার এরকম কিছুর প্রয়োজন হয়, feel free to take a look the code.

#### Pre-commit hook```
#!/bin/bash

# pre-commit hook
# Set the path to the file you want to process
FILE_PATH="zsh/private"

# Check if the file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "Error: File '$FILE_PATH' not found."
  exit 1
fi

# Check if the file has been modified in the staging area
if ! git diff --cached --name-only | grep -q "$FILE_PATH"; then
  echo "File '$FILE_PATH' not modified. Skipping secret stripping."
  exit 0
fi

# Create a backup of the original file
ORIGINAL_FILE_PATH="private.original"
# backup
cat "$FILE_PATH" > "$ORIGINAL_FILE_PATH"

# Create a temporary file to store the modified content
TEMP_FILE=$(mktemp)

# Process the file line by line
while IFS= read -r line; do
  if [[ "$line" =~ ^[^#]*= ]]; then
    # If the line contains an assignment (key=value), strip the value
    key=$(echo "$line" | cut -d'=' -f1)
    echo "$key=\"\"" >> "$TEMP_FILE"
  else
    # Otherwise, keep the line as it is (comments, empty lines, etc.)
    echo "$line" >> "$TEMP_FILE"
  fi
done < "$FILE_PATH"

# Replace the original file with the modified content
mv "$TEMP_FILE" "$FILE_PATH"

echo "Stripped values in '$FILE_PATH'."

# Add the modified file to the staging area
git add "$FILE_PATH"

echo "Staged stripped secrets."

#Allow the commit to continue. The commit message will be modified after this hook completes.
exit 0
```#### Post-commit hook```
#!/bin/bash

# post-commit hook
FILE_PATH="zsh/private"
ORIGINAL_FILE_PATH="private.original"

if [ -f "$ORIGINAL_FILE_PATH" ]; then
    # Replace instead of concat
    cat "$ORIGINAL_FILE_PATH" > "$FILE_PATH"
    echo "Original private file restored after commit."
else
    echo "Original private file backup not found. Skipping restore."
fi

exit 0
```Test করতে চাইলে ~/.private এ কিছু file value রেখে commit and push দিয়ে দেখতে পারেন। আমার ~/.private এ API_TOKEN set করে push করার পরে https://github.com/thearyanahmed/dotfiles/blob/master/zsh/private

![](https://substackcdn.com/image/fetch/$s_!qTpv!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97756404-a8a7-43f4-8432-c0f5c5c74b8f_1896x1410.png)আর এটা পুশ করার পরে github এ গিয়ে check করলে দেখতে পাচ্ছি

![](https://substackcdn.com/image/fetch/$s_!S5eV!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F55d274b3-8385-4cd7-88a6-f7489961aa73_2402x398.png)আপনার যদি অল্প কিছু env variable থাকে plus একাধিক environment এ কাজ করতে না হয়, তাহলে এই approach unnecessary. আমার কয়েকশো env variable এর মত হয়েছে যেগুলো over the years আমার setup এর জন্য use করি।

Thanks for reading until this bit! Feel free to subscribe for free to receive new posts and support my work.

এছাড়া আমার কিছু dotfiles (shortcuts/alias/functions/settings) এখানে পাবেন

[https://github.com/thearyanahmed/dotfiles](https://github.com/thearyanahmed/dotfiles) । বর্তমানে এটা incomplete. তবে আমি আমার dotfiles গুলো overtime collect করে share করবো inshallah. 

![](https://substackcdn.com/image/fetch/$s_!BAXj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8e7cf956-d717-4484-b836-d596ba8d6263_2602x2898.png)However, আমি কি এটা নিয়ে happy ? পুরোপুরি না। তাই maybe I should build something a bit more … um manageable? 

আমার অন্য কিছু article