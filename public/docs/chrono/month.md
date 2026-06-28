# std::chrono::month

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class month;
inline constexpr std::chrono::month January{1};
inline constexpr std::chrono::month February{2};
inline constexpr std::chrono::month March{3};
inline constexpr std::chrono::month April{4};
inline constexpr std::chrono::month May{5};
inline constexpr std::chrono::month June{6};
inline constexpr std::chrono::month July{7};
inline constexpr std::chrono::month August{8};
inline constexpr std::chrono::month September{9};
inline constexpr std::chrono::month October{10};
inline constexpr std::chrono::month November{11};
inline constexpr std::chrono::month December{12};
```

  
A classe `month` representa um mês em um ano. Seu intervalo normal é `[`1`, `12`]`, mas pode conter qualquer número em `[`​0​`, `255`]`. Doze constantes nomeadas são predefinidas no namespace `std::chrono` para os doze meses do ano. 

`month` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>). 

### Funções membro

[ (constructor)](<#/doc/chrono/month/month>) |  constrói um `month`   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/month/operator_inc_dec>) |  incrementa ou decrementa o mês   
(função membro pública)  
[ operator+=operator-=](<#/doc/chrono/month/operator_arith>) |  adiciona ou subtrai um número de meses   
(função membro pública)  
[ operator unsigned](<#/doc/chrono/month/operator_unsigned>) |  recupera o valor do mês armazenado   
(função membro pública)  
[ ok](<#/doc/chrono/month/ok>) |  verifica se o valor do mês armazenado está no intervalo normal   
(função membro pública)  
  
### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/month/operator_cmp>)(desde C++20) |  compara dois valores `month`   
(função)  
[ operator+operator-](<#/doc/chrono/month/operator_arith_2>)(desde C++20) |  realiza operações aritméticas em `month`s   
(função)  
[ operator<<](<#/doc/chrono/month/operator_ltlt>)(desde C++20) |  envia um `month` para um stream   
(modelo de função)  
[ from_stream](<#/doc/chrono/month/from_stream>)(desde C++20) |  analisa um `month` de um stream de acordo com o formato fornecido   
(modelo de função)  
  
### Classes auxiliares

[ std::formatter<std::chrono::month>](<#/doc/chrono/month/formatter>)(desde C++20) |  suporte de formatação para `month`   
(especialização de modelo de classe)  
[ std::hash<std::chrono::month>](<#/doc/chrono/month/hash>)(desde C++26) |  suporte de hash para `std::chrono::month`   
(especialização de modelo de classe)