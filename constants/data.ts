import { type IconButtonProps } from "@/components/themed/IconButton";

export type StoryProfile = {
  id: string;
  age?: string;
  name?: string;
  interests?: string;
  icon?: IconButtonProps["icon"] | "";
};

export type StoryProfiles = typeof DEFAULT_PROFILES;

export const DEFAULT_TITLE = "Finny's Underwater Race";

export const DEFAULT_STORY =
  "Once upon a time in a vibrant underwater city, there was a little race car named Finny. Finny wasn’t like other cars; he had a special ability to swim like a fish! He loved zipping through the water, racing the colorful fish and exploring coral mazes.\n" +
  "\n" +
  "One day, Finny heard about the Great Seabed Race, where all sorts of sea creatures and swimming cars competed to find the Sunken Pearl. Finny was thrilled and decided to join. He revved his engines and dove into the deep, blue sea.\n" +
  "\n" +
  "As he swam, he made friends with a clever clownfish named Coral and a strong dolphin named Dash. Together, they navigated through kelp forests and dodged giant jellyfish. Finally, they reached the glittering pearl, guarded by a sleepy octopus.\n" +
  "\n" +
  "Finny used his quick wheels to create a swirl of sand that gently woke the octopus without scaring it. Grateful for the gentle wake-up, the octopus allowed them to take the Sunken Pearl.\n" +
  "\n" +
  "Finny, Coral, and Dash returned to the city as heroes. From that day on, Finny was not just known as the fastest swimming car, but also the kindest. Every night, under the shimmering moonlight, he'd tell stories of the deep sea to his new friends, sharing adventures and dreams. And so, Finny’s underwater races continued, filled with friendship, fun, and the joy of discovery.";

export const DEFAULT_PROFILES: Array<StoryProfile> = [
  {
    id: "1",
    age: "8",
    name: "Matt",
    interests: "Toys, Trucks and Mountains",
    icon: "toys",
  },
  {
    id: "2",
    age: "15",
    name: "Alice",
    interests: "Science, Experiments and Explosions",
    icon: "smart-toy",
  },
  {
    id: "3",
    age: "5",
    name: "José",
    interests: "Castles, Knights, Fights",
    icon: "castle",
  },
];
