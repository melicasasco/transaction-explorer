export interface FilterFormData {
    startDate: Date | null
    endDate: Date | null
    cards: string[]
    installments: string[]
    amountMin: number 
    amountMax: number
    methods: string[]
    tabs: string | null
  }

  export type DownloadData = Pick<FilterFormData, "startDate" | "endDate">;
