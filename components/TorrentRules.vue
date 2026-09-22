<template>
  <div class="space-y-4">
    <div 
      v-for="(section, sIndex) in rules" 
      :key="sIndex" 
      class="rules-section"
    >
      <!-- Section Header -->
      <div class="rules-header">
        {{ section.section }}
      </div>

      <!-- Rules List -->
      <div class="rules-body">
        <div 
          v-for="(item, rIndex) in section.items" 
          :key="rIndex" 
          class="rule-item"
        >
          <span class="arrow-icon">➤</span>
          <span v-html="item"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TorrentRules",
  data() {
    return {
      rules: [
        {
          section: "General Rules",
          items: [
            "All torrents need to be well seeded by the uploader for at least 24 hours.",
            "Adding links to direct downloads or similar services is forbidden.",
            "Add only torrents that have a description with a minimum of one visible picture or a screenshot.",
            "Make sure that all the files associated with the torrent are real and virus-free.",
            "No spam torrents will be allowed here. (This includes spammy links in descriptions and image hosts with too many popups/ads)",
            "If you are sharing other uploaders’ work check if they have an account here and/or ask for permission.",
            "Do not mislabel your files. (This includes labeling CAMs as DVDScrs)",
            "Upload only files you are capable of seeding. (If your PC isn’t on 24h or If you have slow upload speed please refrain from uploading large files)",
            "Be sure to search to see if the torrent you’re uploading already exists."
          ]
        },
        {
          section: "Adult Rules",
          items: [
            "Absolutely no child porn, animal porn or midget porn.",
            "Please do not use image hosts that have too many popups and ads.",
            "You must have at least one visible screenshot or picture in the description.",
            "Have some class, don’t upload things that would make you feel embarrassed if someone caught you watching them."
          ]
        },
        {
          section: "Final Note",
          items: [
            "The quickest and easiest way to get help and support is by using the <a href='#' class='chat-link'>chat-room</a>. Feel free to message staff on site as well.",
            "Please use the report button to report a bad torrent and not the contact form.",
            "Do not use the report button to send us movie reviews and such.",
            "Please refrain from spamming and posting potentially malicious offsite links in comments.",
            "Ps. Breaking any of the rules will result in your account being banned.",
            "Sharing is caring!",
            "Ps, break one of rules and you WILL get BANNED, no questions asked."
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.rules-container {
  width: 100%;
  margin: auto;
  
  font-family: Arial, sans-serif;
}

.rules-section {
  border: 1px solid #886767;

}

.rules-header {
  background-color: #333;
  color: white;
  padding: 10px;
  font-weight: bold;
}

.rules-body {
  padding: 10px;
  background-color: #614444;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.arrow-icon {
  color: red;
  margin-right: 10px;
  font-size: 14px;
  line-height: 1.4;
}

.chat-link {
  color: #335b75;
  text-decoration: none;
}
.chat-link:hover {
  text-decoration: underline;
}
</style>
