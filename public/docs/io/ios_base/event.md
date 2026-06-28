# std::ios_base::event

enum event { erase_event, imbue_event, copyfmt_event };

  
Especifica o tipo de evento que é passado para funções registradas por [register_callback()](<#/doc/io/ios_base/register_callback>) em eventos específicos. As seguintes constantes são definidas: 

Constante  |  Explicação   
---|---
`erase_event` |  emitido em ~ios_base() ou [`basic_ios::copyfmt()`](<#/doc/io/basic_ios/copyfmt>) (antes que a cópia dos membros ocorra)   
`imbue_event` |  emitido em [imbue()](<#/doc/io/ios_base/imbue>)  
`copyfmt_event` |  emitido em [`basic_ios::copyfmt()`](<#/doc/io/basic_ios/copyfmt>) (depois que a cópia dos membros ocorre, mas antes que as configurações de exceção sejam copiadas)   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   