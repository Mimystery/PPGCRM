export interface ProjectCardData  {
    projectId: string,
    projectName: string,
    description: string | null, //Це одно і то саме//не обовязково нулл же? ми можемо задати просто пустий стрінг і все
    status: string,
    startDate: Date | null,
    endDate: Date | null,
    //*progress: number,  *** ЦЯ ХУЙНЯ МАЄ РАХУВАТИСЬ ЩЕ ФРОНТОМ?? І ЗАПИСУВАТИСЬ В БАЗУ ДАННИХ??  чи беком? хто це разує???
  //*хуйня це БО ТАМ БЛЯТЬ В ШКАЛІ ПРОГРЕСУ ТРЕБА 2 ЧИСЛА ОДНЕ СКІЛЬКИ ВИКОНАНЕ СКІЛЬКИ ВЖЕ ВИКОНУЄТЬСЯ
    isArchived: boolean,
    processCountByStatus: {
        [key: string]: number //не викуп цього
    };
}
