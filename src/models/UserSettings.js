const mongoose = require('mongoose');

const userSettingsSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  sidebarPinned: { type: Boolean, default: false },
  networkListsSettings: {
    all: {
      name: { type: String, default: 'all' },
      view: { type: String, default: 'th' },
      isOpen: { type: Boolean, default: true }
    },
    favorite: {
      name: { type: String, default: 'favorite' },
      view: { type: String, default: 'th-large' },
      isOpen: { type: Boolean, default: true }
    },
    filtered: {
      name: { type: String, default: 'filtered' },
      view: { type: String, default: 'list' },
      isOpen: { type: Boolean, default: true }
    },
    other: {
      name: { type: String, default: 'other' },
      view: { type: String, default: 'th' },
      isOpen: { type: Boolean, default: true }
    }
  },
  filters: { type: Array, default: [] },
  favorites: { type: Array, default: [] }
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
