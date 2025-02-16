export default {
  title: "Magical Bedtime Stories",
  subtitle: "Create personalized bedtime stories for your little ones. Just tell us a few details, and we'll craft a magical tale perfect for sweet dreams.",
  actions: {
    download: "Download PDF",
    share: "Share Story"
  },
  form: {
    mainCharacter: "Main Character Details",
    characterName: "Character Name",
    age: "Age",
    gender: {
      label: "Gender",
      options: {
        select: "Select gender...",
        male: "Male",
        female: "Female",
        nonBinary: "Non-binary",
        notSpecify: "Prefer not to specify"
      }
    },
    characterType: {
      label: "Type of Character",
      options: {
        select: "Select type...",
        human: "Human",
        animal: "Animal",
        robot: "Robot",
        fairy: "Fairy",
        other: "Other"
      }
    },
    personalityTraits: {
      label: "Personality Traits (Optional)",
      placeholder: "e.g., Brave, curious, funny"
    },
    setting: {
      title: "Story Setting",
      label: "Story Setting",
      placeholder: "e.g., Magical forest, outer space"
    },
    specialLocations: {
      label: "Special Locations (Optional)",
      placeholder: "e.g., Candy castle, hidden cave"
    },
    storyElements: {
      title: "Story Elements",
      type: {
        label: "Type of Story",
        options: {
          select: "Select type...",
          adventure: "Adventure",
          friendship: "Friendship",
          overcomingFear: "Overcoming Fear",
          mystery: "Mystery",
          other: "Other"
        }
      },
      tone: {
        label: "Story Tone",
        options: {
          select: "Select tone...",
          funny: "Funny",
          calm: "Calm",
          exciting: "Exciting",
          mysterious: "Mysterious",
          other: "Other"
        }
      }
    },
    morals: {
      label: "Lessons or Morals (Optional)",
      placeholder: "e.g., Kindness, bravery, teamwork"
    },
    magicalElements: {
      label: "Magical Elements (Optional)",
      placeholder: "e.g., Flying, invisibility, talking animals"
    },
    challenges: {
      label: "Challenges or Obstacles (Optional)",
      placeholder: "e.g., Lost treasure, a puzzle to solve"
    },
    personalDetails: {
      title: "Personal Details",
      hobbies: {
        label: "Hobbies or Interests (Optional)",
        placeholder: "e.g., Loves drawing, playing soccer"
      },
      realReferences: {
        label: "Real People or Pets to Reference (Optional)",
        placeholder: "e.g., Include my dog, Bella, as a character"
      }
    },
    preferences: {
      title: "Story Preferences",
      length: {
        label: "Story Length",
        options: {
          select: "Select length...",
          short: "Short (~5 minutes)",
          medium: "Medium (~10 minutes)",
          long: "Long (15+ minutes)"
        }
      },
      illustration: {
        label: "Illustration Style",
        options: {
          select: "Select style...",
          bright: "Bright and Colorful",
          dreamy: "Dreamy and Soft",
          other: "Other"
        }
      }
    },
    additionalNotes: {
      label: "Additional Notes (Optional)",
      placeholder: "Any other special requests or details you'd like to include?"
    },
    submit: {
      generating: "Creating Story...",
      generate: "Generate Story"
    }
  },
  history: {
    title: "Previous Stories",
    storyTitle: "{{name}}'s Story"
  }
};