# std::chrono::hh_mm_ss

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Duration >
class hh_mm_ss;
```

O template de classe `hh_mm_ss` divide um [std::chrono::duration](<#/doc/chrono/duration>) em um tempo "quebrado" (broken down) como _horas_ :_minutos_ :_segundos_ , com a precisão da divisão determinada pelo parâmetro de template `Duration`. É principalmente uma ferramenta de formatação.

`Duration` deve ser uma especialização de [std::chrono::duration](<#/doc/chrono/duration>), caso contrário o programa é malformado.

### Constantes membro

constexpr unsigned fractional_width[static] | o menor inteiro possível no intervalo `[`​0​`, `18`]` tal que `precision` (veja abaixo) representará exatamente o valor de Duration{1}, ou 6 se não houver tal inteiro
(constante membro estática pública)

### Tipos membro

Tipo membro | Definição
---|---
`precision` | [std::chrono::duration](<#/doc/chrono/duration>)<[std::common_type_t](<#/doc/types/common_type>)<Duration::rep, std::chrono::seconds::rep>, [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 10` _fractional_width_` >>

### Funções membro

[ (construtor)](<#/doc/chrono/hh_mm_ss/hh_mm_ss>) | constrói um `hh_mm_ss`
(função membro pública)
[ is_negativehoursminutessecondssubseconds](<#/doc/chrono/hh_mm_ss/accessors>) | obtém componentes do tempo quebrado (broken-down)
(função membro pública)
[ operator precisionto_duration](<#/doc/chrono/hh_mm_ss/duration>) | obtém o [std::chrono::duration](<#/doc/chrono/duration>) armazenado
(função membro pública)

### Funções não-membro

[ operator<<](<#/doc/chrono/hh_mm_ss/operator_ltlt>)(C++20) | envia um `hh_mm_ss` para um stream
(template de função)

### Classes auxiliares

[ std::formatter<std::chrono::hh_mm_ss>](<#/doc/chrono/hh_mm_ss/formatter>)(C++20) | suporte de formatação para `hh_mm_ss`
(especialização de template de classe)