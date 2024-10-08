export const dict = {
  nav: {
    home: "Inicio",
    transactions: "Transacciones",
    investments: "Inversiones",
    market: "Mercado",
    dashboard: "Reporte",
    accounts: "Cuentas",
    settings: "Ajustes",
    installments: "Pagos Recurrentes",
    footer: "Aplicación creada por Julian Prieto",
    notFound: {
      title: "Not Found",
      action: "Volver al Inicio",
    },
  },
  actions: {
    create: "Crear",
    edit: "Editar",
    delete: "Borrar",
  },
  auth: {
    login: "Iniciar sesión",
    secondaryLogin: "Iniciar sesión con cuentas externas",
    logout: "Cerrar sesión",
  },
  filters: {
    account: "Cuenta",
    category: "Categoría",
    date: "Fecha",
    month: "Mes",
  },
  transactions: {
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",
  },
  settings: {
    userInfo: "Información de Usuario",
    session: "Sesión",
    dangerZone: "Zona de Peligro",
    options: {
      clearHistory: {
        button: "Eliminar historia",
        title: "Eliminar todas las transacciones.",
        description: "Se eliminaran todas las transacciones de esta cuenta.",
      },
      deleteUser: {
        button: "Eliminar usuario",
        title: "Eliminar usuario",
        description: "Se eliminará TODO. Esta accion es irreversible.",
      },
      userInfo: {
        name: "Nombre",
        editName: "Editar nombre",
        email: "Email",
        editEmail: "Editar email",
      },
      logout: {
        title: "Cerrar sesión",
        description:
          "Se cerrará la sesión actual. La información es guardada automaticamente.",
      },
    },
  },
  input: {
    selector: {
      all: "Todo",
      account: "Seleccionar cuenta",
      category: "Seleccionar categoría",
      currency: "Seleccionar moneda",
      type: "Seleccionar tipo",
    },
    amount: "Monto",
    initialAmount: "Monto inicial",
    description: "Descripción",
    recurrent: "Recurrente",
    name: "Nombre",
  },
  messages: {},
  balance: "Balance",
  hello: "Hola",
  commingSoon: "Proximamente",
  createInstallment: "Crear pago recurrente",
  activesInstallments: "Pagos activos",
  installmentsOf: "Pagos de",
  calculator: "Calculadora",
  switcher: {
    crypto: "Criptomonedas",
    stocks: "Acciones",
  },
  buttons: {
    cancel: "Cancelar",
    confirm: "Confirmar",
    createTrx: "Crear transacción",
    createAcc: "Crear cuenta",
    searchTrx: "Buscar transacciones...",
  },
  toasts: {
    success: {
      createTransaction: "Transacción creada con éxito!",
      editTransaction: "Transacción editada con éxito!",
      deleteTransaction: "Transacción eliminada con éxito!",
      createAccount: "Cuenta creada con éxito!",
      editAccount: "Cuenta editada con éxito!",
      deleteAccount: "Cuenta eliminada con éxito!",
      createInstallment: "Pago recurrente creado con éxito!",
    },
    error: {
      createTransaction: "Error al crear la transacción.",
      editTransaction: "Error al editar la transacción.",
      deleteTransaction: "Error al eliminar la transacción.",
      createAccount: "Error al crear la cuenta.",
      editAccount: "Error al editar la cuenta.",
      deleteAccount: "Error al eliminar la cuenta.",
      createInstallment: "Error al crear el pago recurrente.",
    },
  },
  months: {
    1: "Ene",
    2: "Feb",
    3: "Mar",
    4: "Abr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dic",
  } as Record<number, string>,
  charts: {
    lastFive: "Últimas 5 transacciones",
    category: "Detalle de categorías",
    timeline: "Historial de balances",
    accounts: "Balance en cuentas",
    selectors: {
      all: "Todo",
      last7Days: "Última semana",
      lastMonth: "Último mes",
      last3Months: "Últimos 3 meses",
      last6Months: "Últimos 6 meses",
      lastYear: "Último año",
    },
  },
  greetings: {
    morning: "¡Buenos días!",
    afternoon: "¡Buenas tardes!",
    evening: "¡Buenas noches!",
  },
  table: {
    description: "Descripción",
    amount: "Monto",
    date: "Fecha",
    account: "Cuenta",
    category: "Categoría",
    option: "Opciones",
  },
  categories: {
    "food-drink": "Comidas/Bebidas",
    salary: "Sueldo",
    restaurant: "Restaurante",
    adjustment: "Ajuste",
    technology: "Tecnología",
    services: "Servicios",
    others: "Otros",
    entertainment: "Entretenimiento",
    clothing: "Ropa",
    transportation: "Transporte",
    "health-beauty": "Salud/Belleza",
    education: "Educación",
    home: "Hogar",
    travel: "Viajes",
    gifts: "Regalos",
    sports: "Deportes",
    grocery: "Supermercado",
    transfer: "Transferencia",
  } as Record<string, string>,
  periods: {
    daily: "Diario",
    weekly: "Semanal",
    monthly: "Mensual",
    yearly: "Anual",
  } as Record<string, string>,
};
