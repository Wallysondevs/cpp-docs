# std::experimental::basic_string_view&lt;CharT,Traits&gt;::compare

constexpr int compare(basic_string_view v) const noexcept; | (1) | (library fundamentals TS)
constexpr int compare(size_type pos1, size_type count1,  
basic_string_view v) const | (2) | (library fundamentals TS)
constexpr int compare(size_type pos1, size_type count1, basic_string_view v,  
size_type pos2, size_type count2) const; | (3) | (library fundamentals TS)
---|---|---
constexpr int compare(const CharT* s) const; | (4) | (library fundamentals TS)
constexpr int compare(size_type pos1, size_type count1,  
const CharT* s) const; | (5) | (library fundamentals TS)
constexpr int compare(size_type pos1, size_type count1,  
const CharT* s, size_type count2) const; | (6) | (library fundamentals TS)

Compara duas sequências de caracteres.

1) O comprimento `rlen` das sequências a comparar é o menor entre `size()` e `v.size()`. A função compara as duas views chamando `traits::compare(data(), v.data(), rlen)`, e retorna um valor de acordo com a seguinte tabela:

Condição | Resultado | Valor de retorno
---|---|---
`Traits::compare(data(), v.data(), rlen) < 0` | `this` é _menor_ que `v` | <0
`Traits::compare(data(), v.data(), rlen) == 0` | `size() < v.size()` | `this` é _menor_ que `v` | <0
`size() == v.size()` | `this` é _igual_ a `v` | ​0​
`size() > v.size()` | `this` é _maior_ que `v` | >0
`Traits::compare(data(), v.data(), rlen) > 0` | `this` é _maior_ que `v` | >0

2) Equivalente a `substr(pos1, count1).compare(v)`.

3) Equivalente a `substr(pos1, count1).compare(v.substr(pos2, count2))`.

4) Equivalente a `compare(basic_string_view(s))`.

5) Equivalente a `substr(pos1, count1).compare(basic_string_view(s))`.

6) Equivalente a `substr(pos1, count1).compare(basic_string_view(s, count2))`.

### Parâmetros

- **v** — view a comparar
- **s** — ponteiro para a string de caracteres a comparar
- **count1** — número de caracteres desta view a comparar
- **pos1** — posição do primeiro caractere nesta view a comparar
- **count2** — número de caracteres da view fornecida a comparar
- **pos2** — posição do primeiro caractere da view fornecida a comparar

### Valor de retorno

valor negativo se esta view for menor que a outra sequência de caracteres, zero se ambas as sequências de caracteres forem iguais, valor positivo se esta view for maior que a outra sequência de caracteres.

### Complexidade

1) Linear no número de caracteres comparados.

### Ver também

[ operator==operator!=operator&lt;operator&gt;operator<=operator>=](<#/doc/experimental/basic_string_view/operator_cmp>) | compara duas views lexicograficamente
(function template)