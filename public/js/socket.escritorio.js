var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets') {
            alert('No hay tickets para procesar');
            $('small').text(`No hay tickets pendientes`);
            return;
        }
        $('small').text(`Ticket ${resp.numero}`);
    })
})