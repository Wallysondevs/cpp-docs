# std::codecvt_base

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class codecvt_base;
```

  
A classe **std::codecvt_base** fornece as constantes de status de conversão que são herdadas e usadas pelas facets [std::codecvt](<#/doc/locale/codecvt>). 

### Tipos Membro

Tipo Membro  |  Definição   
---|---
enum result { ok, partial, error, noconv }; |  Tipo de enumeração não escopado   
Valor  |  Explicação   
`ok` |  a conversão foi concluída sem erro   
`partial` |  nem todos os caracteres de origem foram convertidos   
`error` |  foi encontrado um caractere inválido   
`noconv` |  nenhuma conversão necessária, os tipos de entrada e saída são os mesmos   
  
### Observações

O valor **std::codecvt_base::partial** é usado para indicar que o range de destino é muito curto para receber os resultados da conversão ou que a entrada está truncada no meio de um caractere multibyte que seria válido. 

### Veja também

[ codecvt](<#/doc/locale/codecvt>) |  converte entre codificações de caracteres, incluindo UTF-8, UTF-16, UTF-32   
(modelo de classe)  