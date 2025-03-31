# Transaction Explorer Challenge
---

## About

SPA de pagos recibidos por ventas realizadas.

## Functionalities

- Sidebar: menú lateral con opciones para navegar por la app (Inicio, Métricas).
- Dashboard: pantalla principal con información sobre los pagos recibidos teniendo 3 tipos de vista (Diario, Semanal, Mensual) y además con filtros para poder obtener los datos por fecha, método de pago, método de cobro, rango de monto y cuotas.
- Métricas: pantalla con métricas de pagos recibidos. Actualmente solo muestra el método de pago y el monto total por tarjeta permitiendo filtrar por mes.


---

### Screenshot

![Home](/print-home.png)

### Technologies

---

Tecnologías usadas en el proyecto:

- [React](https://es.reactjs.org/): Version "^19.0.0"
- [Next.js](https://nextjs.org/): Version "15.2.4"
- [Recharts](https://recharts.org/en-US/): Version "^2.15.1"
- [React Hook Form](https://react-hook-form.com/): Version "^7.54.2"
- [Tailwind CSS](https://tailwindcss.com/): Version "^4"
- [Jest](https://jestjs.io/): Version "^29.7.0"
- [TypeScript](https://www.typescriptlang.org/): Version "^5"
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): Version "^14.2.1"
- [React Range](https://react-range.netlify.app/): Version "^1.10.0"

### Instalation

```
git clone https://github.com/melicasasco/transaction-explorer.git
yarn install 
yarn dev

```

### Estructura de carpetas
```
src/
├── app/
│   ├── api/
│   │   └── fetcherst.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardClient.tsx
│   │   │   └── DateRangeModal.tsx
│   │   ├── filters/
│   │   │   ├── FilterSidebar.tsx
│   │   │   ├── DateFilter.tsx
│   │   │   ├── CardFilter.tsx
│   │   │   ├── InstallmentsFilter.tsx
│   │   │   ├── AmountFilter.tsx
│   │   │   └── MethodsFilter.tsx
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   └── Avatar.tsx
│   │   ├── metrics/
│   │   │   └── MetricClient.tsx
│   │   ├── tabs/
│   │   │   └── Tabs.tsx
│   │   └── transactions/
│   │       ├── TransactionItem.tsx
│   │       └── Transactions.tsx
│   ├── context/
│   │   └── DataFilterContext.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── metris/
│   │   └── page.tsx
│   ├── hooks/
│   │   ├── useFinalFilteredTransactions.tsx
│   │   ├── useUpdateFiltersFromSearchParams.tsx
│   │   ├── useResponsive.tsx
│   │   ├── useDownloadCsv.tsx
│   │   ├── onMousseEvent.tsx
│   │   └── useDateFormatter.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       ├── transaction.ts
│       ├── filterFormData.ts
│       └── toggleActivation.ts
```



## Arquitectura Utilizada

- **Component-Based:**  
  La aplicación está construida con componentes React y Next.js. La UI se separa en componentes modulares (dashboard, filtros, layout) para favorecer la reutilización y facilitar el mantenimiento.

- **Gestión de Estado Global:**  
  Se utiliza un Context (DataFilterContext) para centralizar el estado de datos y filtros, evitando el "prop drilling" y permitiendo que múltiples componentes consuman y actualicen la información.

- **Hooks Personalizados:**  
  Se crean hooks propios (como `useFinalFilteredTransactions`, `useUpdateFiltersFromSearchParams`, `useResponsive` y `useDownloadCsv`) para encapsular la lógica de negocio y de UI. Esto mejora la legibilidad y la reutilización del código.

- **Formularios con react-hook-form:**  
  El manejo de formularios se realiza con react-hook-form, facilitando la validación y gestión de los datos ingresados en los filtros.

## Decisiones Técnicas

- **Uso de Next.js y React:**  
  Se eligió Next.js para aprovechar el SSR y la estructura de carpetas, combinándolo con React para una UI dinámica y modular.

- **Context API para Estado Global:**  
  Se utilizó Context API para centralizar la data y los filtros, facilitando la comunicación entre componentes (por ejemplo, FilterSidebar y DashboardClient) sin necesidad de pasar props extensivamente.

- **Hooks Personalizados:**  
  La creación de hooks personalizados permite aislar la lógica compleja (filtrado, manejo de ventanas, etc.) y reutilizarla en distintas partes del proyecto.

- **react-hook-form:**  
  Se eligió esta librería por su rendimiento y facilidad para trabajar con validaciones y formularios complejos.

## Posibles Mejoras a Futuro

- **Testing y Validación:**  
  Ampliar la cobertura de tests unitarios e integración, especialmente para los hooks y contextos.

- **Mejora en la Gestión de Errores:**  
  Incorporar manejo de errores y feedback al usuario, especialmente en la carga y actualización de datos (por ejemplo, en la llamada a la API).

- **Uso de Variables de Entorno:**  
  Configurar y utilizar variables de entorno para definir la URL de la API y otros parámetros sensibles, facilitando la administración de diferentes entornos (desarrollo, staging, producción) y mejorando la seguridad del proyecto.

- **Uso de la Librería shadcn:**  
  Adoptar la librería shadcn de forma consistente en toda la aplicación para mantener coherencia visual y funcional en los componentes de la UI (por ejemplo, botones, diálogos, etc.). Actualmente se está utilizando parcialmente, por lo que su integración completa optimizará la experiencia del usuario y acelerará el desarrollo de nuevas funcionalidades.

- **Obtención de la Data desde Componentes ServerSide:**  
  Implementar la obtención de la data en un componente del lado del servidor y pasarla al contexto global. Esto unificaría las llamadas a la API, evitando duplicidad y garantizando que todos los componentes consuman la misma fuente de datos actualizada, mejorando así el rendimiento y la consistencia de la aplicación.


### Authors


> Melanie Casasco
> www.linkedin.com/in/melanie-casasco/ 
