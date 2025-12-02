// Survey Accordion Logic
document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.survey-question');
    const progressFill = document.querySelector('.survey-progress-fill');
    const progressText = document.querySelector('.survey-progress-text');
    const totalQuestions = questions.length;
    let completedQuestions = 0;

    // Initialize: All questions closed by default

    // Toggle question accordion
    questions.forEach((question, index) => {
        const header = question.querySelector('.survey-question-header');
        const nextBtn = question.querySelector('.survey-next');

        header.addEventListener('click', function() {
            // Close all other questions
            questions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                }
            });

            // Toggle current question
            question.classList.toggle('active');
        });

        // Handle "Siguiente" button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                // Mark as completed
                if (!question.classList.contains('completed')) {
                    question.classList.add('completed');
                    completedQuestions++;
                    updateProgress();
                }

                // Close current and open next
                question.classList.remove('active');
                if (index < questions.length - 1) {
                    questions[index + 1].classList.add('active');
                    // Scroll to next question
                    questions[index + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }

        // Auto-mark as completed when user selects an option
        const inputs = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // For radio buttons, mark as completed immediately
                if (input.type === 'radio') {
                    setTimeout(() => {
                        if (!question.classList.contains('completed')) {
                            question.classList.add('completed');
                            completedQuestions++;
                            updateProgress();
                        }
                    }, 300);
                }
            });
        });
    });

    // Limit checkbox selection to 3 for modules question
    const modulesQuestion = document.querySelector('[data-question="4"]');
    if (modulesQuestion) {
        const moduleCheckboxes = modulesQuestion.querySelectorAll('input[type="checkbox"]');
        moduleCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedCount = modulesQuestion.querySelectorAll('input[type="checkbox"]:checked').length;
                if (checkedCount > 3) {
                    this.checked = false;
                    alert('Solo puedes seleccionar hasta 3 módulos');
                }
            });
        });
    }

    function updateProgress() {
        const percentage = (completedQuestions / totalQuestions) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${completedQuestions} de ${totalQuestions} completadas`;
    }

    // Update form submission to include survey data
    const form = document.getElementById('waitlistForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect all survey data
            const formData = {
                name: document.getElementById('waitlistName').value,
                email: document.getElementById('waitlistEmail').value,
                barriers: Array.from(document.querySelectorAll('input[name="barriers"]:checked')).map(cb => cb.value),
                pricing: document.querySelector('input[name="pricing"]:checked')?.value || '',
                approach: document.querySelector('input[name="approach"]:checked')?.value || '',
                modules: Array.from(document.querySelectorAll('input[name="modules"]:checked')).map(cb => cb.value)
            };

            console.log('Survey Data:', formData);

            // TODO: Send to your backend/EmailJS with survey data
            // For now, just show success message
            alert('¡Gracias! Te hemos agregado a la lista de espera.');
            form.reset();
            completedQuestions = 0;
            updateProgress();
            questions.forEach(q => q.classList.remove('completed', 'active'));
            if (questions.length > 0) {
                questions[0].classList.add('active');
            }
        });
    }
});
