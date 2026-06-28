# std::match_results&lt;BidirIt,Alloc&gt;::length

```cpp
difference_type length( size_type n = 0 ) const;
```
| | | (desde C++11)

Retorna o comprimento do sub-match especificado.

Se n == 0, o comprimento da expressão correspondida inteira é retornado.

Se n > 0 && n < size(), o comprimento do n-ésimo sub-match é retornado.

Se n >= size(), um comprimento do match não correspondido é retornado.

A chamada é equivalente a `(*this)[n].length()`.

[`ready()`](<#/doc/regex/match_results/ready>) deve ser verdadeiro. Caso contrário, o comportamento é indefinido.

### Parâmetros

n  |  \-  |  número inteiro especificando qual match examinar

### Valor de retorno

O comprimento do match ou sub-match especificado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator[]](<#/doc/regex/match_results/operator_at>) | retorna o sub-match especificado
(função membro pública)
[ length](<#/doc/regex/sub_match/length>) | retorna o comprimento do match (se houver)
(função membro pública de `std::sub_match<BidirIt>`)