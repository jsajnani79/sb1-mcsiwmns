import { useStudyStore } from '../store/studyStore';
import { Study } from '../types/study';

export function useNavigate() {
  const { studies } = useStudyStore();

  const navigateToStudy = (study: Study) => {
    // Find and click the Studies tab button
    const studiesTab = document.querySelector('button[data-tab="studies"]') as HTMLButtonElement;
    if (studiesTab) {
      studiesTab.click();
      
      // Add a small delay to ensure the studies tab is mounted
      setTimeout(() => {
        // Find the study card and click its "View Details" button
        const studyCard = document.querySelector(`[data-study-id="${study.id}"]`);
        const viewButton = studyCard?.querySelector('[data-action="view"]') as HTMLButtonElement;
        if (viewButton) {
          viewButton.click();
        }
      }, 0);
    }
  };

  return { navigateToStudy };
}