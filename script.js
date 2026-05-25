document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // RESPONSIVE MOBILE NAVIGATION EXPANSION TOGGLE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon bars vs close mark
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close dropdown securely if an external content layer is focused
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // ==========================================================================
    // FUNCTIONAL CALENDAR GRID GENERATION MODULE
    // ==========================================================================
    const monthYearLabel = document.getElementById('calendarMonthYear');
    const datesGrid = document.getElementById('calendarDatesGrid');
    const prevBtn = document.getElementById('prevMonthBtn');
    const nextBtn = document.getElementById('nextMonthBtn');

    if (monthYearLabel && datesGrid && prevBtn && nextBtn) {
        // Base state variables initialized around standard parameters (e.g., May 2026)
        let currentDate = new Date(2026, 4, 1); 

        const monthNames = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        const renderCalendar = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            // Clear absolute structural grid frame contents
            datesGrid.innerHTML = '';

            // Assign standard month view header titles
            monthYearLabel.textContent = `${monthNames[month]} ${year}`;

            // Calculate bounding week positioning calculations
            const firstDayIndex = new Date(year, month, 1).getDay();
            const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

            // Create structural padding layout blocks for empty leading week grid blocks
            for (let i = 0; i < firstDayIndex; i++) {
                const emptyCell = document.createElement('li');
                emptyCell.classList.add('empty');
                datesGrid.appendChild(emptyCell);
            }

            // Generate structural interactive list item elements for monthly dates
            for (let day = 1; day <= totalDaysInMonth; day++) {
                const dateCell = document.createElement('li');
                dateCell.textContent = day;

                // Simple baseline interaction callback assigning selection styling
                dateCell.addEventListener('click', () => {
                    const previouslyActive = datesGrid.querySelector('.active');
                    if (previouslyActive) previouslyActive.classList.remove('active');
                    dateCell.classList.add('active');
                });

                datesGrid.appendChild(dateCell);
            }
        };

        // Monthly pagination step control overrides
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // Initialize display composition sequence pipeline
        renderCalendar();
    }

    // ==========================================================================
    // INTAKE FORM INTERCEPT HANDLER VALIDATION
    // ==========================================================================
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedDateCell = document.querySelector('#calendarDatesGrid .active');
            const selectedDateString = selectedDateCell ? selectedDateCell.textContent : 'Unspecified';
            const clientName = document.getElementById('name').value;

            alert(`Thank you, ${clientName}! Your inquiry has been securely submitted. Selected Tour Date: ${monthYearLabel.textContent.trim()} ${selectedDateString}. Our team will contact you shortly.`);
            bookingForm.reset();
            
            // Clear selection active tags safely
            if (selectedDateCell) selectedDateCell.classList.remove('active');
        });
    }
});