    // Función para calcular la fase lunar basada en la fecha
    function moonPhase(date) {
        // Convertir la fecha a un número de días desde el año 2000
        var days = (date - new Date(2000, 0, 1)) / (1000 * 60 * 60 * 24);
        // Calcular el ángulo de la luna en radianes
        var angle = (days / 29.53) * Math.PI * 2;
        // Normalizar el ángulo entre 0 y 2π
        angle = angle % (Math.PI * 2);
        if (angle < 0) angle += Math.PI * 2;
        // Devolver la fase lunar como un número entre 0 y 7
        return Math.round(angle / (Math.PI / 4)) % 8;
      }
  
      // Función para mostrar la fase lunar y el consejo según la fecha
      function showMoon(date) {
        // Obtener la fase lunar como un número entre 0 y 7
        var phase = moonPhase(date);
        // Definir los nombres de las fases lunares
        var phaseNames = [
          "Luna nueva",
          "Luna creciente",
          "Cuarto creciente",
          "Gibosa creciente",
          "Luna llena",
          "Gibosa menguante",
          "Cuarto menguante",
          "Luna menguante"
        ];
        // Definir los consejos según la fase lunar
        var phaseAdvices = [
          "No te cortes el cabello hoy, espera a que crezca la luna.",
          "Si te cortas el cabello hoy, crecerá más fuerte.",
          "Si te cortas el cabello hoy, crecerá más fuerte.",
          "Si te cortas el cabello hoy, crecerá más fuerte.",
          "Si te cortas el cabello hoy, crecerá más rápido.",
          "Si te cortas el cabello hoy, crecerá más rápido.",
          "Si te cortas el cabello hoy, crecerá más rápido.",
          "No te cortes el cabello hoy, espera a que decrezca la luna."
        ];
        // Mostrar la fecha en formato dd/mm/yyyy
        var dateStr = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        // Mostrar la fase lunar y el consejo en los elementos correspondientes
        $(".date").text("Fecha: " + dateStr);
        $(".phase").text("Fase lunar: " + phaseNames[phase]);
        $(".advice").text("Consejo: " + phaseAdvices[phase]);
        // Cambiar el fondo de la luna según la fase lunar
        var gradient = "radial-gradient(circle at ";
        switch (phase) {
          case 0: // Luna nueva
            gradient += "50% 50%, #000000, #000000";
            break;
          case 1: // Luna creciente
            gradient += "25% 50%, #ffffff, #000000";
            break;
          case 2: // Cuarto creciente
            gradient += "0% 50%, #ffffff, #000000";
            break;
          case 3: // Gibosa creciente
            gradient += "-25% 50%, #ffffff, #000000";
            break;
          case 4: // Luna llena
            gradient += "50% 50%, #ffffff, #ffffff";
            break;
          case 5: // Gibosa menguante
            gradient += "75% 50%, #ffffff, #000000";
            break;
          case 6: // Cuarto menguante
            gradient += "100% 50%, #ffffff, #000000";
            break;
          case 7: // Luna menguante
            gradient += "125% 50%, #ffffff, #000000";
            break;
        }
        $(".moon").css("background-image", gradient);
      }
  
      // Mostrar la fase lunar y el consejo para la fecha actual
      showMoon(new Date());
  
      // Cambiar la fecha al hacer clic en la luna
      $(".moon").click(function() {
        // Pedir al usuario que ingrese una nueva fecha en formato dd/mm/yyyy
        var input = prompt("Ingrese una nueva fecha en formato dd/mm/yyyy:");
        // Validar que el input no esté vacío
        if (input) {
          // Separar el input por el caracter /
          var parts = input.split("/");
          // Validar que el input tenga tres partes
          if (parts.length == 3) {
            // Convertir las partes a números enteros
            var day = parseInt(parts[0]);
            var month = parseInt(parts[1]);
            var year = parseInt(parts[2]);
            // Validar que los números sean válidos para una fecha
            if (day > 0 && day < 32 && month > 0 && month < 13 && year > 0) {
              // Crear un objeto de fecha con los números ingresados
              var date = new Date(year, month - 1, day);
              // Mostrar la fase lunar y el consejo para la nueva fecha
              showMoon(date);
            } else {
              // Mostrar un mensaje de error si los números no son válidos para una fecha
              alert("La fecha ingresada no es válida.");
            }
          } else {
            // Mostrar un mensaje de error si el input no tiene tres partes
            alert("El formato ingresado no es válido.");
          }
        }
      });