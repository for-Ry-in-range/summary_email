const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.error("PRINTING SOMETHING")
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta ante id nulla viverra mollis. Etiam sed est quis augue ultrices lacinia. Etiam et elit et eros dictum auctor a et metus. Curabitur sodales est nec dolor hendrerit suscipit in sit amet quam. Sed id commodo mauris, fermentum tincidunt orci. Quisque efficitur erat ut nunc pellentesque, sed dignissim augue auctor. Quisque at dignissim tellus, sed lacinia nisi. Morbi nisl diam, aliquam vitae lacus et, egestas fermentum tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce at quam a nisi bibendum ultricies eget non nunc.</p>
    </main>
  );
}