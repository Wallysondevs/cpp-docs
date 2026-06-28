# operator==(std::text_encoding)

```cpp
friend constexpr bool operator==( const text_encoding& a,
const text_encoding& b ) noexcept;  // (1) (desde C++26)
friend constexpr bool operator==( const text_encoding& a, id i ) noexcept;  // (2) (desde C++26)
```

  
Realiza operações de comparação em objetos `text_encoding`.

1) Compara dois objetos `text_encoding`. Os objetos são considerados iguais se e somente se [`_comp-name_`](<#/doc/text/text_encoding/comp-name>) (a.name(), b.name()) for verdadeiro quando ambos a.mib() e b.mib() forem iguais a id::other, ou a.mib() for igual a b.mib().

2) Compara um objeto `text_encoding` com um valor MIBenum. Os objetos são considerados iguais se e somente se a.mib() for igual a i.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando `std::text_encoding` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

a, b  |  \-  |  Objetos `text_encoding` para comparar   
---|---|---
i  |  \-  |  Valor `id` para comparar com o valor MIBenum contido em a  
  
### Valor de retorno

1) a.mib() == id::other && b.mib() == id::other  
` `?` ` _comp-name_` (a.name(), b.name())  
` `: a.mib() == b.mib().

2) a.mib() == i.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator==operator!=](<#/doc/locale/locale/operator_cmp>)(removido em C++20) | comparação de igualdade entre objetos locale   
(função membro pública de `std::locale`)  