# std::char_traits&lt;char&gt;::move, std::char_traits&lt;wchar_t&gt;::move, std::char_traits&lt;char8_t&gt;::move, std::char_traits&lt;char16_t&gt;::move, std::char_traits&lt;char32_t&gt;::move

static char_type*  
move( char_type* dest, const char_type* src, [std::size_t](<#/doc/types/size_t>) count ); |  |  (constexpr desde C++20)  

  
Copia `count` caracteres da string de caracteres apontada por `src` para a string de caracteres apontada por `dest`.

Executa corretamente mesmo se os ranges `[`src`, `src + count`)` e `[`dest`, `dest + count`)` se sobrepuserem.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre `character traits` para `X::move`.

### Parâmetros

dest  |  \-  |  ponteiro para uma string de caracteres para a qual copiar   
---|---|---
src  |  \-  |  ponteiro para uma string de caracteres da qual copiar   
count  |  \-  |  o número de caracteres a copiar   
  
### Valor de retorno

dest

### Exceções

Não lança exceções.

### Complexidade

Linear em `count`.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 7](<https://cplusplus.github.io/LWG/issue7>) | C++98  | a cópia era garantida para ser executada corretamente se  
`src` estivesse em `[`dest`, `dest + count`)`, mas não o contrário  
(ou seja, `dest` estivesse em `[`src`, `src + count`)`)  | também garantido 