# std::basic_string&lt;CharT,Traits,Allocator&gt;::find

```cpp
size_type find( const basic_string& str, size_type pos = 0 ) const; | (1) | (noexcept desde C++11)
(constexpr desde C++20)
size_type find( const CharT* s, size_type pos, size_type count ) const; | (2) | (constexpr desde C++20)
size_type find( const CharT* s, size_type pos = 0 ) const; | (3) | (constexpr desde C++20)
size_type find( CharT ch, size_type pos = 0 ) const; | (4) | (noexcept desde C++11)
(constexpr desde C++20)
template< class StringViewLike >
size_type find( const StringViewLike& t,
size_type pos = 0 ) const noexcept(/* see below */);  // (5) (desde C++17)
(constexpr desde C++20)
```

Encontra a primeira substring igual à sequência de caracteres fornecida. A busca começa em pos, ou seja, a substring encontrada não deve começar em uma posição anterior a pos.

1) Encontra a primeira substring igual a str.

2) Encontra a primeira substring igual ao range `[`s`, `s + count`)`. Este range pode conter caracteres nulos.

Se `[`s`, `s + count`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

3) Encontra a primeira substring igual à string de caracteres apontada por s. O comprimento da string é determinado pelo primeiro caractere nulo usando Traits::length(s).

Se `[`s`, `s + Traits::length(s)`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

4) Encontra o primeiro caractere ch (tratado como uma substring de caractere único pelas regras formais abaixo).

5) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então encontra a primeira substring igual a sv.

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true e [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const StringViewLike&, const CharT*&gt; for false.

Formalmente, uma substring str é considerada _encontrada_ na posição xpos se todas as seguintes condições forem verdadeiras:

*   xpos >= pos
*   xpos + str.size() <= size()
*   para todas as posições n em str, Traits::eq(at(xpos + n), str.at(n)).

Em particular, isso implica que

*   uma substring pode ser encontrada apenas se pos <= size() - str.size()
*   uma substring vazia é encontrada em pos se e somente se pos <= size()
*   para uma substring não vazia, se pos >= size(), a função sempre retorna [npos](<#/doc/string/basic_string/npos>).

### Parâmetros

- **str** — string a ser buscada
- **pos** — posição na qual iniciar a busca
- **count** — comprimento da substring a ser buscada
- **s** — ponteiro para uma string de caracteres a ser buscada
- **ch** — caractere a ser buscado
- **t** — objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) a ser buscado

### Valor de retorno

Posição do primeiro caractere da substring encontrada ou [npos](<#/doc/string/basic_string/npos>) se nenhuma substring for encontrada.

### Exceções

1,4) Não lança exceções.

5)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept([std::is_nothrow_convertible_v](<#/doc/types/is_convertible>)<const T&, [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>>)

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    void print(int id, std::string::size_type n, std::string const& s)
    {
        std::cout << id << ") ";
        if (std::string::npos == n)
            std::cout << "not found! n == npos\n";
        else
            std::cout << "found @ n = " << n << ", substr(" << n << ") = "
                      << std::quoted(s.substr(n)) << '\n';
    }
    
    int main()
    {
        std::string::size_type n;
        std::string const s = "This is a string"; /*
                                 ^  ^  ^
                                 1  2  3          */
    
        // search from beginning of string
        n = s.find("is");
        print(1, n, s);
    
        // search from position 5
        n = s.find("is", 5);
        print(2, n, s);
    
        // find a single character
        n = s.find('a');
        print(3, n, s);
    
        // find a single character
        n = s.find('q');
        print(4, n, s);
    }
```

Saída:
```
    1) found @ n = 2, substr(2) = "is is a string"
    2) found @ n = 5, substr(5) = "is a string"
    3) found @ n = 8, substr(8) = "a string"
    4) not found! n == npos
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 847](<https://cplusplus.github.io/LWG/issue847>) | C++98 | não havia garantia de segurança de exceção | adicionada garantia de segurança de exceção forte
[LWG 2064](<https://cplusplus.github.io/LWG/issue2064>) | C++11 | sobrecargas (3,4) eram noexcept | removido
[LWG 2946](<https://cplusplus.github.io/LWG/issue2946>) | C++17 | sobrecarga (5) causava ambiguidade em alguns casos | evitado tornando-a um template
[P1148R0](<https://wg21.link/P1148R0>) | C++11
C++17 | noexcept para as sobrecargas (4,5) foi acidentalmente removido por LWG2064/LWG2946 | restaurado

### Veja também

[ strstr](<#/doc/string/byte/strstr>) | encontra a primeira ocorrência de uma substring de caracteres
(function)
[ wcsstr](<#/doc/string/wide/wcsstr>) | encontra a primeira ocorrência de uma wide string dentro de outra wide string
(function)
[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(function)
[ wcschr](<#/doc/string/wide/wcschr>) | encontra a primeira ocorrência de um wide character em uma wide string
(function)
[ rfind](<#/doc/string/basic_string/rfind>) | encontra a última ocorrência de uma substring
(public member function)
[ find_first_of](<#/doc/string/basic_string/find_first_of>) | encontra a primeira ocorrência de caracteres
(public member function)
[ find_first_not_of](<#/doc/string/basic_string/find_first_not_of>) | encontra a primeira ausência de caracteres
(public member function)
[ find_last_of](<#/doc/string/basic_string/find_last_of>) | encontra a última ocorrência de caracteres
(public member function)
[ find_last_not_of](<#/doc/string/basic_string/find_last_not_of>) | encontra a última ausência de caracteres
(public member function)
[ find](<#/doc/string/basic_string_view/find>) | encontra caracteres na view
(public member function of `std::basic_string_view<CharT,Traits>`)
[ search](<#/doc/algorithm/search>) | busca pela primeira ocorrência de um range de elementos
(function template)