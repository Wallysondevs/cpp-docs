# std::basic_string_view&lt;CharT,Traits&gt;::compare

```cpp
constexpr int compare( basic_string_view v ) const noexcept;  // (1) (desde C++17)
constexpr int compare( size_type pos1, size_type count1,
basic_string_view v ) const;  // (2) (desde C++17)
constexpr int compare( size_type pos1, size_type count1, basic_string_view v,
size_type pos2, size_type count2 ) const;  // (3) (desde C++17)
constexpr int compare( const CharT* s ) const;  // (4) (desde C++17)
constexpr int compare( size_type pos1, size_type count1,
const CharT* s ) const;  // (5) (desde C++17)
constexpr int compare( size_type pos1, size_type count1,
const CharT* s, size_type count2 ) const;  // (6) (desde C++17)
```

Compara duas sequências de caracteres.

1) O comprimento `rlen` das sequências a serem comparadas é o menor entre size() e v.size(). A função compara as duas views chamando traits::compare(data(), v.data(), rlen), e retorna um valor de acordo com a seguinte tabela:

Condição | Resultado | Valor de retorno
---|---|---
`Traits::compare(data(), v.data(), rlen) < 0` | `this` é _menor_ que `v` | < 0
`Traits::compare(data(), v.data(), rlen) == 0` | `size() < v.size()` | `this` é _menor_ que `v` | < 0
`size() == v.size()` | `this` é _igual_ a `v` | ​0​
`size() > v.size()` | `this` é _maior_ que `v` | > 0
`Traits::compare(data(), v.data(), rlen) > 0` | `this` é _maior_ que `v` | > 0

2) Equivalente a substr(pos1, count1).compare(v).

3) Equivalente a substr(pos1, count1).compare(v.substr(pos2, count2)).

4) Equivalente a compare(basic_string_view(s)).

5) Equivalente a substr(pos1, count1).compare(basic_string_view(s)).

6) Equivalente a substr(pos1, count1).compare(basic_string_view(s, count2)).

### Parâmetros

- **v** — view para comparar
- **s** — ponteiro para a string de caracteres a ser comparada
- **count1** — número de caracteres desta view para comparar
- **pos1** — posição do primeiro caractere nesta view para comparar
- **count2** — número de caracteres da view fornecida para comparar
- **pos2** — posição do primeiro caractere da view fornecida para comparar

### Valor de retorno

Valor negativo se esta view for menor que a outra sequência de caracteres, zero se ambas as sequências de caracteres forem iguais, valor positivo se esta view for maior que a outra sequência de caracteres.

### Complexidade

1) Linear no número de caracteres comparados.

### Exemplo

Execute este código
```cpp
    #include <string_view>
     
    int main()
    {
        using std::operator""sv;
        static_assert("abc"sv.compare("abcd"sv) < 0);
        static_assert("abcd"sv.compare("abc"sv) > 0);
        static_assert("abc"sv.compare("abc"sv) == 0);
        static_assert(""sv.compare(""sv) == 0);
    }
```

### Veja também

[ compare](<#/doc/string/basic_string/compare>) | compara duas strings
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ operator==operator!=operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/string/basic_string_view/operator_cmp>)(C++17)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente duas string views
(modelo de função)