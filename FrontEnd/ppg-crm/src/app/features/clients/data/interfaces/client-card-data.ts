import { ProjectCardData } from "../../../projects/data/interfaces/project-card-data";

export type ClientCardData = {
  clientId: string;
  companyName: string;
  director: string | null;
  contactPerson: string | null;
  clientEmail: string | null;
  clientPhone: string | null;
  projects?: ProjectCardData[] | null;  //ЯКИЙ ТУТ ТИП МАЄ БУТИ??? TODO: ЦЕ ПОРІШАЙ  І ДИВИСЬ В СТРУКТУРУ ПАПОК ЯКУ Я КИДАВ***/
}
