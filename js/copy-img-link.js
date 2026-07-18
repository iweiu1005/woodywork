          (function() {
                // UI Elements
                const copyModeButton = document.getElementById('copy-mode-button');
                const tooltip = document.getElementById('copy-tooltip');
                
                // State
                let isCopyModeActive = false;
                let tooltipTimeout;
                
                // Function to copy text to clipboard
                async function copyToClipboard(text) {
                    try {
                        await navigator.clipboard.writeText(text);
                        showTooltip('✅ Link Copied!');
                    } catch (err) {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            showTooltip('✅ Link Copied!');
                        } catch (execErr) {
                            showTooltip('❌ Copy failed. Please try again.');
                            console.error('Copy failed:', execErr);
                        }
                        document.body.removeChild(textArea);
                    }
                }
                
                // Show tooltip message
                function showTooltip(message) {
                    // Clear any existing timeout
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    
                    tooltip.textContent = message;
                    tooltip.classList.add('show');
                    
                    // Hide after 2 seconds
                    tooltipTimeout = setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 2000);
                }
                
                // Enable copy mode
                function enableCopyMode() {
                    isCopyModeActive = true;
                    document.body.classList.add('copy-mode-active');
                    copyModeButton.classList.add('active');
                    copyModeButton.innerHTML = '🖱️ Waiting... Click on a GIF';
                    showTooltip('👆 Now click on any GIF to copy its link');
                }
                
                // Disable copy mode
                function disableCopyMode() {
                    isCopyModeActive = false;
                    document.body.classList.remove('copy-mode-active');
                    copyModeButton.classList.remove('active');
                    copyModeButton.innerHTML = '📋 Copy Image Link';
                }
                
                // Handle image click when in copy mode
                function handleImageClick(event) {
                    // Only proceed if copy mode is active
                    if (!isCopyModeActive) return;
                    
                    // Find the closest image tag (in case user clicks on a parent element)
                    let targetElement = event.target;
                    let imgElement = null;
                    
                    // Check if the clicked element is an image
                    if (targetElement.tagName === 'IMG') {
                        imgElement = targetElement;
                    } else {
                        // Check if there's an image nearby (for cases like <p> containing images)
                        // But we stop propagation to prevent issues
                        return;
                    }
                    
                    // We have an image, get its source
                    if (imgElement && imgElement.src) {
                        // Prevent default behavior (like following a link if image is wrapped in <a>)
                        event.preventDefault();
                        event.stopPropagation();
                        
                        // Copy the image source URL
                        copyToClipboard(imgElement.src);
                        
                        // Disable copy mode after successful copy
                        disableCopyMode();
                    }
                }
                
                // Toggle copy mode when button is clicked
                function toggleCopyMode(event) {
                    // Stop propagation to prevent immediately triggering image click
                    event.stopPropagation();
                    
                    if (isCopyModeActive) {
                        // If already active, clicking the button disables it
                        disableCopyMode();
                        showTooltip('Copy mode cancelled');
                    } else {
                        // Enable copy mode
                        enableCopyMode();
                    }
                }
                
                // Cancel copy mode if user presses Escape key
                function handleKeyPress(event) {
                    if (event.key === 'Escape' && isCopyModeActive) {
                        disableCopyMode();
                        showTooltip('Copy mode cancelled');
                    }
                }
                
                // Prevent copy mode from being triggered when clicking the button itself during active mode
                // But we need to make sure the button click doesn't propagate to the document
                
                // Event Listeners
                copyModeButton.addEventListener('click', toggleCopyMode);
                
                // Add image click handler to the entire document
                document.addEventListener('click', function(event) {
                    if (isCopyModeActive) {
                        handleImageClick(event);
                    }
                });
                
                // Keyboard listener for Escape key
                document.addEventListener('keydown', handleKeyPress);
                
                // Optional: Cancel copy mode if user clicks on empty space (not an image)
                // This is handled by the fact that if no image is clicked, nothing happens
                // but user might want to cancel. We'll let them use Escape or the button.
                
                console.log('📋 Image Link Copier initialized! Click the floating button to start.');
            })();