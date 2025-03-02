interface TallyWidget {
  loadEmbeds: () => void;
}

declare global {
  interface Window {
    Tally: TallyWidget;
  }
}
