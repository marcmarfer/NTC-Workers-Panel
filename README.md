# NTC Workers Panel

`NTC-Workers-Panel` es una aplicación web desarrollada para los trabajadores del taller NTC.  
Su propósito es conectar con el backend principal (`NTC-Dashboard`) para que los trabajadores puedan gestionar en tiempo real las órdenes de reparación de vehículos.

La aplicación permite a los operarios:

- Visualizar las órdenes de reparación activas asignadas.
- Cambiar de forma sencilla el estado de cada reparación (en recepción, diagnóstico, en reparación, finalizado).
- Mantener actualizado el seguimiento del cliente, ya que cada cambio de estado actualiza la información y envía correos automáticos de seguimiento.
- Notificar al cliente cuando su vehículo está listo para ser recogido.

La app está construida con Vue 3 + Vite, usa **axios** para la comunicación con el backend mediante API REST y está desplegada en un VPS propio.  
El acceso está protegido por login, validando al usuario único de integración mediante **JWT** gestionado en el backend.

En resumen, `NTC-Workers-Panel` es la interfaz operativa que simplifica el trabajo en taller, agiliza las actualizaciones internas y mantiene informados a los clientes durante todo el proceso de reparación.
