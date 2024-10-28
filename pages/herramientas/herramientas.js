fetch('datacedears.json') 
.then(response => {
    if (!response.ok) {
        alert('No se pudieron cargar los datos. Por favor, inténtelo de nuevo más tarde.');
        return;
    }
    return response.json();
})
.then (data => {
    const tbody = document.querySelector('.tablebody-cedears');

    //Cargar los datos en la Table
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.ticker}</td>
                         <td>${item.company}</td>
                         <td>${item.ratio}</td>`;
        tbody.appendChild(row);
    });

    //Function para Filtrar en la Table
    function filtrarTable () {
        const textSearch = document.getElementById('buscador-ratios').value.toLowerCase();
        const filas = document.querySelector('.tablebody-cedears').getElementsByTagName('tr');

        for (let i = 0;  i < filas.length; i++){
            const fila  = filas[i];
            const ticker = fila.getElementsByTagName('td')[0].textContent.toLocaleLowerCase();
            const companyName = fila.getElementsByTagName('td')[1].textContent.toLocaleLowerCase();


            if (ticker.includes(textSearch) || companyName.includes(textSearch)){
                fila.style.display = '';
            }else {
                fila.style.display = "none";
            }
        }
    
    }
    document.getElementById('buscador-ratios').addEventListener('input', filtrarTable);
}).catch(error => {
    alert('Ocurrió un error al cargar los datos. Por favor, inténtelo de nuevo más tarde.', error);
});
