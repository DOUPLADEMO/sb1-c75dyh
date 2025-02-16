import { jsPDF } from 'jspdf';

export async function downloadAsPDF(story: string, imageUrl?: string) {
  const pdf = new jsPDF();

  // Add title
  pdf.setFontSize(20);
  pdf.text('Bedtime Story', 20, 20);

  // Add image if exists
  if (imageUrl) {
    try {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      pdf.addImage(img, 'JPEG', 20, 30, 170, 100);
    } catch (error) {
      console.error('Failed to add image to PDF:', error);
    }
  }

  // Add story text
  pdf.setFontSize(12);
  const splitText = pdf.splitTextToSize(story, 170);
  pdf.text(splitText, 20, imageUrl ? 140 : 40);

  // Save the PDF
  pdf.save('bedtime-story.pdf');
}

export async function shareStory(story: string) {
  // First try the native share API
  if (navigator.share && navigator.canShare) {
    const shareData = {
      title: 'Bedtime Story',
      text: story,
    };

    if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (!(error instanceof Error) || error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  }

  // If native sharing is not available or fails, try clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(story);
      alert('Story copied to clipboard!');
      return;
    } catch (error) {
      console.error('Clipboard API failed:', error);
    }
  }

  // Fallback to legacy clipboard method
  try {
    const textarea = document.createElement('textarea');
    textarea.value = story;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (successful) {
      alert('Story copied to clipboard!');
    } else {
      throw new Error('Copy command failed');
    }
  } catch (error) {
    console.error('Legacy clipboard method failed:', error);
    alert('Unable to share or copy the story. Please try selecting and copying the text manually.');
  }
}