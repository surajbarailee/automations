chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "startClicking") {
        alert("Starting");

        // Define a function to handle the payment process
        function processPayment() {
            return new Promise((resolve, reject) => {
                const paymentButton = document.querySelector("#es-payment-proceed");
                if (paymentButton) {
                    paymentButton.click();

                    // Wait for 1 second (1000 milliseconds) to allow the page to update
                    setTimeout(() => {
                        const payButton = document.querySelector(
                            ".btn.btn-confirm.ng-binding.ng-scope"
                        );
                        if (payButton) {
                            payButton.click();

                            // Wait for payment to process (adjust timing if needed)
                            setTimeout(() => {
                                // Simulate going back in history
                                window.history.back();
                                
                                // Wait before resolving the promise to ensure navigation completes
                                setTimeout(() => {
                                    resolve();
                                }, 2000); // Example: Wait 2 seconds before resolving
                            }, 2000); // Example: Wait 2 seconds for payment processing
                        } else {
                            alert("Pay via esewa button not found");
                            resolve();
                        }
                    }, 1000); // Adjust the delay time as needed
                } else {
                    alert("Proceed button not found.");
                    resolve();
                }
            });
        }

        // Function to start the loop
        async function startClickLoop(loopCount) {
            for (let i = 1; i <= loopCount; i++) {
                await processPayment();
            }
        }

        // Start the loop initially
        startClickLoop(message.loops);
    }
});
