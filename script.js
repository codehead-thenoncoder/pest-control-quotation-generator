document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quotationForm');
    const servicesContainer = document.getElementById('servicesContainer');
    const addServiceBtn = document.getElementById('addService');
    const previewSection = document.getElementById('previewSection');
    const newQuotationBtn = document.getElementById('newQuotation');
    
    // Add new service row
    addServiceBtn.addEventListener('click', function() {
        const newService = document.querySelector('.service-item').cloneNode(true);
        newService.querySelectorAll('input').forEach(input => input.value = '');
        servicesContainer.appendChild(newService);
        
        // Add event listener to remove button
        newService.querySelector('.removeService').addEventListener('click', function() {
            if (document.querySelectorAll('.service-item').length > 1) {
                newService.remove();
            } else {
                alert('At least one service is required.');
            }
        });
    });
    
    // Initialize remove button for the first service
    document.querySelector('.removeService').addEventListener('click', function() {
        alert('At least one service is required.');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateQuotation();
    });
    
    // New quotation button
    newQuotationBtn.addEventListener('click', function() {
        previewSection.classList.add('hidden');
        form.reset();
        // Ensure at least one service row exists
        while (servicesContainer.children.length > 1) {
            servicesContainer.removeChild(servicesContainer.lastChild);
        }
    });
    
    function generateQuotation() {
        // Collect form data
        const formData = {
            companyInfo: {
                name: document.getElementById('companyName').value,
                address: document.getElementById('serviceAddress').value,
                mobile: document.getElementById('mobileNumber').value,
                email: document.getElementById('email').value,
                gstin: document.getElementById('gstin').value
            },
            services: [],
            remarks: document.getElementById('remarks').value,
            validity: document.getElementById('validity').value
        };
        
        // Collect services
        document.querySelectorAll('.service-item').forEach(item => {
            formData.services.push({
                type: item.querySelector('.serviceType').value,
                area: item.querySelector('.serviceArea').value,
                frequency: item.querySelector('.serviceFrequency').value,
                amount: item.querySelector('.serviceAmount').value
            });
        });
        
        // Calculate total
        const total = formData.services.reduce((sum, service) => sum + parseFloat(service.amount || 0), 0);
        formData.total = total.toFixed(2);
        
        // Generate PDF
        generatePDF(formData);
        
        // Show preview section
        previewSection.classList.remove('hidden');
    }
    
    // Set today's date in the format needed for the quotation
    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Generate a random quote ID
    function generateQuoteId() {
        const now = new Date();
        return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${Math.floor(Math.random() * 1000)}`;
    }
});