# std::basic_string&lt;CharT,Traits,Allocator&gt;::compare

```cpp
int compare( const basic_string& str ) const; | (1) | (noexcept desde C++11)
(constexpr desde C++20)
int compare( size_type pos1, size_type count1,
const basic_string& str ) const; | (2) | (constexpr desde C++20)
  // (3)
int compare( size_type pos1, size_type count1,
const basic_string& str,
size_type pos2, size_type count2 ) const; | | (ate C++14)
int compare( size_type pos1, size_type count1,
const basic_string& str,
size_type pos2, size_type count2 = npos ) const;  // (desde C++14)
(constexpr desde C++20)
int compare( const CharT* s ) const; | (4) | (constexpr desde C++20)
int compare( size_type pos1, size_type count1,
const CharT* s ) const; | (5) | (constexpr desde C++20)
int compare( size_type pos1, size_type count1,
const CharT* s, size_type count2 ) const; | (6) | (constexpr desde C++20)
template< class StringViewLike >
int compare( const StringViewLike& t ) const noexcept(/* see below */);  // (7) (desde C++17)
(constexpr desde C++20)
template< class StringViewLike >
int compare( size_type pos1, size_type count1,
const StringViewLike& t ) const;  // (8) (desde C++17)
(constexpr desde C++20)
template< class StringViewLike >
int compare( size_type pos1, size_type count1,
const StringViewLike& t,
size_type pos2, size_type count2 = npos) const;  // (9) (desde C++17)
(constexpr desde C++20)
```

Compara duas sequências de caracteres.

1) Compara esta string com str.

2) Compara uma substring `[`pos1`, `pos1 + count1`)` desta string com str.

  * Se count1 > size() - pos1, a substring é `[`pos1`, `size()`)`.

3) Compara uma substring `[`pos1`, `pos1 + count1`)` desta string com uma substring `[`pos2`, `pos2 + count2`)` de str.

  * Se count1 > size() - pos1, a primeira substring é `[`pos1`, `size()`)`.
  * Se count2 > str.size() - pos2, a segunda substring é `[`pos2`, `str.size()`)`.

4) Compara esta string com a sequência de caracteres terminada em nulo que começa no caractere apontado por s com comprimento Traits::length(s).

5) Compara uma substring `[`pos1`, `pos1 + count1`)` desta string com a sequência de caracteres terminada em nulo que começa no caractere apontado por s com comprimento Traits::length(s).

  * Se count1 > size() - pos1, a substring é `[`pos1`, `size()`)`.

6) Compara uma substring `[`pos1`, `pos1 + count1`)` desta string com os caracteres no range `[`s`, `s + count2`)`. Os caracteres em `[`s`, `s + count2`)` podem incluir caracteres nulos.

  * Se count1 > size() - pos1, a substring é `[`pos1`, `size()`)`.

7-9) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então

7) compara esta string com sv;

8) compara uma substring `[`pos1`, `pos1 + count1`)` desta string com sv, como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>(*this).substr(pos1, count1).compare(sv);

9) compara uma substring `[`pos1`, `pos1 + count1`)` desta string com uma substring `[`pos2`, `pos2 + count2`)` de sv, como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>(*this)
.substr(pos1, count1).compare(sv.substr(pos2, count2)).

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false..

Uma sequência de caracteres consistindo de count1 caracteres começando em data1 é comparada a uma sequência de caracteres consistindo de count2 caracteres começando em data2 da seguinte forma:

  * Primeiro, calcula o número de caracteres a comparar, como se por size_type rlen = [std::min](<#/doc/algorithm/min>)(count1, count2).
  * Em seguida, compara as sequências chamando Traits::compare(data1, data2, rlen). Para strings padrão, esta função realiza uma comparação lexicográfica caractere por caractere. Se o resultado for zero (as sequências de caracteres são iguais até agora), então seus tamanhos são comparados da seguinte forma:

Condição | Resultado | Valor de retorno
---|---|---
`Traits::compare(data1, data2, rlen) < 0` | data1 é _menor_ que data2 | <0
`Traits::compare(data1, data2, rlen) == 0` | size1 < size2 | data1 é _menor_ que data2 | <0
size1 == size2 | data1 é _igual_ a data2 | ​0​
size1 > size2 | data1 é _maior_ que data2 | >0
`Traits::compare(data1, data2, rlen) > 0` | data1 é _maior_ que data2 | >0

### Parâmetros

- **str** — outra string para comparar
- **s** — ponteiro para a string de caracteres para comparar
- **count1** — número de caracteres desta string para comparar
- **pos1** — posição do primeiro caractere nesta string para comparar
- **count2** — número de caracteres da string fornecida para comparar
- **pos2** — posição do primeiro caractere da string fornecida para comparar
- **t** — objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) para comparar

### Valor de retorno

  * Valor negativo se *this aparecer antes da sequência de caracteres especificada pelos argumentos, em ordem lexicográfica.
  * Zero se ambas as sequências de caracteres forem equivalentes na comparação.
  * Valor positivo se *this aparecer depois da sequência de caracteres especificada pelos argumentos, em ordem lexicográfica.

### Exceções

As sobrecargas que recebem parâmetros nomeados pos1 ou pos2 lançam [std::out_of_range](<#/doc/error/out_of_range>) se o argumento estiver fora do range.

7)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<const T&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>)

8,9) Lança qualquer exceção lançada pela conversão para [std::basic_string_view](<#/doc/string/basic_string_view>).

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Possível implementação

[sobrecarga (1)](<#/doc/string/basic_string/compare>)
---
```
    template<class CharT, class Traits, class Alloc>
    int std::basic_string<CharT, Traits, Alloc>::compare
        (const std::basic_string& s) const noexcept
    {
        size_type lhs_sz = size();
        size_type rhs_sz = s.size();
        int result = traits_type::compare(data(), s.data(), std::min(lhs_sz, rhs_sz));
        if (result != 0)
            return result;
        if (lhs_sz < rhs_sz)
            return -1;
        if (lhs_sz > rhs_sz)
            return 1;
        return 0;
    }
```

### Notas

Para as situações em que a comparação de três vias não é necessária, [std::basic_string](<#/doc/string/basic_string>) fornece os [operadores relacionais](<#/doc/string/basic_string/operator_cmp>) usuais (`<`, `<=`, `==`, `>`, etc).

Por padrão (com o [std::char_traits](<#/doc/string/char_traits>) padrão), esta função não é sensível à localidade. Veja [std::collate::compare](<#/doc/locale/collate/compare>) para comparação de strings de três vias sensível à localidade.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    void print_compare_result(std::string_view str1,
                              std::string_view str2,
                              int compare_result)
    {
        if (compare_result < 0)
            std::cout << std::quoted(str1) << " comes before "
                      << std::quoted(str2) << ".\n";
        else if (compare_result > 0)
            std::cout << std::quoted(str2) << " comes before "
                      << std::quoted(str1) << ".\n";
        else
            std::cout << std::quoted(str1) << " and "
                      << std::quoted(str2) << " are the same.\n";
    }
    
    int main()
    {
        std::string batman{"Batman"};
        std::string superman{"Superman"};
        int compare_result{0};
    
        // 1) Compare with other string
        compare_result = batman.compare(superman);
        std::cout << "1) ";
        print_compare_result("Batman", "Superman", compare_result);
    
        // 2) Compare substring with other string
        compare_result = batman.compare(3, 3, superman);
        std::cout << "2) ";
        print_compare_result("man", "Superman", compare_result);
    
        // 3) Compare substring with other substring
        compare_result = batman.compare(3, 3, superman, 5, 3);
        std::cout << "3) ";
        print_compare_result("man", "man", compare_result);
    
        // Compare substring with other substring
        // defaulting to end of other string
        assert(compare_result == batman.compare(3, 3, superman, 5));
    
        // 4) Compare with char pointer
        compare_result = batman.compare("Superman");
        std::cout << "4) ";
        print_compare_result("Batman", "Superman", compare_result);
    
        // 5) Compare substring with char pointer
        compare_result = batman.compare(3, 3, "Superman");
        std::cout << "5) ";
        print_compare_result("man", "Superman", compare_result);
    
        // 6) Compare substring with char pointer substring
        compare_result = batman.compare(0, 3, "Superman", 5);
        std::cout << "6) ";
        print_compare_result("Bat", "Super", compare_result);
    }
```

Saída:
```
    1) "Batman" comes before "Superman".
    2) "Superman" comes before "man".
    3) "man" and "man" are the same.
    4) "Batman" comes before "Superman".
    5) "Superman" comes before "man".
    6) "Bat" comes before "Super".
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 5](<https://cplusplus.github.io/LWG/issue5>) | C++98 | o parâmetro count2 da sobrecarga (6)
tinha um argumento padrão npos | argumento padrão removido,
dividido nas sobrecargas (5) e (6)
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
---|---|---|---
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17 | a sobrecarga (7) causava ambiguidade em alguns casos | evitado tornando-a um template
[P1148R0](<https://wg21.link/P1148R0>) | C++17 | noexcept para a sobrecarga (7) foi acidentalmente
removido pela resolução de LWG2946 | restaurado

### Veja também

[ operator==operator!=operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/string/basic_string/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente duas strings
(modelo de função)
[ substr](<#/doc/string/basic_string/substr>) | retorna uma substring
(função membro pública)
[ collate](<#/doc/locale/collate>) | define comparação lexicográfica e hashing de strings
(modelo de classe)
[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a localidade atual
(função)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna true se um range for lexicograficamente menor que outro
(modelo de função)
[ compare](<#/doc/string/basic_string_view/compare>) | compara duas views
(função membro pública de `std::basic_string_view<CharT,Traits>`)