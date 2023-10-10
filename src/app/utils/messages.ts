import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Messages {
  error="Hata Oluştu Lütfen Tekrar Deneyiniz"
  notNull="Tüm Alanları Doldurun";
  deleteError="Ürün Silinirken Hata Oluştu. Tekrar Deneyin veya Sistem Yöneticinize Başvurun";
  deleteSuccess="Silme İşlemi Başarı İle Tamamlandı"
  maxCharacters?:"Maksimum Karekter Sınırını Aştınız";
  saveSuccess="Kayıt İşlemi Başarı İle Tamamlandı"
  userAuthority="Yetki Güncelleme İşlemi Başarılı"

}

